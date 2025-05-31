const mongoose = require("mongoose")
const User = require("./models/User")
require("dotenv").config()

const createTestUsers = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Clear existing users
    await User.deleteMany({})
    console.log("🗑️ Cleared existing users")

    // Create test users
    const users = [
      {
        name: "Test User",
        email: "test@test.com",
        password: "123456",
        phone: "1234567890",
        role: "buyer",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone: "1234567890",
        role: "seller",
      },
    ]

    for (const userData of users) {
      const user = new User(userData)
      await user.save()
      console.log(`✅ Created user: ${userData.email}`)
    }

    console.log("\n🎉 Test users created successfully!")
    console.log("You can now login with:")
    console.log("Email: test@test.com | Password: 123456")
    console.log("Email: john@example.com | Password: password123")

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error.message)
    process.exit(1)
  }
}

createTestUsers()
