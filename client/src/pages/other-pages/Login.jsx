import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../../utils/zodSchema.jsx';
import { useAuthStore } from '../../context/useAuthStore.jsx';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      console.log(" Mutation success:", user);

      if (!user || typeof user.role !== "string") {
        console.warn(" Role is missing or invalid:", user);
        return;
      }

      login(user);
      localStorage.setItem('role', user.role);
      localStorage.setItem('name', user.name);

      const targetRoute = `/${user.role}-dashboard`;
      console.log(" Navigating to:", targetRoute);
      navigate(targetRoute);
    },
    onError: (err) => {
      console.error(" Login failed:", err.message);
    }
  });

  const onSubmit = (formData) => {
    console.log("Form submitted with:", formData);
    mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-blue-700">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {isError && (
            <p className="text-sm text-red-600 mt-2">
              {error?.message || "Login failed"}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 text-sm hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;