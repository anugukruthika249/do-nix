
import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onJoinDonor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onJoinDonor }) => {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-slate-900 rounded-full border border-slate-800 shadow-xl animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">
              12 Active Requests in Bengaluru
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            Saving Lives <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">Together.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-medium">
            The most reliable and fastest blood donation network in India. 
            Connecting donors to patients in critical need within minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg">
            <button 
              onClick={onGetStarted}
              className="group relative w-full sm:w-auto px-10 py-5 bg-red-600 text-white font-bold rounded-2xl shadow-2xl shadow-red-200 hover:bg-red-700 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Request Emergency Blood
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button 
              onClick={onJoinDonor}
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Join as a Verified Donor
            </button>
          </div>
          
          <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 w-full border-t border-slate-100 pt-16">
            {[
              { label: 'Verified Donors', value: '50,000+', icon: '👤' },
              { label: 'Hospitals Connected', value: '1,200+', icon: '🏥' },
              { label: 'Success Rate', value: '98%', icon: '✅' },
              { label: 'Avg. Response Time', value: '< 10 Min', icon: '⚡' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
