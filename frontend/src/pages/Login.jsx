import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Input } from '../components/UI';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
      <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-500 mb-8">Login to your TransitOps account</p>

      {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleLogin}>
        <Input 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="name@example.com"
          icon={FaEnvelope}
        />
        
        <div className="relative">
          <Input 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
            icon={FaLock}
          />
          <button 
            type="button"
            className="absolute right-4 top-10 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-end mb-8">
          <a href="#" className="text-sm font-medium text-blue-600">Forgot Password?</a>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Don't have an account? <a href="/register" className="text-black font-medium">Sign up</a>
        </p>
      </div>
      
      {/* Demo Credentials Helper */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p className="font-bold mb-1">Demo Credentials:</p>
        <p>Admin: <b>admin@transitops.com</b> / <b>password123</b></p>
        <p>Manager: <b>manager@transitops.com</b> / <b>password123</b></p>
        <p>Driver: <b>driver@transitops.com</b> / <b>password123</b></p>
      </div>
    </div>
  );
};

export default Login;
