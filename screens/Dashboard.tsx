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
  // Generate real-time date
  const getCurrentDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    
    return `${dayName}, ${monthName} ${date}, ${year}`;
  };

  const appointmentCount = mockPatients.length;
  const currentDateString = getCurrentDate();

  return (
    <div className="min-h-screen bg-zennara-bg pb-32 md:pb-40">
      <Header 
        title="TODAY'S PATIENTS" 
        subtitle={`${currentDateString} • ${appointmentCount} appointments`}
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-6 md:gap-7">
        {/* Waiting Patient (Highlighted) */}
        <div className="flex flex-col gap-3 md:gap-3.5">
           <div className="flex items-center gap-2 mb-0.5 pl-1">
             <div className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-100"></div>
             <span className="font-sans text-base md:text-lg font-semibold text-zennara-dark tracking-wide">WAITING NOW</span>
           </div>
           
           <Card className="border-l-[6px] md:border-l-[7px] border-l-zennara-green shadow-lg md:shadow-xl bg-white hover:scale-[1.005] transition-transform duration-300">
             <div className="flex flex-col gap-5 md:gap-6">
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                 <div className="flex-1">
                   <h2 className="font-serif text-2xl md:text-3xl lg:text-[32px] font-bold text-zennara-dark leading-tight">{mockPatients[0].name}</h2>
                   <p className="font-sans text-base md:text-lg text-zennara-light mt-1.5 md:mt-2">
                     {mockPatients[0].id} • {mockPatients[0].age}y • {mockPatients[0].gender}
                   </p>
                   <p className="font-sans text-sm md:text-base text-blue-600 font-medium mt-1 md:mt-1.5 flex items-center gap-1.5">
                     <Clock size={16} className="md:w-[18px] md:h-[18px]" /> Waiting {mockPatients[0].waitTime} mins
                   </p>
                 </div>
                 {/* Allergy Warning Badge */}
                 {mockPatients[0].allergies && (
                   <div className="bg-red-50 px-3 py-1.5 md:px-3.5 md:py-2 rounded-lg md:rounded-xl border border-red-100 flex items-center gap-1.5 md:gap-2 shadow-sm shrink-0">
                      <AlertTriangle size={18} className="text-red-600 md:w-5 md:h-5" />
                      <span className="text-red-700 font-sans font-bold text-xs md:text-sm lg:text-base">ALLERGY: {mockPatients[0].allergies.join(', ')}</span>
                   </div>
                 )}
               </div>
               
               <div className="mt-1 md:mt-2">
                 <Button 
                    size="large" 
                    fullWidth 
                    onClick={() => onNavigate(Screen.CONSULTATION_SESSION, mockPatients[0])}
                    className="h-12 md:h-14"
                 >
                    START CONSULTATION
                 </Button>
               </div>
             </div>
           </Card>
        </div>

        {/* Scheduled Patients */}
        <div className="mt-2 md:mt-3 flex flex-col gap-3 md:gap-3.5">
           <span className="font-sans text-base md:text-lg text-zennara-light pl-1 font-semibold">UPCOMING</span>
           {mockPatients.slice(1).map((p, index) => (
             <Card key={p.id} className="opacity-95 hover:opacity-100 transition-opacity">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                  <div className="flex gap-4 md:gap-5 items-center">
                    <div className="flex flex-col items-center justify-center w-14 h-14 md:w-[60px] md:h-[60px] bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 shrink-0">
                      <span className="font-serif text-base md:text-lg font-bold text-gray-400">3:{index * 30}0</span>
                      <span className="text-[10px] md:text-xs text-gray-400 uppercase">PM</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl md:text-2xl text-zennara-dark font-bold leading-tight">{p.name}</h3>
                      <p className="font-sans text-sm md:text-base text-zennara-light mt-0.5">{p.age}y • {p.gender} • {p.lastVisit}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="medium" onClick={() => onNavigate(Screen.PATIENT_OVERVIEW, p)} className="w-full sm:w-auto shrink-0">
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