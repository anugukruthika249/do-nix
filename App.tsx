
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TrustSafety } from './components/TrustSafety';
import { Testimonials } from './components/Testimonials';
import { Dashboard } from './components/Dashboard';
import { DonorRegistration } from './components/DonorRegistration';
import { ProblemSolution } from './components/ProblemSolution';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'app' | 'donor-registration'>('home');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onNavigate={setActiveTab} activeTab={activeTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="space-y-0">
            <Hero 
              onGetStarted={() => setActiveTab('app')} 
              onJoinDonor={() => setActiveTab('donor-registration')} 
            />
            <ProblemSolution />
            <Features />
            <TrustSafety />
            <Testimonials />
            
            {/* CTA Section */}
            <section className="py-20 bg-red-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
              </div>
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to make a difference?</h2>
                <p className="text-red-100 text-xl mb-10">Join thousands of heroes in India who are saving lives every day through Donix.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setActiveTab('donor-registration')}
                    className="px-10 py-4 bg-white text-red-600 font-bold rounded-2xl shadow-xl hover:bg-red-50 transition-all transform hover:scale-105"
                  >
                    Register as a Donor
                  </button>
                  <button 
                    onClick={() => setActiveTab('app')}
                    className="px-10 py-4 bg-red-800 text-white font-bold rounded-2xl shadow-xl hover:bg-red-900 transition-all border border-red-500/30"
                  >
                    Post Emergency Request
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === 'app' && <Dashboard />}
        {activeTab === 'donor-registration' && (
          <DonorRegistration onBack={() => setActiveTab('home')} />
        )}
      </main>

      <footer className="bg-slate-950 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">DONIX<span className="text-red-600">.</span></h3>
            <p className="text-slate-400 max-w-sm text-lg leading-relaxed mb-8">
              Empowering communities across India with a decentralized, verified, and high-speed blood donation network.
            </p>
            <div className="flex gap-4">
              {['twitter', 'facebook', 'instagram'].map(social => (
                <div key={social} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">How it Works</button></li>
              <li><button onClick={() => setActiveTab('app')} className="hover:text-white transition-colors">Find Donors</button></li>
              <li><button onClick={() => setActiveTab('donor-registration')} className="hover:text-white transition-colors">Eligibility Guide</button></li>
              <li><button className="hover:text-white transition-colors">Hospital Partners</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><button className="hover:text-white transition-colors">Help Center</button></li>
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><a href="mailto:support@donix-save.org" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2024 Donix India. Built with ❤️ for humanity.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
