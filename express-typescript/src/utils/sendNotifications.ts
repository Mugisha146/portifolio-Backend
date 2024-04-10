// utils/sendNotifications.ts
import nodemailer from "nodemailer";
import Subscription, { SubscriptionDocument } from "../models/Subscription";

const sendNotifications = async (newBlog: any) => {
  try {
    // Retrieve list of subscribed users from the database
    const subscribedUsers: SubscriptionDocument[] = await Subscription.find({});
    // Iterate over each subscribed user and send them a notification email
    subscribedUsers.forEach(async (user) => {
      const transporter = nodemailer.createTransport({
        // Configure SMTP transport
        
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: "emmyzizo1@gmail.com",
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
