
import React from 'react';
import { LargeInput, Button } from '../components/UI';
import { Screen } from '../types';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-zennara-bg flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
      <div className="w-full max-w-[440px] md:max-w-[480px] lg:max-w-[520px] flex flex-col gap-6 md:gap-7">
        <div className="flex flex-col items-center mb-2 md:mb-3">
          <img 
            src="https://res.cloudinary.com/dimlozhrx/image/upload/v1760515905/Zen_Logo_Green_s9yv1e.png" 
            alt="Zennara Logo" 
            className="w-48 sm:w-56 md:w-60 lg:w-64 h-auto object-contain mb-3 md:mb-4"
          />
          <p className="font-sans text-xl md:text-2xl text-zennara-light tracking-wide">Doctor Panel</p>
        </div>

        <div className="bg-white px-6 py-7 sm:px-7 sm:py-8 md:px-8 md:py-9 rounded-xl md:rounded-2xl shadow-md md:shadow-lg border border-gray-50 flex flex-col gap-6 md:gap-7">
           <LargeInput label="Your Email" placeholder="dr.reddy@zennara.in" defaultValue="dr.reddy@zennara.in" />
           <LargeInput label="Password" type="password" placeholder="••••••••••" />
           
           <Button size="large" fullWidth onClick={onLogin} className="mt-2 md:mt-3">
             LOGIN
           </Button>

           <div className="flex justify-between items-center mt-1 md:mt-2">
             <button className="text-zennara-green font-sans text-base md:text-lg underline hover:opacity-80 transition-opacity">
               Forgot Password?
             </button>
             <button className="text-zennara-light font-sans text-base md:text-lg hover:opacity-80 transition-opacity">
               Need Help?
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
