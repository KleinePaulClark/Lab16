import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [math, setMath] = useState("");
    const [science, setScience] = useState("");
    const [english, setEnglish] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:3001/students");
            setStudents(res.data);
        } catch (err) {
            console.error("Failed to fetch students", err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/add", {
                name,
                math: parseInt(math),
                science: parseInt(science),
                english: parseInt(english),
            });

            alert("Student added successfully!");
            setName("");
            setMath("");
            setScience("");
            setEnglish("");
            fetchStudents();
        } catch (err) {
            alert("Failed to add student.");
            console.error(err.message);
        }
    };

    return (
        <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
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

            {/* Opaque Container */}
            <div
                style={{
                    backgroundColor: "rgba(244, 242, 220, 0.7)",  // Opaque background
                    borderRadius: "10px",
                    padding: "20px",
                    maxWidth: "800px",
                    margin: "50px auto",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                }}
            >
                <h2 className="mb-4 text-center">Student Management System</h2>

                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Math</Form.Label>
                        <Form.Control
                            type="number"
                            value={math}
                            onChange={(e) => setMath(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Science</Form.Label>
                        <Form.Control
                            type="number"
                            value={science}
                            onChange={(e) => setScience(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>English</Form.Label>
                        <Form.Control
                            type="number"
                            value={english}
                            onChange={(e) => setEnglish(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button className="mt-3 w-100" type="submit">
                        Add Student
                    </Button>
                </Form>

                {students.length > 0 && (
                    <div className="mt-5">
                        <h4>Student List</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Math</th>
                                    <th>Science</th>
                                    <th>English</th>
                                    <th>Average</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>{student.math}</td>
                                        <td>{student.science}</td>
                                        <td>{student.english}</td>
                                        <td>{student.average}</td>
                                        <td>{student.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;