const mongoose = require("mongoose")
const User = require("../models/User")
const Property = require("../models/Property")
const connectDB = require("../config/database")

const seedData = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    await connectDB()

    // Check if database exists and has data
    const userCount = await User.countDocuments()
    const propertyCount = await Property.countDocuments()

    console.log(`📊 Current data: ${userCount} users, ${propertyCount} properties`)

    if (userCount > 0 || propertyCount > 0) {
      console.log("⚠️  Database already has data. Clearing existing data...")
    }

    // Clear existing data
    await User.deleteMany({})
    await Property.deleteMany({})

    console.log("🗑️  Cleared existing data")

    // Create sample users
    console.log("👥 Creating sample users...")
    const users = await User.create([
      {
        name: "John Seller",
        email: "john@example.com",
        password: "password123",
        phone: "555-0101",
        role: "seller",
      },
      {
        name: "Jane Agent",
        email: "jane@example.com",
        password: "password123",
        phone: "555-0102",
        role: "agent",
      },
      {
        name: "Bob Buyer",
        email: "bob@example.com",
        password: "password123",
        phone: "555-0103",
        role: "buyer",
      },
    ])

    console.log("✅ Created sample users")

    // Create sample properties
    console.log("🏠 Creating sample properties...")
    const properties = [
      {
        title: "Modern Downtown Apartment",
        description: "Beautiful modern apartment in the heart of downtown with stunning city views.",
        price: 450000,
        location: {
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        propertyType: "apartment",
        listingType: "sale",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        amenities: ["Gym", "Pool", "Parking", "Balcony"],
        owner: users[0]._id,
      },
      {
        title: "Spacious Family Home",
        description: "Perfect family home with large backyard and excellent school district.",
        price: 650000,
        location: {
          address: "456 Oak Avenue",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
        },
        propertyType: "house",
        listingType: "sale",
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        amenities: ["Garden", "Garage", "Fireplace", "Deck"],
        owner: users[1]._id,
      },
      {
        title: "Luxury Condo with Ocean View",
        description: "Stunning luxury condominium with panoramic ocean views and premium amenities.",
        price: 2800,
        location: {
          address: "789 Beach Boulevard",
          city: "Miami",
          state: "FL",
          zipCode: "33139",
        },
        propertyType: "condo",
        listingType: "rent",
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        amenities: ["Ocean View", "Concierge", "Spa", "Valet Parking"],
        owner: users[0]._id,
      },
      {
        title: "Cozy Studio Apartment",
        description: "Perfect starter home or investment property in a vibrant neighborhood.",
        price: 1200,
        location: {
          address: "321 College Street",
          city: "Austin",
          state: "TX",
          zipCode: "78701",
        },
        propertyType: "apartment",
        listingType: "rent",
        bedrooms: 1,
        bathrooms: 1,
        area: 600,
        amenities: ["Laundry", "Internet", "Pet Friendly"],
        owner: users[1]._id,
      },
      {
        title: "Historic Townhouse",
        description: "Beautifully restored historic townhouse with modern amenities.",
        price: 750000,
        location: {
          address: "654 Heritage Lane",
          city: "Boston",
          state: "MA",
          zipCode: "02101",
        },
        propertyType: "townhouse",
        listingType: "sale",
        bedrooms: 3,
        bathrooms: 2,
        area: 1900,
        amenities: ["Historic Features", "Updated Kitchen", "Hardwood Floors"],
        owner: users[0]._id,
      },
    ]

    await Property.create(properties)

    console.log("✅ Created sample properties")

    // Verify data was created
    const finalUserCount = await User.countDocuments()
    const finalPropertyCount = await Property.countDocuments()

    console.log("\n🎉 Sample data created successfully!")
    console.log(`📊 Final count: ${finalUserCount} users, ${finalPropertyCount} properties`)
    console.log("\n🔐 Sample login credentials:")
    console.log("Email: john@example.com | Password: password123 (Seller)")
    console.log("Email: jane@example.com | Password: password123 (Agent)")
    console.log("Email: bob@example.com | Password: password123 (Buyer)")

    // List all collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log("\n📁 Database collections created:")
    collections.forEach((collection) => {
      console.log(`   - ${collection.name}`)
    })

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding data:", error)
    console.log("\n🔧 Troubleshooting:")
    console.log("1. Check your MongoDB connection string")
    console.log("2. Ensure MongoDB is running")
    console.log("3. Verify network connectivity")
    process.exit(1)
  }
}

seedData()
