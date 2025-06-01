const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...")

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database Name: ${conn.connection.name}`)
  } catch (error) {
    console.error("❌ Database connection error:", error.message)
    console.log("\n🔧 Troubleshooting tips:")
    console.log("1. Check your MongoDB connection string")
    console.log("2. Ensure your IP is whitelisted (for Atlas)")
    console.log("3. Verify username/password are correct")
    console.log("4. Make sure MongoDB service is running (for local)")
    process.exit(1)
  }
}

module.exports = connectDB
