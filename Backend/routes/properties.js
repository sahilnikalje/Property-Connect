const express = require("express")
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  addToFavorites,
  removeFromFavorites,
  getUserProperties,
} = require("../controllers/propertyController")
const auth = require("../middleware/auth")

const router = express.Router()

// Public routes
router.get("/", getProperties)
router.get("/:id", getProperty)

// Protected routes
router.post("/", auth, createProperty)
router.put("/:id", auth, updateProperty)
router.delete("/:id", auth, deleteProperty)
router.post("/:id/favorite", auth, addToFavorites)
router.delete("/:id/favorite", auth, removeFromFavorites)
router.get("/user/my-properties", auth, getUserProperties)

module.exports = router
