import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useMockVisits } from '@/hooks/useMockVisits';
import { useLocation } from 'wouter';
import { ArrowLeft, MapPin } from 'lucide-react';

const SCHOOLS = [
  { id: 'school-1', name: 'Government Primary School, Zone A' },
  { id: 'school-2', name: 'Government Upper Primary School' },
  { id: 'school-3', name: 'Government Secondary School' },
];

export default function CreateVisit() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { createVisit } = useMockVisits();

  const [selectedSchool, setSelectedSchool] = useState('');
  const [visitType, setVisitType] = useState<'administrative' | 'academic' | 'monitoring'>('monitoring');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchool) return;

    setLoading(true);
    setTimeout(() => {
      const school = SCHOOLS.find((s) => s.id === selectedSchool);
      if (school) {
        const newVisit = createVisit(
          selectedSchool,
          school.name,
          visitType,
          user.id,
          user.name,
          user.role
        );
        navigate(`/visit/${newVisit.id}`);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/school-visits')}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground ml-4">Plan School Visit</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Visit Details */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Visit Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select School *
                </label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="select-school"
                >
                  <option value="">Choose a school...</option>
                  {SCHOOLS.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Visit Type *
                </label>
                <div className="space-y-2">
                  {(['administrative', 'academic', 'monitoring'] as const).map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        visitType === type
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:border-primary/30'
                      }`}
                      data-testid={`radio-visit-type-${type}`}
                    >
                      <input
                        type="radio"
                        name="visitType"
                        value={type}
                        checked={visitType === type}
                        onChange={(e) => setVisitType(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-foreground capitalize">{type}</div>
                        <div className="text-xs text-muted-foreground">
                          {type === 'administrative' && 'Administrative or compliance check'}
                          {type === 'academic' && 'Teaching and learning assessment'}
                          {type === 'monitoring' && 'General monitoring and inspection'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Info */}
          <Card className="p-6 bg-primary/5 border-l-4 border-l-primary">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              GPS & Evidence
            </h3>
            <p className="text-sm text-muted-foreground">
              Your location will be automatically recorded throughout the visit. You can add photos, voice notes, and detailed observations for each indicator.
            </p>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/school-visits')}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedSchool || loading}
              data-testid="button-start-visit"
            >
              {loading ? 'Starting...' : 'Start Visit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
