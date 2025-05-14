import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const App = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1,
                }}
            >
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Centered Main Content with Opaque Padding */}
            <div 
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // More opaque background
                    padding: "30px",
                    borderRadius: "12px",
                    textAlign: "center",
                    maxWidth: "600px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)"
                }}
            >
                <h1>Student Recording System</h1>
                <StudentForm fetchStudents={fetchStudents} />
                <StudentList students={students} fetchStudents={fetchStudents} />
            </div>
        </div>
    );
};

export default App;
