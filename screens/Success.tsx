import React, { useState, useEffect } from 'react';
import { Card, Button, Header } from '../components/UI';
import { Patient, Screen } from '../types';
import { Check, Loader2, ShoppingBag } from 'lucide-react';

export const Success: React.FC<{ patient: Patient; onNavigate: (s: Screen, p?: Patient) => void }> = ({ patient, onNavigate }) => {
  const [pharmacyStatus, setPharmacyStatus] = useState<'preparing' | 'ready'>('preparing');
  const [timeLeft, setTimeLeft] = useState(15);
  const [redirectActive, setRedirectActive] = useState(true);

  // Simulate Socket.io live update
  useEffect(() => {
    const timer = setTimeout(() => {
      setPharmacyStatus('ready');
    }, 5000); // Changes to ready after 5 seconds to demonstrate "Live Update"
    return () => clearTimeout(timer);
  }, []);

  // Auto-redirect timer
  useEffect(() => {
    if (!redirectActive) return;

    if (timeLeft === 0) {
      onNavigate(Screen.DASHBOARD);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, redirectActive, onNavigate]);

  return (
    <div className="min-h-screen bg-zennara-bg flex flex-col items-center pt-20 px-6 pb-12 animate-fade-in">
      <div className="w-24 h-24 rounded-full bg-zennara-green flex items-center justify-center mb-6 animate-bounce">
        <Check size={48} className="text-white" />
      </div>
      
      <h1 className="font-serif text-4xl font-bold text-zennara-dark text-center mb-2">PRESCRIPTION SENT!</h1>
      <p className="font-sans text-xl text-zennara-light text-center max-w-lg mb-12">
        Pharmacist has been notified. Billing updated.
      </p>

      <div className="w-full max-w-2xl flex flex-col gap-6">
         {pharmacyStatus === 'preparing' ? (
           <Card className="bg-yellow-50 border-yellow-200 transition-all duration-500">
              <div className="flex items-center gap-4">
                <Loader2 size={32} className="text-yellow-700 animate-spin" />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-yellow-800">PHARMACY STATUS</h3>
                  <p className="font-sans text-lg text-yellow-700">Preparing medications... (Est. 10 mins)</p>
                </div>
              </div>
           </Card>
         ) : (
           <Card className="bg-green-50 border-green-200 transition-all duration-500 transform scale-105">
              <div className="flex items-center gap-4">
                <ShoppingBag size={32} className="text-zennara-green" />
                <div>
                  <h3 className="font-serif text-2xl font-bold text-zennara-green">READY FOR PICKUP</h3>
                  <p className="font-sans text-lg text-zennara-green">Medications are packed and ready at counter.</p>
                </div>
              </div>
           </Card>
         )}

         <h2 className="font-serif text-2xl text-center text-zennara-dark mt-4">WHAT'S NEXT FOR {patient.name.toUpperCase()}?</h2>

         <div className="grid grid-cols-1 gap-4">
            <Card onClick={() => onNavigate(Screen.TREATMENT, patient)}>
               <h3 className="font-serif text-2xl font-bold mb-2">💆 ASSIGN TREATMENT</h3>
               <p className="text-zennara-light text-lg mb-4">Select facial or laser therapy</p>
               <Button fullWidth onClick={() => onNavigate(Screen.TREATMENT, patient)}>ASSIGN TREATMENT →</Button>
            </Card>

            <Button 
               size="huge" 
               variant="secondary" 
               fullWidth
               onClick={() => onNavigate(Screen.DASHBOARD)}
            >
               DONE - RETURN TO QUEUE
            </Button>
         </div>

         {/* Auto Redirect Countdown */}
         <div className="mt-8 text-center border-t border-gray-200 pt-6">
           {redirectActive ? (
             <div className="flex flex-col items-center gap-2">
               <p className="font-sans text-zennara-light">
                 Auto-redirecting to queue in <span className="font-bold text-zennara-dark">{timeLeft}s</span>...
               </p>
               <button 
                 onClick={() => setRedirectActive(false)}
                 className="text-zennara-green font-bold text-lg hover:underline px-4 py-2"
               >
                 [STAY HERE]
               </button>
             </div>
           ) : (
             <p className="font-sans text-zennara-light italic">Auto-redirect cancelled.</p>
           )}
         </div>
      </div>
    </div>
  );
}