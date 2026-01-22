import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download, FileSpreadsheet, Users, School, Package, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

type DataType = 'teachers' | 'schools' | 'inventory' | 'students';

interface FieldOption {
  id: string;
  name: string;
  nameUrdu: string;
}

const DATA_TYPES: { id: DataType; name: string; nameUrdu: string; icon: any; description: string }[] = [
  { id: 'teachers', name: 'Teachers Data', nameUrdu: 'اساتذہ کا ڈیٹا', icon: Users, description: 'CNIC, contact, qualifications' },
  { id: 'schools', name: 'Schools Data', nameUrdu: 'اسکولوں کا ڈیٹا', icon: School, description: 'School details and stats' },
  { id: 'inventory', name: 'Inventory Data', nameUrdu: 'انوینٹری ڈیٹا', icon: Package, description: 'Equipment and supplies' },
  { id: 'students', name: 'Students Data', nameUrdu: 'طلباء کا ڈیٹا', icon: Users, description: 'Enrollment and attendance' },
];

const FIELD_OPTIONS: Record<DataType, FieldOption[]> = {
  teachers: [
    { id: 'name', name: 'Full Name', nameUrdu: 'پورا نام' },
    { id: 'cnic', name: 'CNIC Number', nameUrdu: 'شناختی کارڈ نمبر' },
    { id: 'phone', name: 'Phone Number', nameUrdu: 'فون نمبر' },
    { id: 'email', name: 'Email', nameUrdu: 'ای میل' },
    { id: 'school', name: 'School Name', nameUrdu: 'اسکول کا نام' },
    { id: 'designation', name: 'Designation', nameUrdu: 'عہدہ' },
    { id: 'qualification', name: 'Qualification', nameUrdu: 'تعلیم' },
    { id: 'joinDate', name: 'Joining Date', nameUrdu: 'شمولیت کی تاریخ' },
    { id: 'salary', name: 'Salary Grade', nameUrdu: 'تنخواہ کا درجہ' },
    { id: 'status', name: 'Employment Status', nameUrdu: 'ملازمت کی حیثیت' },
  ],
  schools: [
    { id: 'name', name: 'School Name', nameUrdu: 'اسکول کا نام' },
    { id: 'emisCode', name: 'EMIS Code', nameUrdu: 'ایمس کوڈ' },
    { id: 'address', name: 'Address', nameUrdu: 'پتہ' },
    { id: 'cluster', name: 'Cluster', nameUrdu: 'کلسٹر' },
    { id: 'district', name: 'District', nameUrdu: 'ضلع' },
    { id: 'type', name: 'School Type', nameUrdu: 'اسکول کی قسم' },
    { id: 'level', name: 'Level (Primary/Middle/High)', nameUrdu: 'سطح' },
    { id: 'totalStudents', name: 'Total Students', nameUrdu: 'کل طلباء' },
    { id: 'totalTeachers', name: 'Total Teachers', nameUrdu: 'کل اساتذہ' },
    { id: 'headTeacher', name: 'Head Teacher Name', nameUrdu: 'ہیڈ ٹیچر کا نام' },
  ],
  inventory: [
    { id: 'itemName', name: 'Item Name', nameUrdu: 'چیز کا نام' },
    { id: 'category', name: 'Category', nameUrdu: 'زمرہ' },
    { id: 'quantity', name: 'Quantity', nameUrdu: 'مقدار' },
    { id: 'condition', name: 'Condition', nameUrdu: 'حالت' },
    { id: 'school', name: 'School', nameUrdu: 'اسکول' },
    { id: 'lastUpdated', name: 'Last Updated', nameUrdu: 'آخری اپڈیٹ' },
    { id: 'purchaseDate', name: 'Purchase Date', nameUrdu: 'خریداری کی تاریخ' },
    { id: 'value', name: 'Estimated Value', nameUrdu: 'تخمینی قیمت' },
  ],
  students: [
    { id: 'name', name: 'Student Name', nameUrdu: 'طالب علم کا نام' },
    { id: 'fatherName', name: 'Father Name', nameUrdu: 'والد کا نام' },
    { id: 'class', name: 'Class', nameUrdu: 'جماعت' },
    { id: 'section', name: 'Section', nameUrdu: 'سیکشن' },
    { id: 'rollNo', name: 'Roll Number', nameUrdu: 'رول نمبر' },
    { id: 'gender', name: 'Gender', nameUrdu: 'جنس' },
    { id: 'dateOfBirth', name: 'Date of Birth', nameUrdu: 'تاریخ پیدائش' },
    { id: 'admissionDate', name: 'Admission Date', nameUrdu: 'داخلے کی تاریخ' },
    { id: 'school', name: 'School', nameUrdu: 'اسکول' },
  ],
};

export default function DataExport() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [selectedType, setSelectedType] = useState<DataType | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);

  if (!user) return null;

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(f => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  const selectAllFields = () => {
    if (!selectedType) return;
    setSelectedFields(FIELD_OPTIONS[selectedType].map(f => f.id));
  };

  const clearAllFields = () => {
    setSelectedFields([]);
  };

  const handleExport = async () => {
    if (!selectedType || selectedFields.length === 0) {
      toast.error('Please select at least one field to export');
      return;
    }

    setExporting(true);
    try {
      const response = await fetch('/api/export-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataType: selectedType,
          fields: selectedFields,
          userId: user.id,
          userRole: user.role,
          districtId: user.districtId,
          clusterId: user.clusterId,
          schoolId: user.schoolId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedType}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} data-testid="button-back">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Data Export</h1>
          <p className="text-sm text-muted-foreground">ڈیٹا ایکسپورٹ</p>
        </div>
      </div>

      <div className="space-y-6">
        {!selectedType ? (
          <>
            <p className="text-muted-foreground">Select the type of data you want to export:</p>
            <p className="text-sm text-muted-foreground">جس ڈیٹا کو ایکسپورٹ کرنا ہے اسے منتخب کریں:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_TYPES.map((type) => (
                <Card
                  key={type.id}
                  className="p-6 cursor-pointer hover:border-primary transition-all"
                  onClick={() => { setSelectedType(type.id); setSelectedFields([]); }}
                  data-testid={`card-${type.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.nameUrdu}</p>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedType(null)} className="mb-2">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Data Types
                </Button>
                <h2 className="text-lg font-semibold text-foreground">
                  {DATA_TYPES.find(t => t.id === selectedType)?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select fields to include in export / ایکسپورٹ میں شامل کرنے کے لیے فیلڈز منتخب کریں
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllFields} data-testid="button-select-all">
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={clearAllFields} data-testid="button-clear-all">
                  Clear All
                </Button>
              </div>
            </div>

            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FIELD_OPTIONS[selectedType].map((field) => (
                  <div
                    key={field.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
                      selectedFields.includes(field.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleField(field.id)}
                    data-testid={`field-${field.id}`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedFields.includes(field.id)
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {selectedFields.includes(field.id) && (
                        <CheckSquare className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{field.name}</p>
                      <p className="text-xs text-muted-foreground">{field.nameUrdu}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  {selectedFields.length} field{selectedFields.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedFields.length} فیلڈز منتخب
                </p>
              </div>
              <Button
                onClick={handleExport}
                disabled={selectedFields.length === 0 || exporting}
                className="gap-2"
                data-testid="button-export"
              >
                {exporting ? (
                  <>Exporting...</>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    Export to Excel
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              The exported file will include data based on your access level. / 
              ایکسپورٹ فائل آپ کی رسائی کی سطح کے مطابق ڈیٹا پر مشتمل ہوگی۔
            </p>
          </>
        )}
      </div>
    </div>
  );
}
