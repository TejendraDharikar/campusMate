import z from "zod";

export const loginSchema = z.object({
  email: z.email( "valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['student', 'teacher']),
  department: z.string().min(1),
  enrollment_number: z.string().optional(),
  employee_id: z.string().optional(),
});