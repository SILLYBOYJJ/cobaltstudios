import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yourgameemail@gmail.com",
            pass: "your_app_password"
        }
    });

    const mailOptions = {
        from: email,
        to: "yourgameemail@gmail.com",
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
