import { z } from "zod";

export const loginSchema=z.object({
   email: z.email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
})

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    role: z.enum(["student", "teacher"], "Role is required"),
    department: z.string().min(1, "Department is required"),
    age: z.string().optional(),
    phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "student") {
      if (!data.age || data.age.trim() === "") {
        ctx.addIssue({
          path: ["age"],
          message: "Age is required for students",
          code: "custom",
        });
      }
    }
    if (data.role === "teacher") {
      if (!data.phone || data.phone.trim() === "") {
        ctx.addIssue({
          path: ["phone"],
          message: "Phone number is required for teachers",
          code: "custom",
        });
      }
    }
  });

 

