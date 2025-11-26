import React from 'react';
import { Card, Button, Header } from '../components/UI';
import { Screen } from '../types';
import { FileText, Plus, Settings } from 'lucide-react';

export const TemplateManagement: React.FC<{ onNavigate: (screen: Screen) => void; onBack: () => void }> = ({ onNavigate, onBack }) => {
  const templates = [
    { id: 1, name: 'Acne Treatment (Standard)', used: 47, meds: 2 },
    { id: 2, name: 'Skin Consultation (General)', used: 32, meds: 0 },
    { id: 3, name: 'Post-Treatment Follow-up', used: 28, meds: 1 },
    { id: 4, name: 'Anti-Aging Protocol', used: 15, meds: 3 },
    { id: 5, name: 'Hair Loss (Minoxidil)', used: 42, meds: 2 },
    { id: 6, name: 'Psoriasis Flare-up', used: 11, meds: 2 },
    { id: 7, name: 'Eczema Maintenance', used: 19, meds: 2 },
    { id: 8, name: 'Pigmentation (Melasma)', used: 25, meds: 3 },
  ];

  return (
    <div className="min-h-screen bg-zennara-bg">
      <Header 
        showBack 
        onBack={onBack} 
        title="MANAGE TEMPLATES" 
        subtitle="Create and edit prescription templates"
        rightAction={<Button size="medium" icon={<Plus size={20} />}>NEW TEMPLATE</Button>}
      />

      <div className="px-6 flex flex-col gap-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map(t => (
            <Card key={t.id} className="flex flex-col gap-4 group hover:border-zennara-green cursor-pointer">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-zennara-green">
                    <FileText size={24} />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-zennara-green transition-opacity flex items-center gap-1">
                    <Settings size={16} /> Edit
                  </button>
               </div>
               
               <div>
                 <h3 className="font-serif text-2xl font-bold text-zennara-dark">{t.name}</h3>
                 <p className="text-zennara-light mt-1">Used {t.used} times</p>
               </div>

               <div className="mt-2 pt-4 border-t border-gray-100 flex gap-2">
                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">{t.meds} medications</span>
                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">Auto-fill enabled</span>
               </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};