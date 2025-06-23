# Google AdMob Setup Instructions

## 1. Create Google AdSense Account
1. Go to https://www.google.com/adsense/
2. Sign up with your Google account
3. Add your website domain
4. Wait for approval (1-14 days)

## 2. Get Your Publisher ID
1. In AdSense dashboard, go to Account > Account Information
2. Copy your Publisher ID (ca-pub-XXXXXXXXXXXXXXXXX)

## 3. Create Ad Units
1. Go to Ads > By ad unit
2. Create new ad unit for each position:
   - **Banner Ad**: 728x90 or responsive
   - **Inline Ad**: 300x250 rectangle
   - **Bottom Ad**: 320x50 mobile banner

## 4. Update Code
Replace in `src/components/GoogleAd.tsx`:
```javascript
// Replace YOUR_PUBLISHER_ID with your actual ID
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
```

Replace in `src/components/WellnessAd.tsx`:
```javascript
// Replace with your actual ad slot IDs
adSlot: '1234567890' // Banner ad slot
adSlot: '2345678901' // Inline ad slot  
adSlot: '3456789012' // Bottom ad slot
```

## 5. Revenue Expectations
- **1,000 daily users**: $30-150/month
- **10,000 daily users**: $300-1,500/month
- **Wellness niche**: Higher CPM ($2-6)

## 6. Optimization Tips
- Place ads after user actions (journal entry, assessment)
- Limit to 2-3 ads per page
- Use responsive ad formats
- Monitor performance in AdSense dashboard