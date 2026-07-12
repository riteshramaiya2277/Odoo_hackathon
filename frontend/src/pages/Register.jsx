import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { Button, Input } from '../components/UI';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Since backend has no registration endpoint, we just mock it and redirect to login
    alert('Mock Registration Successful');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-2">Create Account</h1>
      <p className="text-gray-500 mb-8">Sign up to get started</p>

      <form onSubmit={handleRegister}>
        <Input 
          label="Full Name" 
          value={formData.fullName} 
          onChange={(e) => handleChange(e, 'fullName')} 
          placeholder="John Doe"
          icon={FaUser}
          required
        />
        <Input 
          label="Email" 
          type="email"
          value={formData.email} 
          onChange={(e) => handleChange(e, 'email')} 
          placeholder="name@example.com"
          icon={FaEnvelope}
          required
        />
        <Input 
          label="Phone Number" 
          type="tel"
          value={formData.phone} 
          onChange={(e) => handleChange(e, 'phone')} 
          placeholder="9876543210"
          icon={FaPhone}
          required
        />
        <Input 
          label="Password" 
          type="password"
          value={formData.password} 
          onChange={(e) => handleChange(e, 'password')} 
          placeholder="••••••••"
          icon={FaLock}
          required
        />
        <Input 
          label="Confirm Password" 
          type="password"
          value={formData.confirmPassword} 
          onChange={(e) => handleChange(e, 'confirmPassword')} 
          placeholder="••••••••"
          icon={FaLock}
          required
        />

        <div className="mt-8">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Already have an account? <a href="/login" className="text-black font-medium">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
