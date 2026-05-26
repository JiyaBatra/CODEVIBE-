import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useSearchParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

const defaultBackgroundUrl = "src/assets/completion certificate.png";

const PinkBadge = () => (
  <div className="badge-wrapper">
    <div className="badge-circle"></div>
  </div>
);

export default function Certificate({ backgroundUrl = defaultBackgroundUrl }) {

  const [searchParams] = useSearchParams();
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState(searchParams.get("course") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [info,setInfo]=useState(null);
  const [progress,setProgress]=useState(null);

  const certRef=useRef(null);
  const navigate=useNavigate();

  useEffect(() => {
    if (email && courseName) {
      fetchData();
    }
  }, []);

  const poweredBy="CODEVIBE!!! & BEWITHMEit";

  const fetchData = async () => {
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!courseName) {
      setError("Please select a course");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const certRes = await axios.post(`${API_BASE_URL}/api/certificate`, { email, courseName });
      const cert = certRes.data;
      const displayName = studentName?.trim() || cert.studentName || "Student";
      setInfo({ ...cert, studentName: displayName });

      const progRes = await axios.get(`${API_BASE_URL}/api/progress/${email}`);
      setProgress(progRes.data);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Something went wrong");
    }

  setLoading(false);
};


  const downloadPDF=async()=>{

    const canvas=await html2canvas(certRef.current,{scale:2,useCORS:true});

    const imgData=canvas.toDataURL("image/png");

    const pdf=new jsPDF({
      orientation:"landscape",
      unit:"px",
      format:[canvas.width,canvas.height]
    });

    pdf.addImage(imgData,"PNG",0,0,canvas.width,canvas.height);

    pdf.save(
      `${info?.studentName || "certificate"}-${courseName}.pdf`
    );
  };


const avgScore = info?.score || 0;
const completedLessons = info?.completedLessons || 0;


  const goToReport=()=>{
    navigate(
      `/report/${encodeURIComponent(email)}?course=${encodeURIComponent(courseName)}`
    );
  };


  return (

  <div className="certificate-page">

    <div className="certificate-wrapper">

      {/* INPUT SECTION */}

      <div className="input-grid">

        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e)=>setStudentName(e.target.value)}
        />

        <input
          placeholder="Student Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <select
          value={courseName}
          onChange={(e)=>setCourseName(e.target.value)}
        >

          <option value="">Select Course</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>C</option>
          <option>JavaScript</option>
          <option>OOP</option>
          <option>DSA</option>
          <option>DBMS</option>
          <option>MongoDB</option>
          <option>Node.js</option>
          <option>Express.js</option>
          <option>React.js</option>

        </select>

        <button
          onClick={fetchData}
          disabled={loading || !courseName}
          className="generate-btn"
        >
          {loading ? "Generating..." : "Generate Certificate"}
        </button>

      </div>


      {error && <div className="error-box">{error}</div>}


      {/* CERTIFICATE */}

      <div ref={certRef} className="certificate-card">

        <div
          className="certificate-bg"
          style={{backgroundImage:`url(${backgroundUrl})`}}
        ></div>

        <div className="certificate-content">

          <PinkBadge />

          <h1 className="certificate-title">
            Certificate of <span>Completion</span>
          </h1>

          <p className="certificate-sub">This certifies that</p>

          <h2 className="student-name">
            {info?.studentName || studentName || "Student Name"}
          </h2>

          <p className="completed-text">has successfully completed</p>

          <h3 className="course-name">
            {courseName || "Course Name"}
          </h3>


          {/* STATS */}

          <div className="stats-grid">

            <div className="stat-box">
              <p>Completed Lessons</p>
              <h2>{completedLessons}</h2>
            </div>

            <div className="stat-box">
              <p>Average Score</p>
              <h2>{avgScore}%</h2>
            </div>

            <div className="stat-box">
              <p>Course</p>
              <h3>{courseName || "-"}</h3>
            </div>

          </div>


          {/* FOOTER */}

          <div className="certificate-footer">

            <div className="feedback-box">
              {info?.feedbackMessage ||
                "Feedback will appear after generating certificate"}
            </div>

            <div className="powered">
              Powered by
              <strong>{poweredBy}</strong>

              <button
                onClick={goToReport}
                disabled={!email || !courseName}
              >
                View Report
              </button>
            </div>

            <div className="signature">
              <div className="sign-line"></div>
              <p>Jiya (Signature)</p>
            </div>

          </div>

        </div>
      </div>


      {/* ACTIONS */}

      <div className="action-buttons">

        <button onClick={()=>window.print()}>
          Print
        </button>

        <button onClick={downloadPDF}>
          Download PDF
        </button>

      </div>

    </div>

  </div>

  );
}