"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import PropertyCard from "../components/PropertyCard"
import PropertyForm from "../components/PropertyForm"
import api from "../services/api"

const Dashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [userProperties, setUserProperties] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    totalFavorites: 0,
  })

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [propertiesRes, inquiriesRes] = await Promise.all([
        api.get("/properties/user/my-properties"),
        api.get("/inquiries"),
      ])

      const properties = propertiesRes.data || []
      const inquiriesData = inquiriesRes.data || []

      setUserProperties(properties)
      setInquiries(inquiriesData)

      // Calculate stats
      const totalViews = properties.reduce((sum, prop) => sum + (prop.views || 0), 0)
      setStats({
        totalProperties: properties.length,
        totalViews,
        totalInquiries: inquiriesData.length,
        totalFavorites: user.favorites?.length || 0,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setUserProperties([])
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }

  const handlePropertyAdded = () => {
    setShowPropertyForm(false)
    fetchDashboardData()
  }

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await api.delete(`/properties/${propertyId}`)
        fetchDashboardData()
      } catch (error) {
        console.error("Error deleting property:", error)
        alert("Error deleting property")
      }
    }
  }

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-form">
            <h2>Access Denied</h2>
            <p style={{ textAlign: "center", marginBottom: "2rem", color: "#6b7280" }}>
              Please login to access your dashboard.
            </p>
            <a href="/login" className="btn btn-primary btn-full">
              Go to Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <h1>Welcome back, {user.name}! 👋</h1>
          <p>Manage your properties and track your real estate journey.</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`tab ${activeTab === "properties" ? "active" : ""}`}
            onClick={() => setActiveTab("properties")}
          >
            🏠 My Properties ({stats.totalProperties})
          </button>
          <button
            className={`tab ${activeTab === "inquiries" ? "active" : ""}`}
            onClick={() => setActiveTab("inquiries")}
          >
            💬 Inquiries ({stats.totalInquiries})
          </button>
          <button className={`tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            👤 Profile
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === "overview" && (
            <div className="overview">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Account Type</h3>
                  <p className="stat-number">{user.role}</p>
                </div>
                <div className="stat-card">
                  <h3>Properties Listed</h3>
                  <p className="stat-number">{stats.totalProperties}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Views</h3>
                  <p className="stat-number">{stats.totalViews}</p>
                </div>
                <div className="stat-card">
                  <h3>Inquiries Received</h3>
                  <p className="stat-number">{stats.totalInquiries}</p>
                </div>
                <div className="stat-card">
                  <h3>Favorites</h3>
                  <p className="stat-number">{stats.totalFavorites}</p>
                </div>
                <div className="stat-card">
                  <h3>Member Since</h3>
                  <p className="stat-text">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <button className="btn btn-primary" onClick={() => setActiveTab("properties")}>
                    🏠 Manage Properties
                  </button>
                  <button className="btn btn-outline" onClick={() => setShowPropertyForm(true)}>
                    ➕ Add New Property
                  </button>
                  <a href="/properties" className="btn btn-outline">
                    🔍 Browse All Properties
                  </a>
                  <a href="/favorites" className="btn btn-outline">
                    ❤️ View Favorites
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "properties" && (
            <div className="properties-section">
              <div className="section-header">
                <h2>My Properties</h2>
                <button className="btn btn-primary" onClick={() => setShowPropertyForm(true)}>
                  ➕ Add New Property
                </button>
              </div>

              {loading ? (
                <div className="loading">Loading properties...</div>
              ) : userProperties.length > 0 ? (
                <div className="properties-grid">
                  {userProperties.map((property) => (
                    <div key={property._id} className="property-management-card">
                      <PropertyCard property={property} />
                      <div className="property-actions">
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => handleDeleteProperty(property._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏠</div>
                  <h3>No Properties Listed Yet</h3>
                  <p>Start building your property portfolio by adding your first listing.</p>
                  <button className="btn btn-primary btn-large" onClick={() => setShowPropertyForm(true)}>
                    List Your First Property
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="inquiries-section">
              <h2>Property Inquiries</h2>
              {loading ? (
                <div className="loading">Loading inquiries...</div>
              ) : inquiries.length > 0 ? (
                <div className="inquiries-list">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry._id} className="inquiry-card">
                      <div className="inquiry-header">
                        <h4>{inquiry.property?.title || "Property"}</h4>
                        <span className={`inquiry-status ${inquiry.status}`}>{inquiry.status}</span>
                      </div>
                      <div className="inquiry-content">
                        <p>
                          <strong>From:</strong> {inquiry.contactInfo.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {inquiry.contactInfo.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {inquiry.contactInfo.phone}
                        </p>
                        <p>
                          <strong>Message:</strong> {inquiry.message}
                        </p>
                        <p>
                          <strong>Date:</strong> {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💬</div>
                  <h3>No Inquiries Yet</h3>
                  <p>When people are interested in your properties, their inquiries will appear here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="profile-card">
                <h2>Profile Information</h2>
                <div className="profile-grid">
                  <div>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        style={{ background: "#f9fafb", cursor: "not-allowed" }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        style={{ background: "#f9fafb", cursor: "not-allowed" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={user.phone || "Not provided"}
                        readOnly
                        style={{ background: "#f9fafb", cursor: "not-allowed" }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Account Type</label>
                      <input
                        type="text"
                        value={user.role}
                        readOnly
                        style={{
                          background: "#f9fafb",
                          cursor: "not-allowed",
                          textTransform: "capitalize",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showPropertyForm && (
          <PropertyForm onSuccess={handlePropertyAdded} onCancel={() => setShowPropertyForm(false)} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
