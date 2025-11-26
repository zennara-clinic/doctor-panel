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
  return (
    <div className="min-h-screen bg-zennara-bg pb-8">
      <Header 
        showBack 
        onBack={onBack}
        title={patient.name.toUpperCase()}
        subtitle={`${patient.age} years • ${patient.gender} • Blood Group: O+`}
      />

      <div className="px-6 flex flex-col gap-6">
        
        {/* Allergy Alert - Huge */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="bg-red-600 rounded-xl p-6 shadow-md text-white">
             <div className="flex items-center gap-3 mb-2">
               <AlertTriangle size={36} className="text-white" />
               <h2 className="font-sans text-2xl font-bold">ALLERGY ALERT</h2>
             </div>
             <p className="font-sans text-xl opacity-90 mb-4">This patient is ALLERGIC to:</p>
             <ul className="list-disc list-inside font-serif text-4xl font-bold mb-4">
               {patient.allergies.map(a => <li key={a}>{a.toUpperCase()}</li>)}
             </ul>
             <p className="font-sans text-lg italic opacity-90">Do NOT prescribe penicillin-based antibiotics.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-sans text-xl font-bold text-zennara-dark mb-4 flex items-center gap-2">
              <FileText size={24} className="text-zennara-light" />
              LAST VISIT: Nov 10 (15 days ago)
            </h3>
            <ul className="font-sans text-xl text-zennara-light space-y-3">
              <li>• Prescribed Doxycycline 100mg</li>
              <li>• Assigned Carbon Laser Facial</li>
              <li>• Therapist: Meera Patel</li>
            </ul>
            <div className="mt-6">
              <Button variant="secondary" size="medium" fullWidth>VIEW LAST PRESCRIPTION</Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-sans text-xl font-bold text-zennara-dark mb-4 flex items-center gap-2">
              <Activity size={24} className="text-zennara-light" />
              MEDICAL SUMMARY
            </h3>
            <div className="space-y-4 font-sans text-xl text-zennara-dark">
               <div>
                 <span className="text-zennara-light block text-base">Current Medications</span>
                 <span>None</span>
               </div>
               <div>
                 <span className="text-zennara-light block text-base">Chronic Conditions</span>
                 <span>None</span>
               </div>
               <div>
                 <span className="text-zennara-light block text-base">Total Visits</span>
                 <span>5</span>
               </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 mb-12">
           <Button 
             size="huge" 
             fullWidth 
             className="h-[120px] text-3xl shadow-xl"
             onClick={() => onNavigate(Screen.CONSULTATION)}
           >
             START CONSULTATION
           </Button>
        </div>

      </div>
    </div>
  );
};