import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface Subscription {
  id: string;
  plan: 'basic' | 'premium' | 'pro' | 'ad_free';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  paypal_subscription_id?: string;
  expires_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithFacebook: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  refreshSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('👤 Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('❌ Profile fetch error:', error);
        throw error;
      }
      
      console.log('✅ Profile fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSubscription = async (userId: string) => {
    try {
      console.log('💳 Fetching subscription for user:', userId);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        console.error('❌ Subscription fetch error:', error);
        // Don't throw here, subscription might not exist yet
        return;
      }
      
      console.log('✅ Subscription fetched:', data);
      // Cast the data to match our interface type
      const subscriptionData: Subscription = {
        ...data,
        plan: data.plan as 'basic' | 'premium' | 'pro' | 'ad_free'
      };
      setSubscription(subscriptionData);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  useEffect(() => {
    console.log('🔄 Setting up auth listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`🔐 Auth event: ${event}`, session?.user?.email || 'No user');
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer data fetching to prevent deadlocks
          setTimeout(() => {
            fetchProfile(session.user.id);
            fetchSubscription(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔍 Initial session check:', session?.user?.email || 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchSubscription(session.user.id);
      }
      setLoading(false);
    });

    return () => {
      console.log('🧹 Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      console.log('📝 Starting signup process for:', email);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.error('❌ Signup error:', error);
        return { error };
      }
      
      console.log('✅ Signup successful');
      return { error: null };
    } catch (error) {
      console.error('❌ Signup exception:', error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔑 Starting signin process for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Signin error:', error);
        return { error };
      }
      
      console.log('✅ Signin successful');
      return { error: null };
    } catch (error) {
      console.error('❌ Signin exception:', error);
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🔗 Starting Google OAuth...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('❌ Google OAuth error:', error);
        return { error };
      }
      
      console.log('✅ Google OAuth initiated');
      return { error: null };
    } catch (error) {
      console.error('❌ Google OAuth exception:', error);
      return { error };
    }
  };

  const signInWithFacebook = async () => {
    try {
      console.log('🔗 Starting Facebook OAuth...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('❌ Facebook OAuth error:', error);
        return { error };
      }
      
      console.log('✅ Facebook OAuth initiated');
      return { error: null };
    } catch (error) {
      console.error('❌ Facebook OAuth exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Starting signout...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Signout error:', error);
        toast.error(error.message);
      } else {
        console.log('✅ Signout successful');
      }
    } catch (error) {
      console.error('❌ Signout exception:', error);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      console.log('📝 Updating profile:', data);
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        console.error('❌ Profile update error:', error);
        toast.error('Error updating profile');
        return { error };
      }
      
      await fetchProfile(user.id);
      toast.success('Profile updated successfully');
      return { error: null };
    } catch (error) {
      console.error('❌ Profile update exception:', error);
      return { error };
    }
  };

  const refreshSubscription = async () => {
    if (user) {
      await fetchSubscription(user.id);
    }
  };

  const value = {
    user,
    profile,
    subscription,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    updateProfile,
    refreshSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
