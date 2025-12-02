import React from 'react';
import { Card, Button, Header } from '../components/UI';
import { Patient, Screen } from '../types';
import { AlertTriangle, FileText, Activity } from 'lucide-react';

interface OverviewProps {
  patient: Patient;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export const PatientOverview: React.FC<OverviewProps> = ({ patient, onNavigate, onBack }) => {
  const handleViewLastPrescription = () => {
    onNavigate(Screen.VIEW_LAST_PRESCRIPTION);
  };

  return (
    <div className="min-h-screen bg-zennara-bg pb-8 md:pb-12">
      <Header 
        showBack 
        onBack={onBack}
        title={patient.name.toUpperCase()}
        subtitle={`${patient.age} years • ${patient.gender} • Blood Group: O+`}
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-5 md:gap-6">
        
        {/* Allergy Alert - Huge */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="bg-red-600 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-7 shadow-lg text-white">
             <div className="flex items-center gap-2.5 md:gap-3 mb-2 md:mb-3">
               <AlertTriangle size={28} className="text-white md:w-9 md:h-9" />
               <h2 className="font-sans text-xl md:text-2xl font-bold">ALLERGY ALERT</h2>
             </div>
             <p className="font-sans text-lg md:text-xl opacity-90 mb-3 md:mb-4">This patient is ALLERGIC to:</p>
             <ul className="list-disc list-inside font-serif text-3xl md:text-4xl font-bold mb-3 md:mb-4">
               {patient.allergies.map(a => <li key={a}>{a.toUpperCase()}</li>)}
             </ul>
             <p className="font-sans text-base md:text-lg italic opacity-90">Do NOT prescribe penicillin-based antibiotics.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          <Card>
            <h3 className="font-sans text-lg md:text-xl font-bold text-zennara-dark mb-3 md:mb-4 flex items-center gap-2">
              <FileText size={20} className="text-zennara-light md:w-6 md:h-6" />
              <span className="leading-tight">LAST VISIT: Nov 10 (15 days ago)</span>
            </h3>
            <ul className="font-sans text-base md:text-lg lg:text-xl text-zennara-light space-y-2 md:space-y-2.5 lg:space-y-3">
              <li>• Prescribed Doxycycline 100mg</li>
              <li>• Assigned Carbon Laser Facial</li>
              <li>• Therapist: Meera Patel</li>
            </ul>
            <div className="mt-5 md:mt-6">
              <Button variant="secondary" size="medium" fullWidth onClick={handleViewLastPrescription}>VIEW LAST PRESCRIPTION</Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-sans text-lg md:text-xl font-bold text-zennara-dark mb-3 md:mb-4 flex items-center gap-2">
              <Activity size={20} className="text-zennara-light md:w-6 md:h-6" />
              MEDICAL SUMMARY
            </h3>
            <div className="space-y-3 md:space-y-4 font-sans text-base md:text-lg lg:text-xl text-zennara-dark">
               <div>
                 <span className="text-zennara-light block text-sm md:text-base">Current Medications</span>
                 <span>None</span>
               </div>
               <div>
                 <span className="text-zennara-light block text-sm md:text-base">Chronic Conditions</span>
                 <span>None</span>
               </div>
               <div>
                 <span className="text-zennara-light block text-sm md:text-base">Total Visits</span>
                 <span>5</span>
               </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 md:mt-8 mb-8 md:mb-12">
           <Button 
             size="large" 
             fullWidth 
             className="h-16 md:h-20 lg:h-24 text-xl md:text-2xl lg:text-3xl shadow-lg md:shadow-xl font-bold"
             onClick={() => onNavigate(Screen.CONSULTATION_SESSION)}
           >
             START CONSULTATION
           </Button>
        </div>

      </div>
    </div>
  );
};