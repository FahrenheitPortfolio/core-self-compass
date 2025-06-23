# EmailJS Setup for Therapist Sharing

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for free account
3. Create a new service (Gmail, Outlook, etc.)

## 2. Create Email Template
1. Go to Email Templates
2. Create new template with these variables:
```
Subject: Wellness Report from {{patient_name}}

Dear {{therapist_name}},

{{patient_name}} ({{patient_email}}) has shared their wellness report with you.

{{message}}

Please find the wellness report attached as a PDF.

Best regards,
WholeMe Team
```

## 3. Get Your Keys
- Service ID: Found in Email Services
- Template ID: Found in Email Templates  
- Public Key: Found in Account settings

## 4. Update Code
Replace in `src/components/TherapistShare.tsx`:
```javascript
'YOUR_SERVICE_ID' // Replace with your service ID
'YOUR_TEMPLATE_ID' // Replace with your template ID  
'YOUR_PUBLIC_KEY' // Replace with your public key
```

## 5. Test the Feature
1. Go to Support page in app
2. Enter therapist email
3. Click "Send Wellness Report"
4. Check if email is received with PDF attachment

## 6. Email Limits
- Free plan: 200 emails/month
- Paid plans: Up to 50,000 emails/month
- PDF attachments supported up to 10MB