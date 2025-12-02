import React, { useState, useEffect } from 'react';
import { Button, Header } from '../components/UI';
import { Patient, Screen } from '../types';
import { Clock, AlertTriangle } from 'lucide-react';

interface ConsultationSessionProps {
  patient: Patient;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export const ConsultationSession: React.FC<ConsultationSessionProps> = ({ patient, onNavigate, onBack }) => {
  const [sessionTime, setSessionTime] = useState(0);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    onNavigate(Screen.CONSULTATION);
  };

  return (
    <div className="min-h-screen bg-zennara-bg">
      <Header 
        showBack
        onBack={onBack}
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Patient Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border-l-[6px] border-l-zennara-green p-5 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 md:gap-4">
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-zennara-dark leading-tight">{patient.name}</h2>
              <p className="font-sans text-base md:text-lg text-zennara-light mt-1.5">
                {patient.id} • {patient.age}y • {patient.gender}
              </p>
            </div>
            {patient.allergies && patient.allergies.length > 0 && (
              <div className="bg-red-50 px-3 py-1.5 md:px-3.5 md:py-2 rounded-lg md:rounded-xl border border-red-100 flex items-center gap-1.5 md:gap-2 shadow-sm shrink-0">
                <AlertTriangle size={18} className="text-red-600 md:w-5 md:h-5" />
                <span className="text-red-700 font-sans font-bold text-xs md:text-sm">ALLERGY: {patient.allergies.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Session Timer Card */}
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-2 border-gray-100 w-full max-w-2xl">
            <div className="flex flex-col items-center gap-6 md:gap-8">
              {/* Clock Icon with Animation */}
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zennara-green/10 flex items-center justify-center animate-pulse">
                  <Clock size={48} className="text-zennara-green md:w-14 md:h-14" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-zennara-green/20 animate-ping"></div>
              </div>

              {/* Session Title */}
              <div className="text-center">
                <p className="font-sans text-base md:text-lg text-zennara-light uppercase tracking-wider mb-2">Session in Progress</p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-zennara-dark">Consultation Time</h3>
              </div>

              {/* Timer Display */}
              <div className="bg-gray-50 rounded-2xl px-8 py-6 md:px-12 md:py-8 border border-gray-200">
                <div className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold text-zennara-dark tabular-nums tracking-wider">
                  {formatTime(sessionTime)}
                </div>
              </div>

              {/* Session Info */}
              <div className="text-center space-y-2">
                <p className="font-sans text-sm md:text-base text-gray-500">
                  Session started at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="font-sans text-xs md:text-sm text-gray-400">
                  Timer will continue until you end the session
                </p>
              </div>

              {/* End Session Button */}
              <div className="w-full mt-4 md:mt-6">
                <Button 
                  size="large" 
                  fullWidth 
                  onClick={handleEndSession}
                  className="h-14 md:h-16 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  END SESSION & WRITE PRESCRIPTION
                </Button>
              </div>

              {/* Helper Text */}
              <p className="font-sans text-xs md:text-sm text-center text-gray-400 max-w-md leading-relaxed">
                Once you end the session, you'll be able to write the prescription and complete the consultation documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
