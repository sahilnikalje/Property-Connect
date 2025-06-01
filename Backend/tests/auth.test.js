const request = require("supertest")
const app = require("../server")
const User = require("../models/User")

describe("Auth Endpoints", () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone: "1234567890",
        role: "buyer",
      }

      const response = await request(app).post("/api/auth/register").send(userData).expect(201)

      expect(response.body.message).toBe("User registered successfully")
      expect(response.body.token).toBeDefined()
      expect(response.body.user.email).toBe(userData.email)
    })

    it("should not register user with invalid email", async () => {
      const userData = {
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
        phone: "1234567890",
      }

      await request(app).post("/api/auth/register").send(userData).expect(400)
    })
  })

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      const user = new User({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone: "1234567890",
      })
      await user.save()
    })

    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "john@example.com",
          password: "password123",
        })
        .expect(200)

      expect(response.body.message).toBe("Login successful")
      expect(response.body.token).toBeDefined()
    })

    it("should not login with invalid credentials", async () => {
      await request(app)
        .post("/api/auth/login")
        .send({
          email: "john@example.com",
          password: "wrongpassword",
        })
        .expect(400)
    })
  })
})
