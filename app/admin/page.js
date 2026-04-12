"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminDashboard() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "plant",
    symptoms: "",
    homemadeRemedies: "",
    scientificRemedies: "",
  });
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (status === "loading") return <div className="dashboard-container">Loading...</div>;
  if (!session || session.user.role !== "admin") {
    // Only allow admin
    if (typeof window !== "undefined") {
      router.push("/");
    }
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Read files as base64
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises).then((base64Images) => {
      setPictures((prev) => [...prev, ...base64Images]);
    });
  };

  const removeImage = (index) => {
    setPictures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Symptoms are comma separated
      const symptomsArray = formData.symptoms
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload = {
        ...formData,
        symptoms: symptomsArray,
        pictures,
      };

      const res = await fetch("/api/diseases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("Disease entry created successfully!");
        setFormData({
          name: "",
          description: "",
          type: "plant",
          symptoms: "",
          homemadeRemedies: "",
          scientificRemedies: "",
        });
        setPictures([]);
      } else {
        setMessage("Failed to create entry.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Add new disease entries to the database.</p>
      </div>

      <div className="data-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {message && (
          <div className={message.includes("success") ? "auth-success" : "auth-error"}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Disease Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleInputChange}>
              <option value="plant">Plant</option>
              <option value="tree">Tree</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              required
              rows={4}
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", fontFamily: "inherit" }}
            />
          </div>

          <div className="form-group">
            <label>Symptoms (comma separated)</label>
            <input type="text" name="symptoms" value={formData.symptoms} onChange={handleInputChange} placeholder="e.g. yellow leaves, brown spots" />
          </div>

          <div className="form-group">
            <label>Homemade Remedies</label>
            <textarea 
              name="homemadeRemedies" 
              value={formData.homemadeRemedies} 
              onChange={handleInputChange} 
              rows={3}
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", fontFamily: "inherit" }}
            />
          </div>

          <div className="form-group">
            <label>Scientific Remedies</label>
            <textarea 
              name="scientificRemedies" 
              value={formData.scientificRemedies} 
              onChange={handleInputChange} 
              rows={3}
              style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", fontFamily: "inherit" }}
            />
          </div>

          <div className="form-group">
            <label>Upload Pictures</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            
            {pictures.length > 0 && (
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
                {pictures.map((pic, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={pic} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }} />
                    <button 
                      type="button" 
                      onClick={() => removeImage(i)}
                      style={{ position: "absolute", top: "-5px", right: "-5px", background: "red", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer" }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Disease Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
