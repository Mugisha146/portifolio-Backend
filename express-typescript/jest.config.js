module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
};

// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";
// import { loginUser } from "./authController";
// import { User } from "../models/User";
// import bcrypt from "bcryptjs";

// jest.mock("../models/User");
// jest.mock("bcryptjs", () => ({
//   compare: jest.fn(),
// }));

// describe("loginUser", () => {
//   it("should return a token if login is successful", async () => {
//     const req = {
//       body: { email: "test@example.com", password: "password123" },
//     } as Request;
//     const res = { json: jest.fn() } as unknown as Response;

//     // Mock User.findOne to return a user
//     User.findOne = jest
//       .fn()
//       .mockResolvedValue({
//         email: "test@example.com",
//         password: "$2a$10$somehashedpassword",
//       });

//     // Mock bcrypt.compare to return true for password validation
//     (bcrypt.compare as jest.Mock).mockResolvedValue(true);

//     // Mock jwt.sign to return a token
//     jest.spyOn(jwt, "sign").mockReturnValue("mockedtoken");

//     await loginUser(req, res);

//     expect(res.json).toHaveBeenCalledWith({
//       message: "Login successful",
//       token: "mockedtoken",
//     });
//   });

//   // Other test cases...
// });
