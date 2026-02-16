
import React from 'react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center">
          {/* Solution Column - Now Centered and Expanded */}
          <div className="bg-red-600 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden w-full max-w-5xl shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-700 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-30"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-xs font-black tracking-[0.4em] text-red-200 uppercase mb-4">The Innovation</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">How Donix Changes the Game</h3>
                <p className="text-red-100/80 text-lg max-w-2xl mx-auto">
                  A revolutionary approach to blood donation that prioritizes speed, trust, and community engagement.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12 mt-16">
                {[
                  {
                    step: '01',
                    title: 'Verified Pipeline',
                    text: 'We only onboard donors with authenticated donation history from partner blood banks.'
                  },
                  {
                    step: '02',
                    title: 'Automated Response',
                    text: 'Our system instantly notifies the 10 closest compatible donors, cutting wait times by up to 80%.'
                  },
                  {
                    step: '03',
                    title: 'Community Incentives',
                    text: 'Every successful donation earns "Life Credits" redeemable for health checkups and pharmacy discounts.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <span className="text-4xl font-black text-red-400 opacity-30 mb-4 group-hover:opacity-100 transition-opacity duration-300">
                      {item.step}
                    </span>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-red-100/70 leading-relaxed text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
