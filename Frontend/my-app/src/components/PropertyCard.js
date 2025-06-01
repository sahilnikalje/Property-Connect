"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

const PropertyCard = ({ property }) => {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleFavoriteToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      alert("Please login to add favorites")
      return
    }

    setLoading(true)
    try {
      if (isFavorite) {
        await api.delete(`/properties/${property._id}/favorite`)
        setIsFavorite(false)
      } else {
        await api.post(`/properties/${property._id}/favorite`)
        setIsFavorite(true)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
      alert("Error updating favorites")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="property-card">
      <div className="property-image">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0] || "/placeholder.svg?height=200&width=300"}
            alt={property.title}
            onError={(e) => {
              e.target.src = "/placeholder.svg?height=200&width=300"
            }}
          />
        ) : (
          <div className="no-image">
            <span>📷</span>
            <p>No Image</p>
          </div>
        )}
        <div className="property-badges">
          <span className={`property-type ${property.listingType}`}>
            {property.listingType === "sale" ? "For Sale" : "For Rent"}
          </span>
          {user && (
            <button
              onClick={handleFavoriteToggle}
              disabled={loading}
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {loading ? "⏳" : isFavorite ? "❤️" : "🤍"}
            </button>
          )}
        </div>
      </div>

      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          📍 {property.location.city}, {property.location.state}
        </p>
        <p className="property-price">{formatPrice(property.price)}</p>

        <div className="property-details">
          <span>🛏️ {property.bedrooms} bed</span>
          <span>🚿 {property.bathrooms} bath</span>
          <span>📐 {property.area} sqft</span>
        </div>

        <div className="property-meta">
          <span className="property-views">👁️ {property.views || 0} views</span>
          <span className="property-type-badge">{property.propertyType}</span>
        </div>

        <Link to={`/properties/${property._id}`} className="btn btn-primary btn-full">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default PropertyCard
