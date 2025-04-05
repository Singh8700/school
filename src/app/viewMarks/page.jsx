"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  color: black;
`;

const CloseButton = styled.button`
  float: right;
  background: red;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
`;

const EditInput = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
`;

export default function ViewMarksPopup({ studentId, closePopup }) {
  const [marks, setMarks] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (studentId) fetchMarks();
  }, [studentId]);

  const fetchMarks = async () => {
    try {
      const res = await fetch(`/api/education?studentId=${studentId}`);
      const data = await res.json();
      // console.log("mraks",data.data.maths)
      if (data) {
        setMarks(data.data);
        setFormData({
          maths: data.data.maths,
          hindi: data.data.hindi,
          science: data.data.science,
          english: data.data.english,
          socialScience: data.data.socialScience,
          physicalEducation: data.data.physicalEducation,
        });
      } else {
        setMarks(null);
      }
    } catch (err) {
      console.error("Error fetching marks:", err);
      setMarks(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value),
    }));
  };

  const calculateGrade = () => {
    const total =
      formData.maths +
      formData.hindi +
      formData.science +
      formData.english +
      formData.socialScience +
      formData.physicalEducation;
    const percent = total / 6;
    if (percent >= 90) return "A+";
    else if (percent >= 75) return "A";
    else if (percent >= 60) return "B";
    else if (percent >= 40) return "C";
    else return "F";
  };

  const handleUpdate = async () => {
    try {
      const grade = calculateGrade();
      const res = await fetch("/api/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, ...formData, grade }),
      });

      if (res.ok) {
        alert("Marks updated!");
        setEditMode(false);
        fetchMarks();
      } else {
        alert("Error updating marks.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating marks.");
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={closePopup}>X</CloseButton>
        <h3>🎓 Student Marks</h3>

        {marks ? (
          <>
            {!editMode ? (
              <>
                <p>📘 Maths: {marks.maths}</p>
                <p>📗 Hindi: {marks.hindi}</p>
                <p>📙 Science: {marks.science}</p>
                <p>📕 English: {marks.english}</p>
                <p>📒 Social Science: {marks.socialScience}</p>
                <p>📓 Physical Education: {marks.physicalEducation}</p>
                <p>🏅 Grade: <strong>{marks.grade}</strong></p>

                <SaveButton onClick={() => setEditMode(true)}>✏️ Edit Marks</SaveButton>
              </>
            ) : (
              <>
                <EditInput
                  name="maths"
                  placeholder="Maths"
                  value={formData.maths || ""}
                  onChange={handleInputChange}
                />
                <EditInput
                  name="hindi"
                  placeholder="Hindi"
                  value={formData.hindi || ""}
                  onChange={handleInputChange}
                />
                <EditInput
                  name="science"
                  placeholder="Science"
                  value={formData.science || ""}
                  onChange={handleInputChange}
                />
                <EditInput
                  name="english"
                  placeholder="English"
                  value={formData.english || ""}
                  onChange={handleInputChange}
                />
                <EditInput
                  name="socialScience"
                  placeholder="Social Science"
                  value={formData.socialScience || ""}
                  onChange={handleInputChange}
                />
                <EditInput
                  name="physicalEducation"
                  placeholder="Physical Education"
                  value={formData.physicalEducation || ""}
                  onChange={handleInputChange}
                />
                <SaveButton onClick={handleUpdate}>💾 Save</SaveButton>
              </>
            )}
          </>
        ) : (
          <p>⚠️ No marks found for this student.</p>
        )}
      </Modal>
    </Overlay>
  );
}
