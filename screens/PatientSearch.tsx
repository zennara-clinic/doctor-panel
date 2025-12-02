
import React, { useState, useEffect } from 'react';
import { Card, Button, Header, Select, BottomNavigation } from '../components/UI';
import { Screen, Patient } from '../types';

export const PatientSearch: React.FC<{ onNavigate: (s: Screen, p?: Patient) => void; onBack: () => void }> = ({ onNavigate, onBack }) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterDate, setFilterDate] = useState('All Time');

  const mockDatabase = [
    { id: 'ZN001', name: 'Priya Sharma', details: '28F • Last visit: Nov 10', type: 'Consultation', date: '2025-11-10' },
    { id: 'ZN045', name: 'Rajesh Kumar', details: '35M • Last visit: Nov 20', type: 'Follow-up', date: '2025-11-20' },
    { id: 'ZN012', name: 'Anita Desai', details: '42F • New Patient', type: 'New', date: '2025-11-25' },
    { id: 'ZN089', name: 'Sunita Reddy', details: '25F • Last visit: Oct 15', type: 'Consultation', date: '2025-10-15' },
    { id: 'ZN102', name: 'Rahul Verma', details: '30M • Last visit: Nov 22', type: 'Procedure', date: '2025-11-22' },
    { id: 'ZN156', name: 'Amit Shah', details: '50M • Last visit: Nov 01', type: 'Follow-up', date: '2025-11-01' },
    { id: 'ZN201', name: 'Kavita Iyer', details: '29F • New Patient', type: 'New', date: '2025-11-24' },
    { id: 'ZN233', name: 'Arjun Das', details: '33M • Last visit: Sep 12', type: 'Consultation', date: '2025-09-12' },
    { id: 'ZN305', name: 'Zara Khan', details: '22F • Last visit: Nov 18', type: 'Procedure', date: '2025-11-18' },
    { id: 'ZN340', name: 'Deepak Chopra', details: '45M • Last visit: Oct 30', type: 'Follow-up', date: '2025-10-30' },
    { id: 'ZN412', name: 'Sneha Patel', details: '27F • Last visit: Nov 05', type: 'Consultation', date: '2025-11-05' },
    { id: 'ZN455', name: 'Rohan Mehta', details: '38M • Last visit: Aug 20', type: 'Consultation', date: '2025-08-20' },
    { id: 'ZN501', name: 'Pooja Hegde', details: '31F • New Patient', type: 'New', date: '2025-11-25' },
    { id: 'ZN567', name: 'Manish Malhotra', details: '55M • Last visit: Nov 15', type: 'Procedure', date: '2025-11-15' },
  ];

  const [results, setResults] = useState(mockDatabase);

  useEffect(() => {
    let filtered = mockDatabase;

    // Filter by Query
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.id.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by Type
    if (filterType !== 'All') {
      filtered = filtered.filter(p => p.type === filterType);
    }

    // Filter by Date (Simple Mock Logic)
    if (filterDate === 'This Month') {
      filtered = filtered.filter(p => p.date.startsWith('2025-11'));
    } else if (filterDate === 'Last Month') {
      filtered = filtered.filter(p => p.date.startsWith('2025-10'));
    }

    setResults(filtered);
  }, [query, filterType, filterDate]);

  return (
    <div className="min-h-screen bg-zennara-bg pb-32 md:pb-40">
      <Header 
        showBack 
        onBack={onBack} 
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
        title="FIND PATIENT" 
        subtitle="Search by name, ID, or phone" 
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-6 md:gap-7">
        {/* Search Bar */}
        <div className="bg-white p-2 md:p-2.5 rounded-xl md:rounded-2xl shadow-sm md:shadow-md border border-gray-200">
           <input 
             className="w-full h-16 md:h-20 lg:h-[88px] px-4 md:px-5 lg:px-6 text-xl md:text-2xl lg:text-3xl font-serif outline-none placeholder:text-gray-300 bg-transparent"
             placeholder="Type name or ID..."
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             autoFocus
           />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <Select 
            label="Filter by Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: 'All', label: 'All Types' },
              { value: 'Consultation', label: 'Consultation' },
              { value: 'Follow-up', label: 'Follow-up' },
              { value: 'Procedure', label: 'Procedure' },
              { value: 'New', label: 'New Patient' },
            ]}
          />
          <Select 
            label="Filter by Date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            options={[
              { value: 'All Time', label: 'All Dates' },
              { value: 'This Month', label: 'This Month' },
              { value: 'Last Month', label: 'Last Month' },
            ]}
          />
        </div>

        {/* Results */}
        <div className="flex flex-col gap-3 md:gap-4">
           <h2 className="font-serif text-xl md:text-2xl text-zennara-dark font-bold">RESULTS ({results.length})</h2>
           
           {results.length > 0 ? (
             results.map(p => (
               <Card key={p.id} onClick={() => onNavigate(Screen.PATIENT_OVERVIEW)} className="hover:bg-gray-50 active:bg-gray-100 transition-all hover:shadow-lg cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-5">
                     <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
                       <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-zennara-green to-teal-800 text-white flex items-center justify-center font-serif text-lg md:text-xl lg:text-2xl shadow-md shrink-0">
                         {p.name.charAt(0)}
                       </div>
                       <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-bold text-zennara-dark truncate">{p.name}</h3>
                          <p className="text-zennara-light text-sm md:text-base lg:text-lg truncate">{p.id} • {p.details}</p>
                       </div>
                     </div>
                     <div className="flex sm:flex-col items-center sm:items-end gap-2 justify-between sm:justify-start">
                        <span className="bg-gray-100 text-gray-600 px-2.5 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium">{p.type}</span>
                        <Button variant="ghost" size="medium" className="text-zennara-green text-sm md:text-base">VIEW →</Button>
                     </div>
                  </div>
               </Card>
             ))
           ) : (
             <div className="text-center py-12 md:py-16 opacity-50">
               <span className="text-5xl md:text-6xl block mb-3 md:mb-4">🔍</span>
               <p className="text-lg md:text-xl font-sans">No patients found matching your criteria.</p>
             </div>
           )}
        </div>
      </div>

      <BottomNavigation activeScreen={Screen.SEARCH} onNavigate={onNavigate} />
    </div>
  );
};
