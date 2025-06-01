const Property = require("../models/Property")
const User = require("../models/User")

// Get all properties
const getProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, propertyType, listingType, minPrice, maxPrice, city, bedrooms, bathrooms } = req.query

    // Build filter object
    const filter = { status: "active" }

    if (propertyType) filter.propertyType = propertyType
    if (listingType) filter.listingType = listingType
    if (city) filter["location.city"] = new RegExp(city, "i")
    if (bedrooms) filter.bedrooms = { $gte: Number.parseInt(bedrooms) }
    if (bathrooms) filter.bathrooms = { $gte: Number.parseInt(bathrooms) }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseInt(maxPrice)
    }

    const properties = await Property.find(filter)
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Property.countDocuments(filter)

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email phone")

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Increment views
    property.views += 1
    await property.save()

    res.json(property)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Create property
const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user._id,
    }

    const property = new Property(propertyData)
    await property.save()

    res.status(201).json({
      message: "Property created successfully",
      property,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Check if user owns the property
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this property" })
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.json({
      message: "Property updated successfully",
      property: updatedProperty,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Check if user owns the property
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this property" })
    }

    await Property.findByIdAndDelete(req.params.id)

    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Add to favorites
const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const propertyId = req.params.id

    if (user.favorites.includes(propertyId)) {
      return res.status(400).json({ message: "Property already in favorites" })
    }

    user.favorites.push(propertyId)
    await user.save()

    res.json({ message: "Property added to favorites" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const propertyId = req.params.id

    user.favorites = user.favorites.filter((fav) => fav.toString() !== propertyId)
    await user.save()

    res.json({ message: "Property removed from favorites" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user's properties
const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort({ createdAt: -1 })

    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  addToFavorites,
  removeFromFavorites,
  getUserProperties,
}
