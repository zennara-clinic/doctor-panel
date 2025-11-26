import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Header, LargeInput, AutoSaveIndicator } from '../components/UI';
import { Patient, Screen, PrescriptionMode } from '../types';
import { 
  FileSpreadsheet, 
  Camera, 
  PenTool, 
  Mic, 
  Check, 
  Plus, 
  Trash2, 
  Eraser, 
  RotateCcw,
  ShieldAlert 
} from 'lucide-react';

interface ConsultationProps {
  patient: Patient;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

// Sub-components for modes
const TemplateMode = ({ onSend, onNavigate }: { onSend: () => void; onNavigate: (s: Screen) => void }) => {
  const [meds, setMeds] = useState([
    { name: 'Doxycycline 100mg Capsules', dosage: '2 times daily', duration: '7 days', active: true },
    { name: 'Benzoyl Peroxide Gel 2.5%', dosage: 'Apply at night', duration: '30 days', active: true }
  ]);

  return (
    <div className="animate-fade-in flex flex-col gap-8 pb-32">
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-3">
           <FileSpreadsheet size={28} className="text-zennara-green" />
           <div>
             <span className="font-sans text-sm text-gray-500 block uppercase tracking-wide">Current Template</span>
             <strong className="font-serif text-xl text-zennara-dark">Acne Treatment (Standard)</strong>
           </div>
         </div>
         <div className="flex gap-2">
            <Button variant="ghost" size="medium" onClick={() => onNavigate(Screen.TEMPLATE_MANAGEMENT)}>CHANGE</Button>
            <Button variant="ghost" size="medium" onClick={() => onNavigate(Screen.TEMPLATE_MANAGEMENT)}>MANAGE ALL</Button>
         </div>
      </div>

      <Card>
        <div className="flex flex-col gap-4">
          <label className="font-sans text-xl font-bold text-zennara-dark flex justify-between">
            1. CHIEF COMPLAINT
            <span className="text-gray-400 font-normal text-base">Tap microphone to dictate</span>
          </label>
          <div className="relative">
            <textarea 
              className="w-full p-6 text-xl border border-gray-200 rounded-xl bg-gray-50 h-32 outline-none focus:border-zennara-green focus:bg-white transition-all shadow-inner resize-none"
              defaultValue="Acne breakout on face"
            />
            <button className="absolute right-4 bottom-4 text-zennara-green hover:scale-110 transition-transform bg-white rounded-full p-3 shadow-sm border border-gray-100">
              <Mic size={24} />
            </button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-2">
        <label className="font-sans text-xl font-bold text-zennara-dark px-2">2. DIAGNOSIS</label>
        <LargeInput defaultValue="Acne Vulgaris (Moderate)" />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-sans text-xl font-bold text-zennara-dark px-2">3. MEDICATIONS</label>
        
        {meds.map((med, idx) => (
          <Card key={idx} active={med.active} onClick={() => {
             const newMeds = [...meds];
             newMeds[idx].active = !newMeds[idx].active;
             setMeds(newMeds);
          }}>
            <div className="flex items-start gap-4">
               <div className={`w-8 h-8 rounded border-2 flex items-center justify-center mt-1 transition-colors ${med.active ? 'bg-zennara-green border-zennara-green' : 'border-gray-300 bg-white'}`}>
                 {med.active && <Check size={20} className="text-white" />}
               </div>
               <div className={`flex-1 transition-opacity ${med.active ? '' : 'opacity-50'}`}>
                 <h3 className="font-serif text-2xl font-bold">{med.name}</h3>
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <span className="text-sm text-zennara-light block mb-1">Dosage</span>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-lg font-medium">{med.dosage} ▼</div>
                    </div>
                    <div>
                      <span className="text-sm text-zennara-light block mb-1">Duration</span>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-lg font-medium">{med.duration} ▼</div>
                    </div>
                 </div>
               </div>
            </div>
          </Card>
        ))}

        <Button variant="secondary" className="border-dashed" icon={<Plus size={24} />}>ADD ANOTHER MEDICINE</Button>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <Button size="huge" fullWidth onClick={onSend}>SEND TO PHARMACY</Button>
      </div>
    </div>
  );
};

const PhotoMode = ({ onSend }: { onSend: () => void }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8 animate-fade-in pb-32">
      {!photo ? (
        <>
          <div className="w-full h-[500px] border-4 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden group hover:border-zennara-green transition-colors">
             <Camera size={80} className="text-gray-400 group-hover:scale-110 transition-transform duration-300 mb-6" />
             <p className="font-sans text-2xl text-zennara-light text-center px-8">
               Tap to capture prescription
             </p>
             <input 
               type="file" 
               accept="image/*" 
               capture="environment" 
               onChange={handleFile}
               className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
             />
          </div>
        </>
      ) : (
        <>
          <h2 className="font-serif text-3xl">Photo Captured</h2>
          <img src={photo} alt="Rx" className="w-full rounded-3xl shadow-lg border border-gray-200" />
          <div className="grid grid-cols-2 gap-6 w-full mt-4">
            <Button variant="secondary" size="large" onClick={() => setPhoto(null)} icon={<RotateCcw size={20} />}>RETAKE</Button>
            <Button size="large" onClick={onSend} icon={<Check size={20} />}>USE THIS</Button>
          </div>
        </>
      )}
    </div>
  );
};

const PenMode = ({ onSend }: { onSend: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set resolution
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    const ctx = canvas.getContext('2d');
    if(ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
    }

    // Strict Palm Rejection Logic matching spec
    const handlePointerDown = (e: PointerEvent) => {
      // NOTE: In a real iPad deployment, strictly verify 'pen'.
      // For testing in non-pen environments, you might temporarily allow mouse.
      if (e.pointerType !== 'pen' && e.pointerType !== 'mouse') {
        e.preventDefault();
        return; 
      }
      
      // Palm check by size (spec says > 5 or > 5)
      if (e.width > 5 || e.height > 5) {
        return; 
      }

      setIsDrawing(true);
      const ctx = canvas.getContext('2d');
      if(!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;
      if (e.pointerType !== 'pen' && e.pointerType !== 'mouse') return;
      
      // Palm rejection during move
      if (e.width > 5) return;

      const ctx = canvas.getContext('2d');
      if(!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    };

    const handlePointerUp = (e: PointerEvent) => {
       if (e.pointerType !== 'pen' && e.pointerType !== 'mouse') return;
       setIsDrawing(false);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.style.touchAction = 'none'; // Crucial for disabling scrolling

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDrawing]);

  return (
    <div className="flex flex-col gap-4 animate-fade-in pb-32">
       <div className="flex gap-4 items-center bg-gray-100 p-2 rounded-xl justify-center shadow-inner">
         <Button size="medium" variant="primary" icon={<PenTool size={20} />}>PEN</Button>
         <Button size="medium" variant="secondary" icon={<Eraser size={20} />}>ERASER</Button>
         <Button size="medium" variant="secondary" onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            ctx?.clearRect(0,0, canvas!.width, canvas!.height);
         }} icon={<Trash2 size={20} />}>CLEAR</Button>
         <span className="ml-auto text-sm text-zennara-light font-medium bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
           <ShieldAlert size={14} /> Palm Rejection: ON
         </span>
       </div>
       
       <div className="border border-gray-200 rounded-3xl bg-white shadow-sm overflow-hidden h-[600px] relative">
          <canvas ref={canvasRef} className="w-full h-full cursor-crosshair touch-none" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-4xl pointer-events-none select-none font-serif opacity-30">
            Write Prescription Here
          </div>
       </div>

       <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <Button size="huge" fullWidth onClick={onSend}>SEND TO PHARMACY</Button>
      </div>
    </div>
  )
}

export const ConsultationHub: React.FC<ConsultationProps> = ({ patient, onNavigate, onBack }) => {
  const [mode, setMode] = useState<PrescriptionMode>(PrescriptionMode.TEMPLATE);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('saved');

  // Simulate auto-save
  useEffect(() => {
    const interval = setInterval(() => {
       setSaveStatus('saving');
       setTimeout(() => setSaveStatus('saved'), 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    onNavigate(Screen.REVIEW);
  };

  return (
    <div className="min-h-screen bg-zennara-bg">
      <Header 
        showBack 
        onBack={onBack}
        title="PRESCRIPTION"
        subtitle="Choose how to write:"
        rightAction={<AutoSaveIndicator status={saveStatus} />}
      />

      {/* Persistent Patient Strip */}
      <div className="fixed top-20 left-0 w-full bg-zennara-dark text-white p-3 px-8 flex justify-between items-center z-40 shadow-md">
        <span className="font-serif text-xl">{patient.name} ({patient.id})</span>
        <span className="font-sans text-red-300 font-bold bg-red-900/30 px-3 py-1 rounded-lg flex items-center gap-2">
          <ShieldAlert size={18} /> ALLERGY: Penicillin
        </span>
      </div>

      <div className="mt-8 px-6">
        {/* Mode Switcher */}
        <div className="grid grid-cols-3 gap-6 mb-8">
           {[
             { id: PrescriptionMode.TEMPLATE, icon: <FileSpreadsheet size={40} />, label: 'TEMPLATE' },
             { id: PrescriptionMode.PHOTO, icon: <Camera size={40} />, label: 'PHOTO' },
             { id: PrescriptionMode.PEN, icon: <PenTool size={40} />, label: 'PEN' },
           ].map(m => (
             <button 
               key={m.id}
               onClick={() => setMode(m.id)}
               className={`
                 h-[120px] rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300
                 ${mode === m.id ? 'bg-zennara-green text-white shadow-xl scale-[1.02] ring-2 ring-offset-2 ring-zennara-green' : 'bg-white text-zennara-dark border border-gray-200 hover:shadow-md hover:border-gray-300'}
               `}
             >
               {m.icon}
               <span className="font-sans text-lg font-medium tracking-wide">{m.label}</span>
             </button>
           ))}
        </div>

        {/* Content Area */}
        {mode === PrescriptionMode.TEMPLATE && <TemplateMode onSend={handleSend} onNavigate={onNavigate} />}
        {mode === PrescriptionMode.PHOTO && <PhotoMode onSend={handleSend} />}
        {mode === PrescriptionMode.PEN && <PenMode onSend={handleSend} />}

      </div>
    </div>
  );
};