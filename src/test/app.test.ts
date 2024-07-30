// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User";
// import { loginUser } from "../controllers/loginUser";
// import {
//   createBlog,
//   getBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
//   addComment,
//   likeBlog,
//   shareBlog,
// } from "../controllers/blogController";
// import { Blog } from "../models/Blog";
// import { Comment } from "../models/comment";
// // Mocking User.findOne to simulate database interaction
// jest.mock("../models/User", () => ({
//   User: {
//     findOne: jest.fn(),
//   },
// }));

// // Mocking bcrypt.compare
// jest.mock("bcryptjs", () => ({
//   compare: jest.fn(),
// }));

// // Mocking jwt.sign
// jest.mock("jsonwebtoken", () => ({
//   sign: jest.fn(),
// }));

// describe("loginUser function", () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;

//   beforeEach(() => {
//     req = {
//       body: {},
//     };
//     res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };
//   });

//   it("should return success message and token when provided valid credentials", async () => {
//     const mockUser = { email: "test@example.com", password: "password123" };
//     const mockToken = "mock.token";
//     req.body = { email: mockUser.email, password: mockUser.password };

//     (User.findOne as jest.Mock).mockResolvedValue(mockUser);
//     (bcrypt.compare as jest.Mock).mockResolvedValue(true);
//     (jwt.sign as jest.Mock).mockReturnValue(mockToken);

//     await loginUser(req as Request, res as Response);

//     expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
//     expect(bcrypt.compare).toHaveBeenCalledWith(
//       mockUser.password,
//       mockUser.password
//     );
//     // Mocking jwt.sign
//     jest.mock("jsonwebtoken", () => ({
//       sign: jest.fn((payload, secretOrPrivateKey, options) => "mock.token"),
//     }));

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Login successful",
//       token: mockToken,
//     });
//   });

//   it("should return 'User not found' message when provided with an unknown email", async () => {
//     req.body = { email: "unknown@example.com", password: "password123" };
//     (User.findOne as jest.Mock).mockResolvedValue(null);

//     await loginUser(req as Request, res as Response);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
//   });

//   it("should return 'Invalid password' message when provided with incorrect password", async () => {
//     const mockUser = { email: "test@example.com", password: "password123" };
//     req.body = { email: mockUser.email, password: "wrongPassword" };
//     (User.findOne as jest.Mock).mockResolvedValue(mockUser);
//     (bcrypt.compare as jest.Mock).mockResolvedValue(false);

//     await loginUser(req as Request, res as Response);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
//   });

//   it("should return 'Error logging in' message when an unexpected error occurs", async () => {
//     req.body = { email: "test@example.com", password: "password123" };
//     (User.findOne as jest.Mock).mockRejectedValue(
//       new Error("Some unexpected error")
//     );

//     await loginUser(req as Request, res as Response);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: "Error logging in" });
//   });
// });

// const mockRequest = (
//   params: { [key: string]: string } = {},
//   body: any = {}
// ): Request => {
//   const req = {} as Request;
//   req.params = params;
//   req.body = body;
//   req.get = jest.fn();
//   req.header = jest.fn();
//   req.accepts = jest.fn();
//   // Add more properties/methods as needed
//   return req;
// };

// const mockResponse = () => {
//   const res: any = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   res.sendStatus = jest.fn().mockReturnValue(res);
//   return res;
// };

// describe("Blog Controller", () => {
//   let mockReq: Request;
//   let mockRes: Response;

//   beforeEach(() => {
//     mockReq = mockRequest();
//     mockRes = mockResponse();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("createBlog", () => {
//     it("should create a new blog", async () => {
//       const mockBlogData = {
//         title: "Test Blog",
//         image: "test-image.jpg",
//         content: "Test content",
//       };
//       mockReq.body = mockBlogData;

//       await createBlog(mockReq, mockRes);

//       expect(mockRes.sendStatus).toHaveBeenCalledWith(201);
//     });

//     it("should handle errors when creating a blog", async () => {
//       const mockError = new Error("Test error");
//       jest.spyOn(Blog.prototype, "save").mockRejectedValue(mockError);

//       await createBlog(mockReq, mockRes);

//       expect(console.error).toHaveBeenCalledWith(mockError);
//       expect(mockRes.status).toHaveBeenCalledWith(500);
//       expect(mockRes.send).toHaveBeenCalledWith("Error creating blog");
//     });
//   });
//   describe("Blog Controller", () => {
//     let mockReq: Request;
//     let mockRes: Response;

//     beforeEach(() => {
//       mockReq = mockRequest();
//       mockRes = mockResponse();
//     });

//     afterEach(() => {
//       jest.clearAllMocks();
//     });

//     describe("getBlogById", () => {
//       it("should get a blog by ID", async () => {
//         const mockBlog = { _id: "test_id", title: "Test Blog" };
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockResolvedValue(mockBlog);

//         await getBlogById(mockReq, mockRes);

//         expect(mockRes.json).toHaveBeenCalledWith(mockBlog);
//       });

//       it("should handle errors when getting a blog by ID", async () => {
//         const mockError = new Error("Test error");
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockRejectedValue(mockError);

//         await getBlogById(mockReq, mockRes);

//         expect(console.error).toHaveBeenCalledWith(mockError);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.send).toHaveBeenCalledWith("Error getting blog");
//       });
//     });

//     describe("updateBlog", () => {
//       it("should update a blog", async () => {
//         const mockUpdatedBlog = { _id: "test_id", title: "Updated Test Blog" };
//         mockReq.params.id = "test_id";
//         mockReq.body = { title: "Updated Test Blog" };
//         jest
//           .spyOn(Blog, "findByIdAndUpdate")
//           .mockResolvedValue(mockUpdatedBlog);

//         await updateBlog(mockReq, mockRes);

//         expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedBlog);
//       });

//       it("should handle errors when updating a blog", async () => {
//         const mockError = new Error("Test error");
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findByIdAndUpdate").mockRejectedValue(mockError);

//         await updateBlog(mockReq, mockRes);

//         expect(console.error).toHaveBeenCalledWith(mockError);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.send).toHaveBeenCalledWith("Error updating blog");
//       });
//     });

//     describe("deleteBlog", () => {
//       it("should delete a blog", async () => {
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findByIdAndDelete").mockResolvedValue(true);

//         await deleteBlog(mockReq, mockRes);

//         expect(mockRes.sendStatus).toHaveBeenCalledWith(204);
//       });

//       it("should handle errors when deleting a blog", async () => {
//         const mockError = new Error("Test error");
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findByIdAndDelete").mockRejectedValue(mockError);

//         await deleteBlog(mockReq, mockRes);

//         expect(console.error).toHaveBeenCalledWith(mockError);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.send).toHaveBeenCalledWith("Error deleting blog");
//       });
//     });

//     describe("addComment", () => {
//       it("should add a comment to a blog", async () => {
//         const mockBlog = { _id: "test_id", title: "Test Blog", comments: [] };
//         const mockComment = { _id: "comment_id", text: "Test comment" };
//         mockReq.params.id = "test_id";
//         mockReq.body = { text: "Test comment" };
//         jest.spyOn(Blog, "findById").mockResolvedValue(mockBlog);
//         jest.spyOn(Comment.prototype, "save").mockResolvedValue(mockComment);

//         await addComment(mockReq, mockRes);

//         expect(mockRes.status).toHaveBeenCalledWith(201);
//         expect(mockRes.json).toHaveBeenCalledWith(mockBlog);
//       });

//       it("should handle errors when adding a comment to a blog", async () => {
//         const mockError = new Error("Test error");
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockRejectedValue(mockError);

//         await addComment(mockReq, mockRes);

//         expect(console.error).toHaveBeenCalledWith(mockError);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.send).toHaveBeenCalledWith(
//           "Error adding comment to blog"
//         );
//       });
//     });

//     describe("likeBlog", () => {
//       it("should increment likes count of a blog", async () => {
//         const mockBlog = { _id: "test_id", title: "Test Blog", likes: 0 };
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockResolvedValue(mockBlog);

//         await likeBlog(mockReq, mockRes);

//         expect(mockBlog.likes).toEqual(1);
//         expect(mockRes.status).toHaveBeenCalledWith(200);
//         expect(mockRes.json).toHaveBeenCalledWith(mockBlog);
//       });

//       it("should handle errors when liking a blog", async () => {
//         const mockError = new Error("Test error");
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockRejectedValue(mockError);

//         await likeBlog(mockReq, mockRes);

//         expect(console.error).toHaveBeenCalledWith(mockError);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.send).toHaveBeenCalledWith("Error liking blog");
//       });
//     });

//     describe("shareBlog", () => {
//       it("should increment shares count of a blog", async () => {
//         const mockBlog = { _id: "test_id", title: "Test Blog", shares: 0 };
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockResolvedValue(mockBlog);

//         await shareBlog(mockReq, mockRes);

//         expect(mockBlog.shares).toEqual(1);
//         expect(mockRes.status).toHaveBeenCalledWith(200);
//         expect(mockRes.json).toHaveBeenCalledWith(mockBlog);
//       });

//       it("should handle errors when sharing a blog", async () => {
//         const mockError = new Error("Test error");
//         mockReq.params.id = "test_id";
//         jest.spyOn(Blog, "findById").mockRejectedValue(mockError);

//         await shareBlog(mockReq, mockRes);

//         expect(console.error).toHaveBeenCalledWith(mockError);
//         expect(mockRes.status).toHaveBeenCalledWith(500);
//         expect(mockRes.send).toHaveBeenCalledWith("Error sharing blog");
//       });
//     });
//   });
// });
