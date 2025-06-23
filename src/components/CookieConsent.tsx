import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize analytics based on consent
    if (prefs.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-start space-x-3">
            <Cookie className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">Cookie Preferences</h3>
              <p className="text-sm text-gray-600 mb-4">
                We use cookies to enhance your experience and analyze app usage. 
                You can customize your preferences or accept all cookies.
              </p>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={acceptAll}
                    className="flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={acceptEssential}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                  >
                    Essential Only
                  </button>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Cookie Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">Essential Cookies</h3>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">Required</span>
                </div>
                <p className="text-sm text-gray-600">
                  Necessary for the app to function properly. Cannot be disabled.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">Analytics Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Help us understand how you use the app to improve your experience.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">Marketing Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Used to show you relevant content and advertisements.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => savePreferences(preferences)}
                className="flex-1 bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;