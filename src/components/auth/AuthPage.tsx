
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log('🔑 Attempting sign in...');
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          console.log('✅ Sign in successful, navigating to dashboard');
          navigate('/');
        } else {
          console.error('❌ Sign in error:', error);
          toast.error(error.message || 'Failed to sign in');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }
        console.log('📝 Attempting sign up...');
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );
        if (!error) {
          console.log('✅ Sign up successful');
          toast.success('Account created! Please check your email to verify.');
          setIsLogin(true);
        } else {
          console.error('❌ Sign up error:', error);
          toast.error(error.message || 'Failed to create account');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider);
    try {
      console.log(`🔗 Attempting ${provider} authentication...`);
      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else if (provider === 'facebook') {
        result = await signInWithFacebook();
      }
      
      if (result?.error) {
        console.error(`❌ ${provider} auth error:`, result.error);
        if (result.error.message?.includes('provider is not enabled')) {
          toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet. Please use email/password for now.`);
        } else {
          toast.error(`Failed to sign in with ${provider}`);
        }
      }
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      if (error.message?.includes('Failed to fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('provider is not enabled')) {
        toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login is not configured yet. Please use email/password for now.`);
      } else {
        toast.error(`Failed to sign in with ${provider}`);
      }
    } finally {
      setSocialLoading('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              WholeMe
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Welcome back to your wellness journey' : 'Start your journey to wholeness'}
            </p>
          </div>

          {/* Social Authentication Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              onClick={() => handleSocialAuth('google')}
              disabled={socialLoading === 'google'}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
            >
              {socialLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialAuth('facebook')}
              disabled={socialLoading === 'facebook'}
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
            >
              {socialLoading === 'facebook' ? (
                <div className="w-5 h-5 border-2 border-blue-200 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              )}
              Continue with Facebook
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-white/60"
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-white/60"
                />
              </div>
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-white/60"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-white/60 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="bg-white/60"
              />
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200"
            >
              {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
