import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocation } from 'wouter';
import { ArrowLeft, Plus, Pencil, Trash2, School, Search, Upload, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SchoolData {
  id: string;
  name: string;
  emisNumber: string;
  code: string;
  clusterId: string;
  districtId: string;
  address?: string;
}

export default function SchoolManagement() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [schools, setSchools] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<SchoolData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    emisNumber: '',
    code: '',
    clusterId: '',
    districtId: 'Rawalpindi',
    address: '',
  });

  const canManageSchools = user?.role === 'DEO' || user?.role === 'CEO' || user?.role === 'DDEO';

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/admin/schools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      }
    } catch (error) {
      console.error('Failed to fetch schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (school?: SchoolData) => {
    if (school) {
      setEditingSchool(school);
      setFormData({
        name: school.name,
        emisNumber: school.emisNumber,
        code: school.code,
        clusterId: school.clusterId,
        districtId: school.districtId,
        address: school.address || '',
      });
    } else {
      setEditingSchool(null);
      setFormData({
        name: '',
        emisNumber: '',
        code: '',
        clusterId: '',
        districtId: 'Rawalpindi',
        address: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingSchool 
        ? `/api/admin/schools/${editingSchool.id}`
        : '/api/admin/schools';
      
      const method = editingSchool ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save school');
      }

      toast({
        title: editingSchool ? 'School Updated' : 'School Added',
        description: editingSchool 
          ? 'School details have been updated successfully.'
          : 'New school has been added successfully.',
      });

      setIsDialogOpen(false);
      fetchSchools();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (school: SchoolData) => {
    if (!confirm(`Are you sure you want to delete "${school.name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/schools/${school.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete school');
      }

      toast({
        title: 'School Deleted',
        description: 'School has been removed successfully.',
      });

      fetchSchools();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.emisNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.clusterId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!canManageSchools) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Only DEO, CEO, or DDEO can manage schools.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4" data-testid="button-go-back">
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <School className="w-6 h-6 text-primary" />
                School Management
              </h1>
              <p className="text-sm text-muted-foreground">
                Add and manage schools with EMIS numbers ({schools.length} schools)
              </p>
            </div>
          </div>
          <Button onClick={() => handleOpenDialog()} data-testid="button-add-school">
            <Plus className="w-4 h-4 mr-2" />
            Add School
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by school name, EMIS number, or cluster..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>
        </Card>

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading schools...</p>
          </Card>
        ) : filteredSchools.length === 0 ? (
          <Card className="p-8 text-center">
            <School className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No schools match your search' : 'No schools added yet'}
            </p>
            {!searchTerm && (
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First School
              </Button>
            )}
          </Card>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>EMIS Number</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Cluster/Markaz</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="font-mono text-sm">{school.emisNumber}</TableCell>
                    <TableCell>{school.code}</TableCell>
                    <TableCell>{school.clusterId}</TableCell>
                    <TableCell>{school.districtId}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(school)}
                          data-testid={`button-edit-${school.id}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(school)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-delete-${school.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSchool ? 'Edit School' : 'Add New School'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">School Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., GPS Dhamial"
                required
                data-testid="input-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emisNumber">EMIS Number *</Label>
              <Input
                id="emisNumber"
                value={formData.emisNumber}
                onChange={(e) => setFormData({ ...formData, emisNumber: e.target.value })}
                placeholder="e.g., 37120012"
                required
                data-testid="input-emis"
              />
              <p className="text-xs text-muted-foreground">
                Unique identifier for the school from EMIS system
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">School Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., GPS-DHAMIAL"
                required
                data-testid="input-code"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clusterId">Cluster/Markaz *</Label>
                <Input
                  id="clusterId"
                  value={formData.clusterId}
                  onChange={(e) => setFormData({ ...formData, clusterId: e.target.value })}
                  placeholder="e.g., Westridge"
                  required
                  data-testid="input-cluster"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="districtId">District *</Label>
                <Input
                  id="districtId"
                  value={formData.districtId}
                  onChange={(e) => setFormData({ ...formData, districtId: e.target.value })}
                  placeholder="e.g., Rawalpindi"
                  required
                  data-testid="input-district"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Optional)</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="School address"
                data-testid="input-address"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Saving...' : editingSchool ? 'Update School' : 'Add School'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
