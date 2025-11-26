import React, { useState } from 'react';
import { Card, Button, Header, BottomNavigation } from '../components/UI';
import { Screen } from '../types';
import { FileText, Trash2, Lightbulb } from 'lucide-react';

export const Drafts: React.FC<{ onNavigate: (screen: Screen) => void; onBack: () => void }> = ({ onNavigate, onBack }) => {
  const [drafts, setDrafts] = useState([
    { id: 1, name: 'Priya Sharma', pid: 'ZN001', time: '15m ago', status: 'Prescription', progress: 70, color: 'bg-zennara-green' },
    { id: 2, name: 'Rajesh Kumar', pid: 'ZN045', time: '2h ago', status: 'Treatment', progress: 40, color: 'bg-yellow-500' },
    { id: 3, name: 'Anita Desai', pid: 'ZN023', time: '5h ago', status: 'Notes', progress: 80, color: 'bg-zennara-green' },
    { id: 4, name: 'Vikram Singh', pid: 'ZN089', time: '1d ago', status: 'Prescription', progress: 10, color: 'bg-red-400' },
    { id: 5, name: 'Sanjay Gupta', pid: 'ZN104', time: '2d ago', status: 'Treatment', progress: 60, color: 'bg-blue-400' },
  ]);

  const handleDelete = (id: number) => {
    setDrafts(drafts.filter(d => d.id !== id));
  };

  const handleClearAll = () => {
    setDrafts([]);
  };

  return (
    <div className="min-h-screen bg-zennara-bg pb-32">
      <Header 
        showBack 
        onBack={onBack} 
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
        title="DRAFTS" 
        subtitle="Resume incomplete work" 
      />

      <div className="px-6 flex flex-col gap-6">
        
        {/* List Header */}
        <div className="flex justify-between items-end px-2">
          <h2 className="font-serif text-2xl text-zennara-dark font-bold">Active Drafts ({drafts.length})</h2>
          <button 
            className="text-red-500 font-sans text-lg hover:underline cursor-pointer"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>

        {/* Draft Items */}
        {drafts.length > 0 ? (
          drafts.map(draft => (
            <Card key={draft.id} className="relative overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-zennara-green shrink-0">
                    <FileText size={32} />
                  </div>
                  <div>
                     <h3 className="font-serif text-2xl font-bold text-zennara-dark">{draft.name}</h3>
                     <div className="flex items-center gap-2 text-zennara-light">
                       <span className="font-mono text-sm bg-gray-100 px-2 py-0.5 rounded">{draft.pid}</span>
                       <span>•</span>
                       <span>Edited {draft.time}</span>
                     </div>
                  </div>
                </div>

                {/* Middle: Progress & Status */}
                <div className="flex-1 md:px-8">
                   <div className="flex justify-between text-sm font-medium mb-1">
                     <span className="text-zennara-dark">{draft.status} Incomplete</span>
                     <span>{draft.progress}%</span>
                   </div>
                   <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                     <div className={`h-full rounded-full ${draft.color}`} style={{ width: `${draft.progress}%` }}></div>
                   </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                   <button 
                     onClick={() => handleDelete(draft.id)}
                     className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                   >
                     <Trash2 size={24} />
                   </button>
                   <Button size="medium" onClick={() => onNavigate(Screen.CONSULTATION)}>RESUME</Button>
                </div>

              </div>
            </Card>
          ))
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
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 flex gap-4 items-start shadow-sm">
             <Lightbulb size={32} className="text-blue-600 shrink-0 mt-1" />
             <div>
               <h3 className="font-sans font-bold text-lg text-blue-900">Did you know?</h3>
               <p className="font-sans text-lg text-blue-800 leading-relaxed">
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