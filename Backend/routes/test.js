const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/User")
const router = express.Router()

// Test database connection
router.get("/db", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    }

    // Get database stats
    const dbStats = await mongoose.connection.db.stats()

    // Get collections
    const collections = await mongoose.connection.db.listCollections().toArray()

    // Count users
    const userCount = await User.countDocuments()

    res.json({
      status: "success",
      database: {
        state: states[dbState],
        name: mongoose.connection.name,
        host: mongoose.connection.host,
        collections: collections.map((c) => c.name),
        stats: {
          collections: dbStats.collections,
          documents: dbStats.objects,
          dataSize: `${(dbStats.dataSize / 1024).toFixed(2)} KB`,
        },
        users: userCount,
      },
    })
  } catch (error) {
    console.error("Test DB route error:", error)
    res.status(500).json({
      status: "error",
      message: "Database connection test failed",
      error: error.message,
    })
  }
})

// Test user creation
router.post("/create-test-user", async (req, res) => {
  try {
    // Check if test user exists
    const existingUser = await User.findOne({ email: "test@example.com" })

    if (existingUser) {
      return res.json({
        status: "success",
        message: "Test user already exists",
        user: {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
      })
    }

    // Create test user
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      phone: "123-456-7890",
      role: "buyer",
    })

    await user.save()

    res.json({
      status: "success",
      message: "Test user created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Create test user error:", error)
    res.status(500).json({
      status: "error",
      message: "Failed to create test user",
      error: error.message,
    })
  }
})

module.exports = router
