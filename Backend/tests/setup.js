const mongoose = require("mongoose")
const { beforeAll, afterAll } = require("@jest/globals")

beforeAll(async () => {
  const url = process.env.MONGODB_URI || "mongodb://localhost:27017/propertyconnect_test"
  await mongoose.connect(url)
})

afterAll(async () => {
  await mongoose.connection.close()
})
