import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 pb-24">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-4">Terms of Service</h1>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-6">
        <div className="text-sm text-gray-500 mb-4">
          Effective Date: {new Date().toLocaleDateString()} | Last Updated: {new Date().toLocaleDateString()}
        </div>
        
        <section>
          <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">By accessing and using WholeMe, you accept and agree to be bound by these Terms of Service and our Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">2. Description of Service</h2>
          <p className="text-gray-700">WholeMe is a wellness tracking application that helps users monitor their mental health, mood, and overall well-being. Our service is not a substitute for professional medical advice.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">3. Medical Disclaimer</h2>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 font-medium">IMPORTANT: WholeMe is not a medical device or healthcare service. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">4. User Responsibilities</h2>
          <div className="text-gray-700 space-y-1">
            <p>• Provide accurate information</p>
            <p>• Keep your account secure</p>
            <p>• Use the service lawfully</p>
            <p>• Respect other users' privacy</p>
            <p>• Report any security vulnerabilities</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">5. Prohibited Uses</h2>
          <div className="text-gray-700 space-y-1">
            <p>• Sharing false or misleading information</p>
            <p>• Attempting to hack or compromise the service</p>
            <p>• Using the service for illegal activities</p>
            <p>• Violating others' intellectual property rights</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">6. Subscription & Payments</h2>
          <div className="text-gray-700 space-y-2">
            <p>• Subscriptions are billed monthly at $7/month</p>
            <p>• Payments processed securely through PayPal</p>
            <p>• Cancel anytime through your account settings</p>
            <p>• No refunds for partial months</p>
            <p>• Free trial available for new users</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">7. Data & Privacy</h2>
          <p className="text-gray-700">Your data privacy is governed by our Privacy Policy. We implement strong security measures but cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">8. Limitation of Liability</h2>
          <p className="text-gray-700">WholeMe is provided "as is" without warranties. We are not liable for any damages arising from your use of the service, including but not limited to data loss or service interruptions.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">9. Termination</h2>
          <p className="text-gray-700">We may terminate or suspend your account for violations of these terms. You may delete your account at any time.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">10. Changes to Terms</h2>
          <p className="text-gray-700">We may update these terms periodically. Continued use of the service constitutes acceptance of updated terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">11. Contact Information</h2>
          <div className="text-gray-700 space-y-1">
            <p><strong>Legal:</strong> legal@wholeme.app</p>
            <p><strong>Support:</strong> support@wholeme.app</p>
            <p><strong>Address:</strong> [Your Company Address]</p>
          </div>
        </section>

        <div className="bg-red-50 p-4 rounded-lg mt-6">
          <p className="text-sm font-medium text-red-800">
            Crisis Support: If you're experiencing a mental health crisis, please contact emergency services (911) or crisis hotlines immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;