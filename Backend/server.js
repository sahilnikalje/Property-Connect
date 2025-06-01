const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ MongoDB Connected Successfully")
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message)
    process.exit(1)
  }
}

connectDB()

// Routes
app.use("/api/auth", require("./routes/auth"))

// Health check
app.get("/", (req, res) => {
  res.json({ message: "PropertyConnect API is running!" })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

module.exports = app
