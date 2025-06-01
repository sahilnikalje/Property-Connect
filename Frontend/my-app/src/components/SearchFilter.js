"use client"

import { useState } from "react"

const SearchFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    propertyType: "",
    listingType: "",
    minPrice: "",
    maxPrice: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(filters)
  }

  const handleReset = () => {
    setFilters({
      propertyType: "",
      listingType: "",
      minPrice: "",
      maxPrice: "",
      city: "",
      bedrooms: "",
      bathrooms: "",
    })
    onFilter({})
  }

  return (
    <div className="search-filter">
      <h3>Filter Properties</h3>
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="form-row">
          <div className="form-group">
            <label>Property Type</label>
            <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="form-group">
            <label>Listing Type</label>
            <select name="listingType" value={filters.listingType} onChange={handleChange}>
              <option value="">All</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Min Price</label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min Price"
            />
          </div>

          <div className="form-group">
            <label>Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max Price"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={filters.city} onChange={handleChange} placeholder="City" />
          </div>

          <div className="form-group">
            <label>Bedrooms</label>
            <select name="bedrooms" value={filters.bedrooms} onChange={handleChange}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Apply Filters
          </button>
          <button type="button" onClick={handleReset} className="btn btn-outline">
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchFilter
