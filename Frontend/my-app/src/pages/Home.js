"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Dream Property</h1>
            <p>
              Discover the perfect home, apartment, or investment property with PropertyConnect. Connect with verified
              sellers and agents in your area.
            </p>
            {user ? (
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  Go to Dashboard
                </Link>
                <Link to="/properties" className="btn btn-outline btn-large">
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose PropertyConnect?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>
                Find properties with our advanced search and filter options. Search by location, price range, property
                type, and more.
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">✅</div>
              <h3>Verified Listings</h3>
              <p>
                All properties are verified to ensure quality and authenticity. Connect with real sellers and trusted
                agents.
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">💬</div>
              <h3>Direct Communication</h3>
              <p>Connect directly with property owners and agents. Send inquiries and get responses quickly.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>
                Access PropertyConnect from any device. Our responsive design works perfectly on mobile and desktop.
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏠</div>
              <h3>Multiple Property Types</h3>
              <p>
                Find houses, apartments, condos, townhouses, and land. Whether buying or renting, we have options for
                you.
              </p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Secure</h3>
              <p>
                Lightning-fast search results and secure user authentication. Your data and privacy are our top
                priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "4rem 0",
        }}
      >
        <div className="container">
          <div className="stats-grid">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>1000+</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Properties Listed</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>500+</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Happy Customers</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>50+</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Cities Covered</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>24/7</div>
              <div style={{ fontSize: "1.1rem", opacity: 0.9 }}>Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "white",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2 style={{ marginBottom: "1rem", fontSize: "2.5rem", color: "#1f2937" }}>
            Ready to Find Your Perfect Property?
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#6b7280",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Join thousands of satisfied customers who found their dream properties through PropertyConnect.
          </p>
          {!user && (
            <Link to="/register" className="btn btn-primary btn-large">
              Start Your Property Search Today
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
