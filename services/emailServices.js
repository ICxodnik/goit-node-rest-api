import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_NET_PASSWORD, UKR_NET_FROM, BASE_URL } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 465, 587, 2525
    secure: true,
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export function sendEmail(data) {
    const email = { ...data, from: UKR_NET_FROM };

    return transport.sendMail(email);
}

export function sendVerifyEmail(email, verificationCode) {
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
    };

    return sendEmail(verifyEmail);
}
