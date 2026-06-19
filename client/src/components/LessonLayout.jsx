import React, { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import NotesPanel from "./NotesPanel";
import BookmarkButton from "./BookmarkButton";
import { lessonGroups } from "../config/lessonRoutes";
import useScrollRestore from "../hooks/useScrollRestore";

const LESSON_PATH_REGEX = /^\/(?:Html|Css|Js|C|Dbms|Dsa|Express|Mongo|Node|OOP|React)Lesson\d*$/i;

const lessonPathToIdMap = new Map();
lessonGroups.forEach((group) => {
  group.lessons.forEach((lesson) => {
    lessonPathToIdMap.set(lesson.path, lesson.lessonId);
  });
});

function extractLessonId(pathname) {
  return pathname.replace(/^\//, "");
}

function mapPathToLessonId(pathname) {
  return lessonPathToIdMap.get(pathname) || pathname.replace(/^\//, "");
}

const LessonLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isLessonPage = LESSON_PATH_REGEX.test(location.pathname);
  const lessonId = isLessonPage ? mapPathToLessonId(location.pathname) : null;

  const { handleScroll } = useScrollRestore(lessonId, { enabled: isLessonPage });

  useEffect(() => {
    if (!isLessonPage) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLessonPage, handleScroll]);

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Outlet />
      {isLessonPage && (
        <>
          <NotesPanel lessonId={extractLessonId(location.pathname)} lessonTitle={location.pathname.replace("/", "")} />
          <div className="lesson-bookmark-fab">
            <BookmarkButton lessonId={lessonId} size={20} />
          </div>
        </>
      )}
    </>
  );
};

export default LessonLayout;
