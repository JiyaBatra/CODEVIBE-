import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// ─── Static imports (core layout & auth — always needed immediately) ──────────
import App from './App.jsx';
import Head from './components/Head.jsx';
import Foot from './components/Foot.jsx';
import Target from './components/Target.jsx';
import ScrollToTop from './components/ScrollToTop';
import DynamicProgressSidebar from './components/DynamicProgressSidebar.jsx';
import {
  AuthProvider,
  PrivateRoute,
  PublicRoute,
} from './AuthProvider.jsx';

// ─── Lazy imports (pages — load only when the user navigates there) ───────────

// Auth & general pages
const SignUp          = lazy(() => import('./components/Signup.jsx'));
const Login           = lazy(() => import('./components/Login.jsx'));
const ForgetPassword  = lazy(() => import('./components/ForgetPassword.jsx'));
const ResetPassword   = lazy(() => import('./components/ResetPassword.jsx'));
const Dashboard       = lazy(() => import('./components/Dashboard.jsx'));
const PrivacyPolicy   = lazy(() => import('./components/PrivacyPolicy.jsx'));
const TermsOfService  = lazy(() => import('./components/TermsOfService.jsx'));
const Courses         = lazy(() => import('./components/Courses.jsx'));
const Compiler        = lazy(() => import('./components/Compiler.jsx'));
const Certificate     = lazy(() => import('./components/Certificate.jsx'));
const ViewReport      = lazy(() => import('./components/ViewReport.jsx'));

// HTML Lessons
const HtmlLesson   = lazy(() => import('./components/HtmlLesson.jsx'));
const HtmlLesson1  = lazy(() => import('./components/HtmlLesson1.jsx'));
const HtmlLesson2  = lazy(() => import('./components/HtmlLesson2.jsx'));
const HtmlLesson3  = lazy(() => import('./components/HtmlLesson3.jsx'));
const HtmlLesson4  = lazy(() => import('./components/HtmlLesson4.jsx'));
const HtmlLesson5  = lazy(() => import('./components/HtmlLesson5.jsx'));
const HtmlLesson6  = lazy(() => import('./components/HtmlLesson6.jsx'));
const HtmlLesson7  = lazy(() => import('./components/HtmlLesson7.jsx'));
const HtmlLesson8  = lazy(() => import('./components/HtmlLesson8.jsx'));
const HtmlLesson9  = lazy(() => import('./components/HtmlLesson9.jsx'));
const HtmlLesson10 = lazy(() => import('./components/HtmlLesson10.jsx'));

// CSS Lessons
const CssLesson   = lazy(() => import('./components/CssLesson.jsx'));
const CssLesson1  = lazy(() => import('./components/CssLesson1.jsx'));
const CssLesson2  = lazy(() => import('./components/CssLesson2.jsx'));
const CssLesson3  = lazy(() => import('./components/CssLesson3.jsx'));
const CssLesson4  = lazy(() => import('./components/CssLesson4.jsx'));
const CssLesson5  = lazy(() => import('./components/CssLesson5.jsx'));
const CssLesson6  = lazy(() => import('./components/CssLesson6.jsx'));
const CssLesson7  = lazy(() => import('./components/CssLesson7.jsx'));
const CssLesson8  = lazy(() => import('./components/CssLesson8.jsx'));
const CssLesson9  = lazy(() => import('./components/CssLesson9.jsx'));
const CssLesson10 = lazy(() => import('./components/CssLesson10.jsx'));
const CssLesson11 = lazy(() => import('./components/CssLesson11.jsx'));
const CssLesson12 = lazy(() => import('./components/CssLesson12.jsx'));
const CssLesson13 = lazy(() => import('./components/CssLesson13.jsx'));
const CssLesson14 = lazy(() => import('./components/CssLesson14.jsx'));

// JavaScript Lessons
const JsLesson   = lazy(() => import('./components/JsLesson.jsx'));
const JsLesson1  = lazy(() => import('./components/JsLesson1.jsx'));
const JsLesson2  = lazy(() => import('./components/JsLesson2.jsx'));
const JsLesson3  = lazy(() => import('./components/JsLesson3.jsx'));
const JsLesson4  = lazy(() => import('./components/JsLesson4.jsx'));
const JsLesson5  = lazy(() => import('./components/JsLesson5.jsx'));
const JsLesson6  = lazy(() => import('./components/JsLesson6.jsx'));
const JsLesson7  = lazy(() => import('./components/JsLesson7.jsx'));
const JsLesson8  = lazy(() => import('./components/JsLesson8.jsx'));
const JsLesson9  = lazy(() => import('./components/JsLesson9.jsx'));
const JsLesson10 = lazy(() => import('./components/JsLesson10.jsx'));
const JsLesson11 = lazy(() => import('./components/JsLesson11.jsx'));
const JsLesson12 = lazy(() => import('./components/JsLesson12.jsx'));
const JsLesson13 = lazy(() => import('./components/JsLesson13.jsx'));
const JsLesson14 = lazy(() => import('./components/JsLesson14.jsx'));
const JsLesson15 = lazy(() => import('./components/JsLesson15.jsx'));
const JsLesson16 = lazy(() => import('./components/JsLesson16.jsx'));
const JsLesson17 = lazy(() => import('./components/JsLesson17.jsx'));
const JsLesson18 = lazy(() => import('./components/JsLesson18.jsx'));
const JsLesson19 = lazy(() => import('./components/JsLesson19.jsx'));
const JsLesson20 = lazy(() => import('./components/JsLesson20.jsx'));
const JsLesson21 = lazy(() => import('./components/JsLesson21.jsx'));
const JsLesson22 = lazy(() => import('./components/JsLesson22.jsx'));
const JsLesson23 = lazy(() => import('./components/JsLesson23.jsx'));
const JsLesson24 = lazy(() => import('./components/JsLesson24.jsx'));
const JsLesson25 = lazy(() => import('./components/JsLesson25.jsx'));
const JsLesson26 = lazy(() => import('./components/JsLesson26.jsx'));
const JsLesson27 = lazy(() => import('./components/JsLesson27.jsx'));
const JsLesson28 = lazy(() => import('./components/JsLesson28.jsx'));
const JsLesson29 = lazy(() => import('./components/JsLesson29.jsx'));

// C Lessons
const CLesson   = lazy(() => import('./components/CLesson.jsx'));
const CLesson1  = lazy(() => import('./components/CLesson1.jsx'));
const CLesson2  = lazy(() => import('./components/CLesson2.jsx'));
const CLesson3  = lazy(() => import('./components/CLesson3.jsx'));
const CLesson4  = lazy(() => import('./components/CLesson4.jsx'));
const CLesson5  = lazy(() => import('./components/CLesson5.jsx'));
const CLesson6  = lazy(() => import('./components/CLesson6.jsx'));
const CLesson7  = lazy(() => import('./components/CLesson7.jsx'));
const CLesson8  = lazy(() => import('./components/Clesson8.jsx'));
const CLesson9  = lazy(() => import('./components/CLesson9.jsx'));
const CLesson10 = lazy(() => import('./components/CLesson10.jsx'));
const CLesson11 = lazy(() => import('./components/CLesson11.jsx'));
const CLesson12 = lazy(() => import('./components/CLesson12.jsx'));
const CLesson13 = lazy(() => import('./components/CLesson13.jsx'));
const CLesson14 = lazy(() => import('./components/CLesson14.jsx'));
const CLesson15 = lazy(() => import('./components/CLesson15.jsx'));
const CLesson16 = lazy(() => import('./components/CLesson16.jsx'));
const CLesson17 = lazy(() => import('./components/CLesson17.jsx'));

// DBMS Lessons
const DbmsLesson   = lazy(() => import('./components/DbmsLesson.jsx'));
const DbmsLesson1  = lazy(() => import('./components/DbmsLesson1.jsx'));
const DbmsLesson2  = lazy(() => import('./components/DbmsLesson2.jsx'));
const DbmsLesson3  = lazy(() => import('./components/DbmsLesson3.jsx'));
const DbmsLesson4  = lazy(() => import('./components/DbmsLesson4.jsx'));
const DbmsLesson5  = lazy(() => import('./components/DbmsLesson5.jsx'));
const DbmsLesson6  = lazy(() => import('./components/DbmsLesson6.jsx'));
const DbmsLesson7  = lazy(() => import('./components/DbmsLesson7.jsx'));
const DbmsLesson8  = lazy(() => import('./components/DbmsLesson8.jsx'));
const DbmsLesson9  = lazy(() => import('./components/DbmsLesson9.jsx'));
const DbmsLesson10 = lazy(() => import('./components/DbmsLesson10.jsx'));
const DbmsLesson11 = lazy(() => import('./components/DbmsLesson11.jsx'));
const DbmsLesson12 = lazy(() => import('./components/DbmsLesson12.jsx'));

// DSA Lessons
const DsaLesson   = lazy(() => import('./components/DsaLesson.jsx'));
const DsaLesson1  = lazy(() => import('./components/DsaLesson1.jsx'));
const DsaLesson2  = lazy(() => import('./components/DsaLesson2.jsx'));
const DsaLesson3  = lazy(() => import('./components/DsaLesson3.jsx'));
const DsaLesson4  = lazy(() => import('./components/DsaLesson4.jsx'));
const DsaLesson5  = lazy(() => import('./components/DsaLesson5.jsx'));
const DsaLesson6  = lazy(() => import('./components/DsaLesson6.jsx'));
const DsaLesson7  = lazy(() => import('./components/DsaLesson7.jsx'));
const DsaLesson8  = lazy(() => import('./components/DsaLesson8.jsx'));
const DsaLesson9  = lazy(() => import('./components/DsaLesson9.jsx'));
const DsaLesson10 = lazy(() => import('./components/DsaLesson10.jsx'));
const DsaLesson11 = lazy(() => import('./components/DsaLesson11.jsx'));
const DsaLesson12 = lazy(() => import('./components/DsaLesson12.jsx'));

// Express.js Lessons
const ExpressLesson   = lazy(() => import('./components/ExpressLesson.jsx'));
const ExpressLesson1  = lazy(() => import('./components/ExpressLesson1.jsx'));
const ExpressLesson2  = lazy(() => import('./components/ExpressLesson2.jsx'));
const ExpressLesson3  = lazy(() => import('./components/ExpressLesson3.jsx'));
const ExpressLesson4  = lazy(() => import('./components/ExpressLesson4.jsx'));
const ExpressLesson5  = lazy(() => import('./components/ExpressLesson5.jsx'));
const ExpressLesson6  = lazy(() => import('./components/ExpressLesson6.jsx'));
const ExpressLesson7  = lazy(() => import('./components/ExpressLesson7.jsx'));
const ExpressLesson8  = lazy(() => import('./components/ExpressLesson8.jsx'));
const ExpressLesson9  = lazy(() => import('./components/ExpressLesson9.jsx'));
const ExpressLesson10 = lazy(() => import('./components/ExpressLesson10.jsx'));

// MongoDB Lessons
const MongoLesson  = lazy(() => import('./components/MongoLesson.jsx'));
const MongoLesson1 = lazy(() => import('./components/MongoLesson1.jsx'));
const MongoLesson2 = lazy(() => import('./components/MongoLesson2.jsx'));
const MongoLesson3 = lazy(() => import('./components/MongoLesson3.jsx'));
const MongoLesson4 = lazy(() => import('./components/MongoLesson4.jsx'));
const MongoLesson5 = lazy(() => import('./components/MongoLesson5.jsx'));
const MongoLesson6 = lazy(() => import('./components/MongoLesson6.jsx'));
const MongoLesson7 = lazy(() => import('./components/MongoLesson7.jsx'));
const MongoLesson8 = lazy(() => import('./components/MongoLesson8.jsx'));

// Node.js Lessons
const NodeLesson   = lazy(() => import('./components/NodeLesson.jsx'));
const NodeLesson1  = lazy(() => import('./components/NodeLesson1.jsx'));
const NodeLesson2  = lazy(() => import('./components/NodeLesson2.jsx'));
const NodeLesson3  = lazy(() => import('./components/NodeLesson3.jsx'));
const NodeLesson4  = lazy(() => import('./components/NodeLesson4.jsx'));
const NodeLesson5  = lazy(() => import('./components/NodeLesson5.jsx'));
const NodeLesson6  = lazy(() => import('./components/NodeLesson6.jsx'));
const NodeLesson7  = lazy(() => import('./components/NodeLesson7.jsx'));
const NodeLesson8  = lazy(() => import('./components/NodeLesson8.jsx'));
const NodeLesson9  = lazy(() => import('./components/NodeLesson9.jsx'));
const NodeLesson10 = lazy(() => import('./components/NodeLesson10.jsx'));
const NodeLesson11 = lazy(() => import('./components/NodeLesson11.jsx'));
const NodeLesson12 = lazy(() => import('./components/NodeLesson12.jsx'));

// OOP Lessons
const OOPLesson   = lazy(() => import('./components/OOPLesson.jsx'));
const OOPLesson1  = lazy(() => import('./components/OOPLesson1.jsx'));
const OOPLesson2  = lazy(() => import('./components/OOPLesson2.jsx'));
const OOPLesson3  = lazy(() => import('./components/OOPLesson3.jsx'));
const OOPLesson4  = lazy(() => import('./components/OOPLesson4.jsx'));
const OOPLesson5  = lazy(() => import('./components/OOPLesson5.jsx'));
const OOPLesson6  = lazy(() => import('./components/OOPLesson6.jsx'));
const OOPLesson7  = lazy(() => import('./components/OOPLesson7.jsx'));
const OOPLesson8  = lazy(() => import('./components/OOPLesson8.jsx'));
const OOPLesson9  = lazy(() => import('./components/OOPLesson9.jsx'));
const OOPLesson10 = lazy(() => import('./components/OOPLesson10.jsx'));
const OOPLesson11 = lazy(() => import('./components/OOPLesson11.jsx'));
const OOPLesson12 = lazy(() => import('./components/OOPLesson12.jsx'));
const OOPLesson13 = lazy(() => import('./components/OOPLesson13.jsx'));
const OOPLesson14 = lazy(() => import('./components/OOPLesson14.jsx'));

// React.js Lessons
const ReactLesson   = lazy(() => import('./components/ReactLesson.jsx'));
const ReactLesson1  = lazy(() => import('./components/ReactLesson1.jsx'));
const ReactLesson2  = lazy(() => import('./components/ReactLesson2.jsx'));
const ReactLesson3  = lazy(() => import('./components/ReactLesson3.jsx'));
const ReactLesson4  = lazy(() => import('./components/ReactLesson4.jsx'));
const ReactLesson5  = lazy(() => import('./components/ReactLesson5.jsx'));
const ReactLesson6  = lazy(() => import('./components/ReactLesson6.jsx'));
const ReactLesson7  = lazy(() => import('./components/ReactLesson7.jsx'));
const ReactLesson8  = lazy(() => import('./components/ReactLesson8.jsx'));
const ReactLesson9  = lazy(() => import('./components/ReactLesson9.jsx'));
const ReactLesson10 = lazy(() => import('./components/ReactLesson10.jsx'));
const ReactLesson11 = lazy(() => import('./components/ReactLesson11.jsx'));
const ReactLesson12 = lazy(() => import('./components/ReactLesson12.jsx'));
const ReactLesson13 = lazy(() => import('./components/ReactLesson13.jsx'));

// ─── Loading fallback shown while a lazy chunk is being fetched ───────────────
const PageLoader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '1rem',
    color: 'var(--text-secondary)',
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid rgba(255, 77, 109, 0.2)',
      borderTopColor: 'var(--primary-red)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <p style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>Loading lesson...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ─── App root ─────────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Head />
        <DynamicProgressSidebar />
        <ScrollToTop />

        {/* All route components are lazy-loaded — the Suspense boundary shows
            PageLoader while each chunk is being downloaded on first visit.    */}
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/CLesson" element={<CLesson />} />
            <Route path="/CssLesson" element={<CssLesson />} />
            <Route path="/JsLesson" element={<JsLesson />} />
            <Route path="/Compiler" element={<Compiler />} />

            {/* HTML Lessons */}
            <Route path="/HtmlLesson"   element={<HtmlLesson />} />
            <Route path="/HtmlLesson1"  element={<HtmlLesson1 />} />
            <Route path="/HtmlLesson2"  element={<HtmlLesson2 />} />
            <Route path="/HtmlLesson3"  element={<HtmlLesson3 />} />
            <Route path="/HtmlLesson4"  element={<HtmlLesson4 />} />
            <Route path="/HtmlLesson5"  element={<HtmlLesson5 />} />
            <Route path="/HtmlLesson6"  element={<HtmlLesson6 />} />
            <Route path="/HtmlLesson7"  element={<HtmlLesson7 />} />
            <Route path="/HtmlLesson8"  element={<HtmlLesson8 />} />
            <Route path="/HtmlLesson9"  element={<HtmlLesson9 />} />
            <Route path="/HtmlLesson10" element={<HtmlLesson10 />} />

            {/* CSS Lessons */}
            <Route path="/CssLesson1"  element={<CssLesson1 />} />
            <Route path="/CssLesson2"  element={<CssLesson2 />} />
            <Route path="/CssLesson3"  element={<CssLesson3 />} />
            <Route path="/CssLesson4"  element={<CssLesson4 />} />
            <Route path="/CssLesson5"  element={<CssLesson5 />} />
            <Route path="/CssLesson6"  element={<CssLesson6 />} />
            <Route path="/CssLesson7"  element={<CssLesson7 />} />
            <Route path="/CssLesson8"  element={<CssLesson8 />} />
            <Route path="/CssLesson9"  element={<CssLesson9 />} />
            <Route path="/CssLesson10" element={<CssLesson10 />} />
            <Route path="/CssLesson11" element={<CssLesson11 />} />
            <Route path="/CssLesson12" element={<CssLesson12 />} />
            <Route path="/CssLesson13" element={<CssLesson13 />} />
            <Route path="/CssLesson14" element={<CssLesson14 />} />

            {/* JS Lessons 1–29 */}
            <Route path="/JsLesson1"  element={<JsLesson1 />} />
            <Route path="/JsLesson2"  element={<JsLesson2 />} />
            <Route path="/JsLesson3"  element={<JsLesson3 />} />
            <Route path="/JsLesson4"  element={<JsLesson4 />} />
            <Route path="/JsLesson5"  element={<JsLesson5 />} />
            <Route path="/JsLesson6"  element={<JsLesson6 />} />
            <Route path="/JsLesson7"  element={<JsLesson7 />} />
            <Route path="/JsLesson8"  element={<JsLesson8 />} />
            <Route path="/JsLesson9"  element={<JsLesson9 />} />
            <Route path="/JsLesson10" element={<JsLesson10 />} />
            <Route path="/JsLesson11" element={<JsLesson11 />} />
            <Route path="/JsLesson12" element={<JsLesson12 />} />
            <Route path="/JsLesson13" element={<JsLesson13 />} />
            <Route path="/JsLesson14" element={<JsLesson14 />} />
            <Route path="/JsLesson15" element={<JsLesson15 />} />
            <Route path="/JsLesson16" element={<JsLesson16 />} />
            <Route path="/JsLesson17" element={<JsLesson17 />} />
            <Route path="/JsLesson18" element={<JsLesson18 />} />
            <Route path="/JsLesson19" element={<JsLesson19 />} />
            <Route path="/JsLesson20" element={<JsLesson20 />} />
            <Route path="/JsLesson21" element={<JsLesson21 />} />
            <Route path="/JsLesson22" element={<JsLesson22 />} />
            <Route path="/JsLesson23" element={<JsLesson23 />} />
            <Route path="/JsLesson24" element={<JsLesson24 />} />
            <Route path="/JsLesson25" element={<JsLesson25 />} />
            <Route path="/JsLesson26" element={<JsLesson26 />} />
            <Route path="/JsLesson27" element={<JsLesson27 />} />
            <Route path="/JsLesson28" element={<JsLesson28 />} />
            <Route path="/JsLesson29" element={<JsLesson29 />} />

            {/* C Lessons 1–17 */}
            <Route path="/CLesson1"  element={<CLesson1 />} />
            <Route path="/CLesson2"  element={<CLesson2 />} />
            <Route path="/CLesson3"  element={<CLesson3 />} />
            <Route path="/CLesson4"  element={<CLesson4 />} />
            <Route path="/CLesson5"  element={<CLesson5 />} />
            <Route path="/CLesson6"  element={<CLesson6 />} />
            <Route path="/CLesson7"  element={<CLesson7 />} />
            <Route path="/CLesson8"  element={<CLesson8 />} />
            <Route path="/CLesson9"  element={<CLesson9 />} />
            <Route path="/CLesson10" element={<CLesson10 />} />
            <Route path="/CLesson11" element={<CLesson11 />} />
            <Route path="/CLesson12" element={<CLesson12 />} />
            <Route path="/CLesson13" element={<CLesson13 />} />
            <Route path="/CLesson14" element={<CLesson14 />} />
            <Route path="/CLesson15" element={<CLesson15 />} />
            <Route path="/CLesson16" element={<CLesson16 />} />
            <Route path="/CLesson17" element={<CLesson17 />} />

            {/* DBMS Lessons 1–12 */}
            <Route path="/DbmsLesson"   element={<DbmsLesson />} />
            <Route path="/DbmsLesson1"  element={<DbmsLesson1 />} />
            <Route path="/DbmsLesson2"  element={<DbmsLesson2 />} />
            <Route path="/DbmsLesson3"  element={<DbmsLesson3 />} />
            <Route path="/DbmsLesson4"  element={<DbmsLesson4 />} />
            <Route path="/DbmsLesson5"  element={<DbmsLesson5 />} />
            <Route path="/DbmsLesson6"  element={<DbmsLesson6 />} />
            <Route path="/DbmsLesson7"  element={<DbmsLesson7 />} />
            <Route path="/DbmsLesson8"  element={<DbmsLesson8 />} />
            <Route path="/DbmsLesson9"  element={<DbmsLesson9 />} />
            <Route path="/DbmsLesson10" element={<DbmsLesson10 />} />
            <Route path="/DbmsLesson11" element={<DbmsLesson11 />} />
            <Route path="/DbmsLesson12" element={<DbmsLesson12 />} />

            {/* DSA Lessons 1–12 */}
            <Route path="/DsaLesson"   element={<DsaLesson />} />
            <Route path="/DsaLesson1"  element={<DsaLesson1 />} />
            <Route path="/DsaLesson2"  element={<DsaLesson2 />} />
            <Route path="/DsaLesson3"  element={<DsaLesson3 />} />
            <Route path="/DsaLesson4"  element={<DsaLesson4 />} />
            <Route path="/DsaLesson5"  element={<DsaLesson5 />} />
            <Route path="/DsaLesson6"  element={<DsaLesson6 />} />
            <Route path="/DsaLesson7"  element={<DsaLesson7 />} />
            <Route path="/DsaLesson8"  element={<DsaLesson8 />} />
            <Route path="/DsaLesson9"  element={<DsaLesson9 />} />
            <Route path="/DsaLesson10" element={<DsaLesson10 />} />
            <Route path="/DsaLesson11" element={<DsaLesson11 />} />
            <Route path="/DsaLesson12" element={<DsaLesson12 />} />

            {/* Express.js Lessons 1–10 */}
            <Route path="/ExpressLesson"   element={<ExpressLesson />} />
            <Route path="/ExpressLesson1"  element={<ExpressLesson1 />} />
            <Route path="/ExpressLesson2"  element={<ExpressLesson2 />} />
            <Route path="/ExpressLesson3"  element={<ExpressLesson3 />} />
            <Route path="/ExpressLesson4"  element={<ExpressLesson4 />} />
            <Route path="/ExpressLesson5"  element={<ExpressLesson5 />} />
            <Route path="/ExpressLesson6"  element={<ExpressLesson6 />} />
            <Route path="/ExpressLesson7"  element={<ExpressLesson7 />} />
            <Route path="/ExpressLesson8"  element={<ExpressLesson8 />} />
            <Route path="/ExpressLesson9"  element={<ExpressLesson9 />} />
            <Route path="/ExpressLesson10" element={<ExpressLesson10 />} />

            {/* MongoDB Lessons 1–8 */}
            <Route path="/MongoLesson"  element={<MongoLesson />} />
            <Route path="/MongoLesson1" element={<MongoLesson1 />} />
            <Route path="/MongoLesson2" element={<MongoLesson2 />} />
            <Route path="/MongoLesson3" element={<MongoLesson3 />} />
            <Route path="/MongoLesson4" element={<MongoLesson4 />} />
            <Route path="/MongoLesson5" element={<MongoLesson5 />} />
            <Route path="/MongoLesson6" element={<MongoLesson6 />} />
            <Route path="/MongoLesson7" element={<MongoLesson7 />} />
            <Route path="/MongoLesson8" element={<MongoLesson8 />} />

            {/* Node.js Lessons 1–12 */}
            <Route path="/NodeLesson"   element={<NodeLesson />} />
            <Route path="/NodeLesson1"  element={<NodeLesson1 />} />
            <Route path="/NodeLesson2"  element={<NodeLesson2 />} />
            <Route path="/NodeLesson3"  element={<NodeLesson3 />} />
            <Route path="/NodeLesson4"  element={<NodeLesson4 />} />
            <Route path="/NodeLesson5"  element={<NodeLesson5 />} />
            <Route path="/NodeLesson6"  element={<NodeLesson6 />} />
            <Route path="/NodeLesson7"  element={<NodeLesson7 />} />
            <Route path="/NodeLesson8"  element={<NodeLesson8 />} />
            <Route path="/NodeLesson9"  element={<NodeLesson9 />} />
            <Route path="/NodeLesson10" element={<NodeLesson10 />} />
            <Route path="/NodeLesson11" element={<NodeLesson11 />} />
            <Route path="/NodeLesson12" element={<NodeLesson12 />} />

            {/* OOP Lessons 1–14 */}
            <Route path="/OOPLesson"   element={<OOPLesson />} />
            <Route path="/OOPLesson1"  element={<OOPLesson1 />} />
            <Route path="/OOPLesson2"  element={<OOPLesson2 />} />
            <Route path="/OOPLesson3"  element={<OOPLesson3 />} />
            <Route path="/OOPLesson4"  element={<OOPLesson4 />} />
            <Route path="/OOPLesson5"  element={<OOPLesson5 />} />
            <Route path="/OOPLesson6"  element={<OOPLesson6 />} />
            <Route path="/OOPLesson7"  element={<OOPLesson7 />} />
            <Route path="/OOPLesson8"  element={<OOPLesson8 />} />
            <Route path="/OOPLesson9"  element={<OOPLesson9 />} />
            <Route path="/OOPLesson10" element={<OOPLesson10 />} />
            <Route path="/OOPLesson11" element={<OOPLesson11 />} />
            <Route path="/OOPLesson12" element={<OOPLesson12 />} />
            <Route path="/OOPLesson13" element={<OOPLesson13 />} />
            <Route path="/OOPLesson14" element={<OOPLesson14 />} />

            {/* React.js Lessons 1–13 */}
            <Route path="/ReactLesson"   element={<ReactLesson />} />
            <Route path="/ReactLesson1"  element={<ReactLesson1 />} />
            <Route path="/ReactLesson2"  element={<ReactLesson2 />} />
            <Route path="/ReactLesson3"  element={<ReactLesson3 />} />
            <Route path="/ReactLesson4"  element={<ReactLesson4 />} />
            <Route path="/ReactLesson5"  element={<ReactLesson5 />} />
            <Route path="/ReactLesson6"  element={<ReactLesson6 />} />
            <Route path="/ReactLesson7"  element={<ReactLesson7 />} />
            <Route path="/ReactLesson8"  element={<ReactLesson8 />} />
            <Route path="/ReactLesson9"  element={<ReactLesson9 />} />
            <Route path="/ReactLesson10" element={<ReactLesson10 />} />
            <Route path="/ReactLesson11" element={<ReactLesson11 />} />
            <Route path="/ReactLesson12" element={<ReactLesson12 />} />
            <Route path="/ReactLesson13" element={<ReactLesson13 />} />
          </Routes>
        </Suspense>

        <Target />
        <Foot />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
