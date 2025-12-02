import { useParams } from 'wouter';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMockVisits } from '@/hooks/useMockVisits';
import { useLocation } from 'wouter';
import { ArrowLeft, MapPin, Calendar, User, CheckCircle, Mic, Camera } from 'lucide-react';
import { useState } from 'react';

export default function ViewVisit() {
  const { id } = useParams();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { getVisit, updateVisitIndicators, completeVisit } = useMockVisits();
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState('');

  const visit = getVisit(id || '');

  if (!visit || !user) {
    return null;
  }

  const canEdit = visit.conductedBy === user.id && visit.status === 'in_progress';

  const handleCompleteVisit = () => {
    completeVisit(visit.id, comments);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/school-visits')}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground ml-4">{visit.schoolName}</h1>
          </div>
          {canEdit && !editing && (
            <Button onClick={() => setEditing(true)} data-testid="button-edit">
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Visit Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Visit Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Conducted by</p>
              <p className="font-medium text-foreground flex items-center gap-2 mt-1">
                <User className="w-4 h-4" />
                {visit.conductedByName}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Visit Date</p>
              <p className="font-medium text-foreground flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                {visit.visitDate.toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Visit Type</p>
              <p className="font-medium text-foreground capitalize">{visit.visitType.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium text-foreground capitalize flex items-center gap-2 mt-1">
                <CheckCircle className={`w-4 h-4 ${visit.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`} />
                {visit.status}
              </p>
            </div>
          </div>

          {visit.gpsLocation && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                GPS: {visit.gpsLocation.lat.toFixed(4)}, {visit.gpsLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </Card>

        {/* Indicators */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Visit Indicators</h2>
          <div className="space-y-4">
            {visit.indicators.map((indicator) => (
              <div key={indicator.id} className="p-3 border border-border rounded-lg">
                <p className="font-medium text-foreground mb-2">{indicator.name}</p>

                {indicator.type === 'boolean' && (
                  <div className="flex gap-2">
                    <Button
                      variant={indicator.value === true ? 'default' : 'outline'}
                      size="sm"
                      disabled={!editing}
                      data-testid={`button-yes-${indicator.id}`}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={indicator.value === false ? 'default' : 'outline'}
                      size="sm"
                      disabled={!editing}
                      data-testid={`button-no-${indicator.id}`}
                    >
                      No
                    </Button>
                  </div>
                )}

                {indicator.type === 'count' && (
                  <Input
                    type="number"
                    placeholder="Enter count"
                    value={indicator.value || ''}
                    disabled={!editing}
                    className="max-w-24"
                    data-testid={`input-count-${indicator.id}`}
                  />
                )}

                {indicator.type === 'scale' && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((level) => (
                      <Button
                        key={level}
                        variant={indicator.value === level ? 'default' : 'outline'}
                        size="sm"
                        disabled={!editing}
                        data-testid={`button-scale-${level}-${indicator.id}`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                )}

                {indicator.type === 'text' && (
                  <Input
                    type="text"
                    placeholder="Enter observation"
                    value={(indicator.value as string) || ''}
                    disabled={!editing}
                    data-testid={`input-text-${indicator.id}`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Comments */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Comments & Observations</h2>
          <textarea
            placeholder="Add detailed observations, findings, and recommendations..."
            value={editing ? comments : visit.comments}
            onChange={(e) => setComments(e.target.value)}
            disabled={!editing}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24 disabled:opacity-50"
            data-testid="textarea-comments"
          />
        </Card>

        {/* Evidence Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Evidence Collected</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Camera className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Photos</p>
                <p className="font-semibold text-foreground">{visit.photoCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Mic className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Voice Notes</p>
                <p className="font-semibold text-foreground">{visit.voiceNotesCount}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        {editing && (
          <div className="flex gap-2">
            <Button onClick={handleCompleteVisit} data-testid="button-complete">
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete Visit
            </Button>
            <Button
              variant="outline"
              onClick={() => setEditing(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
