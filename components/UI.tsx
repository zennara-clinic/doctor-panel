import React from 'react';
import { Screen } from '../types';
import { 
  Home, 
  FileText, 
  Search, 
  History, 
  Settings, 
  ChevronLeft, 
  Bell, 
  ChevronDown, 
  Check, 
  Loader2 
} from 'lucide-react';

// --- BUTTONS ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'huge' | 'large' | 'medium';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'large', 
  fullWidth = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "font-sans flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow-sm cursor-pointer";
  
  const variants = {
    primary: "bg-zennara-green text-white hover:bg-opacity-90",
    secondary: "bg-white border-2 border-zennara-green text-zennara-green hover:bg-gray-50",
    danger: "bg-white border-2 border-zennara-alert text-zennara-alert hover:bg-red-50",
    ghost: "bg-transparent text-zennara-green hover:bg-gray-100 border-none shadow-none"
  };

  const sizes = {
    huge: "h-[104px] text-3xl font-normal px-8", 
    large: "h-20 text-xl font-normal px-6",
    medium: "h-14 text-lg font-normal px-4"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );
};

// --- INPUTS & SELECTS ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const LargeInput: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="font-sans text-zennara-dark text-lg font-medium">{label}</label>}
    <div className="relative">
      <input 
        className={`h-[72px] w-full px-6 text-xl border border-gray-200 focus:border-zennara-green outline-none bg-gray-50 rounded-xl transition-colors shadow-sm ${icon ? 'pl-14' : ''} ${className}`}
        {...props}
      />
      {icon && <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
    </div>
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="font-sans text-zennara-dark text-lg font-medium">{label}</label>}
    <div className="relative">
      <select 
        className={`h-[72px] w-full px-6 text-xl border border-gray-200 focus:border-zennara-green outline-none bg-gray-50 rounded-xl transition-colors shadow-sm appearance-none ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown size={24} />
      </div>
    </div>
  </div>
);

// --- FEEDBACK ---

export const AutoSaveIndicator: React.FC<{ status: 'saving' | 'saved' | 'idle' }> = ({ status }) => {
  if (status === 'idle') return null;
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 animate-fade-in">
      {status === 'saving' ? (
        <Loader2 size={16} className="text-yellow-600 animate-spin" />
      ) : (
        <Check size={16} className="text-green-600" />
      )}
      <span className="text-sm font-sans text-gray-600 uppercase tracking-wider font-medium">
        {status === 'saving' ? 'Saving...' : 'Saved'}
      </span>
    </div>
  );
};

// --- CARDS ---

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; active?: boolean }> = ({ 
  children, 
  className = '',
  onClick,
  active = false
}) => (
  <div 
    onClick={onClick}
    className={`
      bg-white rounded-3xl p-6 shadow-sm border transition-all duration-200
      ${active ? 'border-zennara-green ring-1 ring-zennara-green bg-[#f0fdf4]' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'}
      ${onClick ? 'active:scale-[0.99] cursor-pointer' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// --- NAVIGATION ---

export const BottomNavigation: React.FC<{ activeScreen: Screen; onNavigate: (s: Screen) => void }> = ({ activeScreen, onNavigate }) => {
  const items = [
    { icon: <Home size={28} />, label: 'HOME', nav: Screen.DASHBOARD },
    { icon: <FileText size={28} />, label: 'DRAFTS', nav: Screen.DRAFTS },
    { icon: <History size={28} />, label: 'HISTORY', nav: Screen.HISTORY_PATIENT_LIST },
    { icon: <Settings size={28} />, label: 'SETTINGS', nav: Screen.SETTINGS },
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 h-[90px] bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-around px-2 z-50 animate-fade-in">
      {items.map((item, idx) => {
        const isActive = activeScreen === item.nav || (item.nav === Screen.HISTORY_PATIENT_LIST && activeScreen === Screen.HISTORY);
        return (
          <button 
            key={idx}
            onClick={() => onNavigate(item.nav)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 group transition-all duration-300 relative rounded-xl ${isActive ? 'bg-green-50' : 'hover:bg-gray-50'}`}
          >
            <span className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1 text-zennara-green' : 'text-gray-400 group-hover:text-gray-600 group-hover:scale-110'}`}>
              {item.icon}
            </span>
            <span className={`font-sans text-xs font-bold tracking-wide transition-colors ${isActive ? 'text-zennara-green' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.label}
            </span>
            {isActive && <div className="absolute bottom-2 w-1 h-1 rounded-full bg-zennara-green"></div>}
          </button>
        );
      })}
    </div>
  );
};

// --- HEADER ---

export const Header: React.FC<{ 
  title?: string; 
  subtitle?: string; 
  showBack?: boolean; 
  onBack?: () => void;
  onHome?: () => void;
  onNotificationClick?: () => void;
  rightAction?: React.ReactNode;
}> = ({ title, subtitle, showBack, onBack, onHome, onNotificationClick, rightAction }) => (
  <div className="flex flex-col gap-6 mb-8">
    {/* Global Top Bar */}
    <div className="bg-white/80 backdrop-blur-md h-20 w-full flex items-center justify-between px-8 text-zennara-dark fixed top-0 left-0 z-50 shadow-sm border-b border-gray-100">
       <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={onHome}>
         <img 
           src="https://res.cloudinary.com/dimlozhrx/image/upload/v1760515905/Zen_Logo_Green_s9yv1e.png" 
           alt="Zennara Logo" 
           className="h-10 w-auto object-contain" 
         />
       </div>
       <div className="flex items-center gap-6 font-sans text-lg">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 rounded-full bg-zennara-green text-white flex items-center justify-center text-sm font-medium">DR</div>
            <span className="font-medium">Dr. Reddy</span>
          </div>
          <div className="relative cursor-pointer hover:scale-110 transition-transform p-2 text-gray-600 hover:text-zennara-green" onClick={onNotificationClick}>
            <Bell size={28} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">3</span>
          </div>
       </div>
    </div>
    
    {/* Spacer for fixed header */}
    <div className="h-24"></div>

    {/* Page Navigation Bar */}
    <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8">
      {showBack && (
        <button onClick={onBack} className="text-zennara-green font-sans text-xl font-medium flex items-center h-16 px-4 -ml-4 hover:bg-gray-50 rounded-2xl transition-all active:scale-95 group">
          <ChevronLeft size={32} className="mr-1 group-hover:-translate-x-1 transition-transform" /> BACK
        </button>
      )}
      <div className="flex-1"></div>
      {rightAction}
    </div>

    {/* Page Title */}
    {(title || subtitle) && (
      <div className="px-4 sm:px-5 md:px-6 lg:px-8 animate-fade-in">
        {title && <h1 className="font-serif text-4xl text-zennara-dark font-bold mb-2 tracking-tight">{title}</h1>}
        {subtitle && <p className="font-sans text-xl text-zennara-light">{subtitle}</p>}
      </div>
    )}
  </div>
);