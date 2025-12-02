import React, { useState } from 'react';
import { Card, Header, BottomNavigation } from '../components/UI';
import { Patient, Screen } from '../types';
import { Search, User } from 'lucide-react';

interface HistoryPatientListProps {
  onNavigate: (screen: Screen, patient?: Patient) => void;
  onBack: () => void;
}

export const HistoryPatientList: React.FC<HistoryPatientListProps> = ({ onNavigate, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock patient database
  const allPatients: Patient[] = [
    { id: 'ZN001', name: 'Priya Sharma', age: 28, gender: 'Female', status: 'Completed', allergies: ['Penicillin'], photoUrl: 'https://picsum.photos/200', lastVisit: 'Nov 10, 2025' },
    { id: 'ZN045', name: 'Rajesh Kumar', age: 35, gender: 'Male', status: 'Completed', photoUrl: 'https://picsum.photos/201', lastVisit: 'Nov 20, 2025' },
    { id: 'ZN023', name: 'Anita Desai', age: 42, gender: 'Female', status: 'Completed', photoUrl: 'https://picsum.photos/202', lastVisit: 'Nov 25, 2025' },
    { id: 'ZN089', name: 'Vikram Singh', age: 55, gender: 'Male', status: 'Completed', photoUrl: 'https://picsum.photos/203', lastVisit: 'Oct 15, 2025' },
    { id: 'ZN092', name: 'Meera Patel', age: 31, gender: 'Female', status: 'Completed', photoUrl: 'https://picsum.photos/204', lastVisit: 'Nov 01, 2025' },
    { id: 'ZN104', name: 'Sanjay Gupta', age: 45, gender: 'Male', status: 'Completed', photoUrl: 'https://picsum.photos/205', lastVisit: 'Nov 15, 2025' },
    { id: 'ZN156', name: 'Kavita Iyer', age: 29, gender: 'Female', status: 'Completed', photoUrl: 'https://picsum.photos/206', lastVisit: 'Oct 28, 2025' },
    { id: 'ZN201', name: 'Arjun Das', age: 33, gender: 'Male', status: 'Completed', photoUrl: 'https://picsum.photos/207', lastVisit: 'Sep 12, 2025' },
  ];

  const filteredPatients = allPatients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientSelect = (patient: Patient) => {
    onNavigate(Screen.HISTORY, patient);
  };

  return (
    <div className="min-h-screen bg-zennara-bg pb-32 md:pb-40">
      <Header 
        showBack
        onBack={onBack}
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
        title="PATIENT HISTORY"
        subtitle="Select a patient to view medical history"
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-5 md:gap-6">
        
        {/* Search Bar */}
        <div className="bg-white p-2 md:p-2.5 rounded-xl md:rounded-2xl shadow-sm md:shadow-md border border-gray-200">
          <div className="flex items-center gap-3 px-3 md:px-4">
            <Search size={24} className="text-gray-400 shrink-0 md:w-6 md:h-6" />
            <input 
              className="flex-1 h-14 md:h-16 text-lg md:text-xl font-sans outline-none placeholder:text-gray-300 bg-transparent"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <h2 className="font-serif text-xl md:text-2xl text-zennara-dark font-bold">
            Patients ({filteredPatients.length})
          </h2>
        </div>

        {/* Patient List */}
        {filteredPatients.length > 0 ? (
          <div className="flex flex-col gap-3 md:gap-4">
            {filteredPatients.map(patient => (
              <Card 
                key={patient.id} 
                onClick={() => handlePatientSelect(patient)}
                className="cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center gap-4 md:gap-5">
                  {/* Avatar */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-zennara-green to-teal-800 text-white flex items-center justify-center font-serif text-xl md:text-2xl shadow-md shrink-0">
                    {patient.name.charAt(0)}
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-bold text-zennara-dark truncate">
                      {patient.name}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-zennara-light mt-0.5">
                      {patient.id} • {patient.age}y • {patient.gender}
                    </p>
                    <p className="font-sans text-xs md:text-sm text-gray-500 mt-0.5">
                      Last Visit: {patient.lastVisit}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="text-zennara-light text-2xl shrink-0">
                    →
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20 opacity-50">
            <User size={64} className="mx-auto mb-4 text-gray-300 md:w-20 md:h-20" />
            <p className="text-lg md:text-xl font-sans text-gray-500">No patients found matching your search.</p>
          </div>
        )}

      </div>

      <BottomNavigation activeScreen={Screen.HISTORY_PATIENT_LIST} onNavigate={onNavigate} />
    </div>
  );
};
