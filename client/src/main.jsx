import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
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

// HTML Lessons
import HtmlLesson from './components/HtmlLesson.jsx';
import HtmlLesson1 from './components/HtmlLesson1.jsx';
import HtmlLesson2 from './components/HtmlLesson2.jsx';
import HtmlLesson3 from './components/HtmlLesson3.jsx';
import HtmlLesson4 from './components/HtmlLesson4.jsx';
import HtmlLesson5 from './components/HtmlLesson5.jsx';
import HtmlLesson6 from './components/HtmlLesson6.jsx';
import HtmlLesson7 from './components/HtmlLesson7.jsx';
import HtmlLesson8 from './components/HtmlLesson8.jsx';
import HtmlLesson9 from './components/HtmlLesson9.jsx';
import HtmlLesson10 from './components/HtmlLesson10.jsx';

// CSS Lessons
import CssLesson from './components/CssLesson.jsx';
import CssLesson1 from './components/CssLesson1.jsx';
import CssLesson2 from './components/CssLesson2.jsx';
import CssLesson3 from './components/CssLesson3.jsx';
import CssLesson4 from './components/CssLesson4.jsx';
import CssLesson5 from './components/CssLesson5.jsx';
import CssLesson6 from './components/CssLesson6.jsx';
import CssLesson7 from './components/CssLesson7.jsx';
import CssLesson8 from './components/CssLesson8.jsx';
import CssLesson9 from './components/CssLesson9.jsx';
import CssLesson10 from './components/CssLesson10.jsx';
import CssLesson11 from './components/CssLesson11.jsx';
import CssLesson12 from './components/CssLesson12.jsx';
import CssLesson13 from './components/CssLesson13.jsx';
import CssLesson14 from './components/CssLesson14.jsx';

// JS Lessons
import JsLesson from './components/JsLesson.jsx';
import JsLesson1 from './components/JsLesson1.jsx';
import JsLesson2 from './components/JsLesson2.jsx';
import JsLesson3 from './components/JsLesson3.jsx';
import JsLesson4 from './components/JsLesson4.jsx';
import JsLesson5 from './components/JsLesson5.jsx';
import JsLesson6 from './components/JsLesson6.jsx';
import JsLesson7 from './components/JsLesson7.jsx';
import JsLesson8 from './components/JsLesson8.jsx';
import JsLesson9 from './components/JsLesson9.jsx';
import JsLesson10 from './components/JsLesson10.jsx';
import JsLesson11 from './components/JsLesson11.jsx';
import JsLesson12 from './components/JsLesson12.jsx';
import JsLesson13 from './components/JsLesson13.jsx';
import JsLesson14 from './components/JsLesson14.jsx';
import JsLesson15 from './components/JsLesson15.jsx';
import JsLesson16 from './components/JsLesson16.jsx';
import JsLesson17 from './components/JsLesson17.jsx';
import JsLesson18 from './components/JsLesson18.jsx';
import JsLesson19 from './components/JsLesson19.jsx';
import JsLesson20 from './components/JsLesson20.jsx';
import JsLesson21 from './components/JsLesson21.jsx';
import JsLesson22 from './components/JsLesson22.jsx';
import JsLesson23 from './components/JsLesson23.jsx';
import JsLesson24 from './components/JsLesson24.jsx';
import JsLesson25 from './components/JsLesson25.jsx';
import JsLesson26 from './components/JsLesson26.jsx';
import JsLesson27 from './components/JsLesson27.jsx';
import JsLesson28 from './components/JsLesson28.jsx';
import JsLesson29 from './components/JsLesson29.jsx';


// C Lessons
import CLesson from './components/CLesson.jsx';
import CLesson1 from './components/CLesson1.jsx';
import CLesson2 from './components/CLesson2.jsx';
import CLesson3 from './components/CLesson3.jsx';
import CLesson4 from './components/CLesson4.jsx';
import CLesson5 from './components/CLesson5.jsx';
import CLesson6 from './components/CLesson6.jsx';
import CLesson7 from './components/CLesson7.jsx';
import CLesson8 from './components/Clesson8.jsx';
import CLesson9 from './components/CLesson9.jsx';
import CLesson10 from './components/CLesson10.jsx';
import CLesson11 from './components/CLesson11.jsx';
import CLesson12 from './components/CLesson12.jsx';
import CLesson13 from './components/CLesson13.jsx';
import CLesson14 from './components/CLesson14.jsx';
import CLesson15 from './components/CLesson15.jsx';
import CLesson16 from './components/CLesson16.jsx';
import CLesson17 from './components/CLesson17.jsx';

// DBMS Lessons
import DbmsLesson from './components/DbmsLesson.jsx';
import DbmsLesson1 from './components/DbmsLesson1.jsx';
import DbmsLesson2 from './components/DbmsLesson2.jsx';
import DbmsLesson3 from './components/DbmsLesson3.jsx';
import DbmsLesson4 from './components/DbmsLesson4.jsx';
import DbmsLesson5 from './components/DbmsLesson5.jsx';
import DbmsLesson6 from './components/DbmsLesson6.jsx';
import DbmsLesson7 from './components/DbmsLesson7.jsx';
import DbmsLesson8 from './components/DbmsLesson8.jsx';
import DbmsLesson9 from './components/DbmsLesson9.jsx';
import DbmsLesson10 from './components/DbmsLesson10.jsx';
import DbmsLesson11 from './components/DbmsLesson11.jsx';
import DbmsLesson12 from './components/DbmsLesson12.jsx';


// DSA Lessons
import DsaLesson from './components/DsaLesson.jsx';
import DsaLesson1 from './components/DsaLesson1.jsx';
import DsaLesson2 from './components/DsaLesson2.jsx';
import DsaLesson3 from './components/DsaLesson3.jsx';
import DsaLesson4 from './components/DsaLesson4.jsx';
import DsaLesson5 from './components/DsaLesson5.jsx';
import DsaLesson6 from './components/DsaLesson6.jsx';
import DsaLesson7 from './components/DsaLesson7.jsx';
import DsaLesson8 from './components/DsaLesson8.jsx';
import DsaLesson9 from './components/DsaLesson9.jsx';
import DsaLesson10 from './components/DsaLesson10.jsx';
import DsaLesson11 from './components/DsaLesson11.jsx';
import DsaLesson12 from './components/DsaLesson12.jsx';


// Express Lessons
import ExpressLesson from './components/ExpressLesson.jsx';
import ExpressLesson1 from './components/ExpressLesson1.jsx';
import ExpressLesson2 from './components/ExpressLesson2.jsx';
import ExpressLesson3 from './components/ExpressLesson3.jsx';
import ExpressLesson4 from './components/ExpressLesson4.jsx';
import ExpressLesson5 from './components/ExpressLesson5.jsx';
import ExpressLesson6 from './components/ExpressLesson6.jsx';
import ExpressLesson7 from './components/ExpressLesson7.jsx';
import ExpressLesson8 from './components/ExpressLesson8.jsx';
import ExpressLesson9 from './components/ExpressLesson9.jsx';
import ExpressLesson10 from './components/ExpressLesson10.jsx';

// MongoDB Lessons
import MongoLesson from './components/MongoLesson.jsx';
import MongoLesson1 from './components/MongoLesson1.jsx';
import MongoLesson2 from './components/MongoLesson2.jsx';
import MongoLesson3 from './components/MongoLesson3.jsx';
import MongoLesson4 from './components/MongoLesson4.jsx';
import MongoLesson5 from './components/MongoLesson5.jsx';
import MongoLesson6 from './components/MongoLesson6.jsx';
import MongoLesson7 from './components/MongoLesson7.jsx';
import MongoLesson8 from './components/MongoLesson8.jsx';

// Node.js Lessons
import NodeLesson from './components/NodeLesson.jsx';
import NodeLesson1 from './components/NodeLesson1.jsx';
import NodeLesson2 from './components/NodeLesson2.jsx';
import NodeLesson3 from './components/NodeLesson3.jsx';
import NodeLesson4 from './components/NodeLesson4.jsx';
import NodeLesson5 from './components/NodeLesson5.jsx';
import NodeLesson6 from './components/NodeLesson6.jsx';
import NodeLesson7 from './components/NodeLesson7.jsx';
import NodeLesson8 from './components/NodeLesson8.jsx';
import NodeLesson9 from './components/NodeLesson9.jsx';
import NodeLesson10 from './components/NodeLesson10.jsx';
import NodeLesson11 from './components/NodeLesson11.jsx';
import NodeLesson12 from './components/NodeLesson12.jsx';

// OOP Lessons
import OOPLesson from './components/OOPLesson.jsx';
import OOPLesson1 from './components/OOPLesson1.jsx';
import OOPLesson2 from './components/OOPLesson2.jsx';
import OOPLesson3 from './components/OOPLesson3.jsx';
import OOPLesson4 from './components/OOPLesson4.jsx';
import OOPLesson5 from './components/OOPLesson5.jsx';
import OOPLesson6 from './components/OOPLesson6.jsx';
import OOPLesson7 from './components/OOPLesson7.jsx';
import OOPLesson8 from './components/OOPLesson8.jsx';
import OOPLesson9 from './components/OOPLesson9.jsx';
import OOPLesson10 from './components/OOPLesson10.jsx';
import OOPLesson11 from './components/OOPLesson11.jsx';
import OOPLesson12 from './components/OOPLesson12.jsx';
import OOPLesson13 from './components/OOPLesson13.jsx';
import OOPLesson14 from './components/OOPLesson14.jsx';

// React Lessons
import ReactLesson from './components/ReactLesson.jsx';
import ReactLesson1 from './components/ReactLesson1.jsx';
import ReactLesson2 from './components/ReactLesson2.jsx';
import ReactLesson3 from './components/ReactLesson3.jsx';
import ReactLesson4 from './components/ReactLesson4.jsx';
import ReactLesson5 from './components/ReactLesson5.jsx';
import ReactLesson6 from './components/ReactLesson6.jsx';
import ReactLesson7 from './components/ReactLesson7.jsx';
import ReactLesson8 from './components/ReactLesson8.jsx';
import ReactLesson9 from './components/ReactLesson9.jsx';
import ReactLesson10 from './components/ReactLesson10.jsx';
import ReactLesson11 from './components/ReactLesson11.jsx';
import ReactLesson12 from './components/ReactLesson12.jsx';
import ReactLesson13 from './components/ReactLesson13.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Head />
        <DynamicProgressSidebar />

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
       <Route path="/report/:email" element={<ViewReport />} />
        <Route path="/CLesson" element={<CLesson />} />
        <Route path="/CssLesson" element={<CssLesson />} />
        <Route path="/JsLesson" element={<JsLesson />} />
        <Route path="/Compiler" element={<Compiler />} />

        {/* HTML Lessons */}
        <Route path="/HtmlLesson" element={<HtmlLesson />} />
        <Route path="/HtmlLesson1" element={<HtmlLesson1 />} />
        <Route path="/HtmlLesson2" element={<HtmlLesson2 />} />
        <Route path="/HtmlLesson3" element={<HtmlLesson3 />} />
        <Route path="/HtmlLesson4" element={<HtmlLesson4 />} />
        <Route path="/HtmlLesson5" element={<HtmlLesson5 />} />
        <Route path="/HtmlLesson6" element={<HtmlLesson6 />} />
        <Route path="/HtmlLesson7" element={<HtmlLesson7 />} />
        <Route path="/HtmlLesson8" element={<HtmlLesson8 />} />
        <Route path="/HtmlLesson9" element={<HtmlLesson9 />} />
        <Route path="/HtmlLesson10" element={<HtmlLesson10 />} />

        {/* CSS Lessons */}
        <Route path="/CssLesson1" element={<CssLesson1 />} />
        <Route path="/CssLesson2" element={<CssLesson2 />} />
        <Route path="/CssLesson3" element={<CssLesson3 />} />
        <Route path="/CssLesson4" element={<CssLesson4 />} />
        <Route path="/CssLesson5" element={<CssLesson5 />} />
        <Route path="/CssLesson6" element={<CssLesson6 />} />
        <Route path="/CssLesson7" element={<CssLesson7 />} />
        <Route path="/CssLesson8" element={<CssLesson8 />} />
        <Route path="/CssLesson9" element={<CssLesson9 />} />
        <Route path="/CssLesson10" element={<CssLesson10 />} />
        <Route path="/CssLesson11" element={<CssLesson11 />} />
        <Route path="/CssLesson12" element={<CssLesson12 />} />
        <Route path="/CssLesson13" element={<CssLesson13 />} />
        <Route path="/CssLesson14" element={<CssLesson14 />} />

        {/* JS Lessons 1–29 */}
        <Route path="/JsLesson1" element={<JsLesson1 />} />
        <Route path="/JsLesson2" element={<JsLesson2 />} />
        <Route path="/JsLesson3" element={<JsLesson3 />} />
        <Route path="/JsLesson4" element={<JsLesson4 />} />
        <Route path="/JsLesson5" element={<JsLesson5 />} />
        <Route path="/JsLesson6" element={<JsLesson6 />} />
        <Route path="/JsLesson7" element={<JsLesson7 />} />
        <Route path="/JsLesson8" element={<JsLesson8 />} />
        <Route path="/JsLesson9" element={<JsLesson9 />} />
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
        <Route path="/CLesson" element={<CLesson />} />
<Route path="/CLesson1" element={<CLesson1 />} />
<Route path="/CLesson2" element={<CLesson2 />} />
<Route path="/CLesson3" element={<CLesson3 />} />
<Route path="/CLesson4" element={<CLesson4 />} />
<Route path="/CLesson5" element={<CLesson5 />} />
<Route path="/CLesson6" element={<CLesson6 />} />
<Route path="/CLesson7" element={<CLesson7 />} />
<Route path="/CLesson8" element={<CLesson8 />} />
<Route path="/CLesson9" element={<CLesson9 />} />
<Route path="/CLesson10" element={<CLesson10 />} />
<Route path="/CLesson11" element={<CLesson11 />} />
<Route path="/CLesson12" element={<CLesson12 />} />
<Route path="/CLesson13" element={<CLesson13 />} />
<Route path="/CLesson14" element={<CLesson14 />} />
<Route path="/CLesson15" element={<CLesson15 />} />
<Route path="/CLesson16" element={<CLesson16 />} />
<Route path="/CLesson17" element={<CLesson17 />} />

{/* DBMS Lessons 1–12 */}
<Route path="/DbmsLesson" element={<DbmsLesson />} />
<Route path="/DbmsLesson1" element={<DbmsLesson1 />} />
<Route path="/DbmsLesson2" element={<DbmsLesson2 />} />
<Route path="/DbmsLesson3" element={<DbmsLesson3 />} />
<Route path="/DbmsLesson4" element={<DbmsLesson4 />} />
<Route path="/DbmsLesson5" element={<DbmsLesson5 />} />
<Route path="/DbmsLesson6" element={<DbmsLesson6 />} />
<Route path="/DbmsLesson7" element={<DbmsLesson7 />} />
<Route path="/DbmsLesson8" element={<DbmsLesson8 />} />
<Route path="/DbmsLesson9" element={<DbmsLesson9 />} />
<Route path="/DbmsLesson10" element={<DbmsLesson10 />} />
<Route path="/DbmsLesson11" element={<DbmsLesson11 />} />
<Route path="/DbmsLesson12" element={<DbmsLesson12 />} />


{/* DSA Lessons 1–12 */}
<Route path="/DsaLesson" element={<DsaLesson />} />
<Route path="/DsaLesson1" element={<DsaLesson1 />} />
<Route path="/DsaLesson2" element={<DsaLesson2 />} />
<Route path="/DsaLesson3" element={<DsaLesson3 />} />
<Route path="/DsaLesson4" element={<DsaLesson4 />} />
<Route path="/DsaLesson5" element={<DsaLesson5 />} />
<Route path="/DsaLesson6" element={<DsaLesson6 />} />
<Route path="/DsaLesson7" element={<DsaLesson7 />} />
<Route path="/DsaLesson8" element={<DsaLesson8 />} />
<Route path="/DsaLesson9" element={<DsaLesson9 />} />
<Route path="/DsaLesson10" element={<DsaLesson10 />} />
<Route path="/DsaLesson11" element={<DsaLesson11 />} />
<Route path="/DsaLesson12" element={<DsaLesson12 />} />


{/* Express Lessons 1–10 */}
<Route path="/ExpressLesson" element={<ExpressLesson />} />
<Route path="/ExpressLesson1" element={<ExpressLesson1 />} />
<Route path="/ExpressLesson2" element={<ExpressLesson2 />} />
<Route path="/ExpressLesson3" element={<ExpressLesson3 />} />
<Route path="/ExpressLesson4" element={<ExpressLesson4 />} />
<Route path="/ExpressLesson5" element={<ExpressLesson5 />} />
<Route path="/ExpressLesson6" element={<ExpressLesson6 />} />
<Route path="/ExpressLesson7" element={<ExpressLesson7 />} />
<Route path="/ExpressLesson8" element={<ExpressLesson8 />} />
<Route path="/ExpressLesson9" element={<ExpressLesson9 />} />
<Route path="/ExpressLesson10" element={<ExpressLesson10 />} />

{/* MongoDB Lessons 1–8 */}
<Route path="/MongoLesson" element={<MongoLesson />} />
<Route path="/MongoLesson1" element={<MongoLesson1 />} />
<Route path="/MongoLesson2" element={<MongoLesson2 />} />
<Route path="/MongoLesson3" element={<MongoLesson3 />} />
<Route path="/MongoLesson4" element={<MongoLesson4 />} />
<Route path="/MongoLesson5" element={<MongoLesson5 />} />
<Route path="/MongoLesson6" element={<MongoLesson6 />} />
<Route path="/MongoLesson7" element={<MongoLesson7 />} />
<Route path="/MongoLesson8" element={<MongoLesson8 />} />

{/* Route Lessons 1–12 */}
<Route path="/NodeLesson" element={<NodeLesson />} />
<Route path="/NodeLesson1" element={<NodeLesson1 />} />
<Route path="/NodeLesson2" element={<NodeLesson2 />} />
<Route path="/NodeLesson3" element={<NodeLesson3 />} />
<Route path="/NodeLesson4" element={<NodeLesson4 />} />
<Route path="/NodeLesson5" element={<NodeLesson5 />} />
<Route path="/NodeLesson6" element={<NodeLesson6 />} />
<Route path="/NodeLesson7" element={<NodeLesson7 />} />
<Route path="/NodeLesson8" element={<NodeLesson8 />} />
<Route path="/NodeLesson9" element={<NodeLesson9 />} />
<Route path="/NodeLesson10" element={<NodeLesson10 />} />
<Route path="/NodeLesson11" element={<NodeLesson11 />} />
<Route path="/NodeLesson12" element={<NodeLesson12 />} />

{/* OOPLesson Lessons 1–14 */}
<Route path="/OOPLesson" element={<OOPLesson />} />
<Route path="/OOPLesson1" element={<OOPLesson1 />} />
<Route path="/OOPLesson2" element={<OOPLesson2 />} />
<Route path="/OOPLesson3" element={<OOPLesson3 />} />
<Route path="/OOPLesson4" element={<OOPLesson4 />} />
<Route path="/OOPLesson5" element={<OOPLesson5 />} />
<Route path="/OOPLesson6" element={<OOPLesson6 />} />
<Route path="/OOPLesson7" element={<OOPLesson7 />} />
<Route path="/OOPLesson8" element={<OOPLesson8 />} />
<Route path="/OOPLesson9" element={<OOPLesson9 />} />
<Route path="/OOPLesson10" element={<OOPLesson10 />} />
<Route path="/OOPLesson11" element={<OOPLesson11 />} />
<Route path="/OOPLesson12" element={<OOPLesson12 />} />
<Route path="/OOPLesson13" element={<OOPLesson13 />} />
<Route path="/OOPLesson14" element={<OOPLesson14 />} />

{/* ReactLesson Lessons 1–13 */}
<Route path="/ReactLesson" element={<ReactLesson />} />
<Route path="/ReactLesson1" element={<ReactLesson1 />} />
<Route path="/ReactLesson2" element={<ReactLesson2 />} />
<Route path="/ReactLesson3" element={<ReactLesson3 />} />
<Route path="/ReactLesson4" element={<ReactLesson4 />} />
<Route path="/ReactLesson5" element={<ReactLesson5 />} />
<Route path="/ReactLesson6" element={<ReactLesson6 />} />
<Route path="/ReactLesson7" element={<ReactLesson7 />} />
<Route path="/ReactLesson8" element={<ReactLesson8 />} />
<Route path="/ReactLesson9" element={<ReactLesson9 />} />
<Route path="/ReactLesson10" element={<ReactLesson10 />} />
<Route path="/ReactLesson11" element={<ReactLesson11 />} />
<Route path="/ReactLesson12" element={<ReactLesson12 />} />
<Route path="/ReactLesson13" element={<ReactLesson13 />} />



      </Routes>


      <Target />
      <Foot />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
