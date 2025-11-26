import React, { useState } from 'react';
import { Card, Button, Header } from '../components/UI';
import { Patient, Screen } from '../types';
import { ShieldCheck, Edit, Check } from 'lucide-react';

export const Review: React.FC<{ patient: Patient; onNavigate: (s: Screen) => void; onBack: () => void }> = ({ patient, onNavigate, onBack }) => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-zennara-bg pb-32">
       <Header title="FINAL REVIEW" subtitle="Check everything before sending" showBack onBack={onBack} />

       <div className="px-6 flex flex-col gap-6">
         <Card>
           <h2 className="font-serif text-2xl font-bold mb-4">WHAT'S IN THIS PRESCRIPTION?</h2>
           <div className="space-y-4">
             <div>
               <h3 className="font-sans font-bold text-lg text-zennara-dark">Diagnosis</h3>
               <p className="font-sans text-xl text-zennara-light">Acne Vulgaris (Moderate)</p>
             </div>
             <div>
               <h3 className="font-sans font-bold text-lg text-zennara-dark">Medications</h3>
               <ul className="list-disc list-inside font-sans text-xl text-zennara-light">
                 <li>Doxycycline 100mg - 2 times daily</li>
                 <li>Benzoyl Peroxide Gel 2.5% - Apply at night</li>
               </ul>
             </div>
             <div>
                <Button variant="secondary" size="medium" icon={<Edit size={20} />}>EDIT PRESCRIPTION</Button>
             </div>
           </div>
         </Card>

         <Card className="bg-green-50 border-green-200">
           <div className="flex items-center gap-4">
             <ShieldCheck size={40} className="text-zennara-green" />
             <div>
               <h3 className="font-serif text-2xl font-bold text-zennara-green">SAFETY CHECK PASSED</h3>
               <p className="font-sans text-lg text-zennara-green">No conflicts with Penicillin allergy found.</p>
             </div>
           </div>
         </Card>

         <Card>
            <h2 className="font-serif text-2xl font-bold mb-4">CONSULTATION FEE</h2>
            <div className="flex items-center gap-4">
              <span className="font-serif text-4xl font-bold text-zennara-dark">₹500</span>
              <span className="text-zennara-light text-lg">Standard fee</span>
              <Button variant="ghost" size="medium">EDIT</Button>
            </div>
         </Card>

         <div 
           className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4 cursor-pointer active:bg-gray-50 transition-colors"
           onClick={() => setConfirmed(!confirmed)}
         >
            <div className={`w-14 h-14 rounded border-2 flex items-center justify-center transition-colors ${confirmed ? 'bg-zennara-green border-zennara-green' : 'border-gray-400'}`}>
              {confirmed && <Check size={32} className="text-white" />}
            </div>
            <span className="font-sans text-2xl font-medium text-zennara-dark">
              I have reviewed everything and it is correct
            </span>
         </div>
       </div>

       <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 z-50">
         <Button 
           size="huge" 
           fullWidth 
           disabled={!confirmed}
           onClick={() => onNavigate(Screen.SUCCESS)}
           className={confirmed ? 'animate-pulse' : ''}
         >
           {confirmed ? 'SEND TO PHARMACY NOW' : 'CONFIRM TO SEND'}
         </Button>
       </div>
    </div>
  );
}