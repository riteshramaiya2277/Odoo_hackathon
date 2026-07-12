import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Header */}
      <div className="flex-1 bg-black flex flex-col justify-end p-8 relative overflow-hidden">
        <div className="absolute top-8 left-8 text-white text-2xl font-bold">TransitOps</div>
        <div className="relative z-10 mb-8">
          <h1 className="text-white text-5xl font-bold leading-tight mb-4 tracking-tight">
            Go anywhere with TransitOps
          </h1>
          <p className="text-gray-300 text-lg max-w-xs">
            Request a ride, hop in, and go.
          </p>
        </div>
        {/* Subtle geometric pattern/map representation */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-white flex flex-col gap-4">
        <button 
          onClick={() => navigate('/login')} 
          className="btn-primary"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
        <button 
          onClick={() => navigate('/home')}
          className="btn-secondary"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Welcome;
