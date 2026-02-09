import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Monitor, Users, Building2, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSelectType: (type: string) => void;
}

export default function AEOVisitTypeSelector({ onClose, onSelectType }: Props) {
  const visitTypes = [
    {
      id: 'monitoring',
      name: 'Monitoring Visit',
      description: 'Infrastructure, attendance, and facility assessment',
      icon: Monitor,
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500',
      iconColor: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
      benefits: ['Check infrastructure', 'Record attendance', 'Assess facilities'],
    },
    {
      id: 'mentoring',
      name: 'Mentoring Visit',
      description: 'Higher-Order Thinking Skills (HOTS) development',
      icon: Users,
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500',
      iconColor: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
      benefits: ['Observe teaching', 'Provide feedback', 'Develop HOTS'],
    },
    {
      id: 'office',
      name: 'Office Visit',
      description: 'Administrative tasks and office work',
      icon: Building2,
      color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500',
      iconColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30',
      benefits: ['Log activities', 'Track time', 'Record tasks'],
    },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">Select Visit Type</DialogTitle>
              <DialogDescription>
                Choose the type of activity you want to conduct
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              data-testid="button-close-modal"
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 mt-6">
          {visitTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className={`p-6 border-2 cursor-pointer transition-all ${type.color}`}
                data-testid={`card-visit-type-${type.id}`}
                onClick={() => onSelectType(type.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${type.iconColor} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Button
                    size="sm"
                    className="ml-auto"
                    onClick={() => onSelectType(type.id)}
                    data-testid={`button-select-${type.id}`}
                  >
                    Select
                  </Button>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{type.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                <div className="flex gap-2">
                  {type.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-background rounded-full text-muted-foreground border border-border"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
