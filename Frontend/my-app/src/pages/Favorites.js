"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import PropertyCard from "../components/PropertyCard"
import api from "../services/api"

const Favorites = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchFavorites()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      const response = await api.get("/auth/profile")
      const favoriteIds = response.data.favorites || []

      if (favoriteIds.length > 0) {
        // Fetch each favorite property
        const favoritePromises = favoriteIds.map(async (id) => {
          try {
            const propertyResponse = await api.get(`/properties/${id._id || id}`)
            return propertyResponse.data
          } catch (error) {
            console.error(`Error fetching property ${id}:`, error)
            return null
          }
        })

        const favoriteProperties = await Promise.all(favoritePromises)
        setFavorites(favoriteProperties.filter((property) => property !== null))
      } else {
        setFavorites([])
      }
    } catch (error) {
      console.error("Error fetching favorites:", error)
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="favorites-page">
        <div className="container">
          <div className="auth-required">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔒</div>
            <h1>Login Required</h1>
            <p>Please login to view your favorite properties</p>
            <a href="/login" className="btn btn-primary btn-large">
              Go to Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1>My Favorite Properties ❤️</h1>
          <p>Properties you've saved for later</p>
        </div>

        {loading ? (
          <div className="loading">Loading favorites...</div>
        ) : favorites.length > 0 ? (
          <div className="properties-grid">
            {favorites.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💔</div>
            <h3>No Favorite Properties Yet</h3>
            <p>Start browsing properties and click the heart icon to add them to your favorites!</p>
            <a href="/properties" className="btn btn-primary btn-large">
              Browse Properties
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
