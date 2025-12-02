const nodemailer = require("nodemailer");

const sendMessagee = async (email, code) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nuraddinovruslan76@gmail.com",
                pass: "wuhe kinz oyns deqy"
            }
        });

        return await transporter.sendMail({
            from: "nuraddinovruslan76@gmail.com",
            to: email,
            subject: "Lesson verification code",
            text: "Bu kod tasdiqlash uchun",
            html: `<b style="font-size: 24px;"><span style="color: blue;">${code}</span></b>`
        });
    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
}

module.exports = sendMessagee;
