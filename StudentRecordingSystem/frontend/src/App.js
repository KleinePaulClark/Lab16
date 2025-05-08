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
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}
            >
                <source src="your-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Main Content */}
            <div 
                style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "50px auto",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
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
