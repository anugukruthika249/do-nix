import React, { useState, useMemo, useEffect } from 'react';
import { BloodGroup, Request } from '../types';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

type SortOption = 'time' | 'urgency' | 'units';

export const Dashboard: React.FC = () => {

  const [requests, setRequests] = useState<Request[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('time');

  const [newRequest, setNewRequest] = useState({
    patientName: '',
    age: 0,
    bloodGroup: BloodGroup.OPos,
    hospital: '',
    urgency: 'Normal' as Request['urgency'],
    unitsNeeded: 1
  });

  // 🔥 Real-time Firestore listener
  useEffect(() => {
    const q = query(
      collection(db, "requests"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        patientName: doc.data().patientName,
        age: doc.data().age,
        bloodGroup: doc.data().bloodGroup,
        hospital: doc.data().hospital,
        urgency: doc.data().urgency,
        unitsNeeded: doc.data().units,
        timestamp: doc.data().createdAt?.toMillis() || Date.now()
      }));

      setRequests(data as Request[]);
    });

    return () => unsubscribe();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "requests", id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

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

    try {
      await addDoc(collection(db, "requests"), {
        patientName: newRequest.patientName,
        age: newRequest.age,
        bloodGroup: newRequest.bloodGroup,
        hospital: newRequest.hospital,
        urgency: newRequest.urgency,
        units: newRequest.unitsNeeded,
        createdAt: Timestamp.now()
      });

      setFormOpen(false);
    } catch (error) {
      console.error("Error adding request:", error);
    }

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

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Emergency Dashboard
          </h2>
          <p className="mt-2 text-sm font-semibold text-red-600">
            {requests.length} Active Requests
          </p>
        </div>

        <button
          onClick={() => setFormOpen(true)}
          className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl"
        >
          Create Request
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {sortedRequests.map((req) => (
          <div
            key={req.id}
            className={`p-6 rounded-2xl transition-all duration-500
              ${req.urgency === 'Critical'
                ? 'bg-red-600 text-white animate-pulse shadow-2xl'
                : req.urgency === 'High'
                ? 'bg-red-100 border border-red-400 animate-pulse shadow-lg'
                : 'bg-white border shadow-sm'
              }
            `}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  {req.patientName}
                </h3>
                <p>Age: {req.age}</p>
                <p>{req.hospital}</p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">{req.bloodGroup}</p>
                <p>{req.unitsNeeded} Units</p>
                <p className="text-sm font-semibold">{req.urgency}</p>

                {(req.urgency === 'Critical' || req.urgency === 'High') && (
                  <button
                    onClick={() => handleComplete(req.id)}
                    className="mt-2 text-sm font-semibold hover:underline"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <p className="text-center text-slate-400">
            No active requests.
          </p>
        )}
      </div>

      {/* Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              New Emergency Request
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                required
                type="text"
                placeholder="Patient Name"
                className="w-full border p-3 rounded-lg"
                value={newRequest.patientName}
                onChange={(e) =>
                  setNewRequest({...newRequest, patientName: e.target.value})
                }
              />

              <input
                required
                type="number"
                placeholder="Age"
                className="w-full border p-3 rounded-lg"
                value={newRequest.age || ''}
                onChange={(e) =>
                  setNewRequest({...newRequest, age: parseInt(e.target.value) || 0})
                }
              />

              <select
                className="w-full border p-3 rounded-lg"
                value={newRequest.urgency}
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    urgency: e.target.value as Request['urgency']
                  })
                }
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>

              <input
                required
                type="text"
                placeholder="Hospital Name"
                className="w-full border p-3 rounded-lg"
                value={newRequest.hospital}
                onChange={(e) =>
                  setNewRequest({...newRequest, hospital: e.target.value})
                }
              />

              <input
                required
                type="number"
                min="1"
                placeholder="Units Needed"
                className="w-full border p-3 rounded-lg"
                value={newRequest.unitsNeeded}
                onChange={(e) =>
                  setNewRequest({...newRequest, unitsNeeded: parseInt(e.target.value) || 1})
                }
              />

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg"
              >
                {loading ? 'Processing...' : 'Submit Request'}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};