import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X, Search, Check, Users, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

interface AEO {
  id: string;
  name: string;
  phoneNumber: string;
  markazName?: string;
  markaz?: string;
  assignedSchools?: string[];
}

interface Props {
  trainingManagerId: string;
  onComplete: () => void;
  allowSkip?: boolean;
}

export default function TrainingManagerProfileModal({ trainingManagerId, onComplete, allowSkip = false }: Props) {
  const [aeos, setAeos] = useState<AEO[]>([]);
  const [selectedAEOIds, setSelectedAEOIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAEOs();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAEOs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/training-manager/aeos');
      if (!response.ok) throw new Error('Failed to fetch AEOs');
      const data = await response.json();
      setAeos(data);
    } catch (error) {
      console.error('Error fetching AEOs:', error);
      toast.error('Failed to load AEOs');
    } finally {
      setLoading(false);
    }
  };

  const toggleAEO = (aeoId: string) => {
    setSelectedAEOIds(prev =>
      prev.includes(aeoId)
        ? prev.filter(id => id !== aeoId)
        : [...prev, aeoId]
    );
  };

  const handleSubmit = async () => {
    if (selectedAEOIds.length === 0) {
      toast.error('Please select at least one AEO');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`/api/training-manager/${trainingManagerId}/assigned-aeos`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignedAEOs: selectedAEOIds })
      });

      if (!response.ok) throw new Error('Failed to update assigned AEOs');

      toast.success(`Successfully assigned ${selectedAEOIds.length} AEO(s)`);
      onComplete();
    } catch (error) {
      console.error('Error updating assigned AEOs:', error);
      toast.error('Failed to assign AEOs');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAEOs = aeos.filter(aeo =>
    aeo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aeo.phoneNumber.includes(searchQuery) ||
    (aeo.markazName || aeo.markaz || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedAEOs = aeos.filter(aeo => selectedAEOIds.includes(aeo.id));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Complete Your Profile</h2>
              <p className="text-white/90 mt-1">Select the AEOs you will be supervising</p>
            </div>
            <Users className="w-12 h-12 opacity-80" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Multi-Select Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Select AEOs to Supervise
                </label>
                <div className="relative" ref={dropdownRef}>
                  {/* Dropdown Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full h-12 px-4 flex items-center justify-between rounded-lg border-2 border-input bg-background hover:border-purple-400 transition-colors"
                  >
                    <span className="text-foreground">
                      {selectedAEOs.length === 0
                        ? 'Select AEOs...'
                        : `${selectedAEOs.length} AEO${selectedAEOs.length > 1 ? 's' : ''} selected`}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-popover border rounded-lg shadow-lg max-h-[400px] overflow-hidden flex flex-col">
                      {/* Search Input */}
                      <div className="p-3 border-b">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Search by name, phone, or markaz..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10"
                          />
                        </div>
                      </div>

                      {/* AEO List with Checkboxes */}
                      <div className="overflow-y-auto flex-1">
                        {filteredAEOs.length === 0 ? (
                          <div className="p-8 text-center text-muted-foreground">
                            {searchQuery ? 'No AEOs match your search' : 'No AEOs available'}
                          </div>
                        ) : (
                          <div className="p-2">
                            {filteredAEOs.map(aeo => {
                              const isSelected = selectedAEOIds.includes(aeo.id);
                              return (
                                <button
                                  key={aeo.id}
                                  type="button"
                                  onClick={() => toggleAEO(aeo.id)}
                                  className="w-full text-left p-3 rounded-md hover:bg-accent transition-colors flex items-start gap-3"
                                >
                                  {/* Checkbox */}
                                  <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'bg-purple-600 border-purple-600'
                                      : 'border-input bg-background'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                  </div>

                                  {/* AEO Info */}
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground">{aeo.name}</p>
                                    <p className="text-sm text-muted-foreground">{aeo.phoneNumber}</p>
                                    {(aeo.markazName || aeo.markaz) && (
                                      <p className="text-sm text-purple-600 dark:text-purple-400">
                                        Markaz: {aeo.markazName || aeo.markaz}
                                      </p>
                                    )}
                                    {aeo.assignedSchools && aeo.assignedSchools.length > 0 && (
                                      <p className="text-xs text-muted-foreground">
                                        {aeo.assignedSchools.length} school(s) assigned
                                      </p>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected AEOs Summary */}
              {selectedAEOs.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
                    Selected AEOs ({selectedAEOs.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedAEOs.map(aeo => (
                      <div
                        key={aeo.id}
                        className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border"
                      >
                        <span>{aeo.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleAEO(aeo.id)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/50 flex gap-3 justify-end">
          {allowSkip && (
            <Button
              variant="ghost"
              onClick={onComplete}
              disabled={submitting}
            >
              Skip for Now
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={submitting || selectedAEOIds.length === 0}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {submitting ? 'Saving...' : `Confirm Selection (${selectedAEOIds.length})`}
          </Button>
        </div>
      </Card>
    </div>
  );
}
