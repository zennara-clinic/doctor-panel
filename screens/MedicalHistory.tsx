
import React, { useState } from 'react';
import { Card, Button, Header, BottomNavigation } from '../components/UI';
import { Patient, Screen } from '../types';
import { 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Clock,
  Download,
  Share2,
  Filter,
  Search,
  Pill,
  Activity,
  Heart,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Eye,
  ChevronRight,
  Droplet,
  TrendingUp,
  User
} from 'lucide-react';

interface MedicalHistoryProps {
  patient?: Patient;
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

type TabType = 'timeline' | 'documents' | 'vitals';

export const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient, onBack, onNavigate }) => {
  const name = patient?.name || "Priya Sharma";
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const history = [
    { 
      id: 'h1', 
      date: 'Nov 10, 2025', 
      fullDate: '10 November 2025, 3:30 PM',
      doctor: 'Dr. Ramesh Reddy', 
      type: 'Laser Therapy', 
      status: 'Completed',
      color: 'purple',
      details: { 
        diagnosis: 'Acne Vulgaris (Moderate)', 
        rx: 'Doxycycline 100mg BD x 14 days', 
        treatment: 'Carbon Laser Facial - Session 3/6',
        notes: 'Patient showing good progress. Minor redness post-procedure, expected to subside in 24-48 hours.',
        followUp: 'Dec 08, 2025'
      } 
    },
    { 
      id: 'h2', 
      date: 'Oct 28, 2025', 
      fullDate: '28 October 2025, 11:15 AM',
      doctor: 'Dr. Kavita Singh', 
      type: 'Follow-up', 
      status: 'Completed',
      color: 'blue',
      details: { 
        diagnosis: 'Acne Vulgaris - Improving', 
        rx: 'Continue previous medication', 
        treatment: 'Routine check-up and assessment',
        notes: 'Skin texture improving. Patient advised to continue current skincare routine.',
        followUp: 'Nov 10, 2025'
      } 
    },
    { 
      id: 'h3', 
      date: 'Oct 15, 2025', 
      fullDate: '15 October 2025, 2:00 PM',
      doctor: 'Dr. Ramesh Reddy', 
      type: 'Initial Consultation', 
      status: 'Completed',
      color: 'green',
      details: { 
        diagnosis: 'Acne Vulgaris (Grade 2)', 
        rx: 'Benzoyl Peroxide 2.5% Gel, Clindamycin Phosphate', 
        treatment: 'Treatment plan initiated',
        notes: 'First visit. Discussed treatment options. Patient opted for combination therapy.',
        followUp: 'Oct 28, 2025'
      } 
    },
    { 
      id: 'h4', 
      date: 'Sep 05, 2025', 
      fullDate: '05 September 2025, 4:45 PM',
      doctor: 'Dr. Kavita Singh', 
      type: 'Skin Analysis', 
      status: 'Completed',
      color: 'orange',
      details: { 
        diagnosis: 'Oily Skin with Comedones', 
        rx: 'Salicylic Acid Face Wash 2%', 
        treatment: 'Hydrafacial Deep Cleanse',
        notes: 'Comprehensive skin analysis completed. Recommended customized skincare regimen.',
        followUp: 'Oct 15, 2025'
      } 
    },
    { 
      id: 'h5', 
      date: 'Aug 12, 2025', 
      fullDate: '12 August 2025, 10:30 AM',
      doctor: 'Dr. Ramesh Reddy', 
      type: 'Consultation', 
      status: 'Completed',
      color: 'teal',
      details: { 
        diagnosis: 'Mild Acne, Preventive Care', 
        rx: 'Clindamycin Gel 1%', 
        treatment: 'Basic skin assessment',
        notes: 'Initial assessment. Patient concerned about occasional breakouts.',
        followUp: 'Sep 05, 2025'
      } 
    }
  ];

  const documents = [
    { id: 'd1', name: 'Lab Report - Blood Test', date: 'Nov 5, 2025', type: 'Lab Report', size: '2.3 MB' },
    { id: 'd2', name: 'Prescription - Acne Treatment', date: 'Oct 10, 2025', type: 'Prescription', size: '1.1 MB' },
    { id: 'd3', name: 'Skin Analysis Report', date: 'Sep 05, 2025', type: 'Analysis', size: '3.8 MB' },
    { id: 'd4', name: 'Treatment Plan Document', date: 'Aug 12, 2025', type: 'Plan', size: '1.5 MB' },
    { id: 'd5', name: 'Allergy Test Results', date: 'Aug 10, 2025', type: 'Lab Report', size: '2.1 MB' },
    { id: 'd6', name: 'Medical History Form', date: 'Aug 10, 2025', type: 'Form', size: '890 KB' }
  ];

  const vitals = [
    { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', status: 'normal', icon: <Heart size={20} /> },
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: <Activity size={20} /> },
    { label: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal', icon: <Droplet size={20} /> },
    { label: 'BMI', value: '21.3', unit: 'kg/m²', status: 'normal', icon: <TrendingUp size={20} /> }
  ];

  const handleViewRx = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate(Screen.VIEW_LAST_PRESCRIPTION);
    }
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.details.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; border: string; text: string } } = {
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
      teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-32">
      <Header 
        showBack 
        onBack={onBack} 
        onHome={() => onNavigate && onNavigate(Screen.DASHBOARD)}
        onNotificationClick={() => onNavigate && onNavigate(Screen.NOTIFICATIONS)}
      />

      {/* Two Column Layout for Tablet */}
      <div className="px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          
          {/* LEFT SIDEBAR - Patient Summary (Sticky) */}
          <div className="lg:sticky lg:top-32 space-y-4">
            
            {/* Patient Card */}
            <Card className="overflow-hidden">
              <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zennara-green to-emerald-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="font-serif text-2xl font-bold text-zennara-dark mb-1">{name}</h2>
                <p className="font-sans text-base text-zennara-light mb-3">ZN001 • 28 years • Female</p>
                <div className="flex items-center gap-2 text-sm text-zennara-light">
                  <Calendar size={16} />
                  <span>Member since Aug 12, 2025</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-zennara-dark">
                  <Phone size={18} className="text-zennara-light" />
                  <div className="flex-1">
                    <p className="text-xs text-zennara-light mb-0.5">Phone</p>
                    <p className="text-sm font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zennara-dark">
                  <Mail size={18} className="text-zennara-light" />
                  <div className="flex-1">
                    <p className="text-xs text-zennara-light mb-0.5">Email</p>
                    <p className="text-sm font-medium">priya.sharma@email.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-zennara-dark">
                  <MapPin size={18} className="text-zennara-light" />
                  <div className="flex-1">
                    <p className="text-xs text-zennara-light mb-0.5">Address</p>
                    <p className="text-sm font-medium">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Button 
                  variant="secondary" 
                  size="medium" 
                  fullWidth
                  icon={<Edit2 size={18} />}
                  onClick={() => alert('Edit Patient Info')}
                >
                  EDIT INFORMATION
                </Button>
              </div>
            </Card>

            {/* Allergy Alert */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-2xl text-white shadow-lg">
              <div className="flex items-start gap-3 mb-2">
                <AlertTriangle size={24} className="shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg font-bold mb-1">ALLERGY ALERT</h3>
                  <p className="text-sm opacity-95 mb-1">Penicillin</p>
                  <p className="text-xs opacity-80">Added Oct 15, 2025</p>
                </div>
              </div>
            </div>

            {/* Vitals Summary */}
            <Card>
              <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                <Activity size={20} className="text-zennara-green" />
                Latest Vitals
              </h3>
              <div className="space-y-3">
                {vitals.map((vital, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zennara-light">
                      {vital.icon}
                      <span className="text-sm">{vital.label}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-zennara-dark">{vital.value}</p>
                      <p className="text-xs text-zennara-light">{vital.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zennara-light mt-4 pt-4 border-t">Last updated: Nov 10, 2025</p>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-serif text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                  <span className="font-sans text-sm text-zennara-dark">Export History</span>
                  <Download size={18} className="text-zennara-light group-hover:text-zennara-green transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                  <span className="font-sans text-sm text-zennara-dark">Share Records</span>
                  <Share2 size={18} className="text-zennara-light group-hover:text-zennara-green transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                  <span className="font-sans text-sm text-zennara-dark">Print Summary</span>
                  <FileText size={18} className="text-zennara-light group-hover:text-zennara-green transition-colors" />
                </button>
              </div>
            </Card>
          </div>

          {/* RIGHT CONTENT - Main Content Area */}
          <div className="space-y-6">
            
            {/* Page Header with Stats */}
            <div>
              <h1 className="font-serif text-4xl font-bold text-zennara-dark mb-2">Medical History</h1>
              <p className="font-sans text-lg text-zennara-light mb-6">Complete medical records and consultation history</p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="text-center py-6">
                  <p className="text-3xl font-bold text-zennara-dark mb-1">5</p>
                  <p className="text-sm text-zennara-light">Total Visits</p>
                </Card>
                <Card className="text-center py-6">
                  <p className="text-3xl font-bold text-zennara-dark mb-1">6</p>
                  <p className="text-sm text-zennara-light">Documents</p>
                </Card>
                <Card className="text-center py-6">
                  <p className="text-3xl font-bold text-purple-600 mb-1">3/6</p>
                  <p className="text-sm text-zennara-light">Treatment Progress</p>
                </Card>
              </div>
            </div>

            {/* Tabs */}
            <Card className="p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`flex-1 py-3 px-6 rounded-xl font-sans text-base font-medium transition-all ${
                    activeTab === 'timeline'
                      ? 'bg-zennara-green text-white shadow-md'
                      : 'text-zennara-light hover:bg-gray-50'
                  }`}
                >
                  <Clock size={18} className="inline mr-2" />
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`flex-1 py-3 px-6 rounded-xl font-sans text-base font-medium transition-all ${
                    activeTab === 'documents'
                      ? 'bg-zennara-green text-white shadow-md'
                      : 'text-zennara-light hover:bg-gray-50'
                  }`}
                >
                  <FileText size={18} className="inline mr-2" />
                  Documents
                </button>
                <button
                  onClick={() => setActiveTab('vitals')}
                  className={`flex-1 py-3 px-6 rounded-xl font-sans text-base font-medium transition-all ${
                    activeTab === 'vitals'
                      ? 'bg-zennara-green text-white shadow-md'
                      : 'text-zennara-light hover:bg-gray-50'
                  }`}
                >
                  <Activity size={18} className="inline mr-2" />
                  Vitals History
                </button>
              </div>
            </Card>

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-4 animate-fade-in">
                
                {/* Search and Filter */}
                <Card className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zennara-light" />
                      <input
                        type="text"
                        placeholder="Search consultations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-zennara-green outline-none text-base"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="h-12 px-4 rounded-xl border border-gray-200 focus:border-zennara-green outline-none text-base bg-white"
                    >
                      <option value="all">All Types</option>
                      <option value="consultation">Consultation</option>
                      <option value="follow">Follow-up</option>
                      <option value="therapy">Therapy</option>
                      <option value="analysis">Analysis</option>
                    </select>
                  </div>
                </Card>

                {/* Timeline Items */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-zennara-green via-gray-200 to-gray-200"></div>
                  
                  <div className="space-y-4">
                    {filteredHistory.map((item, index) => {
                      const isExpanded = expandedId === item.id;
                      const colorClasses = getColorClasses(item.color);
                      
                      return (
                        <Card 
                          key={item.id}
                          className="ml-14 relative cursor-pointer hover:shadow-xl transition-all duration-300"
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        >
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[51px] top-8 w-5 h-5 rounded-full border-4 border-white shadow-lg ${
                            index === 0 ? 'bg-zennara-green' : 'bg-gray-300'
                          }`}></div>
                          
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${colorClasses.bg} ${colorClasses.text}`}>
                                  {item.type}
                                </span>
                                {index === 0 && (
                                  <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-green-50 text-green-700">
                                    Latest
                                  </span>
                                )}
                              </div>
                              <h3 className="font-serif text-2xl font-bold text-zennara-dark mb-1">{item.date}</h3>
                              <p className="text-sm text-zennara-light mb-2">{item.fullDate}</p>
                              <div className="flex items-center gap-2 text-zennara-light">
                                <User size={16} />
                                <span className="text-sm font-medium">{item.doctor}</span>
                              </div>
                            </div>
                            <ChevronRight 
                              size={24} 
                              className={`text-zennara-light transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                            />
                          </div>

                          {!isExpanded && (
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                              <Pill size={16} className="text-zennara-light" />
                              <p className="text-sm text-zennara-light">{item.details.diagnosis}</p>
                            </div>
                          )}

                          {isExpanded && (
                            <div className="pt-4 mt-4 border-t border-gray-100 space-y-4 animate-fade-in">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                  <p className="text-xs text-zennara-light mb-1 uppercase tracking-wide">Diagnosis</p>
                                  <p className="text-sm font-bold text-zennara-dark">{item.details.diagnosis}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                  <p className="text-xs text-zennara-light mb-1 uppercase tracking-wide">Treatment</p>
                                  <p className="text-sm font-bold text-zennara-dark">{item.details.treatment}</p>
                                </div>
                              </div>

                              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-xs text-blue-700 mb-2 uppercase tracking-wide font-bold">Prescription</p>
                                <p className="text-sm text-blue-900 font-medium">{item.details.rx}</p>
                              </div>

                              <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-xs text-zennara-light mb-2 uppercase tracking-wide">Clinical Notes</p>
                                <p className="text-sm text-zennara-dark leading-relaxed">{item.details.notes}</p>
                              </div>

                              {item.details.followUp && (
                                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
                                  <Calendar size={16} className="text-green-600" />
                                  <span className="text-sm text-green-900">
                                    <span className="font-bold">Next Follow-up:</span> {item.details.followUp}
                                  </span>
                                </div>
                              )}

                              <div className="flex gap-3 pt-2">
                                <Button 
                                  variant="secondary" 
                                  size="medium" 
                                  onClick={handleViewRx}
                                  icon={<Eye size={18} />}
                                >
                                  VIEW PRESCRIPTION
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="medium"
                                  icon={<Download size={18} />}
                                >
                                  DOWNLOAD
                                </Button>
                              </div>
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4 animate-fade-in">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold">All Documents ({documents.length})</h3>
                    <Button variant="secondary" size="medium" icon={<Download size={18} />}>
                      DOWNLOAD ALL
                    </Button>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  {documents.map(doc => (
                    <Card key={doc.id} className="hover:shadow-xl transition-all cursor-pointer group">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <FileText size={28} className="text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base font-bold text-zennara-dark mb-1 truncate">{doc.name}</h4>
                          <p className="text-xs text-zennara-light mb-1">{doc.date}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-zennara-light">{doc.type}</span>
                            <span className="text-xs text-zennara-light">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <Button variant="secondary" size="medium" fullWidth icon={<Eye size={16} />}>
                          VIEW
                        </Button>
                        <Button variant="ghost" size="medium" icon={<Download size={16} />}>
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Vitals History Tab */}
            {activeTab === 'vitals' && (
              <div className="space-y-4 animate-fade-in">
                <Card>
                  <h3 className="font-serif text-xl font-bold mb-6">Vitals Tracking</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {vitals.map((vital, i) => (
                      <div key={i} className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-zennara-green/10 flex items-center justify-center text-zennara-green">
                            {vital.icon}
                          </div>
                          <div>
                            <p className="text-sm text-zennara-light">{vital.label}</p>
                            <p className="text-2xl font-bold text-zennara-dark">{vital.value} <span className="text-base font-normal text-zennara-light">{vital.unit}</span></p>
                          </div>
                        </div>
                        <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-zennara-light">
                          <TrendingUp size={24} className="mr-2" />
                          <span className="text-sm">Chart visualization</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="font-serif text-xl font-bold mb-4">Vitals History Log</h3>
                  <div className="space-y-3">
                    {['Nov 10, 2025', 'Oct 28, 2025', 'Oct 15, 2025'].map((date, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Calendar size={18} className="text-zennara-light" />
                          <span className="font-medium text-zennara-dark">{date}</span>
                        </div>
                        <Button variant="ghost" size="medium">VIEW DETAILS</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>

      {onNavigate && <BottomNavigation activeScreen={Screen.HISTORY} onNavigate={onNavigate} />}
    </div>
  );
};
