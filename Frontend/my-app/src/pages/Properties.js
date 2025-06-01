"use client"

import { useState, useEffect } from "react"
import PropertyCard from "../components/PropertyCard"
import SearchFilter from "../components/SearchFilter"
import api from "../services/api"

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({})
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchProperties()
  }, [currentPage, filters])

  const fetchProperties = async () => {
    try {
      setLoading(true)

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 12,
      })

      // Add filters to query params
      Object.keys(filters).forEach((key) => {
        if (filters[key] && filters[key] !== "") {
          queryParams.append(key, filters[key])
        }
      })

      const response = await api.get(`/properties?${queryParams}`)

      if (response.data.properties) {
        setProperties(response.data.properties)
        setTotalPages(response.data.totalPages || 1)
        setTotal(response.data.total || 0)
      } else {
        setProperties([])
        setTotalPages(1)
        setTotal(0)
      }
    } catch (error) {
      console.error("Error fetching properties:", error)
      setProperties([])
      setTotalPages(1)
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="properties-page">
      <div className="container">
        <div className="page-header">
          <h1>Properties</h1>
          <p>Find your perfect property from our extensive listings</p>
          {total > 0 && (
            <p className="results-count">
              Showing {properties.length} of {total} properties
            </p>
          )}
        </div>

        <div className="properties-layout">
          <aside className="filters-sidebar">
            <SearchFilter onFilter={handleFilter} />
          </aside>

          <main className="properties-main">
            {loading ? (
              <div className="loading">Loading properties...</div>
            ) : properties.length > 0 ? (
              <>
                <div className="properties-grid">
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-btn"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-properties">
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏠</div>
                <h3>No properties found</h3>
                <p>Try adjusting your search filters or check back later for new listings</p>
                <button onClick={() => handleFilter({})} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Properties
