"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import StudentRegister from "../register/page";
import AddEducation from "../education/page";
import ViewMarksPopup from "../viewMarks/page";
import EditStudentPage from "../edit/page";

// Styled Components (same)
const Container = styled.div`
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
  width: 80%;
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
  padding: 1rem 0;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StudentList = styled(motion.ul)`
  list-style: none;
  padding: 1rem 0;
  width: 100%;

  li {
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      margin: 0px;
      background: transparent;
      border: none;
      cursor: pointer;
      font-weight: bold;
      transition: 0.3s ease-in-out;

      &:hover {
        border: 1px solid #ff4081;
        background: transparent;
      }

      @media (max-width: 768px) {
        padding: 10px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: capitalize;

    .name {
      font-weight: bold;
      display: block;
      margin-left: 10px;
    }
  }
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
  const [showViewMarks, setShowViewMarks] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
      fetchSections(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    document.body.style.overflow =
      showRegister || showEducation || showViewMarks || showEditPopup
        ? "hidden"
        : "auto";
  }, [showRegister, showEducation, showViewMarks, showEditPopup]);

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "auto";
      document.body.style.overflowX = "auto";
    };
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/class");
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const fetchSections = async (classId) => {
    try {
      const res = await fetch(`/api/section?classId=${classId}`);
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const res = await fetch(`/api/student?classId=${classId}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`/api/student?id=${studentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Student deleted!");
        fetchStudents(selectedClass);
        fetchClasses();
        fetchSections(selectedClass);
      } else {
        alert("Failed to delete student.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowEditPopup(true);
  };

  const handleClassClick = (classId) => {
    setSelectedClass(classId);
  };

  const handleStudentRegisterClose = () => {
    setShowRegister(false);
    if (selectedClass) {
      fetchStudents(selectedClass);
      fetchSections(selectedClass);
    }
    fetchClasses();
  };

  const groupStudentsBySection = () => {
    const grouped = {};

    sections.forEach((section) => {
      grouped[section._id] = {
        name: section.name,
        students: [],
      };
    });

    students.forEach((student) => {
      const sectionId = student.sectionId;
      if (grouped[sectionId]) {
        grouped[sectionId].students.push(student);
      } else {
        if (!grouped["unassigned"]) {
          grouped["unassigned"] = { name: "Unassigned", students: [] };
        }
        grouped["unassigned"].students.push(student);
      }
    });

    return grouped;
  };

  const groupedStudents = groupStudentsBySection();

  return (
    <Container>
      <Card>
        <h2>📌 Admin Dashboard</h2>
        <Button onClick={() => setShowRegister(true)}>+ Register Student</Button>

        <h3>🎓 Available Classes</h3>
        <List>
          {classes.map((cls) => (
            <ListItem key={cls._id} onClick={() => handleClassClick(cls._id)}>
              <h3>{cls.name}</h3>
              <h5>Total Sections in this class {cls.sections.length}</h5>
              <h5>Total Student in this class {cls.students.length}</h5>
            </ListItem>
          ))}
        </List>

        {selectedClass && (
          <>
            {(() => {
              const selected = classes.find((cls) => cls._id === selectedClass);
              if (!selected) return <p>🔍 No class selected.</p>;

              const studentMap = {};
              selected.students.forEach((std) => {
                studentMap[std._id] = std;
              });

              const validSections = selected.sections?.filter(
                (section) =>
                  Array.isArray(section.students) &&
                  section.students.some((id) => studentMap[id])
              );

              if (!validSections || validSections.length === 0) {
                return <p>🚫 No students admitted in this class.</p>;
              }

              return (
                <>
                  <h3>📜 Students in {selected.name}</h3>
                  {validSections.map((section) => {
                    const students = section.students
                      .map((id) => studentMap[id])
                      .filter(Boolean);
                    return (
                      <div key={section._id}>
                        <h4>📘 Section {section.name}</h4>
                        {students.length > 0 ? (
                          <StudentList>
                            {students.map((student) => (
                              <div key={student._id}>
                                <ListItem>
                                  <strong>{student.name}</strong> (Roll: {student.rollNumber})
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    <Button onClick={() => handleEditStudent(student)}>✏️ Edit</Button>
                                    <Button onClick={() => handleDeleteStudent(student._id)}>❌ Delete</Button>
                                    <Button onClick={() => {
                                      setSelectedStudent(student);
                                      setShowEducation(true);
                                    }}>📚 Add Marks</Button>
                                    <Button onClick={() => {
                                      setSelectedStudent(student);
                                      setShowViewMarks(true);
                                    }}>📖 View Marks</Button>
                                  </div>
                                </ListItem>
                              </div>
                            ))}
                          </StudentList>
                        ) : (
                          <p>No students in this section.</p>
                        )}
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </>
        )}
      </Card>

      {showRegister && (
        <StudentRegister closePopup={handleStudentRegisterClose} />
      )}

      {showEducation && selectedStudent && (
        <AddEducation
          studentId={selectedStudent._id}
          closePopup={() => {
            setShowEducation(false);
            fetchStudents(selectedClass);
            fetchClasses();
            fetchSections(selectedClass);
          }}
        />
      )}

      {showViewMarks && selectedStudent && (
        <ViewMarksPopup
          studentId={selectedStudent._id}
          closePopup={() => {
            setShowViewMarks(false);
            fetchStudents(selectedClass);
            fetchClasses();
            fetchSections(selectedClass);
          }}
        />
      )}

      {showEditPopup && selectedStudent && (
        <EditStudentPage
          student={selectedStudent}
          closePopup={() => {
            setShowEditPopup(false);
            fetchStudents(selectedClass);
            fetchClasses();
            fetchSections(selectedClass);
          }}
        />
      )}
    </Container>
  );
}
