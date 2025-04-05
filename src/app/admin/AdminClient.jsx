"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import StudentRegister from "../register/page";
import AddEducation from "../education/page";
import ViewMarksPopup from "../viewMarks/page";

// 🔹 Styled Components (No changes made)
const Container = styled.div`
max-width:100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 20px;
  color: white;
  overflow-x: hidden;
`;

const Card = styled.div`
  width: 90%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 12px 18px;
  margin: 10px;
  background: #ff4081;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease-in-out;

  &:hover {
    background: #ff1c68;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export default function AdminPage() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showViewMarks, setShowViewMarks] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (showRegister || showEducation || showViewMarks) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showRegister, showEducation, showViewMarks]);

  const fetchClasses = async () => {
    try {
      const response = await fetch("/api/class");
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const response = await fetch(`/api/student?classId=${classId}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleClassClick = (classId) => {
    setSelectedClass(classId);
  };

  const handleStudentRegisterClose = () => {
    setShowRegister(false);
    if (selectedClass) {
      fetchStudents(selectedClass); // reload students of current class
    }
    fetchClasses(); // refresh class list
  };

  return (
    <Container>
      <Card>
        <h2>📌 Admin Dashboard</h2>
        <Button onClick={() => setShowRegister(true)}>+ Register Student</Button>

        <h3>🎓 Available Classes</h3>
        <List>
          {classes.map((cls) => (
            <ListItem key={cls._id} onClick={() => handleClassClick(cls._id)}>
              {cls.name} - Section {cls.section}
            </ListItem>
          ))}
        </List>

        {selectedClass && (
          <>
            <h3>📜 Students in {classes.find((cls) => cls._id === selectedClass)?.name}</h3>
            {students.length > 0 ? (
              <List>
                {students.map((student) => (
                  <ListItem key={student._id}>
                    {student.name} (Roll: {student.rollNumber})
                    <Button onClick={() => {
                      setSelectedStudent(student);
                      setShowEducation(true);
                    }}>📚 Add Marks</Button>
                    <Button onClick={() => {
                      setSelectedStudent(student);
                      setShowViewMarks(true);
                    }}>📖 View Marks</Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p>No students admitted in this class.</p>
            )}
          </>
        )}
      </Card>

      {/* Popups */}
      {showRegister && (
        <StudentRegister closePopup={handleStudentRegisterClose} />
      )}

      {showEducation && selectedStudent && (
        <AddEducation
          studentId={selectedStudent._id}
          closePopup={() => setShowEducation(false)}
        />
      )}

      {showViewMarks && selectedStudent && (
        <ViewMarksPopup
          studentId={selectedStudent._id}
          closePopup={() => setShowViewMarks(false)}
        />
      )}
    </Container>
  );
}
