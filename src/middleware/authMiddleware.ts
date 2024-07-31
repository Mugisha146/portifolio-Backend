// Middleware to authenticate token
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const generateToken = (user: any) => {
  const secret = process.env.SECRETS as string;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
};

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.JWT_SECRET || (process.env.SECRETS as string),
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};

export const restrictTo = (...email: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
   const email = req.user.email;
   if (email !== (process.env.EMAILS as string)) {
     return res.status(403).json({
       message: "You are not authorized to perform this action",
     });
   }
    next();
  };
};