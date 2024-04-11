const generateOTP = require("./otpGenerator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rushikeshpalekar91@gmail.com",
    pass: "rfgpvpitthobdoit",
  },
});

async function sendMail(email, otp) {
  const info = await transporter.sendMail({
    from: "rushikeshpalekar91@gmail.com",
    to: email,
    subject: "Superstore - Email Verification",
    html: { path: `${process.env.SERVER_URL}/template/otp?id=${otp}` },
  });
  console.log("Message sent: %s", info.messageId);
}

class Verification {
  static async emailVerify(email) {
    const otp = generateOTP(6);
    await sendMail(email, otp).catch((err) => {
      console.log(err);
    });
    return {
      status: "success",
      data: otp,
      error: null,
    };
  }
}

module.exports = Verification;
