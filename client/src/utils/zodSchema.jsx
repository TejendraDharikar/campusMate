import z from "zod";

export const loginSchema = z.object({
  email: z.email("valid email is required"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(4),
  role: z.enum(["student", "teacher"]),
  department: z.enum([
    "computer science",
    "artificial intelligence",
    "Math",
    "Digital Marketing",
    "Python",
  ]),
  phone: z.string().min(10).max(10).optional(),
  age: z.string().max(2, "age should be of 2 numbers").optional(),
});
