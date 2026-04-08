import * as React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully');
      navigate('/admin-raju-dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully');
      navigate('/admin-raju-dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-6">
      <div className="absolute inset-0 bg-[#ff3b3b]/5 blur-[120px] -z-10"></div>
      
      <Card className="w-full max-w-md bg-[#1a1a1a] border-white/5 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-[#ff3b3b]/10 rounded-xl flex items-center justify-center text-[#ff3b3b] mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tighter">Admin Login</CardTitle>
          <CardDescription className="text-white/50">Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-white/30" />
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 pl-10 h-12 focus:border-[#ff3b3b] transition-colors"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-white/30" />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 pl-10 h-12 focus:border-[#ff3b3b] transition-colors"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 text-white h-12 font-bold"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1a1a1a] px-2 text-white/30">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-white/10 hover:bg-white/5 h-12 font-bold"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Chrome className="mr-2 h-5 w-5" /> Google
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-white/30 hover:text-[#ff3b3b]" onClick={() => navigate('/')}>
              Back to Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
