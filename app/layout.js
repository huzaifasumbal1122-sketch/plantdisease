import AuthProvider from "@/app/components/AuthProvider";
import "@/app/globals.css";

export const metadata = {
  title: "Plant Disease Detector",
  description: "Identify plant diseases, get homemade & scientific remedies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="app-wrapper">
            <nav className="navbar">
              <div className="logo" style={{ cursor: "pointer" }} onClick={() => window.location.href='/'}>
                🌿 🌱 PlantCare
              </div>
              <div className="nav-links">
                {/* Temporary placeholder, actual links will depend on session */}
                <a href="/">Home</a>
                <a href="/diagnosis">Diagnose</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </div>
            </nav>
            <main className="main-content">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
