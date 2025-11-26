import React from 'react';
import { Card, Button, Header, BottomNavigation } from '../components/UI';
import { Patient, Screen } from '../types';
import { Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: Screen, patient?: Patient) => void;
}

const mockPatients: Patient[] = [
  { id: 'ZN001', name: 'Priya Sharma', age: 28, gender: 'Female', status: 'Waiting', waitTime: 10, allergies: ['Penicillin'], photoUrl: 'https://picsum.photos/200' },
  { id: 'ZN045', name: 'Rajesh Kumar', age: 35, gender: 'Male', status: 'Scheduled', lastVisit: '2025-11-10', photoUrl: 'https://picsum.photos/201' },
  { id: 'ZN023', name: 'Anita Desai', age: 42, gender: 'Female', status: 'Scheduled', lastVisit: 'New Patient', photoUrl: 'https://picsum.photos/202' },
  { id: 'ZN089', name: 'Vikram Singh', age: 55, gender: 'Male', status: 'Scheduled', lastVisit: '2025-10-05', photoUrl: 'https://picsum.photos/203' },
  { id: 'ZN092', name: 'Meera Patel', age: 31, gender: 'Female', status: 'Scheduled', lastVisit: '2025-11-01', photoUrl: 'https://picsum.photos/204' },
  { id: 'ZN104', name: 'Sanjay Gupta', age: 45, gender: 'Male', status: 'Scheduled', lastVisit: 'New Patient', photoUrl: 'https://picsum.photos/205' },
];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-zennara-bg pb-40">
      <Header 
        title="TODAY'S PATIENTS" 
        subtitle="Tuesday, November 25, 2025 • 12 appointments"
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
      />

      <div className="px-6 flex flex-col gap-8">
        {/* Waiting Patient (Highlighted) */}
        <div className="flex flex-col gap-3">
           <div className="flex items-center gap-2 mb-1 pl-2">
             <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-100"></div>
             <span className="font-sans text-xl font-medium text-zennara-dark tracking-wide">WAITING NOW</span>
           </div>
           
           <Card className="border-l-[8px] border-l-zennara-green shadow-xl bg-white hover:scale-[1.01] transition-transform duration-300">
             <div className="flex flex-col gap-6">
               <div className="flex justify-between items-start">
                 <div>
                   <h2 className="font-serif text-4xl font-bold text-zennara-dark">{mockPatients[0].name}</h2>
                   <p className="font-sans text-xl text-zennara-light mt-2">
                     {mockPatients[0].id} • {mockPatients[0].age}y • {mockPatients[0].gender}
                   </p>
                   <p className="font-sans text-lg text-blue-600 font-medium mt-1 flex items-center gap-2">
                     <Clock size={20} /> Waiting {mockPatients[0].waitTime} mins
                   </p>
                 </div>
                 {/* Allergy Warning Badge */}
                 {mockPatients[0].allergies && (
                   <div className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 flex items-center gap-2 shadow-sm">
                      <AlertTriangle size={24} className="text-red-600" />
                      <span className="text-red-700 font-sans font-bold text-lg">ALLERGY: {mockPatients[0].allergies.join(', ')}</span>
                   </div>
                 )}
               </div>
               
               <div className="mt-2">
                 <Button 
                    size="huge" 
                    fullWidth 
                    onClick={() => onNavigate(Screen.PATIENT_OVERVIEW, mockPatients[0])}
                 >
                    START CONSULTATION
                 </Button>
               </div>
             </div>
           </Card>
        </div>

        {/* Scheduled Patients */}
        <div className="mt-4 flex flex-col gap-4">
           <span className="font-sans text-xl text-zennara-light pl-2 font-medium">UPCOMING</span>
           {mockPatients.slice(1).map((p, index) => (
             <Card key={p.id} className="opacity-95 hover:opacity-100">
                <div className="flex justify-between items-center">
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="font-serif text-lg font-bold text-gray-400">3:{index * 30}0</span>
                      <span className="text-xs text-gray-400 uppercase">PM</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-zennara-dark font-bold">{p.name}</h3>
                      <p className="font-sans text-lg text-zennara-light">{p.age}y • {p.gender} • {p.lastVisit}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="medium" onClick={() => onNavigate(Screen.PATIENT_OVERVIEW, p)}>
                    VIEW PATIENT
                  </Button>
                </div>
             </Card>
           ))}
        </div>
      </div>

      <BottomNavigation activeScreen={Screen.DASHBOARD} onNavigate={onNavigate} />
    </div>
  );
};