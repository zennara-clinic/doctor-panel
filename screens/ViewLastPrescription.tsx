import React from 'react';
import { Card, Button, Header } from '../components/UI';
import { Patient, Screen } from '../types';
import { FileText, Calendar, Clock, Pill, AlertTriangle, User, Printer, Download } from 'lucide-react';

interface ViewLastPrescriptionProps {
  patient: Patient;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export const ViewLastPrescription: React.FC<ViewLastPrescriptionProps> = ({ patient, onNavigate, onBack }) => {
  // Mock prescription data
  const prescription = {
    date: 'November 10, 2024',
    visitNumber: 5,
    chiefComplaint: 'Acne breakout on face and back',
    diagnosis: 'Acne Vulgaris (Moderate)',
    medications: [
      {
        name: 'Doxycycline 100mg Capsules',
        dosage: '1 capsule',
        frequency: '2 times daily (morning & evening)',
        duration: '7 days',
        instructions: 'Take with food. Avoid dairy products within 2 hours of taking this medication.'
      },
      {
        name: 'Benzoyl Peroxide Gel 2.5%',
        dosage: 'Thin layer',
        frequency: 'Once daily at night',
        duration: '30 days',
        instructions: 'Apply to clean, dry skin. Avoid contact with eyes and mucous membranes.'
      },
      {
        name: 'Clindamycin Phosphate Gel 1%',
        dosage: 'Thin layer',
        frequency: '2 times daily',
        duration: '30 days',
        instructions: 'Apply morning and evening. Use after cleansing face.'
      }
    ],
    treatments: [
      {
        name: 'Carbon Laser Facial',
        sessions: 3,
        frequency: 'Once every 2 weeks',
        therapist: 'Meera Patel'
      }
    ],
    generalInstructions: [
      'Drink plenty of water (8-10 glasses per day)',
      'Avoid touching or picking at acne lesions',
      'Use oil-free, non-comedogenic skincare products',
      'Cleanse face twice daily with gentle cleanser',
      'Follow up in 2 weeks or if condition worsens'
    ],
    dietaryAdvice: 'Reduce intake of high-glycemic foods, dairy products, and processed foods. Increase consumption of fruits, vegetables, and omega-3 rich foods.'
  };

  return (
    <div className="min-h-screen bg-zennara-bg pb-32 md:pb-40">
      <Header 
        showBack
        onBack={onBack}
        onHome={() => onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate(Screen.NOTIFICATIONS)}
        title="LAST PRESCRIPTION"
        subtitle={`${patient.name} • ${prescription.date}`}
        rightAction={
          <div className="flex gap-2 md:gap-3">
            <Button variant="ghost" size="medium" className="flex items-center gap-2">
              <Printer size={20} />
              <span className="hidden md:inline">Print</span>
            </Button>
            <Button variant="ghost" size="medium" className="flex items-center gap-2">
              <Download size={20} />
              <span className="hidden md:inline">Download</span>
            </Button>
          </div>
        }
      />

      <div className="px-4 sm:px-5 md:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-5 md:gap-6">
        
        {/* Patient & Visit Info */}
        <Card className="bg-gradient-to-r from-zennara-green/5 to-blue-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zennara-green/10 flex items-center justify-center shrink-0">
                <User size={20} className="text-zennara-green md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide">Patient ID</p>
                <p className="text-base md:text-lg font-serif font-bold text-zennara-dark">{patient.id}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-blue-600 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide">Visit Date</p>
                <p className="text-base md:text-lg font-serif font-bold text-zennara-dark">{prescription.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <FileText size={20} className="text-purple-600 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide">Visit Number</p>
                <p className="text-base md:text-lg font-serif font-bold text-zennara-dark">#{prescription.visitNumber}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-orange-600 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide">Days Ago</p>
                <p className="text-base md:text-lg font-serif font-bold text-zennara-dark">15 days</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Allergy Warning */}
        {patient.allergies && patient.allergies.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 md:p-5 flex items-start gap-3 md:gap-4">
            <AlertTriangle size={24} className="text-red-600 shrink-0 md:w-7 md:h-7" />
            <div>
              <p className="font-sans font-bold text-base md:text-lg text-red-800 mb-1">ALLERGY WARNING</p>
              <p className="font-sans text-sm md:text-base text-red-700">
                Patient allergic to: <span className="font-bold">{patient.allergies.join(', ')}</span>
              </p>
            </div>
          </div>
        )}

        {/* Chief Complaint & Diagnosis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          <Card>
            <h3 className="font-sans text-base md:text-lg font-bold text-zennara-dark mb-3 md:mb-4 uppercase tracking-wide">Chief Complaint</h3>
            <p className="font-sans text-base md:text-lg text-zennara-dark leading-relaxed">{prescription.chiefComplaint}</p>
          </Card>

          <Card>
            <h3 className="font-sans text-base md:text-lg font-bold text-zennara-dark mb-3 md:mb-4 uppercase tracking-wide">Diagnosis</h3>
            <p className="font-serif text-lg md:text-xl font-bold text-zennara-green">{prescription.diagnosis}</p>
          </Card>
        </div>

        {/* Medications */}
        <Card>
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zennara-green/10 flex items-center justify-center">
              <Pill size={24} className="text-zennara-green md:w-7 md:h-7" />
            </div>
            <h3 className="font-sans text-xl md:text-2xl font-bold text-zennara-dark uppercase tracking-wide">Medications Prescribed</h3>
          </div>

          <div className="space-y-4 md:space-y-5">
            {prescription.medications.map((med, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-200">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-serif text-lg md:text-xl font-bold text-zennara-dark flex-1">{med.name}</h4>
                  <span className="bg-zennara-green/10 text-zennara-green px-3 py-1 rounded-full text-xs md:text-sm font-bold shrink-0">
                    {med.duration}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3">
                  <div>
                    <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide mb-1">Dosage</p>
                    <p className="font-sans text-sm md:text-base text-zennara-dark font-medium">{med.dosage}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide mb-1">Frequency</p>
                    <p className="font-sans text-sm md:text-base text-zennara-dark font-medium">{med.frequency}</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide mb-1">Instructions</p>
                  <p className="font-sans text-sm md:text-base text-blue-900 leading-relaxed">{med.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Treatments Assigned */}
        {prescription.treatments.length > 0 && (
          <Card>
            <h3 className="font-sans text-xl md:text-2xl font-bold text-zennara-dark mb-5 md:mb-6 uppercase tracking-wide">Treatments Assigned</h3>
            <div className="space-y-4">
              {prescription.treatments.map((treatment, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-5 border border-purple-100">
                  <h4 className="font-serif text-lg md:text-xl font-bold text-zennara-dark mb-3">{treatment.name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide mb-1">Sessions</p>
                      <p className="font-sans text-base md:text-lg text-zennara-dark font-bold">{treatment.sessions}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide mb-1">Frequency</p>
                      <p className="font-sans text-sm md:text-base text-zennara-dark font-medium">{treatment.frequency}</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-zennara-light font-sans uppercase tracking-wide mb-1">Therapist</p>
                      <p className="font-sans text-sm md:text-base text-zennara-dark font-medium">{treatment.therapist}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* General Instructions */}
        <Card>
          <h3 className="font-sans text-xl md:text-2xl font-bold text-zennara-dark mb-4 md:mb-5 uppercase tracking-wide">General Instructions</h3>
          <ul className="space-y-3 md:space-y-3.5">
            {prescription.generalInstructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-zennara-green/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-zennara-green font-bold text-sm md:text-base">{index + 1}</span>
                </div>
                <p className="font-sans text-base md:text-lg text-zennara-dark leading-relaxed flex-1">{instruction}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Dietary Advice */}
        <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-teal-500">
          <h3 className="font-sans text-xl md:text-2xl font-bold text-zennara-dark mb-3 md:mb-4 uppercase tracking-wide">Dietary Advice</h3>
          <p className="font-sans text-base md:text-lg text-zennara-dark leading-relaxed">{prescription.dietaryAdvice}</p>
        </Card>

        {/* Footer Note */}
        <div className="bg-gray-100 rounded-xl p-4 md:p-5 border border-gray-200 text-center">
          <p className="font-sans text-xs md:text-sm text-gray-600 italic">
            This prescription was generated on {prescription.date}. For any questions or concerns, please contact the clinic.
          </p>
        </div>
      </div>
    </div>
  );
};
