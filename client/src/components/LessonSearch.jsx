import { useState, useMemo, useRef, useEffect } from 'react';

function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

export default function LessonSearch() {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const containerRef          = useRef(null);

  const search = useMemo(
    () =>
      debounce(async (q) => {
        if (q.length < 2) { setResults([]); return; }
        setLoading(true);
        setError(null);
        try {
          const res  = await fetch(`/api/lessons/search?q=${encodeURIComponent(q)}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Search failed');
          setResults(data.results);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, 300),
    []
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="lesson-search" style={{ position: 'relative', maxWidth: 480 }}>
      <input
        type="text"
        placeholder="Search lessons… (e.g. flexbox, loops, joins)"
        value={query}
        onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
        style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)' }}
        aria-label="Search lessons"
        aria-autocomplete="list"
        aria-controls="lesson-search-results"
      />
      {loading && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Searching…</p>}
      {error   && <p style={{ fontSize: 12, color: 'red', marginTop: 4 }}>{error}</p>}
      {results.length > 0 && (
        <ul
          id="lesson-search-results"
          role="listbox"
          style={{
            position: 'absolute', top: '110%', left: 0, right: 0,
            background: 'var(--surface-1)', border: '1px solid var(--border)',
            borderRadius: 8, listStyle: 'none', padding: '4px 0', zIndex: 100,
            boxShadow: '0 4px 16px rgba(0,0,0,.1)',
          }}
        >
          {results.map((lesson) => (
            <li key={lesson._id} role="option">
              <a
                href={`/lessons/${lesson._id}`}
                style={{ display: 'flex', justifyContent: 'space-between',
                  padding: '8px 14px', fontSize: 13, color: 'var(--text-primary)',
                  textDecoration: 'none' }}
              >
                <span>{lesson.title}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)',
                  background: 'var(--surface-0)', border: '1px solid var(--border)',
                  borderRadius: 6, padding: '1px 6px' }}>
                  {lesson.courseId}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}