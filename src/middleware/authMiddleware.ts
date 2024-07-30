// Middleware to authenticate token
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const generateToken = (user: any) => {
  const JWT_SECRET = process.env.SECRETS as string;
  return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
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
