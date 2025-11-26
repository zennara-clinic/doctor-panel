
import React from 'react';
import { LargeInput, Button } from '../components/UI';
import { Screen } from '../types';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-zennara-bg flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[520px] flex flex-col gap-8">
        <div className="flex flex-col items-center mb-4">
          <img 
            src="https://res.cloudinary.com/dimlozhrx/image/upload/v1760515905/Zen_Logo_Green_s9yv1e.png" 
            alt="Zennara Logo" 
            className="w-64 h-auto object-contain mb-4"
          />
          <p className="font-sans text-2xl text-zennara-light tracking-wide">Doctor Panel</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-8">
           <LargeInput label="Your Email" placeholder="dr.reddy@zennara.in" defaultValue="dr.reddy@zennara.in" />
           <LargeInput label="Password" type="password" placeholder="••••••••••" />
           
           <Button size="huge" fullWidth onClick={onLogin} className="mt-4">
             LOGIN
           </Button>

           <div className="flex justify-between items-center mt-2">
             <button className="text-zennara-green font-sans text-lg underline">Forgot Password?</button>
             <button className="text-zennara-light font-sans text-lg">Need Help?</button>
           </div>
        </div>
      </div>
    </div>
  );
}
