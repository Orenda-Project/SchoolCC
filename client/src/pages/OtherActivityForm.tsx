import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useMockAEOActivities, OtherActivityData, OTHER_ACTIVITIES_LIST } from '@/hooks/useMockAEOActivities';
import { toast } from 'sonner';

interface Props {
  onClose?: () => void;
}

export default function OtherActivityForm({ onClose }: Props) {
  const { user } = useAuth();
  const { addOtherActivity } = useMockAEOActivities();

  const [formData, setFormData] = useState<Partial<OtherActivityData>>({
    aeoName: user?.name || '',
    activityDate: new Date().toISOString().split('T')[0],
    status: 'draft',
    evidence: [],
  });

  const [evidence, setEvidence] = useState<{ id: string; name: string; type: 'photo' | 'document' | 'voice'; url: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEvidence = () => {
    const newEvidence = {
      id: `ev-${Date.now()}`,
      name: `Evidence ${evidence.length + 1}`,
      type: 'photo' as const,
      url: `evidence-${Date.now()}.jpg`,
    };
    setEvidence([...evidence, newEvidence]);
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidence(evidence.filter((e) => e.id !== id));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      const { id: _, ...dataWithoutId } = formData;
      const activity: OtherActivityData = {
        id: `other-${Date.now()}`,
        ...(dataWithoutId as OtherActivityData),
        evidence,
        status: 'submitted',
        submittedAt: new Date(),
      };
      addOtherActivity(activity);
      toast.success('Activity logged successfully!');
      onClose?.();
    }, 1000);
  };

  return (
    <div className="bg-card rounded-lg p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Log Other Activity</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          data-testid="button-back"
        >
          ✕
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Activity Selection */}
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Activity Type</h2>
            <p className="text-sm text-slate-600 mb-4">
              Select the type of activity you are logging
            </p>

            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={formData.activityType || ''}
              onChange={(e) => handleInputChange('activityType', e.target.value)}
              required
              data-testid="select-activity-type"
            >
              <option value="">Choose an activity...</option>
              {OTHER_ACTIVITIES_LIST.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
        </Card>

        {/* Activity Details */}
        <Card className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Activity Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Activity Date</label>
                <Input
                  type="date"
                  value={formData.activityDate || ''}
                  onChange={(e) => handleInputChange('activityDate', e.target.value)}
                  required
                  data-testid="input-activity-date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Duration - From</label>
                <Input
                  type="time"
                  value={formData.startTime || ''}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  data-testid="input-start-time"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Duration - To</label>
                <Input
                  type="time"
                  value={formData.endTime || ''}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  data-testid="input-end-time"
                />
              </div>
            </div>
        </Card>

        {/* Description */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Description</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Activity Description</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 min-h-20"
              placeholder="Describe the activity, key topics covered, participants involved, etc."
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              data-testid="textarea-description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Additional Comments</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900 min-h-20"
              placeholder="Any additional notes or observations..."
              value={formData.comments || ''}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              data-testid="textarea-comments"
            />
          </div>
        </Card>

        {/* Evidence */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Evidence & Documentation</h2>
          <p className="text-sm text-slate-600 mb-4">
            Attach photos, documents, or voice notes as evidence
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleAddEvidence}
              className="w-full"
              variant="outline"
              data-testid="button-add-evidence"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Evidence
            </Button>

            {evidence.length > 0 && (
              <div className="space-y-3 mt-4">
                {evidence.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                    data-testid={`evidence-item-${item.id}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-600">{item.type}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEvidence(item.id)}
                      data-testid={`button-remove-evidence-${item.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-submit"
            >
              {loading ? 'Submitting...' : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Log Activity
                </>
              )}
            </Button>
        </div>
      </div>
    </div>
  );
}
