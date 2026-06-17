const express = require("express");
const nodemailer = require("nodemailer");
const Review = require("../models/Review");

const router = express.Router();

// POST review
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);

    // Email setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Review: ${req.body.title}`,
      html: `
        <h2>New Review Received</h2>
        <p><b>Name:</b> ${req.body.name}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Service:</b> ${req.body.service}</p>
        <p><b>Rating:</b> ${req.body.rating}</p>
        <h3>${req.body.title}</h3>
        <p>${req.body.review}</p>
      `,
    });

    res.json({
      success: true,
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;