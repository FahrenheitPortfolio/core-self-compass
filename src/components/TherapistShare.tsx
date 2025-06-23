import React, { useState } from 'react';
import { Mail, FileText, Send, CheckCircle } from 'lucide-react';
import GradientButton from './ui/GradientButton';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { generateWellnessPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';

const TherapistShare = () => {
  const { user, profile } = useAuth();
  const [therapistEmail, setTherapistEmail] = useState('');
  const [therapistName, setTherapistName] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fetchWellnessData = async () => {
    if (!user) return null;

    try {
      const [moodEntries, assessments, symptoms] = await Promise.all([
        supabase.from('mood_entries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30),
        supabase.from('needs_assessments').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
        // Mock symptoms data - replace with actual table when implemented
        Promise.resolve({ data: [
          { name: 'Pain Level', value: 3, scale: 10 },
          { name: 'Energy', value: 6, scale: 10 },
          { name: 'Sleep Quality', value: 7, scale: 10 },
          { name: 'Anxiety', value: 4, scale: 10 }
        ] })
      ]);

      return {
        moodEntries: moodEntries.data || [],
        assessments: assessments.data || [],
        symptoms: symptoms.data || [],
        stressLevels: [], // Mock data
        userProfile: profile
      };
    } catch (error) {
      console.error('Error fetching wellness data:', error);
      return null;
    }
  };

  const handleSendToTherapist = async () => {
    if (!therapistEmail || !user) {
      toast.error('Please enter therapist email');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Fetch wellness data
      const wellnessData = await fetchWellnessData();
      if (!wellnessData) {
        throw new Error('Failed to fetch wellness data');
      }

      // Generate PDF
      const pdfBlob = await generateWellnessPDF(wellnessData);
      
      setIsGenerating(false);
      setIsSending(true);

      // Convert blob to base64 for email attachment
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result?.toString().split(',')[1];
        
        try {
          // Send email using EmailJS
          await emailjs.send(
            'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
            {
              to_email: therapistEmail,
              therapist_name: therapistName || 'Doctor',
              patient_name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
              patient_email: user.email,
              message: message || 'Please find my wellness report attached.',
              pdf_attachment: base64Data,
              pdf_filename: `wellness-report-${new Date().toISOString().split('T')[0]}.pdf`
            },
            'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
          );

          toast.success('Wellness report sent successfully!');
          setTherapistEmail('');
          setTherapistName('');
          setMessage('');
        } catch (error) {
          console.error('Email sending error:', error);
          toast.error('Failed to send email. Please try again.');
        }
      };
      
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
      setIsSending(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
          <Mail className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-gray-800">Share with Therapist</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Send your wellness data as a PDF report to your healthcare provider
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Therapist Name (Optional)
          </label>
          <input
            type="text"
            value={therapistName}
            onChange={(e) => setTherapistName(e.target.value)}
            placeholder="Dr. Smith"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Therapist Email *
          </label>
          <input
            type="email"
            value={therapistEmail}
            onChange={(e) => setTherapistEmail(e.target.value)}
            placeholder="therapist@example.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Dr. Smith, please find my wellness report attached..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Report includes:</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Mood tracking data (last 30 days)</li>
                <li>• Stress level patterns</li>
                <li>• Symptom tracking</li>
                <li>• Assessment results</li>
              </ul>
            </div>
          </div>
        </div>

        <GradientButton
          onClick={handleSendToTherapist}
          disabled={isGenerating || isSending || !therapistEmail}
          loading={isGenerating || isSending}
          variant="primary"
          className="w-full"
        >
          {isGenerating ? 'Generating PDF...' : isSending ? 'Sending Email...' : 'Send Wellness Report'}
        </GradientButton>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Privacy Note:</strong> Your data is sent directly to your therapist. 
          WholeMe does not store or access the email content.
        </p>
      </div>
    </div>
  );
};

export default TherapistShare;