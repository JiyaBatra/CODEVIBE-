# fix: persist MCQ exam scores to MongoDB — closes #730

## Summary

MCQ quiz scores were held only in React component state. Refreshing the
page wiped them entirely and there was no backend endpoint to save or
retrieve them. This PR adds the full persistence layer (model → controller
→ routes) and updates both existing MCQ components to use it.

---

## Changes

### Backend — 3 new files, 1 modified

| File | What changed |
|---|---|
| `server/models/examResult.js` | New `ExamResult` Mongoose model |
| `server/controller/exam/examController.js` | `submitExam` + `getMyResults` handlers |
| `server/routes/api/examRoutes.js` | Routes behind `verifyToken` middleware |
| `server/routes/api/index.js` | Registers `/api/exam` router |

#### New API endpoints

```
POST /api/exam/submit        (JWT required)
Body: { courseId, score, totalQuestions, passingScore? }
→ 201  { message, result: { id, courseId, score, totalQuestions, percentage, passed, attemptedAt } }

GET  /api/exam/results       (JWT required)
Query: ?courseId=html        (optional filter)
→ 200  { results: [ ...sorted newest-first ] }
```

#### `ExamResult` schema

```js
{
  email:          String  // indexed
  courseId:       String
  score:          Number
  totalQuestions: Number
  percentage:     Number  // computed server-side
  passed:         Boolean // computed against passingScore threshold (default 60 %)
  attemptedAt:    Date
}
// compound index: { email, courseId, attemptedAt: -1 }
```

---

### Frontend — 2 files modified

#### `HtmlLesson9.jsx` and `CssLesson13.jsx`

Both files received the same treatment:

1. **On mount** — `GET /api/exam/results?courseId=<id>` fetches the most
   recent saved result and displays it in a banner above the quiz, so
   returning users see their score without retaking the exam.

2. **On submit** — after computing the score locally, `POST /api/exam/submit`
   persists it to MongoDB. A "Saving…" indicator is shown while the request
   is in-flight; failures are caught and logged to the console (non-blocking,
   the UI still shows the score).

3. **`MAX_SCORE` fix (CssLesson13)** — was hard-coded as `20` but the
   questions actually total `25` marks. Now derived dynamically:
   `questions.reduce((sum, q) => sum + q.marks, 0)`.

---

## Before / After

| Scenario | Before | After |
|---|---|---|
| Submit exam, then refresh | Score gone, blank screen | Score shown in "last attempt" banner |
| Submit exam while logged out | n/a (no auth needed to see quiz) | Score still shown locally; save silently skipped |
| View past results | Impossible | `GET /api/exam/results` returns full history |
| CssLesson13 max score display | Shows "/ 20" (wrong) | Shows "/ 25" (correct) |

---

## Testing

### Backend (curl / Postman)
```bash
# 1. Get a token
TOKEN=$(curl -s -X POST http://localhost:5002/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com","password":"password"}' | jq -r '.token')

# 2. Submit an exam result
curl -X POST http://localhost:5002/api/exam/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"courseId":"html","score":12,"totalQuestions":15}'
# → 201 { message: "Exam result saved", result: { ... } }

# 3. Retrieve results
curl http://localhost:5002/api/exam/results?courseId=html \
  -H "Authorization: Bearer $TOKEN"
# → 200 { results: [ { score: 12, percentage: 80, passed: true, ... } ] }

# 4. Missing token → 401
curl -X POST http://localhost:5002/api/exam/submit \
  -H 'Content-Type: application/json' \
  -d '{"courseId":"html","score":12,"totalQuestions":15}'
```

### Frontend (manual)
1. Log in and navigate to `/HtmlLesson9` or `/CssLesson13`.
2. Answer all questions and click **Submit Quiz / Submit**.
3. Confirm "Saving…" appears momentarily next to the score.
4. Refresh the page — the "📋 Your last attempt" banner should appear with
   your score and date.
5. Submit again — a new record is created (full history preserved).

---

## Checklist

- [x] New `ExamResult` model follows existing schema conventions
- [x] Both endpoints protected by `verifyToken` (same middleware as all
      other auth-gated routes)
- [x] Email taken from JWT payload (`req.user.email`), never from the
      request body (consistent with lesson controller fix)
- [x] Frontend save failure is non-blocking — user always sees their score
- [x] No breaking changes to existing endpoints or components
- [x] `CssLesson13` hard-coded max-score bug fixed as a bonus

Closes #730
