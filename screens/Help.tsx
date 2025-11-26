import React, { useState } from 'react';
import { Card, Button, Header } from '../components/UI';
import { Phone, PlayCircle, Plus, Minus, Lightbulb, AlertCircle } from 'lucide-react';

export const Help: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'How do I change my consultation fee?', a: 'Go to Settings → Consultation Preferences. Enter the new amount and tap Save.' },
    { q: 'What if the patient has multiple allergies?', a: 'The system automatically warns you. You will see a large red alert banner listing all allergies.' },
    { q: 'Can I edit a prescription after sending it?', a: 'No, for safety reasons. You must create a new prescription or contact the pharmacy directly.' },
    { q: 'How does palm rejection work?', a: 'When enabled, the screen ignores your hand and only detects the stylus tip.' },
    { q: 'Where do my drafts go?', a: 'Unfinished work is saved in the "Drafts" tab at the bottom of the dashboard.' },
    { q: 'How do I search for an old patient?', a: 'Tap "Search" at the bottom of the dashboard and type their name, ID, or phone number.' },
  ];

  return (
    <div className="min-h-screen bg-zennara-bg pb-12">
      <Header showBack onBack={onBack} title="HELP & SUPPORT" subtitle="Learn how to use Zennara" />

      <div className="px-6 flex flex-col gap-12">
        
        {/* Call Support Banner */}
        <div className="bg-gradient-to-r from-zennara-dark to-black rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
           <div>
              <h2 className="font-serif text-3xl font-bold mb-2">Need Immediate Help?</h2>
              <p className="opacity-80 text-lg">Support Available 24/7</p>
           </div>
           <div className="text-right">
              <Button size="large" icon={<Phone size={24} />} className="bg-white text-zennara-dark hover:bg-gray-100 mb-2">CALL SUPPORT</Button>
              <p className="font-mono text-sm opacity-60">+91 98765 00000</p>
           </div>
        </div>

        {/* Videos Grid */}
        <div>
           <h2 className="font-serif text-3xl font-bold mb-6 text-zennara-dark">Video Tutorials</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Getting Started', 'Writing Prescriptions', 'Using Digital Pen', 'Assigning Treatments'].map((v, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-4 items-center hover:shadow-md transition-shadow cursor-pointer">
                   <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shadow-inner">
                     <PlayCircle size={40} />
                   </div>
                   <div>
                      <h3 className="font-serif text-xl font-bold text-zennara-dark mb-1">{v}</h3>
                      <span className="text-zennara-light text-sm">2 min video</span>
                      <button className="block text-zennara-green font-bold mt-2 text-sm uppercase tracking-wider">Watch Now</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* FAQ Accordion */}
        <div>
           <h2 className="font-serif text-3xl font-bold mb-6 text-zennara-dark">Common Questions</h2>
           <div className="flex flex-col gap-4">
             {faqs.map((f, i) => (
               <div 
                 key={i} 
                 onClick={() => setOpenFaq(openFaq === i ? null : i)}
                 className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${openFaq === i ? 'shadow-md border-zennara-green ring-1 ring-zennara-green' : 'border-gray-200 hover:border-gray-300'}`}
               >
                  <div className="p-6 flex justify-between items-center">
                     <h3 className="font-sans font-medium text-xl text-zennara-dark">{f.q}</h3>
                     <span className={`text-zennara-green transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                       {openFaq === i ? <Minus size={24} /> : <Plus size={24} />}
                     </span>
                  </div>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-lg text-zennara-light leading-relaxed border-t border-gray-100 pt-4">{f.a}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Quick Tips */}
        <div>
           <h2 className="font-serif text-3xl font-bold mb-6 text-zennara-dark">Quick Tips</h2>
           <Card className="bg-green-50 border-green-100">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xl text-zennara-dark">
                <li className="flex gap-4 items-start"><Lightbulb size={24} className="text-zennara-green mt-1 shrink-0" /> <span><strong>Templates are fastest</strong> - use them for common prescriptions</span></li>
                <li className="flex gap-4 items-start"><Lightbulb size={24} className="text-zennara-green mt-1 shrink-0" /> <span><strong>Your work auto-saves</strong> - never worry about losing data</span></li>
                <li className="flex gap-4 items-start"><Lightbulb size={24} className="text-zennara-green mt-1 shrink-0" /> <span><strong>Dictate text</strong> by tapping the microphone icon</span></li>
                <li className="flex gap-4 items-start"><Lightbulb size={24} className="text-zennara-green mt-1 shrink-0" /> <span><strong>Drafts</strong> expire after 7 days automatically</span></li>
              </ul>
           </Card>
        </div>

        {/* Feedback & Status */}
        <div className="flex flex-col items-center gap-8 mt-4">
           <Button variant="secondary" size="large" fullWidth className="max-w-md" icon={<AlertCircle size={24} />}>REPORT A PROBLEM</Button>
           
           <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-1 rounded-full mb-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="font-bold text-green-800 text-sm">System Operational</span>
              </div>
              <p className="text-gray-400 text-sm">Zennara v2.5.0</p>
           </div>
        </div>

      </div>
    </div>
  );
};