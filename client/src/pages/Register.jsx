import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/registerService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setTimeout(() => navigate('/login'), 1500);
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {isError && <p className="text-red-500">{error.message || 'Registration failed'}</p>}
      {isSuccess && <p className="text-green-500">{data.message}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" className="input" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input mt-2" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input mt-2" value={form.password} onChange={handleChange} required />
        <select name="role" className="input mt-2" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn mt-4 w-full" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;