"use client";

import { useState } from "react";
import styled from "styled-components";

// 🔹 Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-x:hidden;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 25px;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 90vh;  /* 🔥 Now Scrollable */
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
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
  background: #4caf50;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #45a049;
  }
`;

export default function RegisterPage({ closePopup }) {
  const [formData, setFormData] = useState({
    name: "",
    motherName: "",
    dob: "",
    gender: "Male",
    address: "",
    phone: "",
    email: "",
    guardianName: "",
    guardianPhone: "",
    guardianRelation: "Father",
    rollNumber: "",
    class: "Nursery",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("✅ Student Registered Successfully!");
      closePopup();
    } else {
      alert("❌ Error in Registration!");
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={closePopup}>✖</CloseButton>
        <Title>🎓 Student Registration</Title>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <Input type="text" name="motherName" placeholder="Mother's Name" onChange={handleChange} required />
          <Input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
          <Select name="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          <Input type="text" name="address" placeholder="Address" onChange={handleChange} required />
          <Input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <Input type="text" name="guardianName" placeholder="Guardian Name" onChange={handleChange} required />
          <Input type="text" name="guardianPhone" placeholder="Guardian Phone" onChange={handleChange} required />
          <Select name="guardianRelation" onChange={handleChange}>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Other">Other</option>
          </Select>
          <Input type="text" name="rollNumber" placeholder="Roll Number" onChange={handleChange} required />
          <Select name="class" onChange={handleChange}>
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
          <Button type="submit">Register Student</Button>
        </form>
      </Modal>
    </Overlay>
  );
}
