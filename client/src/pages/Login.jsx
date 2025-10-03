import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../utils/zodSchema';


function Login() {
  const navigate = useNavigate();

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(loginSchema),
});

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      setTimeout(() => navigate(`/${data.role}`), 1000);
    },
  });

  const onSubmit = (data) => {
  mutate(data); 
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
          {isError && <p className="text-sm text-red-600">{error?.message}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex">
        <h2>Don't have any account?</h2>
        <h2 onClick={()=>navigate("/register")}
          className="text-blue-600 cursor-pointer hover:underline">Register</h2>
        </div>
      </div>
    </div>
  );
}

export default Login;