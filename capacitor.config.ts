
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.3949ee33f913466e9a2257e0356ee517',
  appName: 'WholeMe',
  webDir: 'dist',
  server: {
    url: 'https://3949ee33-f913-466e-9a22-57e0356ee517.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#10b981',
      showSpinner: true,
      spinnerColor: '#ffffff'
    }
  }
};

export default config;
