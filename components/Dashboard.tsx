
import React, { useState, useMemo } from 'react';
import { BloodGroup, Request } from '../types';

const INITIAL_REQUESTS: Request[] = [
  { id: '1', patientName: 'Rahul S.', age: 45, bloodGroup: BloodGroup.OPos, hospital: 'Apollo Speciality Hospital', urgency: 'Critical', unitsNeeded: 2, timestamp: Date.now() - 1000 * 60 * 15 },
  { id: '2', patientName: 'Priya K.', age: 29, bloodGroup: BloodGroup.ABNeg, hospital: 'Fortis Memorial Research Institute', urgency: 'High', unitsNeeded: 4, timestamp: Date.now() - 1000 * 60 * 120 },
  { id: '3', patientName: 'Amit V.', age: 34, bloodGroup: BloodGroup.ANeg, hospital: 'Max Super Speciality Hospital', urgency: 'Normal', unitsNeeded: 1, timestamp: Date.now() - 1000 * 60 * 300 },
];

type SortOption = 'time' | 'urgency' | 'units';

export const Dashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(INITIAL_REQUESTS);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('time');

  // Form State
  const [newRequest, setNewRequest] = useState({
    patientName: '',
    age: 0,
    bloodGroup: BloodGroup.OPos,
    hospital: '',
    urgency: 'Normal' as Request['urgency'],
    unitsNeeded: 1
  });

  const urgencyScore = (urgency: Request['urgency']) => {
    switch (urgency) {
      case 'Critical': return 3;
      case 'High': return 2;
      case 'Normal': return 1;
      default: return 0;
    }
  };

  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => {
      if (sortBy === 'time') {
        return b.timestamp - a.timestamp;
      } else if (sortBy === 'urgency') {
        const diff = urgencyScore(b.urgency) - urgencyScore(a.urgency);
        return diff !== 0 ? diff : b.timestamp - a.timestamp;
      } else if (sortBy === 'units') {
        const diff = b.unitsNeeded - a.unitsNeeded;
        return diff !== 0 ? diff : b.timestamp - a.timestamp;
      }
      return 0;
    });
  }, [requests, sortBy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const req: Request = {
      ...newRequest,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };

    setRequests([req, ...requests]);
    setFormOpen(false);
    setLoading(false);
    
    setNewRequest({
        patientName: '',
        age: 0,
        bloodGroup: BloodGroup.OPos,
        hospital: '',
        urgency: 'Normal',
        unitsNeeded: 1
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Emergency Dashboard</h2>
          <p className="text-slate-500">Active blood requirements at local hospitals.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-500 outline-none cursor-pointer transition-all"
            >
              <option value="time">Time Posted</option>
              <option value="urgency">Urgency</option>
              <option value="units">Units Needed</option>
            </select>
          </div>
          
          <button 
            onClick={() => setFormOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Request
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedRequests.map((req) => (
          <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-red-200 transition-all flex flex-col md:flex-row md:items-center gap-6 group">
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-red-50 text-red-600 rounded-full border border-red-100 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">{req.bloodGroup}</span>
            </div>
            
            <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patient</label>
                  {req.urgency === 'Critical' && (
                    <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-red-600 text-[8px] font-black uppercase animate-pulse">Critical</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 truncate">{req.patientName}</h3>
                <p className="text-slate-500 text-sm">Age: {req.age}</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital</label>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="font-medium truncate">{req.hospital}</span>
                </div>
              </div>

              <div className="text-right">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required</label>
                <p className="text-xl font-black text-slate-900">{req.unitsNeeded} <span className="text-sm font-bold text-slate-500 uppercase">Units</span></p>
              </div>
            </div>
          </div>
        ))}
        
        {requests.length === 0 && (
          <div className="py-20 text-center bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium text-lg">No active requests found.</p>
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">New Emergency Request</h3>
              <button onClick={() => setFormOpen(false)} className="text-slate-400 hover:text-slate-600 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Patient Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                    value={newRequest.patientName}
                    onChange={(e) => setNewRequest({...newRequest, patientName: e.target.value})}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Age</label>
                  <input 
                    required
                    type="number" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    value={newRequest.age || ''}
                    onChange={(e) => setNewRequest({...newRequest, age: parseInt(e.target.value) || 0})}
                    placeholder="Age"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Blood Group</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                    value={newRequest.bloodGroup}
                    onChange={(e) => setNewRequest({...newRequest, bloodGroup: e.target.value as BloodGroup})}
                  >
                    {Object.values(BloodGroup).map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Urgency Level</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({...newRequest, urgency: e.target.value as Request['urgency']})}
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Hospital Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                    value={newRequest.hospital}
                    onChange={(e) => setNewRequest({...newRequest, hospital: e.target.value})}
                    placeholder="e.g. Apollo Speciality Hospital"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Units Needed</label>
                  <input 
                    required
                    type="number" 
                    min="1" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                    value={newRequest.unitsNeeded}
                    onChange={(e) => setNewRequest({...newRequest, unitsNeeded: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
