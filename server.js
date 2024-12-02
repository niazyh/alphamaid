const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Import Nodemailer

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider (e.g., Gmail, Outlook)
    auth: {
        user: 'alphamaid@gmail.com', // Replace with your email
        pass: 'pibmmcmfbtynafzp', // Replace with your email password or app password
    },
});

// Endpoint to handle form submissions
app.post('/subscribe', (req, res) => {
    console.log('POST request received at /subscribe'); // Debug log 1
    console.log('Request body:', req.body); // Debug log 2

    const email = req.body.email;

    if (!email) {
        console.log('Email is missing in the request body!'); // Debug log 3
        return res.status(400).send('Email is required!');
    }

    console.log(`New subscriber: ${email}`); // Debug log 4

    // Send email notification
    const mailOptions = {
        from: '"Your Website" <alphamaid@gmail.com>', // Sender address
        to: 'alphamaid@gmail.com', // Your email address to receive notifications
        subject: 'New Subscriber Alert',
        text: `You have a new subscriber: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Debug log 5
            return res.status(500).send('Error sending notification email.');
        }
        console.log('Notification email sent:', info.response); // Debug log 6
        res.send('Thank you for subscribing!');
    });
});

// Catch-all middleware to log unexpected routes (Optional)
app.use((req, res) => {
    console.log(`Unhandled route: ${req.method} ${req.url}`); // Debug log 7
    res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`); // Debug log 8
});
