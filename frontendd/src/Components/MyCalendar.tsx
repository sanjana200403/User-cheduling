// MyCalendar.tsx
import React from "react";
import Calendar from "./Calendar";
import Navbar from "./Navbar";

const MyCalendar: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Navbar /><Calendar />
    </div>
  );
};

export default MyCalendar;
