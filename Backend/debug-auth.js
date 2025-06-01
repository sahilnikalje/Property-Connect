const mongoose = require("mongoose")
const User = require("./models/User")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const debugAuth = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Check if any users exist
    const userCount = await User.countDocuments()
    console.log(`📊 Total users in database: ${userCount}`)

    if (userCount === 0) {
      console.log("🔧 No users found. Creating test user...")

      // Create a test user manually
      const testUser = new User({
        name: "Test User",
        email: "test@test.com",
        password: "123456",
        phone: "1234567890",
        role: "buyer",
      })

      await testUser.save()
      console.log("✅ Test user created successfully")
    }

    // Find the test user
    const user = await User.findOne({ email: "test@test.com" })
    if (!user) {
      console.log("❌ Test user not found")
      return
    }

    console.log("👤 Found user:", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      hashedPassword: user.password.substring(0, 20) + "...",
    })

    // Test password comparison
    console.log("🔐 Testing password comparison...")
    const isMatch1 = await user.comparePassword("123456")
    console.log("Password '123456' matches:", isMatch1)

    const isMatch2 = await bcrypt.compare("123456", user.password)
    console.log("Direct bcrypt comparison:", isMatch2)

    // Test with wrong password
    const isMatch3 = await user.comparePassword("wrongpassword")
    console.log("Wrong password matches:", isMatch3)

    await mongoose.connection.close()
    console.log("🔌 Connection closed")
  } catch (error) {
    console.error("❌ Error:", error.message)
  }
}

debugAuth()
