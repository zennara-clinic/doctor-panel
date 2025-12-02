import React, { useState } from 'react';
import { Card, Button, Header, BottomNavigation } from '../components/UI';
import { Screen, Patient } from '../types';
import { FileText, Trash2, Lightbulb } from 'lucide-react';

interface Draft {
  id: number;
  name: string;
  pid: string;
  time: string;
  status: string;
  progress: number;
  color: string;
  patient: Patient;
}

export const Drafts: React.FC<{ onNavigate: (screen: Screen, patient?: Patient) => void; onBack: () => void }> = ({ onNavigate, onBack }) => {
  const [drafts, setDrafts] = useState<Draft[]>([
    { 
      id: 1, 
      name: 'Priya Sharma', 
      pid: 'ZN001', 
      time: '15m ago', 
      status: 'Prescription', 
      progress: 70, 
      color: 'bg-zennara-green',
      patient: { id: 'ZN001', name: 'Priya Sharma', age: 28, gender: 'Female', status: 'Waiting', allergies: ['Penicillin'], photoUrl: 'https://picsum.photos/200' }
    },
    { 
      id: 2, 
      name: 'Rajesh Kumar', 
      pid: 'ZN045', 
      time: '2h ago', 
      status: 'Treatment', 
      progress: 40, 
      color: 'bg-yellow-500',
      patient: { id: 'ZN045', name: 'Rajesh Kumar', age: 35, gender: 'Male', status: 'Scheduled', photoUrl: 'https://picsum.photos/201' }
    },
    { 
      id: 3, 
      name: 'Anita Desai', 
      pid: 'ZN023', 
      time: '5h ago', 
      status: 'Notes', 
      progress: 80, 
      color: 'bg-zennara-green',
      patient: { id: 'ZN023', name: 'Anita Desai', age: 42, gender: 'Female', status: 'Scheduled', photoUrl: 'https://picsum.photos/202' }
    },
    { 
      id: 4, 
      name: 'Vikram Singh', 
      pid: 'ZN089', 
      time: '1d ago', 
      status: 'Prescription', 
      progress: 10, 
      color: 'bg-red-400',
      patient: { id: 'ZN089', name: 'Vikram Singh', age: 55, gender: 'Male', status: 'Scheduled', photoUrl: 'https://picsum.photos/203' }
    },
    { 
      id: 5, 
      name: 'Sanjay Gupta', 
      pid: 'ZN104', 
      time: '2d ago', 
      status: 'Treatment', 
      progress: 60, 
      color: 'bg-blue-400',
      patient: { id: 'ZN104', name: 'Sanjay Gupta', age: 45, gender: 'Male', status: 'Scheduled', photoUrl: 'https://picsum.photos/205' }
    },
  ]);

  const handleDelete = (id: number) => {
    setDrafts(drafts.filter(d => d.id !== id));
  };

  const handleClearAll = () => {
    setDrafts([]);
  };

  const handleResume = (draft: Draft) => {
    // Route to appropriate screen based on what's incomplete
    switch (draft.status) {
      case 'Treatment':
        // Treatment incomplete → go to consultation session timer
        onNavigate(Screen.CONSULTATION_SESSION, draft.patient);
        break;
      case 'Prescription':
        // Prescription incomplete → go to prescription screen
        onNavigate(Screen.CONSULTATION, draft.patient);
        break;
      case 'Notes':
        // Notes incomplete → go to consultation session timer
        onNavigate(Screen.CONSULTATION_SESSION, draft.patient);
        break;
      default:
        onNavigate(Screen.CONSULTATION, draft.patient);
    }
  };

  return (
    <div className="min-h-screen bg-zennara-bg pb-32 md:pb-40">
      <Header 
        showBack 
        onBack={onBack} 
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
        title="DRAFTS" 
        subtitle="Resume incomplete work" 
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-5 md:gap-6">
        
        {/* List Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-serif text-xl md:text-2xl text-zennara-dark font-bold">Active Drafts ({drafts.length})</h2>
          <button 
            className="text-red-500 font-sans text-base md:text-lg hover:underline cursor-pointer transition-opacity hover:opacity-80"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>

        {/* Draft Items - Grid Layout */}
        {drafts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {drafts.map(draft => (
              <Card key={draft.id} className="relative overflow-hidden hover:shadow-lg transition-all hover:scale-[1.01]">
                <div className="flex flex-col gap-4">
                  
                  {/* Top: Icon & Info */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-100 flex items-center justify-center text-zennara-green shrink-0">
                      <FileText size={24} className="md:w-7 md:h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-bold text-zennara-dark leading-tight truncate">{draft.name}</h3>
                       <div className="flex items-center gap-1.5 md:gap-2 text-zennara-light text-xs md:text-sm mt-0.5">
                         <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px] md:text-xs">{draft.pid}</span>
                         <span>•</span>
                         <span>Edited {draft.time}</span>
                       </div>
                    </div>
                  </div>

                  {/* Progress & Status */}
                  <div>
                     <div className="flex justify-between text-xs md:text-sm font-medium mb-1.5">
                       <span className="text-zennara-dark">{draft.status} Incomplete</span>
                       <span className="text-zennara-light">{draft.progress}%</span>
                     </div>
                     <div className="w-full bg-gray-100 h-1.5 md:h-2 rounded-full overflow-hidden">
                       <div className={`h-full rounded-full ${draft.color} transition-all`} style={{ width: `${draft.progress}%` }}></div>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 md:gap-3 mt-1">
                     <button 
                       onClick={() => handleDelete(draft.id)}
                       className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg md:rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                     >
                       <Trash2 size={20} className="md:w-[22px] md:h-[22px]" />
                     </button>
                     <Button size="medium" onClick={() => handleResume(draft)} className="flex-1">RESUME</Button>
                  </div>

                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-50">
            <div className="flex justify-center mb-4">
              <FileText size={64} className="text-gray-300" />
            </div>
            <p className="text-2xl font-serif">All caught up! No drafts pending.</p>
          </div>
        )}

        {/* Tip Card */}
        {drafts.length > 0 && (
          <div className="mt-2 md:mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-5 lg:p-6 rounded-2xl md:rounded-3xl border border-blue-100 flex gap-3 md:gap-4 items-start shadow-sm">
             <Lightbulb size={24} className="text-blue-600 shrink-0 mt-0.5 md:mt-1 md:w-7 md:h-7" />
             <div className="flex-1">
               <h3 className="font-sans font-bold text-base md:text-lg text-blue-900">Did you know?</h3>
               <p className="font-sans text-sm md:text-base lg:text-lg text-blue-800 leading-relaxed mt-1">
                 Drafts are saved locally every 3 seconds. You can safely close the app and return later.
                 Drafts older than 7 days are automatically removed to keep your panel clean.
               </p>
             </div>
          </div>
        )}
      </div>

      <BottomNavigation activeScreen={Screen.DRAFTS} onNavigate={onNavigate} />
    </div>
  );
};