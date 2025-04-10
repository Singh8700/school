"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`;

const Modal = styled.div`
  background: white;
  color: #333;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
`;

const Button = styled.button`
  background: #764ba2;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    background: #5c3a88;
  }
`;

const CloseBtn = styled.button`
  background: #ccc;
  padding: 10px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #bbb;
  }
`;

export default function MarksPopup({ studentId, closePopup }) {
  const [form, setForm] = useState({
    maths: 0,
    hindi: 0,
    science: 0,
    english: 0,
    socialScience: 0,
    physicalEducation: 0,
  });

  const [grade, setGrade] = useState("N/A");
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  // Lock scrolling on both body and html when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (!studentId) {
      console.warn("❌ studentId not received");
    } else {
      fetchExistingMarks();
    }
  }, [studentId]);

  const fetchExistingMarks = async () => {
    try {
      const res = await fetch(`/api/education?studentId=${studentId}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          maths: data.maths || 0,
          hindi: data.hindi || 0,
          science: data.science || 0,
          english: data.english || 0,
          socialScience: data.socialScience || 0,
          physicalEducation: data.physicalEducation || 0,
        });
      }
    } catch (err) {
      console.log("No previous marks found");
    }
  };

  useEffect(() => {
    const total =
      parseFloat(form.maths || 0) +
      parseFloat(form.hindi || 0) +
      parseFloat(form.science || 0) +
      parseFloat(form.english || 0) +
      parseFloat(form.socialScience || 0) +
      parseFloat(form.physicalEducation || 0);

    const percent = (total / 6).toFixed(2);
    setPercentage(percent);

    let computedGrade = "F";
    if (percent >= 90) computedGrade = "A+";
    else if (percent >= 80) computedGrade = "A";
    else if (percent >= 70) computedGrade = "B";
    else if (percent >= 60) computedGrade = "C";
    else if (percent >= 50) computedGrade = "D";

    setGrade(computedGrade);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Student ID is missing!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          ...form,
          grade,
        }),
      });

      const result = await res.json();
      alert(result.message || "Saved");
      closePopup();
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <h2>📋 {grade !== "N/A" ? "Edit Marks" : "Add Marks"}</h2>

        {["maths", "hindi", "science", "english", "socialScience", "physicalEducation"].map((subject) => (
          <div key={subject}>
            <Label>
              {subject.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </Label>
            <Input
              type="number"
              name={subject}
              value={form[subject]}
              onChange={handleChange}
              min="0"
              max="100"
            />
          </div>
        ))}

        <p>
          <strong>🎯 Percentage:</strong> {percentage}%
        </p>
        <p>
          <strong>🏅 Grade:</strong> {grade}
        </p>

        <div style={{ marginTop: "20px" }}>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <CloseBtn onClick={closePopup}>Cancel</CloseBtn>
        </div>
      </Modal>
    </Overlay>
  );
}
