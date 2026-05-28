import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import App from './App.jsx';
import Head from './components/Head.jsx';
import SignUp from './components/Signup.jsx';
import Login from './components/Login.jsx';
import ForgetPassword from './components/ForgetPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Dashboard from './components/Dashboard.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import Courses from './components/Courses.jsx';
import Target from './components/Target.jsx';
import Foot from './components/Foot.jsx';
import Compiler from './components/Compiler.jsx';
import Certificate from './components/Certificate.jsx';
import ViewReport from './components/ViewReport.jsx';
import DynamicProgressSidebar from './components/DynamicProgressSidebar.jsx';
import {
  AuthProvider,
  PrivateRoute,
  PublicRoute,
} from './AuthProvider.jsx';

import ScrollToTop from "./components/ScrollToTop.jsx";
import GlobalBackNav from "./components/common/GlobalBackNav.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

// Lesson route metadata
import { lessonGroups } from './config/lessonRoutes.js';

// Dynamic lazy route wrapper with standard fallback loader
const DynamicRoute = ({ componentName }) => {
  const Component = React.lazy(() => import(`./components/${componentName}.jsx`));
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Loading lesson content...</p>
      </div>
    }>
      <Component />
    </Suspense>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <SearchProvider>
          <Head />
          <DynamicProgressSidebar />
          <ScrollToTop />
          <GlobalBackNav />
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Navigate to="/lessons" replace />} />
            <Route path="/lessons" element={<Courses />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/report/:email" element={<ViewReport />} />
            <Route path="/api" element={<App />} />
            <Route path="/Certificate" element={<Certificate />} />
            <Route path="/Compiler" element={<Compiler />} />

            {/* Dynamically generated module overview & lesson routes */}
            {lessonGroups.map((group) => {
              const overviewComponentName = group.modulePath.substring(1);
              return (
                <React.Fragment key={group.key}>
                  {/* Course Overview Route */}
                  <Route
                    path={group.modulePath}
                    element={<DynamicRoute componentName={overviewComponentName} />}
                  />
                  {/* Individual Lesson Routes */}
                  {group.lessons.map((lesson) => {
                    const lessonComponentName = lesson.path.substring(1);
                    return (
                      <Route
                        key={lesson.lessonId}
                        path={lesson.path}
                        element={<DynamicRoute componentName={lessonComponentName} />}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </Routes>
          <Target />
          <Foot />
        </SearchProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
