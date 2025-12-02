
import React, { useState } from 'react';
import { Login } from './screens/Login';
import { Dashboard } from './screens/Dashboard';
import { PatientOverview } from './screens/PatientOverview';
import { ViewLastPrescription } from './screens/ViewLastPrescription';
import { ConsultationSession } from './screens/ConsultationSession';
import { ConsultationHub } from './screens/ConsultationHub';
import { Review } from './screens/Review';
import { Success } from './screens/Success';
import { TreatmentAssignment } from './screens/TreatmentAssignment';
import { Drafts } from './screens/Drafts';
import { PatientSearch } from './screens/PatientSearch';
import { HistoryPatientList } from './screens/HistoryPatientList';
import { MedicalHistory } from './screens/MedicalHistory';
import { Settings } from './screens/Settings';
import { Help } from './screens/Help';
import { TemplateManagement } from './screens/TemplateManagement';
import { Screen, Patient } from './types';

// Main App Component
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [currentPatient, setCurrentPatient] = useState<Patient | undefined>(undefined);

  const navigate = (screen: Screen, patient?: Patient) => {
    if (patient) setCurrentPatient(patient);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN:
        return <Login onLogin={() => navigate(Screen.DASHBOARD)} />;
      case Screen.DASHBOARD:
        return <Dashboard onNavigate={navigate} />;
      case Screen.PATIENT_OVERVIEW:
        return currentPatient ? (
          <PatientOverview 
            patient={currentPatient} 
            onNavigate={navigate}
            onBack={() => navigate(Screen.DASHBOARD)}
          />
        ) : <Dashboard onNavigate={navigate} />;
      case Screen.VIEW_LAST_PRESCRIPTION:
        return currentPatient ? (
          <ViewLastPrescription 
            patient={currentPatient} 
            onNavigate={navigate}
            onBack={() => navigate(Screen.PATIENT_OVERVIEW)}
          />
        ) : <Dashboard onNavigate={navigate} />;
      case Screen.CONSULTATION_SESSION:
        return currentPatient ? (
          <ConsultationSession 
            patient={currentPatient} 
            onNavigate={navigate}
            onBack={() => navigate(Screen.DASHBOARD)}
          />
        ) : <Dashboard onNavigate={navigate} />;
      case Screen.CONSULTATION:
        return currentPatient ? (
          <ConsultationHub 
            patient={currentPatient} 
            onNavigate={navigate}
            onBack={() => navigate(Screen.CONSULTATION_SESSION)}
          />
        ) : <Dashboard onNavigate={navigate} />;
      case Screen.REVIEW:
        return currentPatient ? (
           <Review 
             patient={currentPatient}
             onNavigate={navigate}
             onBack={() => navigate(Screen.CONSULTATION)}
           />
        ) : <Dashboard onNavigate={navigate} />;
      case Screen.SUCCESS:
        return currentPatient ? (
          <Success patient={currentPatient} onNavigate={navigate} />
        ) : <Dashboard onNavigate={navigate} />;
      case Screen.TREATMENT:
         return currentPatient ? (
           <TreatmentAssignment 
             patient={currentPatient} 
             onNavigate={navigate}
             onBack={() => navigate(Screen.SUCCESS)} 
           />
         ) : <Dashboard onNavigate={navigate} />;
      case Screen.DRAFTS:
         return <Drafts onNavigate={navigate} onBack={() => navigate(Screen.DASHBOARD)} />;
      case Screen.SEARCH:
         return <PatientSearch onNavigate={navigate} onBack={() => navigate(Screen.DASHBOARD)} />;
      case Screen.HISTORY_PATIENT_LIST:
         return <HistoryPatientList onNavigate={navigate} onBack={() => navigate(Screen.DASHBOARD)} />;
      case Screen.HISTORY:
         return currentPatient ? (
           <MedicalHistory patient={currentPatient} onBack={() => navigate(Screen.HISTORY_PATIENT_LIST)} onNavigate={navigate} />
         ) : <HistoryPatientList onNavigate={navigate} onBack={() => navigate(Screen.DASHBOARD)} />;
      case Screen.SETTINGS:
         return <Settings onBack={() => navigate(Screen.DASHBOARD)} onNavigate={navigate} />;
      case Screen.HELP:
         return <Help onBack={() => navigate(Screen.DASHBOARD)} />;
      case Screen.TEMPLATE_MANAGEMENT: // New Route
         return <TemplateManagement onNavigate={navigate} onBack={() => navigate(Screen.CONSULTATION)} />;
      
      default:
        return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="antialiased text-zennara-dark">
      {renderScreen()}
    </div>
  );
};

export default App;
