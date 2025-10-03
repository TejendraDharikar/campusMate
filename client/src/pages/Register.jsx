import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {useNavigate } from 'react-router-dom'
import { registerSchema } from '../utils/zodSchema';
import { registerUser } from '../services/registerService';
import { useState } from 'react';


export default function Register() {
  const navigate = useNavigate();
  const [isPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const role = watch('role');

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registered:', data);
      navigate("/");
    },
    onError: (error) => {
      console.error('Registration failed:', error.message);
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
 <h2 className="text-2xl font-semibold text-center text-blue-700">Register</h2>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
      <input {...register('name')} 
      placeholder="Name"
       className="w-full px-4 py-1 border rounded-md border-gray-300" />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
    <input {...register('email')} 
    placeholder="Email" 
    className="w-full px-4 py-1 border rounded-md border-gray-300"
    />
      <p  className="text-red-500 text-sm">{errors.email?.message}</p>
</div>
<div>
  <label className="block text-sm font-medium text-gray-700">Password</label>
      <input type="password" 
      {...register('password')} 
      placeholder="Password" 
       className="w-full px-4 py-1 border rounded-md border-gray-300"/>
      <p  className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
 <select {...register('role')}
  className="w-full px-4 py-1 border rounded-md border-gray-300 text-gray-500">
        <option value="">Select Role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <p className="text-red-500 text-sm">{errors.role?.message}</p>
    </div>
     



<div>
  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Department</label>
<input {...register('department')}
 placeholder="Department" 
className="w-full px-4 py-1 border rounded-md border-gray-300"/>
      <p className="text-red-500 text-sm">{errors.department?.message}</p>

</div>
      
      {role === 'student' && (<div> 
         <label htmlFor="role" className="block text-sm font-medium text-gray-700">Enrollment ID</label>
        <input {...register('enrollment_number')} placeholder="Enrollment Number"
        className="w-full px-4 py-1 border rounded-md border-gray-300" />
        </div>
       
      )}
      {role === 'teacher' && (<div>
         <label htmlFor="role" className="block text-sm font-medium text-gray-700">Employee ID</label>
         <input {...register('employee_id')}
         placeholder="Employee ID" 
         className="w-full px-4 py-1 border rounded-md border-gray-300"/>
      </div>
        
      )}

      <button type="submit"
       disabled={mutation.isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
        
        {mutation.isPending ? 'Registering...' : 'Register'}
      </button>

      {mutation.isError && <p className="text-red-500">{mutation.error.message}</p>}
      {mutation.isSuccess && <p className="text-green-500">Registration successful!</p>}
    </form>

     <div className="flex justify-center gap-2 text-sm">
          <p>Already have an account?</p>
          <p
            onClick={() => navigate("/")}
            className="hover:underline text-blue-600 cursor-pointer"
          >
            Login
          </p>
        </div>
      </div>
    </div>
   
  );
}