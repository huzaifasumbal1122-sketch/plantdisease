"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SYMPTOMS_LIST = [
  "yellow leaves", "brown spots", "white powder", "wilting", 
  "stunted growth", "curling leaves", "black spots", "holes in leaves"
];

export default function DiagnosisFlow() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setStep(2);
  };

  const toggleSymptom = (smp) => {
    setSelectedSymptoms(prev => 
      prev.includes(smp) ? prev.filter(s => s !== smp) : [...prev, smp]
    );
  };

  const fetchDiagnosis = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // For simplicity in UI, we fetch matches for the first selected symptom
      // A more complex query could be sent via POST or with multiple query params
      const res = await fetch(`/api/diseases?type=${type}&symptom=${encodeURIComponent(selectedSymptoms[0])}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setStep(3);
      } else {
        setError("Failed to fetch diagnosis.");
      }
    } catch (err) {
      setError("An error occurred during diagnosis.");
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setType(null);
    setSelectedSymptoms([]);
    setResults([]);
  };

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header" style={{ textAlign: "center" }}>
        <h1>Diagnosis Tool</h1>
        <p>Follow the steps to identify the problem and find a cure.</p>
      </div>

      <div className="auth-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {error && <div className="auth-error">{error}</div>}

        {step === 1 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Step 1: What are we looking at?</h2>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
              <button 
                onClick={() => handleTypeSelect("plant")}
                style={{
                  padding: "3rem",
                  fontSize: "1.5rem",
                  background: "var(--secondary)",
                  border: "2px solid var(--primary)",
                  borderRadius: "16px",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  flex: 1,
                  fontFamily: "inherit",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                🌿 Plant
              </button>
              <button 
                onClick={() => handleTypeSelect("tree")}
                style={{
                  padding: "3rem",
                  fontSize: "1.5rem",
                  background: "var(--secondary)",
                  border: "2px solid var(--primary)",
                  borderRadius: "16px",
                  cursor: "pointer",
                  color: "var(--foreground)",
                  flex: 1,
                  fontFamily: "inherit",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                🌳 Tree
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Step 2: Select Symptoms</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "2rem" }}>
              {SYMPTOMS_LIST.map((smp) => (
                <button
                  key={smp}
                  onClick={() => toggleSymptom(smp)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "50px",
                    border: `2px solid ${selectedSymptoms.includes(smp) ? "var(--primary)" : "var(--border)"}`,
                    background: selectedSymptoms.includes(smp) ? "var(--primary)" : "var(--background)",
                    color: selectedSymptoms.includes(smp) ? "white" : "var(--foreground)",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontFamily: "inherit",
                    transition: "all 0.2s"
                  }}
                >
                  {smp}
                </button>
              ))}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setStep(1)} className="auth-btn" style={{ background: "transparent", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                Back
              </button>
              <button onClick={fetchDiagnosis} className="auth-btn" disabled={loading}>
                {loading ? "Analyzing..." : "Get Diagnosis"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: "1.5rem", textAlign: "center", color: "var(--primary)" }}>Diagnosis Results</h2>
            
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <p>No matching diseases found in our database for the selected symptoms.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {results.map((disease) => (
                  <div key={disease._id} style={{ background: "var(--background)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border)", textAlign: "left" }}>
                    <h3 style={{ fontSize: "1.5rem", color: "var(--primary)", marginBottom: "0.5rem" }}>{disease.name}</h3>
                    <p style={{ marginBottom: "1rem", fontStyle: "italic", color: "#64748b" }}>{disease.description}</p>
                    
                    <div style={{ marginBottom: "1rem" }}>
                      <strong>Symptoms: </strong> {disease.symptoms.join(", ")}
                    </div>
                    
                    <div style={{ padding: "1rem", background: "rgba(245, 158, 11, 0.1)", borderLeft: "4px solid var(--accent)", marginBottom: "1rem", borderRadius: "4px" }}>
                      <h4 style={{ marginBottom: "0.5rem", color: "var(--accent)" }}>🏡 Homemade Remedies</h4>
                      <p>{disease.homemadeRemedies || "None specified."}</p>
                    </div>

                    <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", borderLeft: "4px solid var(--primary)", marginBottom: "1rem", borderRadius: "4px" }}>
                      <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>🔬 Scientific Remedies</h4>
                      <p>{disease.scientificRemedies || "None specified."}</p>
                    </div>

                    {disease.pictures && disease.pictures.length > 0 && (
                      <div style={{ marginTop: "1rem" }}>
                        <strong>Reference Images:</strong>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                          {disease.pictures.map((pic, idx) => (
                            <img key={idx} src={pic} alt={`${disease.name} ref ${idx}`} style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button onClick={resetFlow} className="auth-btn">
                Start New Diagnosis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
