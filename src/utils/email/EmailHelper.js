import nodemailer from "nodemailer";
import MailTemplate from "./MailTemplate";

class MailerHepler {
  constructor() {
    // console.log(process.env);
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  sendMail(mailOptions) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }

  async sendRegisterSeller(from, to, content) {
    const mailOptions = {
      from,
      to,
      subject: "Register Seller",
      html: MailTemplate.registerSeller(content),
    };
    return await this.transporter.sendMail(mailOptions);
  }
}

export default MailerHepler;
