
import React, { useState } from 'react';
import { Card, Button, Header, BottomNavigation } from '../components/UI';
import { Patient, Screen } from '../types';

interface MedicalHistoryProps {
  patient?: Patient;
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

export const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient, onBack, onNavigate }) => {
  // Use mock data if no patient passed (e.g. from nav bar)
  const name = patient?.name || "Priya Sharma";
  
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const history = [
    { 
      id: 'h1', date: 'Nov 10, 2025', doctor: 'Dr. Ramesh Reddy', type: 'Laser Therapy', status: 'Completed',
      details: { diagnosis: 'Acne Vulgaris', rx: 'Doxycycline 100mg', treatment: 'Carbon Laser Facial' } 
    },
    { 
      id: 'h2', date: 'Oct 28, 2025', doctor: 'Dr. Kavita Singh', type: 'Follow-up', status: 'Completed',
      details: { diagnosis: 'Acne Vulgaris', rx: 'None', treatment: 'Check-up' } 
    },
    { 
      id: 'h3', date: 'Oct 15, 2025', doctor: 'Dr. Ramesh Reddy', type: 'Initial Consultation', status: 'Completed',
      details: { diagnosis: 'Acne Vulgaris', rx: 'Benzoyl Peroxide', treatment: 'None' } 
    },
    { 
      id: 'h4', date: 'Sep 05, 2025', doctor: 'Dr. Kavita Singh', type: 'Skin Analysis', status: 'Completed',
      details: { diagnosis: 'Oily Skin', rx: 'Salicylic Acid Face Wash', treatment: 'Hydrafacial' } 
    },
    { 
      id: 'h5', date: 'Aug 12, 2025', doctor: 'Dr. Ramesh Reddy', type: 'Consultation', status: 'Completed',
      details: { diagnosis: 'Mild Acne', rx: 'Clindamycin Gel', treatment: 'None' } 
    }
  ];

  const handleViewRx = () => alert('View Prescription PDF (Demo)');
  const handleDetails = () => alert('View Full Details (Demo)');
  const handleEditInfo = () => alert('Edit Patient Information (Demo)');

  return (
    <div className="min-h-screen bg-zennara-bg pb-40">
      <Header 
        showBack 
        onBack={onBack} 
        onHome={() => onNavigate && onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate && onNavigate(Screen.NOTIFICATIONS)}
        title="MEDICAL HISTORY" 
        subtitle={`${name} • 28 years • Female`} 
      />

      <div className="px-6 flex flex-col gap-6">
        
        {/* Allergy Alert */}
        <div className="bg-red-600 p-6 rounded-3xl text-white shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚠️</span>
            <span className="font-serif text-2xl font-bold">ALLERGIES: PENICILLIN</span>
          </div>
          <p className="font-sans text-lg opacity-90">Added Oct 15, 2025 • Do not prescribe penicillin-based antibiotics.</p>
        </div>

        {/* Info Grid */}
        <Card>
          <h2 className="font-serif text-2xl font-bold mb-4">PATIENT INFORMATION</h2>
          <div className="grid grid-cols-2 gap-y-4 font-sans text-xl text-zennara-dark">
             <div><span className="text-zennara-light block text-base">Blood Group</span>O+</div>
             <div><span className="text-zennara-light block text-base">BMI</span>21.3 (Normal)</div>
             <div><span className="text-zennara-light block text-base">Phone</span>+91 98765 43210</div>
             <div><span className="text-zennara-light block text-base">Member Since</span>Aug 12, 2025</div>
          </div>
          <div className="mt-4 pt-4 border-t">
             <Button variant="secondary" size="medium" onClick={handleEditInfo}>EDIT INFORMATION</Button>
          </div>
        </Card>

        {/* Timeline */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4 ml-2">CONSULTATION TIMELINE</h2>
          <div className="flex flex-col gap-4">
            {history.map(item => {
              const isExpanded = expandedId === item.id;
              return (
                <Card key={item.id} onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                   <div className="flex items-start gap-4">
                      <div className="mt-2 w-3 h-3 rounded-full bg-zennara-dark"></div>
                      <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                            <h3 className="font-serif text-2xl text-zennara-dark">{item.date}</h3>
                            <span className="text-zennara-light text-sm font-sans">{isExpanded ? 'COLLAPSE ▲' : 'EXPAND ▼'}</span>
                         </div>
                         <p className="font-sans text-lg">{item.type} • {item.doctor}</p>
                         
                         {isExpanded && (
                           <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in space-y-3">
                              <div><span className="font-bold">Diagnosis:</span> {item.details.diagnosis}</div>
                              <div><span className="font-bold">Prescription:</span> {item.details.rx}</div>
                              <div><span className="font-bold">Treatment:</span> {item.details.treatment}</div>
                              <div className="flex gap-4 mt-4">
                                <Button variant="secondary" size="medium" onClick={handleViewRx}>VIEW RX</Button>
                                <Button variant="secondary" size="medium" onClick={handleDetails}>DETAILS</Button>
                              </div>
                           </div>
                         )}
                      </div>
                   </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Documents */}
        <div>
           <h2 className="font-serif text-2xl font-bold mb-4 ml-2">DOCUMENTS</h2>
           <div className="grid grid-cols-2 gap-4">
              {['Lab Report (Nov 5)', 'Previous Rx (Oct 10)', 'Skin Analysis (Sep 05)'].map((doc, i) => (
                <Card key={i} className="flex flex-col items-center justify-center py-8 gap-4">
                   <span className="text-4xl">📄</span>
                   <span className="font-serif text-xl">{doc}</span>
                   <Button variant="ghost" size="medium">VIEW</Button>
                </Card>
              ))}
           </div>
        </div>

      </div>

      {onNavigate && <BottomNavigation activeScreen={Screen.HISTORY} onNavigate={onNavigate} />}
    </div>
  );
};
