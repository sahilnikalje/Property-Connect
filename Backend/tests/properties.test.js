const request = require("supertest")
const app = require("../server")
const User = require("../models/User")
const Property = require("../models/Property")

describe("Properties Endpoints", () => {
  let authToken
  let userId

  beforeEach(async () => {
    await User.deleteMany({})
    await Property.deleteMany({})

    // Create a test user and get auth token
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "1234567890",
    })
    await user.save()
    userId = user._id

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    })

    authToken = loginResponse.body.token
  })

  describe("GET /api/properties", () => {
    it("should get all properties", async () => {
      const response = await request(app).get("/api/properties").expect(200)

      expect(response.body.properties).toBeDefined()
      expect(Array.isArray(response.body.properties)).toBe(true)
    })
  })

  describe("POST /api/properties", () => {
    it("should create a new property", async () => {
      const propertyData = {
        title: "Beautiful House",
        description: "A beautiful house in the city",
        price: 500000,
        location: {
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
        },
        propertyType: "house",
        listingType: "sale",
        bedrooms: 3,
        bathrooms: 2,
        area: 1500,
      }

      const response = await request(app)
        .post("/api/properties")
        .set("Authorization", `Bearer ${authToken}`)
        .send(propertyData)
        .expect(201)

      expect(response.body.message).toBe("Property created successfully")
      expect(response.body.property.title).toBe(propertyData.title)
    })

    it("should not create property without auth", async () => {
      const propertyData = {
        title: "Beautiful House",
        description: "A beautiful house in the city",
        price: 500000,
      }

      await request(app).post("/api/properties").send(propertyData).expect(401)
    })
  })
})
