"use client";

export default function Logo() {
  return (
    <div 
      className="logo" 
      style={{ cursor: "pointer" }} 
      onClick={() => window.location.href = '/'}
    >
      🌿 🌱 PlantCare
    </div>
  );
}