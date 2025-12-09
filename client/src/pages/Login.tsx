import { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/auth';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle, School, Check } from 'lucide-react';

const roles: { value: UserRole; label: string; description: string }[] = [
  { value: 'CEO', label: 'CEO', description: 'System oversight, all data' },
  { value: 'DEO', label: 'District Education Officer', description: 'Full access, all data' },
  { value: 'DDEO', label: 'Deputy DEO', description: 'Regional oversight' },
  { value: 'AEO', label: 'Area Education Officer', description: 'Cluster management' },
  { value: 'HEAD_TEACHER', label: 'Head Teacher', description: 'School management' },
  { value: 'TEACHER', label: 'Teacher', description: 'Assign to me' },
];

export default function Login() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [selectedRole, setSelectedRole] = useState<UserRole>('TEACHER');
  const [password, setPassword] = useState('demo');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(phoneNumber, selectedRole, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-xl mb-6">
            <School className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">SchoolHub</h1>
          <p className="text-lg text-muted-foreground">Education Field Monitoring System</p>
        </div>

        <Card className="p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-8">
            {/* Phone Number */}
            <div>
              <label className="block text-base font-semibold text-foreground mb-3">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="10-digit number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                data-testid="input-phone"
                className="w-full h-14 text-lg rounded-xl"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-base font-semibold text-foreground mb-4">
                Select Your Role
              </label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedRole === role.value
                        ? 'bg-primary/10 border-2 border-primary shadow-md'
                        : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary hover:border-primary/20'
                    }`}
                    data-testid={`radio-role-${role.value}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedRole === role.value
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedRole === role.value && (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={selectedRole === role.value}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                      className="sr-only"
                    />
                    <div className="ml-4 flex-1">
                      <div className="font-semibold text-foreground text-base">{role.label}</div>
                      <div className="text-sm text-muted-foreground">{role.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-semibold text-foreground mb-3">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                className="w-full h-14 text-lg rounded-xl"
              />
              <p className="text-sm text-muted-foreground mt-2">Demo: Any 4+ characters</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="text-base font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || phoneNumber.length < 10}
              data-testid="button-login"
              className="w-full"
              size="lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Demo credentials pre-filled • Password: any 4+ characters
        </p>
      </div>
    </div>
  );
}
