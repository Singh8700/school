"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

// 🔹 Styled Components
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
  background: #fff;
  padding: 25px;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 90vh;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  border: none;
  background: red;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #0056b3;
  }
`;

export default function EditStudentPage({ student, closePopup }) {
  const [formData, setFormData] = useState({ ...student });

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      class: formData.class || formData.classId?.name || student?.class || "",
      section: formData.section || formData.sectionId?.name || student?.section || "",
      rollNumber: formData.rollNumber || student?.rollNumber || "",
    };

    try {
      const res = await fetch(`/api/student?id=${student._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (res.ok) {
        alert("✅ Student details updated successfully!");
        closePopup();
      } else {
        const errorData = await res.json();
        alert(`❌ Failed to update student: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error occurred during update.");
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={closePopup}>✖</CloseButton>
        <Title>✏️ Edit Student</Title>
        <form onSubmit={handleUpdate}>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <Input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
          <Input type="date" name="dob" value={formData.dob?.split("T")[0]} onChange={handleChange} required />
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required />
          <Input type="text" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} required />
          <Select name="guardianRelation" value={formData.guardianRelation} onChange={handleChange}>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Other">Other</option>
          </Select>
          <Input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />

          <Select
            name="class"
            value={formData.class || formData.classId?.name || student?.class || ""}
            onChange={handleChange}
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </Select>

          <Select
            name="section"
            value={formData.section || formData.sectionId?.name || student?.section || ""}
            onChange={handleChange}
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </Select>

          <Button type="submit">Update Student</Button>
        </form>
      </Modal>
    </Overlay>
  );
}
