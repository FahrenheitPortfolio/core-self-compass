import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const TestChecklist = () => {
  const [tests, setTests] = useState([
    { id: 1, name: 'User Registration', status: 'pending', category: 'Auth' },
    { id: 2, name: 'Email Login', status: 'pending', category: 'Auth' },
    { id: 3, name: 'Google OAuth', status: 'pending', category: 'Auth' },
    { id: 4, name: 'Dashboard Load', status: 'pending', category: 'Core' },
    { id: 5, name: 'Assessment Save', status: 'pending', category: 'Core' },
    { id: 6, name: 'Journal Entry', status: 'pending', category: 'Core' },
    { id: 7, name: 'Mood Tracking', status: 'pending', category: 'Core' },
    { id: 8, name: 'Subscription Flow', status: 'pending', category: 'Payment' },
    { id: 9, name: 'PayPal Integration', status: 'pending', category: 'Payment' },
    { id: 10, name: 'Mobile Responsive', status: 'pending', category: 'UI' },
    { id: 11, name: 'Offline Mode', status: 'pending', category: 'PWA' },
    { id: 12, name: 'Privacy Policy', status: 'pending', category: 'Legal' }
  ]);

  const updateTest = (id: number, status: 'pass' | 'fail' | 'pending') => {
    setTests(prev => prev.map(test => 
      test.id === id ? { ...test, status } : test
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const categories = ['Auth', 'Core', 'Payment', 'UI', 'PWA', 'Legal'];

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Production Test Checklist</h1>
      
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">{category} Tests</h2>
          <div className="space-y-2">
            {tests.filter(test => test.category === category).map(test => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <span className="font-medium">{test.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateTest(test.id, 'pass')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => updateTest(test.id, 'fail')}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Fail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Test Summary</h3>
        <p>Passed: {tests.filter(t => t.status === 'pass').length}/{tests.length}</p>
        <p>Failed: {tests.filter(t => t.status === 'fail').length}/{tests.length}</p>
        <p>Pending: {tests.filter(t => t.status === 'pending').length}/{tests.length}</p>
      </div>
    </div>
  );
};

export default TestChecklist;