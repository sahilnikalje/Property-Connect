const mongoose = require("mongoose")
const User = require("./models/User")
require("dotenv").config()

const setupUsers = async () => {
  try {
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
        email: "john@test.com",
        password: "123456",
        phone: "1234567890",
        role: "seller",
      },
    ]

    for (const userData of users) {
      const user = new User(userData)
      await user.save()
      console.log(`✅ Created user: ${userData.email}`)
    }

    console.log("\n🎉 Setup complete!")
    console.log("Login credentials:")
    console.log("Email: test@test.com | Password: 123456")
    console.log("Email: john@test.com | Password: 123456")

    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error.message)
    process.exit(1)
  }
}

setupUsers()
