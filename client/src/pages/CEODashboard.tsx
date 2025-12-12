import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, ChevronRight, ChevronDown, Download, Filter, Users, Building2, AlertCircle, TrendingUp, CheckCircle, Clock, Plus, FileText, User, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface School {
  id: string;
  name: string;
  teachers: number;
  headTeachers: number;
  pendingRequests: number;
  complianceScore: number;
}

interface AEO {
  id: string;
  name: string;
  schools: School[];
}

interface DDEO {
  id: string;
  name: string;
  aeos: AEO[];
}

interface DEO {
  id: string;
  name: string;
  district: string;
  ddeos: DDEO[];
}

interface HierarchyNode {
  id: string;
  name: string;
  type: 'DEO' | 'DDEO' | 'AEO' | 'SCHOOL';
  level: number;
  expanded: boolean;
}

export default function CEODashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['deo-1', 'deo-2']));
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'deo' | 'ddeo' | 'aeo' | 'school'>('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState<'sheets' | 'docs' | ''>('');

  if (!user || user.role !== 'CEO') {
    navigate('/');
    return null;
  }

  const mockData: DEO[] = [
    {
      id: 'deo-1',
      name: 'Rawalpindi District',
      district: 'Rawalpindi',
      ddeos: [
        {
          id: 'ddeo-1',
          name: 'Rawalpindi City',
          aeos: [
            {
              id: 'aeo-1',
              name: 'Sadiqabad Cluster',
              schools: [
                { id: 'school-1', name: 'GGPS Sadiqabad', teachers: 8, headTeachers: 1, pendingRequests: 2, complianceScore: 85 },
                { id: 'school-2', name: 'GGPS Dhoke Syedan', teachers: 10, headTeachers: 1, pendingRequests: 1, complianceScore: 88 },
                { id: 'school-3', name: 'GGPS Dhoke Ratta', teachers: 7, headTeachers: 1, pendingRequests: 3, complianceScore: 82 },
                { id: 'school-4', name: 'GGPS Pirwadhai', teachers: 12, headTeachers: 1, pendingRequests: 0, complianceScore: 91 },
              ],
            },
            {
              id: 'aeo-2',
              name: 'Satellite Town Cluster',
              schools: [
                { id: 'school-5', name: 'GGPS Satellite Town', teachers: 15, headTeachers: 1, pendingRequests: 2, complianceScore: 89 },
                { id: 'school-6', name: 'GGPS Dhoke Kala Khan', teachers: 9, headTeachers: 1, pendingRequests: 4, complianceScore: 78 },
                { id: 'school-7', name: 'GGPS Committee Chowk', teachers: 11, headTeachers: 1, pendingRequests: 1, complianceScore: 86 },
                { id: 'school-8', name: 'GGPS Liaquat Bagh', teachers: 13, headTeachers: 1, pendingRequests: 2, complianceScore: 90 },
              ],
            },
          ],
        },
        {
          id: 'ddeo-2',
          name: 'Rawalpindi Cantt',
          aeos: [
            {
              id: 'aeo-3',
              name: 'Cantt Cluster',
              schools: [
                { id: 'school-9', name: 'GGPS Westridge', teachers: 14, headTeachers: 1, pendingRequests: 0, complianceScore: 94 },
                { id: 'school-10', name: 'GGPS Tench Bhatta', teachers: 10, headTeachers: 1, pendingRequests: 3, complianceScore: 83 },
                { id: 'school-11', name: 'GGPS Dhoke Hassu', teachers: 8, headTeachers: 1, pendingRequests: 2, complianceScore: 87 },
                { id: 'school-12', name: 'GGPS Chaklala', teachers: 12, headTeachers: 1, pendingRequests: 1, complianceScore: 92 },
              ],
            },
            {
              id: 'aeo-4',
              name: 'Morgah Cluster',
              schools: [
                { id: 'school-13', name: 'GGPS Morgah', teachers: 11, headTeachers: 1, pendingRequests: 4, complianceScore: 80 },
                { id: 'school-14', name: 'GGPS Adiala Road', teachers: 9, headTeachers: 1, pendingRequests: 2, complianceScore: 84 },
                { id: 'school-15', name: 'GGPS Dhoke Munshi', teachers: 10, headTeachers: 1, pendingRequests: 1, complianceScore: 88 },
                { id: 'school-16', name: 'GGPS Bahria Town', teachers: 16, headTeachers: 1, pendingRequests: 0, complianceScore: 95 },
              ],
            },
          ],
        },
      ],
    },
  ];

  const calculateAggregates = useMemo(() => {
    let totalSchools = 0;
    let totalTeachers = 0;
    let totalPendingRequests = 0;
    let avgCompliance = 0;
    let complianceCount = 0;

    mockData.forEach(deo => {
      deo.ddeos.forEach(ddeo => {
        ddeo.aeos.forEach(aeo => {
          aeo.schools.forEach(school => {
            totalSchools++;
            totalTeachers += school.teachers;
            totalPendingRequests += school.pendingRequests;
            avgCompliance += school.complianceScore;
            complianceCount++;
          });
        });
      });
    });

    return {
      totalSchools,
      totalTeachers,
      totalPendingRequests,
      avgCompliance: Math.round(avgCompliance / complianceCount),
    };
  }, []);

  const getAllSchools = useMemo(() => {
    const schools: School[] = [];
    mockData.forEach(deo => {
      deo.ddeos.forEach(ddeo => {
        ddeo.aeos.forEach(aeo => {
          aeo.schools.forEach(school => {
            schools.push(school);
          });
        });
      });
    });
    return schools;
  }, []);

  const handleExportSchool = (schoolId: string, format: 'sheets' | 'docs') => {
    const school = getAllSchools.find(s => s.id === schoolId);
    if (!school) return;

    console.log(`Exporting ${school.name} data to ${format === 'sheets' ? 'Google Sheets' : 'Google Docs'}`);
    // TODO: Implement actual export functionality
    alert(`Exporting ${school.name} to ${format === 'sheets' ? 'Google Sheets' : 'Google Docs'}`);
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const filteredData = mockData.filter(deo => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      deo.name.toLowerCase().includes(query) ||
      deo.district.toLowerCase().includes(query) ||
      deo.ddeos.some(ddeo =>
        ddeo.name.toLowerCase().includes(query) ||
        ddeo.aeos.some(aeo =>
          aeo.name.toLowerCase().includes(query) ||
          aeo.schools.some(school => school.name.toLowerCase().includes(query))
        )
      )
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mission Control</h1>
            <p className="text-sm text-slate-600 mt-1">System-wide monitoring & analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/profile')}
              data-testid="button-profile"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate('/');
              }}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Welcome back, <span className="cursor-pointer hover:text-primary" onClick={() => navigate('/profile')}>{user.name}</span>
          </h2>
          <p className="text-slate-600">You have system-wide visibility across all districts, regions, clusters, and schools.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="group relative overflow-hidden hover-lift">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <span className="text-xs font-semibold text-primary">Live</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Total Schools
                </p>
                <p className="text-5xl font-bold gradient-text tracking-tight">
                  {calculateAggregates.totalSchools}
                </p>
                <p className="text-xs text-muted-foreground">Across all districts</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>

          <Card className="group relative overflow-hidden hover-lift">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <span className="text-xs font-semibold text-primary">Live</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Total Teachers
                </p>
                <p className="text-5xl font-bold gradient-text tracking-tight">
                  {calculateAggregates.totalTeachers}
                </p>
                <p className="text-xs text-muted-foreground">Active educators</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>

          <Card className="group relative overflow-hidden hover-lift">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <AlertCircle className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <span className="text-xs font-semibold text-primary">Live</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Pending Requests
                </p>
                <p className="text-5xl font-bold gradient-text tracking-tight">
                  {calculateAggregates.totalPendingRequests}
                </p>
                <p className="text-xs text-muted-foreground">Awaiting response</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>

          <Card className="group relative overflow-hidden hover-lift">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <span className="text-xs font-semibold text-primary">Live</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Avg Compliance
                </p>
                <p className="text-5xl font-bold gradient-text tracking-tight">
                  {calculateAggregates.avgCompliance}%
                </p>
                <p className="text-xs text-muted-foreground">System-wide metric</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Card>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by district, region, cluster, or school name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
              className="w-full"
            />
          </div>
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Hierarchical Tree View */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span>Organizational Hierarchy</span>
            <span className="text-sm font-normal text-slate-600">Click to drill down</span>
          </h3>

          <div className="space-y-0 divide-y divide-slate-200">
            {filteredData.map(deo => (
              <div key={deo.id}>
                {/* DEO Level */}
                <div
                  className="py-4 px-4 hover:bg-slate-50 cursor-pointer transition-colors rounded-lg mb-2"
                  onClick={() => toggleNode(deo.id)}
                  data-testid={`node-deo-${deo.id}`}
                >
                  <div className="flex items-center gap-3">
                    {expandedNodes.has(deo.id) ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{deo.name}</div>
                      <div className="text-sm text-slate-600">{deo.district}</div>
                    </div>
                    <div className="text-sm text-slate-600">
                      {deo.ddeos.reduce((acc, d) => acc + d.aeos.reduce((a, ae) => a + ae.schools.length, 0), 0)} schools
                    </div>
                  </div>
                </div>

                {/* Expanded DDEO Level */}
                {expandedNodes.has(deo.id) && (
                  <div className="pl-8 space-y-2">
                    {deo.ddeos.map(ddeo => (
                      <div key={ddeo.id}>
                        <div
                          className="py-3 px-4 hover:bg-slate-50 cursor-pointer transition-colors rounded-lg"
                          onClick={() => toggleNode(ddeo.id)}
                          data-testid={`node-ddeo-${ddeo.id}`}
                        >
                          <div className="flex items-center gap-3">
                            {expandedNodes.has(ddeo.id) ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                            <div className="flex-1">
                              <div className="font-medium text-slate-800">{ddeo.name}</div>
                            </div>
                            <div className="text-sm text-slate-600">
                              {ddeo.aeos.reduce((a, ae) => a + ae.schools.length, 0)} schools
                            </div>
                          </div>
                        </div>

                        {/* Expanded AEO Level */}
                        {expandedNodes.has(ddeo.id) && (
                          <div className="pl-8 space-y-2 mt-2">
                            {ddeo.aeos.map(aeo => (
                              <div key={aeo.id}>
                                <div
                                  className="py-3 px-4 hover:bg-blue-50 cursor-pointer transition-colors rounded-lg border border-blue-100"
                                  onClick={() => toggleNode(aeo.id)}
                                  data-testid={`node-aeo-${aeo.id}`}
                                >
                                  <div className="flex items-center gap-3">
                                    {expandedNodes.has(aeo.id) ? (
                                      <ChevronDown className="w-4 h-4 text-blue-600" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-blue-600" />
                                    )}
                                    <div className="flex-1">
                                      <div className="font-medium text-blue-900">{aeo.name}</div>
                                    </div>
                                    <div className="text-sm text-blue-700 font-medium">{aeo.schools.length} schools</div>
                                  </div>
                                </div>

                                {/* School Level */}
                                {expandedNodes.has(aeo.id) && (
                                  <div className="pl-8 space-y-2 mt-2">
                                    {aeo.schools.map(school => (
                                      <div
                                        key={school.id}
                                        className="py-3 px-4 hover:bg-emerald-50 cursor-pointer transition-colors rounded-lg border border-emerald-100"
                                        data-testid={`node-school-${school.id}`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <Building2 className="w-4 h-4 text-emerald-600" />
                                          <div className="flex-1">
                                            <div className="font-medium text-emerald-900">{school.name}</div>
                                            <div className="text-xs text-emerald-700 mt-1">
                                              {school.headTeachers} Head · {school.teachers} Teachers · {school.pendingRequests} Pending
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="text-sm font-semibold text-emerald-700">{school.complianceScore}%</div>
                                            <div className="text-xs text-emerald-600">Compliance</div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <Card
            className="group relative overflow-hidden cursor-pointer hover-lift"
            onClick={() => navigate('/create-request')}
            data-testid="button-create-request"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">
                Create Request
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Send data requests to any level in the hierarchy
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>

          <Card
            className="group relative overflow-hidden cursor-pointer hover-lift"
            onClick={() => navigate('/data-requests')}
            data-testid="button-view-requests"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">
                View Requests
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Monitor all data requests across the system
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>

          <Card
            className="group relative overflow-hidden cursor-pointer hover-lift"
            data-testid="button-analytics"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">
                View Analytics
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Detailed reports and trends across all DEOs
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>

          <Card
            className="group relative overflow-hidden cursor-pointer hover-lift"
            data-testid="button-escalations"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">
                Escalations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {calculateAggregates.totalPendingRequests} items flagged for action
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>

          <Card
            className="group relative overflow-hidden cursor-pointer hover-lift"
            data-testid="button-audit"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">
                Audit Trail
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track all system changes and evidence submissions
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>

          <Card
            className="group relative overflow-hidden cursor-pointer hover-lift"
            onClick={() => setShowExportModal(true)}
            data-testid="button-export-schools"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <Download className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-base text-foreground mb-2">
                Export School Data
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Export data for all {calculateAggregates.totalSchools} schools
              </p>
              <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </Card>
        </div>

        {/* Export School Data Modal */}
        <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold gradient-text">
                Export School Data
              </DialogTitle>
              <DialogDescription>
                Select a school and export format to download school data
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3">
              {getAllSchools.map((school, index) => (
                <div
                  key={school.id}
                  className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-foreground truncate">
                          {school.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {school.teachers} teachers · Compliance: {school.complianceScore}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Select
                        value={selectedExportFormat}
                        onValueChange={(value) => setSelectedExportFormat(value as 'sheets' | 'docs')}
                      >
                        <SelectTrigger className="w-[140px] h-9 text-xs">
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sheets">Google Sheets</SelectItem>
                          <SelectItem value="docs">Google Docs</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (selectedExportFormat) {
                            handleExportSchool(school.id, selectedExportFormat);
                          }
                        }}
                        disabled={!selectedExportFormat}
                        className="gap-2 h-9"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowExportModal(false);
                  setSelectedExportFormat('');
                }}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
