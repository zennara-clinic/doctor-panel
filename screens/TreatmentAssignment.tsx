import React, { useState } from 'react';
import { Card, Button, Header } from '../components/UI';
import { Patient, Screen } from '../types';
import { Check, Mic, Clock, Circle } from 'lucide-react';

interface TreatmentAssignmentProps {
  patient: Patient;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

const TREATMENTS = [
  { id: 't1', name: 'Carbon Laser Facial', desc: 'Best for: Acne, Pigmentation', duration: '45 mins', cost: 7000, available: true },
  { id: 't2', name: 'Hydrafacial', desc: 'Best for: Deep cleansing, Glow', duration: '60 mins', cost: 8000, available: false, wait: '20 mins' },
  { id: 't3', name: 'Chemical Peel', desc: 'Best for: Fine lines, Sun damage', duration: '30 mins', cost: 5500, available: true },
  { id: 't4', name: 'Microneedling (PRP)', desc: 'Best for: Scars, Rejuvenation', duration: '60 mins', cost: 12000, available: true },
  { id: 't5', name: 'Laser Hair Reduction', desc: 'Full Face', duration: '30 mins', cost: 4500, available: true },
  { id: 't6', name: 'Medi-Facial', desc: 'Hydration Boost', duration: '45 mins', cost: 3500, available: false, wait: '1 hr' },
];

const THERAPISTS = [
  { id: 'th1', name: 'Meera Patel', status: 'Available now', load: 'light', recommended: true },
  { id: 'th2', name: 'Anita Kumar', status: 'Available in 20 mins', load: 'busy', recommended: false },
  { id: 'th3', name: 'Raj Singh', status: 'Available now', load: 'moderate', recommended: false },
  { id: 'th4', name: 'Sneha Roy', status: 'On Leave', load: '-', recommended: false },
];

export const TreatmentAssignment: React.FC<TreatmentAssignmentProps> = ({ patient, onNavigate, onBack }) => {
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(['t1']);
  const [selectedTherapist, setSelectedTherapist] = useState<string>('th1');
  const [notes, setNotes] = useState('');

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedTherapistName = THERAPISTS.find(t => t.id === selectedTherapist)?.name;

  return (
    <div className="min-h-screen bg-zennara-bg pb-32">
      <Header 
        showBack 
        onBack={onBack}
        title="ASSIGN TREATMENT" 
        subtitle={`Select treatments for ${patient.name}`}
      />

      <div className="px-6 flex flex-col gap-8">
        
        {/* Treatments List */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-zennara-dark mb-4">POPULAR TREATMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TREATMENTS.map(t => {
              const isSelected = selectedTreatments.includes(t.id);
              return (
                <Card 
                  key={t.id} 
                  active={isSelected}
                  onClick={() => toggleTreatment(t.id)}
                  className="transition-transform active:scale-[0.99]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded flex items-center justify-center border-2 ${isSelected ? 'bg-zennara-green border-zennara-green' : 'border-gray-300'}`}>
                      {isSelected && <Check size={24} className="text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-serif text-2xl font-bold">{t.name}</h3>
                        <span className="font-sans text-xl font-medium">₹{t.cost}</span>
                      </div>
                      <p className="font-sans text-lg text-zennara-light">{t.desc}</p>
                      <div className="flex items-center gap-4 mt-2 text-lg">
                        <span className="flex items-center gap-1"><Clock size={16} /> {t.duration}</span>
                        {t.available ? (
                          <span className="text-zennara-green flex items-center gap-1 font-medium"><Circle size={10} fill="currentColor" /> Therapist available</span>
                        ) : (
                          <span className="text-yellow-600 flex items-center gap-1 font-medium"><Circle size={10} fill="currentColor" /> {t.wait} wait</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Therapist Selection */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-zennara-dark mb-4">WHICH THERAPIST?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THERAPISTS.map(th => {
              const isSelected = selectedTherapist === th.id;
              return (
                <Card 
                  key={th.id}
                  active={isSelected}
                  onClick={() => th.status !== 'On Leave' && setSelectedTherapist(th.id)}
                  className={`py-4 ${th.status === 'On Leave' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-zennara-green' : 'border-gray-300'}`}>
                      {isSelected && <div className="w-4 h-4 rounded-full bg-zennara-green"></div>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl">{th.name}</h3>
                      <div className="flex gap-4 text-lg items-center">
                        <span className={`flex items-center gap-1 ${th.id === 'th1' || th.id === 'th3' ? 'text-zennara-green' : th.status === 'On Leave' ? 'text-red-400' : 'text-yellow-600'}`}>
                          <Circle size={10} fill="currentColor" /> {th.status}
                        </span>
                        <span className="text-zennara-light">{th.load} workload</span>
                      </div>
                    </div>
                    {th.recommended && <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600">RECOMMENDED</span>}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-zennara-dark mb-4">INSTRUCTIONS (OPTIONAL)</h2>
          <div className="relative">
             <textarea 
               className="w-full h-32 p-4 text-xl border border-gray-300 rounded-xl focus:border-zennara-green outline-none"
               placeholder="Focus on cheek area..."
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
             />
             <button className="absolute right-4 bottom-4 text-zennara-green bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 border border-gray-100">
               <Mic size={24} />
             </button>
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 shadow-lg z-50">
        <Button size="huge" fullWidth onClick={() => onNavigate(Screen.DASHBOARD)}>
          ASSIGN TO {selectedTherapistName?.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};