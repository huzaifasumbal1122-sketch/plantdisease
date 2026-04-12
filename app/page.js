import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="fade-in">
      <section style={{ textAlign: "center", padding: "6rem 2rem 4rem" }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "800", marginBottom: "1.5rem", color: "var(--primary)" }}>
          Protect Your Plants
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "600px", margin: "0 auto 3rem" }}>
          Identify plant and tree diseases quickly. Get homemade remedies and scientific treatments instantly powered by our database.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link href="/diagnosis" className="auth-btn" style={{ textDecoration: "none", display: "inline-block", padding: "1rem 2rem", fontSize: "1.1rem" }}>
            Start Diagnosis
          </Link>
          <Link href="/login" className="auth-btn" style={{ background: "transparent", color: "var(--primary)", border: "2px solid var(--primary)", textDecoration: "none", display: "inline-block", padding: "1rem 2rem", fontSize: "1.1rem" }}>
            Admin Login
          </Link>
        </div>
      </section>

      <section className="dashboard-container">
        <div className="card-grid">
          <div className="data-card" style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--primary)" }}>🌿 1. Select Type</h3>
            <p>Tell us whether you're looking at a plant or a tree to narrow down the possibilities.</p>
          </div>
          <div className="data-card" style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--primary)" }}>🔍 2. Pick Symptoms</h3>
            <p>Select the symptoms you observe, from yellowing leaves to brown spots and stunted growth.</p>
          </div>
          <div className="data-card" style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--primary)" }}>💡 3. Get Remedies</h3>
            <p>Receive the exact disease name along with effective homemade and scientific remedies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
