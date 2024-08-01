import nodemailer from "nodemailer";
import Subscription, { SubscriptionDocument } from "../models/Subscription";

const sendNotifications = async (newBlog: any) => {
  try {

    const subscribedUsers: SubscriptionDocument[] = await Subscription.find({});
    subscribedUsers.forEach(async (user) => {
      const transporter = nodemailer.createTransport({
        
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAILS as string,
        to: user.email,
        subject: "New Blog Post",
        text: "Check out our latest blog post!",
      };
      await transporter.sendMail(mailOptions);
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

export default sendNotifications;
