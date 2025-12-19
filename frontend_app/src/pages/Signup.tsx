import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Heart, UserPlus } from 'lucide-react';

export const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'doctor',
  });
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const onChange = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // cast signup to any so we can pass password (password isn't on Partial<User> type)
      await (signup as any)({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role,
        password: form.password,
      });
      navigate(form.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Heart className="h-12 w-12 text-sky-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        </div>

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserPlus className="h-5 w-5 text-sky-600" />
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <Label className="min-w-[6.5rem]">Account type</Label>
                <div className="flex gap-3">
                  <label className={`inline-flex items-center px-3 py-1 rounded-md border ${form.role === 'patient' ? 'border-sky-600 bg-sky-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={form.role === 'patient'}
                      onChange={() => onChange('role', 'patient')}
                      className="mr-2"
                    />
                    Patient
                  </label>
                  <label className={`inline-flex items-center px-3 py-1 rounded-md border ${form.role === 'doctor' ? 'border-sky-600 bg-sky-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={form.role === 'doctor'}
                      onChange={() => onChange('role', 'doctor')}
                      className="mr-2"
                    />
                    Doctor
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    placeholder="John"
                    required
                    className="border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    placeholder="Doe"
                    required
                    className="border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => onChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => onChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="border border-gray-300 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-200"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-700" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-sky-600 hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};