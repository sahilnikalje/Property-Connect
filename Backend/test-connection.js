const mongoose = require("mongoose")
require("dotenv").config()

const testConnection = async () => {
  try {
    console.log("🔄 Testing MongoDB connection...")
    console.log("📍 URI:", process.env.MONGODB_URI?.replace(/\/\/.*@/, "//***:***@"))

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("✅ MongoDB connection successful!")
    console.log("📊 Database name:", mongoose.connection.name)
    console.log("🏠 Host:", mongoose.connection.host)

    // Test creating a simple document
    const testSchema = new mongoose.Schema({ test: String })
    const TestModel = mongoose.model("Test", testSchema)

    const testDoc = new TestModel({ test: "Connection test successful" })
    await testDoc.save()
    console.log("✅ Test document created successfully!")

    // Clean up
    await TestModel.deleteOne({ _id: testDoc._id })
    console.log("🧹 Test document cleaned up")

    await mongoose.connection.close()
    console.log("🔌 Connection closed")
    process.exit(0)
  } catch (error) {
    console.error("❌ Connection test failed:")
    console.error("Error:", error.message)

    if (error.message.includes("bad auth")) {
      console.log("\n🔧 Authentication failed. Please check:")
      console.log("1. Username and password are correct")
      console.log("2. User has proper database permissions")
      console.log("3. Password doesn't contain special characters")
    }

    if (error.message.includes("IP")) {
      console.log("\n🔧 IP Access issue. Please check:")
      console.log("1. Your IP is whitelisted in Network Access")
      console.log("2. Try allowing access from anywhere (0.0.0.0/0)")
    }

    process.exit(1)
  }
}

testConnection()
