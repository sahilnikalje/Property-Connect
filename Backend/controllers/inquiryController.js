const Inquiry = require("../models/Inquiry")
const Property = require("../models/Property")

// Create inquiry
const createInquiry = async (req, res) => {
  try {
    const { propertyId, message, contactInfo } = req.body

    // Check if property exists
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    const inquiry = new Inquiry({
      property: propertyId,
      inquirer: req.user._id,
      message,
      contactInfo,
    })

    await inquiry.save()

    res.status(201).json({
      message: "Inquiry sent successfully",
      inquiry,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get inquiries for property owner
const getInquiries = async (req, res) => {
  try {
    // Get properties owned by the user
    const userProperties = await Property.find({ owner: req.user._id })
    const propertyIds = userProperties.map((prop) => prop._id)

    const inquiries = await Inquiry.find({ property: { $in: propertyIds } })
      .populate("property", "title price location")
      .populate("inquirer", "name email")
      .sort({ createdAt: -1 })

    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user's sent inquiries
const getUserInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ inquirer: req.user._id })
      .populate("property", "title price location")
      .sort({ createdAt: -1 })

    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Update inquiry status
const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body
    const inquiry = await Inquiry.findById(req.params.id).populate("property")

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" })
    }

    // Check if user owns the property
    if (inquiry.property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" })
    }

    inquiry.status = status
    await inquiry.save()

    res.json({
      message: "Inquiry status updated",
      inquiry,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  createInquiry,
  getInquiries,
  getUserInquiries,
  updateInquiryStatus,
}
