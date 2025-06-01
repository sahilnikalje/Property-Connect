const express = require("express")
const {
  createInquiry,
  getInquiries,
  getUserInquiries,
  updateInquiryStatus,
} = require("../controllers/inquiryController")
const auth = require("../middleware/auth")

const router = express.Router()

// All routes are protected
router.post("/", auth, createInquiry)
router.get("/", auth, getInquiries)
router.get("/my-inquiries", auth, getUserInquiries)
router.put("/:id/status", auth, updateInquiryStatus)

module.exports = router
