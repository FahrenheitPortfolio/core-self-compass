import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Privacy Policy</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
        <div className="text-sm text-gray-500 mb-4">
          Effective Date: {new Date().toLocaleDateString()} | GDPR & HIPAA Compliant
        </div>
        
        <section>
          <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>Personal Data:</strong> Name, email, profile information</p>
            <p><strong>Health Data:</strong> Mood entries, wellness assessments, journal entries, symptom tracking</p>
            <p><strong>Usage Data:</strong> App interactions, device information, analytics</p>
            <p><strong>Payment Data:</strong> Processed securely through PayPal (we don't store payment info)</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. How We Use Your Data</h2>
          <div className="text-gray-700 space-y-1">
            <p>• Provide personalized wellness insights and recommendations</p>
            <p>• Process payments and manage subscriptions</p>
            <p>• Send service-related communications</p>
            <p>• Improve our services and user experience</p>
            <p>• Comply with legal obligations</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. Data Sharing & Disclosure</h2>
          <div className="text-gray-700 space-y-2">
            <p><strong>We DO NOT sell your personal data.</strong></p>
            <p>Limited sharing only with:</p>
            <p>• Service providers (Supabase for hosting, PayPal for payments)</p>
            <p>• Healthcare providers (only when you explicitly choose to share)</p>
            <p>• Legal authorities when required by law</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. Your Rights (GDPR)</h2>
          <div className="text-gray-700 space-y-1">
            <p>• <strong>Access:</strong> Request a copy of your data</p>
            <p>• <strong>Rectification:</strong> Correct inaccurate information</p>
            <p>• <strong>Erasure:</strong> Delete your account and data</p>
            <p>• <strong>Portability:</strong> Export your data</p>
            <p>• <strong>Withdraw Consent:</strong> Opt out of data processing</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. Data Security</h2>
          <div className="text-gray-700 space-y-1">
            <p>• End-to-end encryption for sensitive data</p>
            <p>• Row-level security policies in database</p>
            <p>• Regular security audits and monitoring</p>
            <p>• HIPAA-compliant data handling practices</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. Cookies & Tracking</h2>
          <p className="text-gray-700">We use essential cookies for app functionality and analytics cookies (with your consent) to improve our service. You can manage cookie preferences in your browser.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">7. International Transfers</h2>
          <p className="text-gray-700">Your data may be processed in the United States and European Union with appropriate data protection safeguards.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">8. Contact Information</h2>
          <div className="text-gray-700 space-y-1">
            <p><strong>Data Protection Officer:</strong> privacy@wholeme.app</p>
            <p><strong>General Support:</strong> support@wholeme.app</p>
            <p><strong>Address:</strong> [Your Company Address]</p>
          </div>
        </section>

        <div className="bg-blue-50 p-4 rounded-lg mt-6">
          <p className="text-sm font-medium text-blue-800">
            This policy complies with GDPR, CCPA, HIPAA, and other applicable privacy regulations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;