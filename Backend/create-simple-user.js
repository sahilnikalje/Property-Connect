const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const createSimpleUser = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Define user schema directly
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      phone: String,
      role: String,
    })

    const User = mongoose.model("User", userSchema)

    // Clear existing users
    await User.deleteMany({})
    console.log("🗑️ Cleared existing users")

    // Hash password manually
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("123456", salt)

    // Create user directly
    const user = new User({
      name: "Test User",
      email: "test@test.com",
      password: hashedPassword,
      phone: "1234567890",
      role: "buyer",
    })

    await user.save()
    console.log("✅ User created with hashed password")

    // Test the password
    const isMatch = await bcrypt.compare("123456", hashedPassword)
    console.log("Password verification test:", isMatch)

    await mongoose.connection.close()
    console.log("🔌 Connection closed")
    console.log("\nYou can now login with:")
    console.log("Email: test@test.com")
    console.log("Password: 123456")
  } catch (error) {
    console.error("❌ Error:", error.message)
  }
}

createSimpleUser()
