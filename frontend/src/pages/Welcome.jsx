import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      {/* Background graphic */}
      <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden">
        <div className="text-white text-4xl font-bold z-10">Move Freight with Ease.</div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-white rounded-t-3xl -mt-6 z-20 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">Get Started</h1>
        <Button onClick={() => navigate('/login')} variant="primary">
          Log In
        </Button>
        <Button onClick={() => navigate('/register')} variant="secondary">
          Sign Up
        </Button>
        <button 
          onClick={() => navigate('/home')}
          className="text-gray-500 font-medium mt-2 hover:text-black transition-colors"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Welcome;
