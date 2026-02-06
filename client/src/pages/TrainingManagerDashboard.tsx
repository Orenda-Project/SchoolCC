import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LogOut,
  Search,
  ChevronDown,
  ChevronRight,
  Users,
  School,
  User,
  MapPin,
  Settings,
  Menu,
  X,
  Edit,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import NotificationBell from '@/components/NotificationBell';
import TrainingManagerProfileModal from '@/components/TrainingManagerProfileModal';
import { toast } from 'sonner';

interface Teacher {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
}

interface Principal extends Teacher {}

interface School {
  id: string;
  name: string;
  emisNumber: string;
  tehsil?: string;
  uc?: string;
  principals: Principal[];
  teachers: Teacher[];
}

interface AEOHierarchy {
  aeo: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  markaz: string;
  schools: School[];
}

export default function TrainingManagerDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [hierarchy, setHierarchy] = useState<AEOHierarchy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAEOs, setExpandedAEOs] = useState<Set<string>>(new Set());
  const [expandedSchools, setExpandedSchools] = useState<Set<string>>(new Set());
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (user.role !== 'TRAINING_MANAGER') {
      navigate('/dashboard');
      return;
    }
    fetchHierarchy();
  }, [user, navigate]);

  const fetchHierarchy = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/training-manager/${user.id}/hierarchy`);
      if (!response.ok) throw new Error('Failed to fetch hierarchy');
      const data = await response.json();
      setHierarchy(data);
    } catch (error) {
      console.error('Error fetching hierarchy:', error);
      toast.error('Failed to load hierarchy data');
    } finally {
      setLoading(false);
    }
  };

  const toggleAEO = (aeoId: string) => {
    setExpandedAEOs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(aeoId)) {
        newSet.delete(aeoId);
      } else {
        newSet.add(aeoId);
      }
      return newSet;
    });
  };

  const toggleSchool = (schoolId: string) => {
    setExpandedSchools((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(schoolId)) {
        newSet.delete(schoolId);
      } else {
        newSet.add(schoolId);
      }
      return newSet;
    });
  };

  const filteredHierarchy = hierarchy.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.aeo.name.toLowerCase().includes(query) ||
      item.aeo.phoneNumber.includes(query) ||
      item.markaz.toLowerCase().includes(query) ||
      item.schools.some((school) =>
        school.name.toLowerCase().includes(query) ||
        school.emisNumber.includes(query)
      )
    );
  });

  const totalAEOs = hierarchy.length;
  const totalSchools = hierarchy.reduce((sum, item) => sum + item.schools.length, 0);
  const totalPrincipals = hierarchy.reduce(
    (sum, item) => sum + item.schools.reduce((s, school) => s + school.principals.length, 0),
    0
  );
  const totalTeachers = hierarchy.reduce(
    (sum, item) => sum + item.schools.reduce((s, school) => s + school.teachers.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {showSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/taleemhub-logo.png"
                alt="TaleemHub"
                className="h-10 w-10 rounded-lg mix-blend-multiply dark:mix-blend-normal dark:opacity-95"
              />
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Training Manager Dashboard
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">{user?.name}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <NotificationBell userId={user?.id || ''} />
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">AEOs</p>
                <p className="text-3xl font-bold mt-1">{totalAEOs}</p>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Schools</p>
                <p className="text-3xl font-bold mt-1">{totalSchools}</p>
              </div>
              <School className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Principals</p>
                <p className="text-3xl font-bold mt-1">{totalPrincipals}</p>
              </div>
              <User className="w-12 h-12 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Teachers</p>
                <p className="text-3xl font-bold mt-1">{totalTeachers}</p>
              </div>
              <Users className="w-12 h-12 opacity-80" />
            </div>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search AEOs, schools, markaz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setShowEditProfile(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Manage AEOs
            </Button>
          </div>
        </Card>

        {/* Hierarchy View */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
          </div>
        ) : hierarchy.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No AEOs Assigned
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't assigned any AEOs yet. Click "Manage AEOs" to get started.
            </p>
            <Button onClick={() => setShowEditProfile(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Manage AEOs
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredHierarchy.map((item) => (
              <Card key={item.aeo.id} className="overflow-hidden">
                {/* AEO Header */}
                <button
                  onClick={() => toggleAEO(item.aeo.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.aeo.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.aeo.phoneNumber}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                          Markaz: {item.markaz}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.schools.length} Schools
                      </p>
                    </div>
                    {expandedAEOs.has(item.aeo.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Schools List */}
                {expandedAEOs.has(item.aeo.id) && (
                  <div className="border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                    {item.schools.length === 0 ? (
                      <p className="text-center text-gray-600 dark:text-gray-400 py-4">
                        No schools assigned to this AEO
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {item.schools.map((school) => (
                          <div key={school.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleSchool(school.id)}
                              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <School className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <div className="text-left">
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {school.name}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    EMIS: {school.emisNumber}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {school.principals.length} Principal{school.principals.length !== 1 ? 's' : ''}, {school.teachers.length} Teacher{school.teachers.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                {expandedSchools.has(school.id) ? (
                                  <ChevronDown className="w-4 h-4 text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                              </div>
                            </button>

                            {/* Staff List */}
                            {expandedSchools.has(school.id) && (
                              <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                                {/* Principals */}
                                {school.principals.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                      Principals
                                    </h4>
                                    <div className="space-y-2">
                                      {school.principals.map((principal) => (
                                        <div
                                          key={principal.id}
                                          className="flex items-center gap-3 p-2 rounded bg-white dark:bg-gray-800"
                                        >
                                          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                              {principal.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                              {principal.phoneNumber}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Teachers */}
                                {school.teachers.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                      Teachers
                                    </h4>
                                    <div className="space-y-2">
                                      {school.teachers.map((teacher) => (
                                        <div
                                          key={teacher.id}
                                          className="flex items-center gap-3 p-2 rounded bg-white dark:bg-gray-800"
                                        >
                                          <User className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                                          <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                              {teacher.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                              {teacher.phoneNumber}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <TrainingManagerProfileModal
          trainingManagerId={user?.id || ''}
          onComplete={() => {
            setShowEditProfile(false);
            fetchHierarchy();
          }}
          allowSkip={true}
        />
      )}
    </div>
  );
}
