import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  const scheduleReminder = (title: string, body: string, delay: number = 24 * 60 * 60 * 1000) => {
    if (permission === 'granted') {
      setTimeout(() => {
        new Notification(title, {
          body,
          icon: '/icon-192.png',
          badge: '/icon-192.png'
        });
      }, delay);
    }
  };

  const scheduleDailyReminder = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(19, 0, 0, 0); // 7 PM reminder
    
    const delay = tomorrow.getTime() - now.getTime();
    
    scheduleReminder(
      'WholeMe Check-in',
      'How are you feeling today? Take a moment to reflect.',
      delay
    );
  };

  return {
    permission,
    requestPermission,
    scheduleReminder,
    scheduleDailyReminder
  };
};