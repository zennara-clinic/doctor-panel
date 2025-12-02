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
  ShieldAlert,
  User,
  Calendar,
  Phone,
  AlertTriangle,
  Edit,
  X,
  Clock,
  Sparkles,
  FileText,
  Save,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface ConsultationProps {
  patient: Patient;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

// Sub-components for modes
const TemplateMode = ({ onSend, onNavigate }: { onSend: () => void; onNavigate: (s: Screen) => void }) => {
  const [meds, setMeds] = useState([
    { id: '1', name: 'Doxycycline 100mg Capsules', dosage: '2 times daily', duration: '7 days', instructions: 'Take with food', active: true },
    { id: '2', name: 'Benzoyl Peroxide Gel 2.5%', dosage: 'Apply at night', duration: '30 days', instructions: 'Apply to affected areas', active: true }
  ]);
  const [complaint, setComplaint] = useState('Acne breakout on face with inflammation');
  const [diagnosis, setDiagnosis] = useState('Acne Vulgaris (Moderate)');
  const [instructions, setInstructions] = useState('Avoid touching face, maintain proper skincare routine');
  const [showAddMed, setShowAddMed] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    duration: '',
    instructions: ''
  });

  const toggleMed = (id: string) => {
    setMeds(meds.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  const removeMed = (id: string) => {
    setMeds(meds.filter(m => m.id !== id));
  };

  const addMedication = () => {
    if (newMed.name && newMed.dosage && newMed.duration) {
      const newMedication = {
        id: Date.now().toString(),
        ...newMed,
        active: true
      };
      setMeds([...meds, newMedication]);
      setNewMed({ name: '', dosage: '', duration: '', instructions: '' });
      setShowAddMed(false);
    }
  };

  return (
    <div className="space-y-6 pb-32 animate-fade-in">
      
      {/* Template Selection Banner */}
      <Card className="bg-gradient-to-r from-zennara-green/5 to-emerald-50 border-zennara-green/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-zennara-green/10 flex items-center justify-center">
              <FileSpreadsheet size={28} className="text-zennara-green" />
            </div>
            <div>
              <p className="text-xs text-zennara-light uppercase tracking-wide mb-1">Current Template</p>
              <h3 className="font-serif text-xl font-bold text-zennara-dark">Acne Treatment (Standard)</h3>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="medium" onClick={() => onNavigate(Screen.TEMPLATE_MANAGEMENT)}>
              CHANGE
            </Button>
            <Button variant="ghost" size="medium" onClick={() => onNavigate(Screen.TEMPLATE_MANAGEMENT)}>
              MANAGE ALL
            </Button>
          </div>
        </div>
      </Card>

      {/* Chief Complaint Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold text-zennara-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold">1</span>
            Chief Complaint
          </h3>
          <button className="flex items-center gap-2 text-sm text-zennara-light hover:text-zennara-green transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
            <Mic size={18} />
            Dictate
          </button>
        </div>
        <Card>
          <div className="relative">
            <textarea 
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder="Describe the patient's main complaint..."
              className="w-full p-5 text-lg border-2 border-transparent rounded-xl bg-gray-50 h-32 outline-none focus:border-zennara-green focus:bg-white transition-all resize-none"
            />
            <div className="absolute top-3 right-3">
              <span className="text-xs text-gray-400">{complaint.length} chars</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Diagnosis Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold text-zennara-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-bold">2</span>
            Diagnosis
          </h3>
          <button className="flex items-center gap-2 text-sm text-zennara-light hover:text-zennara-green transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
            <Sparkles size={18} />
            AI Suggest
          </button>
        </div>
        <Card>
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Enter diagnosis..."
            className="w-full p-5 text-lg border-2 border-transparent rounded-xl bg-gray-50 outline-none focus:border-zennara-green focus:bg-white transition-all"
          />
        </Card>
      </div>

      {/* Medications Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold text-zennara-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-lg font-bold">3</span>
            Medications
          </h3>
          <span className="text-sm text-zennara-light px-3 py-1 bg-gray-100 rounded-full">
            {meds.filter(m => m.active).length} selected
          </span>
        </div>
        
        <div className="space-y-3">
          {meds.map((med) => (
            <Card 
              key={med.id}
              className={`transition-all duration-300 ${
                med.active 
                  ? 'border-zennara-green/30 bg-green-50/30' 
                  : 'opacity-60 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleMed(med.id)}
                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center mt-1 transition-all shrink-0 ${
                    med.active 
                      ? 'bg-zennara-green border-zennara-green scale-110' 
                      : 'border-gray-300 bg-white hover:border-zennara-green'
                  }`}
                >
                  {med.active && <Check size={18} className="text-white" strokeWidth={3} />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-serif text-xl font-bold text-zennara-dark">{med.name}</h4>
                    <button
                      onClick={() => removeMed(med.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-zennara-light mb-1">Dosage</p>
                      <p className="text-sm font-bold text-zennara-dark">{med.dosage}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-zennara-light mb-1">Duration</p>
                      <p className="text-sm font-bold text-zennara-dark">{med.duration}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-xs text-zennara-light mb-1">Instructions</p>
                      <p className="text-sm font-bold text-zennara-dark truncate">{med.instructions}</p>
                    </div>
                  </div>

                  <button className="mt-3 text-sm text-zennara-green hover:text-zennara-dark transition-colors flex items-center gap-1">
                    <Edit size={14} />
                    Edit Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Medication Form */}
        {showAddMed ? (
          <Card className="mt-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-xl font-bold text-zennara-dark">Add New Medication</h4>
                <button
                  onClick={() => setShowAddMed(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div>
                <label className="text-sm text-zennara-light mb-2 block">Medication Name *</label>
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  placeholder="e.g., Amoxicillin 500mg Capsules"
                  className="w-full p-4 text-base border-2 border-gray-200 rounded-xl bg-white outline-none focus:border-zennara-green transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zennara-light mb-2 block">Dosage *</label>
                  <input
                    type="text"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    placeholder="e.g., 3 times daily"
                    className="w-full p-4 text-base border-2 border-gray-200 rounded-xl bg-white outline-none focus:border-zennara-green transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm text-zennara-light mb-2 block">Duration *</label>
                  <input
                    type="text"
                    value={newMed.duration}
                    onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })}
                    placeholder="e.g., 5 days"
                    className="w-full p-4 text-base border-2 border-gray-200 rounded-xl bg-white outline-none focus:border-zennara-green transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-zennara-light mb-2 block">Instructions (Optional)</label>
                <input
                  type="text"
                  value={newMed.instructions}
                  onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })}
                  placeholder="e.g., Take after meals"
                  className="w-full p-4 text-base border-2 border-gray-200 rounded-xl bg-white outline-none focus:border-zennara-green transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="medium"
                  className="flex-1"
                  onClick={() => {
                    setShowAddMed(false);
                    setNewMed({ name: '', dosage: '', duration: '', instructions: '' });
                  }}
                >
                  CANCEL
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  className="flex-1"
                  onClick={addMedication}
                  disabled={!newMed.name || !newMed.dosage || !newMed.duration}
                >
                  ADD MEDICATION
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Button 
            variant="secondary" 
            size="medium"
            fullWidth
            className="mt-4 border-2 border-dashed hover:border-solid" 
            icon={<Plus size={20} />}
            onClick={() => setShowAddMed(true)}
          >
            ADD MEDICATION
          </Button>
        )}
      </div>

      {/* Additional Instructions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold text-zennara-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-lg font-bold">4</span>
            Additional Instructions
          </h3>
        </div>
        <Card>
          <textarea 
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Any additional care instructions..."
            className="w-full p-5 text-lg border-2 border-transparent rounded-xl bg-gray-50 h-24 outline-none focus:border-zennara-green focus:bg-white transition-all resize-none"
          />
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="bg-gradient-to-br from-gray-50 to-white">
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            size="large"
            className="flex-1"
            icon={<Save size={20} />}
          >
            SAVE AS DRAFT
          </Button>
          <Button 
            size="large"
            className="flex-1"
            onClick={onSend}
          >
            CONTINUE TO REVIEW
          </Button>
        </div>
      </Card>
    </div>
  );
};

const PhotoMode = ({ onSend }: { onSend: () => void }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6 py-8 animate-fade-in pb-32">
      {!photo ? (
        <>
          <Card className="p-0 overflow-hidden">
            <div className="relative w-full h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
               <div className="flex flex-col items-center">
                 <div className="w-40 h-40 rounded-full bg-gradient-to-br from-zennara-green to-emerald-600 shadow-2xl flex items-center justify-center mb-8 animate-pulse">
                   <Camera size={80} className="text-white" />
                 </div>
                 <h3 className="font-serif text-4xl font-bold text-zennara-dark mb-3">Capture Prescription</h3>
                 <p className="font-sans text-lg text-zennara-light text-center px-8 max-w-xl mb-8">
                   Take a photo of your handwritten or printed prescription using your device camera
                 </p>
                 <div className="flex items-center gap-3 text-sm text-zennara-light bg-green-50 px-4 py-2 rounded-full border border-green-200">
                   <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-green-700 font-medium">Camera Ready</span>
                 </div>
               </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-zennara-dark text-center mb-4">
                Capture Instructions
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mx-auto mb-2">1</div>
                  <p className="text-sm text-zennara-dark font-medium mb-1">Good Lighting</p>
                  <p className="text-xs text-zennara-light">Ensure adequate light</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold mx-auto mb-2">2</div>
                  <p className="text-sm text-zennara-dark font-medium mb-1">Clear View</p>
                  <p className="text-xs text-zennara-light">Frame entire document</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl font-bold mx-auto mb-2">3</div>
                  <p className="text-sm text-zennara-dark font-medium mb-1">Stay Steady</p>
                  <p className="text-xs text-zennara-light">Avoid blur or shake</p>
                </div>
              </div>

              <Button 
                size="huge"
                fullWidth
                onClick={openCamera}
                icon={<Camera size={28} />}
                className="mt-6"
              >
                OPEN CAMERA
              </Button>

              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                capture="environment"
                onChange={handleFile}
                className="hidden"
              />
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={24} className="text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-zennara-dark">Photo Captured Successfully</h3>
                <p className="text-sm text-zennara-light">Review and confirm your prescription image</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="relative">
              <img src={photo} alt="Captured Prescription" className="w-full rounded-2xl shadow-xl border-2 border-gray-200" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-green-600 border border-green-200">
                ✓ Image Loaded
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                size="large" 
                className="flex-1"
                onClick={() => setPhoto(null)} 
                icon={<RotateCcw size={20} />}
              >
                RETAKE PHOTO
              </Button>
              <Button 
                size="large" 
                className="flex-1"
                onClick={onSend} 
                icon={<Check size={20} />}
              >
                CONTINUE TO REVIEW
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

const PenMode = ({ onSend }: { onSend: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const isDrawingRef = useRef(false);
  const toolRef = useRef<'pen' | 'eraser'>('pen');

  // Update toolRef when tool changes
  useEffect(() => {
    toolRef.current = tool;
    
    // Update cursor based on tool
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = tool === 'eraser' ? 'grab' : 'crosshair';
    }
  }, [tool]);

  // Initialize canvas only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set resolution once
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if(ctx) {
      ctx.scale(2, 2);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Fill canvas with white background so eraser can work properly
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Palm Rejection Logic - allows pen, mouse, and touch
    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      
      // Palm rejection: reject touch events with large contact area
      if (e.pointerType === 'touch' && (e.width > 15 || e.height > 15)) {
        return;
      }

      isDrawingRef.current = true;
      const ctx = canvas.getContext('2d');
      if(!ctx) return;
      
      // Set tool properties dynamically based on current tool state
      if (toolRef.current === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
      }
      
      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      
      // Palm rejection during move
      if (e.pointerType === 'touch' && e.width > 15) {
        return;
      }

      const ctx = canvas.getContext('2d');
      if(!ctx) return;
      
      // Ensure tool properties are maintained during move
      if (toolRef.current === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'black';
      }
      
      const rect = canvas.getBoundingClientRect();
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    };

    const handlePointerUp = (e: PointerEvent) => {
       e.preventDefault();
       isDrawingRef.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    canvas.style.touchAction = 'none';

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []); // Only initialize once, never re-run

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Refill with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (!isFullscreen) {
        // Enter fullscreen
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen();
        } else if ((container as any).msRequestFullscreen) {
          await (container as any).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = !!(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFullscreenNow);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Adjust canvas size when entering/exiting fullscreen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Small delay to allow DOM to update
    setTimeout(() => {
      const oldData = canvas.toDataURL(); // Save current drawing
      
      // Update canvas size
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(2, 2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Restore white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Restore previous drawing
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = oldData;
      }
    }, 100);
  }, [isFullscreen]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-32">
       {/* Toolbar */}
       <Card className="p-4">
         <div className="flex gap-3 items-center justify-between">
           <div className="flex gap-3">
             <button
               onClick={() => setTool('pen')}
               className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                 tool === 'pen'
                   ? 'bg-zennara-green text-white shadow-lg scale-105'
                   : 'bg-gray-100 text-zennara-dark hover:bg-gray-200'
               }`}
             >
               <PenTool size={20} />
               Pen
             </button>
             <button
               onClick={() => setTool('eraser')}
               className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                 tool === 'eraser'
                   ? 'bg-zennara-green text-white shadow-lg scale-105'
                   : 'bg-gray-100 text-zennara-dark hover:bg-gray-200'
               }`}
             >
               <Eraser size={20} />
               Eraser
             </button>
             <button
               onClick={clearCanvas}
               className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-all"
             >
               <Trash2 size={20} />
               Clear All
             </button>
           </div>

           <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-zennara-light font-medium bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <ShieldAlert size={16} className="text-green-600" />
              <span className="text-green-700">Palm Rejection Active</span>
            </div>

            <button
              onClick={toggleMinimize}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium transition-all"
              title={isMinimized ? "Expand Canvas" : "Minimize Canvas"}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 font-medium transition-all"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
       </Card>

       {/* Canvas */}
       {!isMinimized && (
         <div ref={containerRef} className={`${isFullscreen ? 'bg-white p-6 flex flex-col gap-4' : ''}`}>
           {isFullscreen && (
             <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
               <div className="flex gap-3">
                 <button
                   onClick={() => setTool('pen')}
                   className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                     tool === 'pen'
                       ? 'bg-zennara-green text-white shadow-lg'
                       : 'bg-white text-zennara-dark hover:bg-gray-100 border border-gray-200'
                   }`}
                 >
                   <PenTool size={20} />
                   Pen
                 </button>
                 <button
                   onClick={() => setTool('eraser')}
                   className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                     tool === 'eraser'
                       ? 'bg-zennara-green text-white shadow-lg'
                       : 'bg-white text-zennara-dark hover:bg-gray-100 border border-gray-200'
                   }`}
                 >
                   <Eraser size={20} />
                   Eraser
                 </button>
                 <button
                   onClick={clearCanvas}
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-all border border-red-200"
                 >
                   <Trash2 size={20} />
                   Clear
                 </button>
               </div>
               <button
                 onClick={toggleFullscreen}
                 className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 font-medium transition-all border border-purple-200"
               >
                 <Minimize2 size={20} />
                 Exit Fullscreen
               </button>
             </div>
           )}
           
           <Card className="p-0 overflow-hidden">
             <div className={`relative bg-white transition-all ${
               isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[600px]'
             }`}>
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full touch-none" 
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-4xl pointer-events-none select-none font-serif opacity-20 text-center">
                  <PenTool size={80} className="mx-auto mb-4 opacity-30" />
                  Write Prescription Here
                </div>
             </div>
           </Card>
         </div>
       )}

       {isMinimized && (
         <Card className="p-6 bg-gray-50 text-center">
           <Minimize2 size={40} className="mx-auto mb-3 text-gray-400" />
           <p className="text-lg text-zennara-light">Canvas Minimized</p>
           <p className="text-sm text-zennara-light mt-2">Click the expand button to resume drawing</p>
         </Card>
       )}

       {/* Action Buttons */}
       <Card>
         <div className="flex gap-4">
           <Button 
             variant="secondary" 
             size="large"
             className="flex-1"
             icon={<Save size={20} />}
           >
             SAVE AS DRAFT
           </Button>
           <Button 
             size="large"
             className="flex-1"
             onClick={onSend}
           >
             CONTINUE TO REVIEW
           </Button>
         </div>
       </Card>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        showBack 
        onBack={onBack}
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
        rightAction={<AutoSaveIndicator status={saveStatus} />}
      />

      <div className="px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          
          {/* LEFT SIDEBAR - Patient Info (Sticky) */}
          <div className="lg:sticky lg:top-32 space-y-3">
            
            {/* Patient Card - Compact */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zennara-green to-emerald-600 flex items-center justify-center text-white text-base font-bold shrink-0">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-serif text-lg font-bold text-zennara-dark truncate">{patient.name}</h2>
                  <p className="font-sans text-xs text-zennara-light">{patient.id} • {patient.age}y • {patient.gender}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-zennara-light">
                  <Phone size={12} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2 text-zennara-light">
                  <Clock size={12} />
                  <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2 text-zennara-light">
                  <User size={12} />
                  <span>{patient.lastVisit || 'First Visit'}</span>
                </div>
              </div>
            </Card>

            {/* Allergy Alert - Compact */}
            {patient.allergies && patient.allergies.length > 0 && (
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl text-white shadow-md">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="shrink-0" />
                  <div>
                    <p className="text-xs font-bold">ALLERGY: {patient.allergies.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Session Info - Compact */}
            <Card className="p-3">
              <h3 className="font-serif text-sm font-bold mb-2">Session Info</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zennara-light">Type</span>
                  <span className="font-bold text-zennara-dark">Follow-up</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zennara-light">Wait Time</span>
                  <span className="font-bold text-zennara-dark">{patient.waitTime || 0} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zennara-light">Status</span>
                  <span className="font-bold text-green-600">In Progress</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions - Compact */}
            <Card className="p-3">
              <h3 className="font-serif text-sm font-bold mb-2">Quick Actions</h3>
              <div className="space-y-1">
                <button 
                  onClick={() => onNavigate(Screen.HISTORY)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                >
                  <span className="font-sans text-xs text-zennara-dark">View History</span>
                  <FileText size={14} className="text-zennara-light group-hover:text-zennara-green transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                  <span className="font-sans text-xs text-zennara-dark">Previous Rx</span>
                  <FileText size={14} className="text-zennara-light group-hover:text-zennara-green transition-colors" />
                </button>
              </div>
            </Card>
          </div>

          {/* RIGHT CONTENT - Prescription Area */}
          <div className="space-y-6 pb-32">
            
            {/* Page Header */}
            <div>
              <h1 className="font-serif text-4xl font-bold text-zennara-dark mb-2">Write Prescription</h1>
              <p className="font-sans text-lg text-zennara-light">Choose your preferred method to create the prescription</p>
            </div>

            {/* Mode Selector */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: PrescriptionMode.TEMPLATE, icon: <FileSpreadsheet size={32} />, label: 'Template', desc: 'Use structured form' },
                { id: PrescriptionMode.PHOTO, icon: <Camera size={32} />, label: 'Photo', desc: 'Capture with camera' },
                { id: PrescriptionMode.PEN, icon: <PenTool size={32} />, label: 'Handwrite', desc: 'Draw with Apple Pencil' },
              ].map(m => (
                <button 
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`
                    relative overflow-hidden rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 group
                    ${mode === m.id 
                      ? 'bg-gradient-to-br from-zennara-green to-emerald-600 text-white shadow-2xl scale-105 ring-4 ring-zennara-green/20' 
                      : 'bg-white text-zennara-dark border-2 border-gray-200 hover:border-zennara-green hover:shadow-xl'
                    }
                  `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${mode === m.id ? 'opacity-100' : ''}`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                      mode === m.id 
                        ? 'bg-white/20' 
                        : 'bg-gray-100 group-hover:bg-zennara-green/10'
                    }`}>
                      {m.icon}
                    </div>
                    <span className="font-sans text-xl font-bold">{m.label}</span>
                    <span className={`text-sm mt-1 ${mode === m.id ? 'text-white/80' : 'text-zennara-light'}`}>
                      {m.desc}
                    </span>
                    {mode === m.id && (
                      <div className="mt-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Check size={18} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="animate-fade-in">
              {mode === PrescriptionMode.TEMPLATE && <TemplateMode onSend={handleSend} onNavigate={onNavigate} />}
              {mode === PrescriptionMode.PHOTO && <PhotoMode onSend={handleSend} />}
              {mode === PrescriptionMode.PEN && <PenMode onSend={handleSend} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};