
import React from 'react';

const FEATURE_LIST = [
  {
    title: 'Zero Scams & Fraud',
    description: 'Donix enforces a strictly voluntary system with KYC-verified donor profiles, eliminating predatory cash requests.',
    tag: 'Safe',
    color: 'green',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Live Donor Tracking',
    description: 'Real-time visibility into donor movement. Family members receive instant updates when a donor is en route.',
    tag: 'Fast',
    color: 'blue',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Smart Proximity Engine',
    description: 'Intelligent geofencing ensures alerts only reach donors who are physically close and eligible to donate.',
    tag: 'Smart',
    color: 'purple',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black tracking-[0.3em] text-red-600 uppercase mb-4">Core Technology</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Designed for Reliability</h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">We've rebuilt the donation experience from the ground up to solve the three biggest problems: trust, speed, and logistics.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {FEATURE_LIST.map((feature, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
              <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 text-${feature.color}-500`}>
                {feature.icon}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 bg-${feature.color}-100 text-${feature.color}-600`}>
                {feature.tag}
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed font-medium">{feature.description}</p>
              
              <div className="mt-8 pt-8 border-t border-slate-200/50 flex items-center text-slate-400 group-hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">Learn more</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
