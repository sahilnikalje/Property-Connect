"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

const PropertyDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    message: "",
    contactInfo: {
      name: "",
      email: "",
      phone: "",
    },
  })

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`)
      setProperty(response.data)
    } catch (error) {
      console.error("Error fetching property:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/inquiries", {
        propertyId: id,
        ...inquiryData,
      })
      alert("Inquiry sent successfully!")
      setShowInquiryForm(false)
      setInquiryData({
        message: "",
        contactInfo: { name: "", email: "", phone: "" },
      })
    } catch (error) {
      alert("Error sending inquiry")
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) return <div className="loading">Loading property details...</div>
  if (!property) return <div className="error">Property not found</div>

  return (
    <div className="property-details">
      <div className="container">
        <div className="property-header">
          <h1>{property.title}</h1>
          <p className="property-location">
            {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
          </p>
          <p className="property-price">{formatPrice(property.price)}</p>
        </div>

        <div className="property-content">
          <div className="property-main">
            <div className="property-images">
              {property.images && property.images.length > 0 ? (
                property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg?height=300&width=400"}
                    alt={`Property ${index + 1}`}
                  />
                ))
              ) : (
                <div className="no-image">No images available</div>
              )}
            </div>

            <div className="property-info">
              <h2>Property Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Type:</strong> {property.propertyType}
                </div>
                <div className="detail-item">
                  <strong>Listing:</strong> {property.listingType}
                </div>
                <div className="detail-item">
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </div>
                <div className="detail-item">
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </div>
                <div className="detail-item">
                  <strong>Area:</strong> {property.area} sqft
                </div>
                <div className="detail-item">
                  <strong>Views:</strong> {property.views}
                </div>
              </div>

              <div className="property-description">
                <h3>Description</h3>
                <p>{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="property-amenities">
                  <h3>Amenities</h3>
                  <ul>
                    {property.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="property-sidebar">
            <div className="contact-card">
              <h3>Contact Information</h3>
              <p>
                <strong>Owner:</strong> {property.owner.name}
              </p>
              <p>
                <strong>Email:</strong> {property.owner.email}
              </p>
              <p>
                <strong>Phone:</strong> {property.owner.phone}
              </p>

              {user && user.id !== property.owner._id && (
                <button className="btn btn-primary btn-full" onClick={() => setShowInquiryForm(true)}>
                  Send Inquiry
                </button>
              )}
            </div>
          </div>
        </div>

        {showInquiryForm && (
          <div className="inquiry-form-overlay">
            <div className="inquiry-form">
              <h3>Send Inquiry</h3>
              <form onSubmit={handleInquirySubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={inquiryData.contactInfo.name}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, name: e.target.value },
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Email</label>
                  <input
                    type="email"
                    value={inquiryData.contactInfo.email}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, email: e.target.value },
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Phone</label>
                  <input
                    type="tel"
                    value={inquiryData.contactInfo.phone}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, phone: e.target.value },
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={inquiryData.message}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                    rows="4"
                    placeholder="I'm interested in this property..."
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setShowInquiryForm(false)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertyDetails
