import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Lock, Heart } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const user: any = await (login as any)(email, password);
      const role = user?.role;
      if (role === 'doctor') navigate('/doctor/dashboard');
      else if (role === 'patient') navigate('/patient/dashboard');
      else navigate('/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-sky-50 shadow-lg">
            <Heart className="text-sky-600" size={34} />
          </div>
          <h1 className="mt-4 text-center text-2xl font-semibold text-gray-900">
            Welcome back! let's sign in
          </h1>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-800">Log in as patient/doctor</h2>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    required
                    className="border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Lock size={16} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="pl-9 border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-700" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="flex items-center justify-between text-sm mt-2">
                <Link to="/forgot-password" className="text-sky-600 hover:underline">
                  Forgot password?
                </Link>
                <Link to="/signup" className="text-sky-600 hover:underline">
                  New user? Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};