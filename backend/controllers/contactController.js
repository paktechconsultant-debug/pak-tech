const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const queries = require('../models/queries');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const result = await queries.submitContactForm(name, email, message);
    const submission = result.rows[0];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission - Pak-Tech Website',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><small>Submission ID: ${submission.id}</small></p>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
      submission
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await queries.getAllContactSubmissions();
    res.status(200).json({
      success: true,
      count: result.rows.length,
      submissions: result.rows
    });
  } catch (err) {
    next(err);
  }
};

const markRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const submissionExists = await queries.getContactSubmissionById(id);
    if (submissionExists.rows.length === 0) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    const result = await queries.markContactAsRead(id);

    res.status(200).json({
      success: true,
      message: 'Submission marked as read',
      submission: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
};

const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;

    const submissionExists = await queries.getContactSubmissionById(id);
    if (submissionExists.rows.length === 0) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    await queries.deleteContactSubmission(id);

    res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  submitContact,
  getAll,
  markRead,
  deleteSubmission
};
