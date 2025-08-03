const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, // Replace with your email
      pass: process.env.USER_PASS, // App password
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.USER,
    subject: subject,
    text: message,
    html: `<p><strong>From:</strong> ${name} (${email})</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.render("./profile/SuccessMail.ejs");
  } catch (error) {
    console.error("Error occurred:", error);
    res.render("./profile/failureMail.ejs");
  }
};

module.exports = sendMail;
