
import React, { useState } from 'react';
import { Card, Button, Header, BottomNavigation } from '../components/UI';
import { Screen } from '../types';

interface SettingsProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigate?: (screen: Screen) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onBack, onLogout, onNavigate }) => {
  const [fee, setFee] = useState('500');
  const [mode, setMode] = useState('Template');
  const [palmRejection, setPalmRejection] = useState(true);
  const [language, setLanguage] = useState('English');
  const [textSize, setTextSize] = useState('Medium');
  const [autoLogout, setAutoLogout] = useState('15 minutes');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      alert('✓ Settings saved successfully');
    }, 1000);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      if (onLogout) onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-zennara-bg pb-40">
      <Header 
        showBack 
        onBack={onBack} 
        onHome={() => onNavigate && onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate && onNavigate(Screen.NOTIFICATIONS)}
        title="SETTINGS" 
        subtitle="Customize your preferences" 
      />

      <div className="px-6 flex flex-col gap-8">
        
        {/* Profile */}
        <Card>
           <h2 className="font-serif text-2xl font-bold mb-4">MY PROFILE</h2>
           <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-300"></div>
              <div>
                 <h3 className="font-serif text-3xl">Dr. Ramesh Reddy</h3>
                 <p className="font-sans text-xl text-zennara-light">Dermatologist • DOC-001</p>
                 <button 
                   className="text-zennara-green font-sans font-medium mt-2 hover:underline"
                   onClick={() => alert('Profile edit disabled in demo')}
                 >
                   EDIT PROFILE
                 </button>
              </div>
           </div>
        </Card>

        {/* Consultation Fee */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">CONSULTATION PREFERENCES</h2>
          <Card>
             <label className="font-sans text-lg text-zennara-light block mb-2">Default Consultation Fee (₹)</label>
             <input 
               className="font-serif text-4xl w-full border-b-2 border-gray-200 focus:border-zennara-green outline-none py-2 bg-transparent" 
               value={fee}
               onChange={e => setFee(e.target.value)}
             />
             <p className="font-sans text-lg text-zennara-light mt-2">This fee will be pre-filled for new consultations</p>
          </Card>
        </div>

        {/* Mode Preference */}
        <div>
          <h2 className="font-serif text-2xl font-bold mb-4">DEFAULT PRESCRIPTION MODE</h2>
          <div className="grid grid-cols-1 gap-4">
             {['Template (Recommended)', 'Photo Capture', 'Digital Pen'].map(m => (
               <Card 
                 key={m} 
                 active={mode === m.split(' ')[0]} 
                 onClick={() => setMode(m.split(' ')[0])}
                 className="flex items-center gap-4 py-4"
               >
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${mode === m.split(' ')[0] ? 'border-zennara-green' : 'border-gray-300'}`}>
                   {mode === m.split(' ')[0] && <div className="w-3 h-3 bg-zennara-green rounded-full"></div>}
                 </div>
                 <span className="font-sans text-xl">{m}</span>
               </Card>
             ))}
          </div>
        </div>

        {/* Toggles (Palm Rejection & Notifications) */}
        <Card>
           <div className="flex justify-between items-center mb-6">
              <div>
                 <h3 className="font-serif text-2xl">Palm Rejection</h3>
                 <p className="text-zennara-light">Only stylus draws</p>
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                 <button onClick={() => setPalmRejection(true)} className={`px-6 py-2 rounded-md transition-all ${palmRejection ? 'bg-zennara-green text-white shadow' : 'text-gray-500'}`}>ON</button>
                 <button onClick={() => setPalmRejection(false)} className={`px-6 py-2 rounded-md transition-all ${!palmRejection ? 'bg-zennara-green text-white shadow' : 'text-gray-500'}`}>OFF</button>
              </div>
           </div>
           
           <hr className="my-4"/>

           <div className="space-y-4">
              <h3 className="font-serif text-2xl">Notifications</h3>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-zennara-green rounded flex items-center justify-center text-white">✓</div>
                 <span className="font-sans text-xl">Notify on Patient Check-in</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-zennara-green rounded flex items-center justify-center text-white">✓</div>
                 <span className="font-sans text-xl">Notify on Pharmacy Ready</span>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-zennara-green rounded flex items-center justify-center text-white">✓</div>
                 <span className="font-sans text-xl">Notify on Treatment Complete</span>
              </div>
           </div>
        </Card>

        {/* Language */}
        <div>
           <h2 className="font-serif text-2xl font-bold mb-4">LANGUAGE</h2>
           <Card>
              <select 
                className="w-full h-14 text-2xl bg-transparent outline-none" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
              >
                 <option>English</option>
                 <option>Hindi</option>
                 <option>Telugu</option>
                 <option>Tamil</option>
              </select>
           </Card>
        </div>

        {/* Text Size */}
        <div>
           <h2 className="font-serif text-2xl font-bold mb-4">TEXT SIZE</h2>
           <div className="grid grid-cols-3 gap-4">
              {['Small', 'Medium', 'Large'].map(s => (
                <button 
                  key={s}
                  onClick={() => setTextSize(s)}
                  className={`h-24 rounded-xl border flex flex-col items-center justify-center gap-2 ${textSize === s ? 'bg-zennara-green text-white border-zennara-green' : 'bg-white text-zennara-dark border-gray-200'}`}
                >
                   <span className={s === 'Small' ? 'text-lg' : s === 'Medium' ? 'text-xl' : 'text-2xl'}>A</span>
                   <span className="font-sans">{s}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Auto Logout */}
        <div>
           <h2 className="font-serif text-2xl font-bold mb-4">AUTO-LOGOUT</h2>
           <Card>
              <select 
                className="w-full h-14 text-2xl bg-transparent outline-none" 
                value={autoLogout} 
                onChange={(e) => setAutoLogout(e.target.value)}
              >
                 <option>5 minutes</option>
                 <option>15 minutes</option>
                 <option>30 minutes</option>
                 <option>1 hour</option>
                 <option>Never</option>
              </select>
              <p className="font-sans text-lg text-zennara-light mt-2">Recommended: 15 minutes</p>
           </Card>
        </div>

        {/* About */}
        <div>
           <h2 className="font-serif text-2xl font-bold mb-4">ABOUT</h2>
           <Card className="flex justify-between items-center">
              <div>
                 <h3 className="font-sans text-xl">Zennara Doctor Panel</h3>
                 <p className="text-zennara-light">Version 2.5.0</p>
              </div>
              <Button variant="secondary" size="medium">CHECK FOR UPDATES</Button>
           </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-6 mt-4">
           <Button variant="danger" size="large" className="bg-white border-red-500 text-red-500" onClick={handleLogout}>LOGOUT FROM THIS DEVICE</Button>
           <Button 
             size="huge" 
             fullWidth 
             onClick={handleSave}
             className={saveStatus === 'saving' ? 'opacity-80' : ''}
           >
             {saveStatus === 'saving' ? 'SAVING...' : saveStatus === 'saved' ? 'SAVED ✓' : 'SAVE ALL CHANGES'}
           </Button>
           <div className="text-center font-sans text-lg text-zennara-light">
              Changes saved automatically after clicking Save
           </div>
        </div>

      </div>
      
      {onNavigate && <BottomNavigation activeScreen={Screen.SETTINGS} onNavigate={onNavigate} />}
    </div>
  );
};
