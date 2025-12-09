import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMockDataRequests } from '@/hooks/useMockDataRequests';
import { useMockTeacherData } from '@/hooks/useMockTeacherData';
import { useMockVisits } from '@/hooks/useMockVisits';
import { useMockAEOActivities } from '@/hooks/useMockAEOActivities';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { LogOut, Plus, FileText, TrendingUp, Users, Calendar, Building2, MapPin, ClipboardList, CheckSquare, Award, ChevronRight, User } from 'lucide-react';
import MonitoringVisitForm from '@/pages/MonitoringVisitForm';
import MentoringVisitForm from '@/pages/MentoringVisitForm';
import OfficeVisitForm from '@/pages/OfficeVisitForm';
import OtherActivityForm from '@/pages/OtherActivityForm';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { getRequestsForUser } = useMockDataRequests();
  const { getTeacherStats } = useMockTeacherData();
  const { getVisitsForUser } = useMockVisits();
  const { getAllActivities } = useMockAEOActivities();
  
  const [activeActivityForm, setActiveActivityForm] = useState<string | null>(null);

  if (!user || user.role === 'CEO') {
    navigate('/');
    return null;
  }
  
  const activities = user.role === 'AEO' ? getAllActivities() : null;

  const userRequests = getRequestsForUser(user.id, user.role);
  const pendingCount = userRequests.filter((r) =>
    r.assignees.some((a) => a.userId === user.id && a.status === 'pending')
  ).length;
  const completedCount = userRequests.filter((r) =>
    r.assignees.some((a) => a.userId === user.id && a.status === 'completed')
  ).length;
  const { totalTeachers, presentToday, onLeaveToday, absentToday } = getTeacherStats();

  const dashboardStats = {
    CEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users, color: 'bg-blue-50' },
      { label: 'Present Today', value: presentToday, icon: TrendingUp, color: 'bg-emerald-50' },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar, color: 'bg-amber-50' },
    ],
    DEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users, color: 'bg-blue-50' },
      { label: 'Present Today', value: presentToday, icon: TrendingUp, color: 'bg-emerald-50' },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar, color: 'bg-amber-50' },
    ],
    DDEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users, color: 'bg-blue-50' },
      { label: 'Present Today', value: presentToday, icon: TrendingUp, color: 'bg-emerald-50' },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar, color: 'bg-amber-50' },
    ],
    AEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users, color: 'bg-blue-50' },
      { label: 'Present Today', value: presentToday, icon: TrendingUp, color: 'bg-emerald-50' },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar, color: 'bg-amber-50' },
    ],
    HEAD_TEACHER: [
      { label: 'Pending Tasks', value: pendingCount, icon: FileText, color: 'bg-orange-50' },
      { label: 'Completed', value: completedCount, icon: TrendingUp, color: 'bg-emerald-50' },
      { label: 'Staff Present Today', value: presentToday, icon: Users, color: 'bg-blue-50' },
    ],
    TEACHER: [
      { label: 'My Tasks', value: pendingCount, icon: FileText, color: 'bg-orange-50' },
      { label: 'Completed', value: completedCount, icon: TrendingUp, color: 'bg-emerald-50' },
      { label: 'Colleagues Present', value: presentToday, icon: Users, color: 'bg-blue-50' },
    ],
  };

  const stats = dashboardStats[user.role];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, {user.name}</h1>
            <p className="text-base text-muted-foreground mt-1">{user.role.replace(/_/g, ' ')}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-secondary rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.role.replace(/_/g, ' ')}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                navigate('/');
              }}
              data-testid="button-logout"
              className="rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={idx} 
                className="p-8 card-interactive cursor-pointer"
                onClick={() => navigate('/data-requests')}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-medium text-muted-foreground mb-2">{stat.label}</p>
                    <p className="stat-number text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-foreground/70" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions - Elevated Section */}
        <Card className="p-8 mb-12 bg-secondary/30">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.role === 'AEO' && (
              <>
                <Button
                  onClick={() => setActiveActivityForm('visit-selector')}
                  size="lg"
                  variant="accent"
                  className="h-auto py-6 text-lg justify-start gold-glow-hover"
                  data-testid="button-plan-visit"
                >
                  <ClipboardList className="w-6 h-6" />
                  <span className="flex-1 text-left">Plan a Visit</span>
                  <ChevronRight className="w-5 h-5 opacity-60" />
                </Button>
                <Button
                  onClick={() => setActiveActivityForm('other-activity')}
                  size="lg"
                  className="h-auto py-6 text-lg justify-start bg-emerald-600 hover:bg-emerald-700"
                  data-testid="button-log-activity"
                >
                  <CheckSquare className="w-6 h-6" />
                  <span className="flex-1 text-left">Log Other Activity</span>
                  <ChevronRight className="w-5 h-5 opacity-60" />
                </Button>
              </>
            )}
            {user.role === 'HEAD_TEACHER' && (
              <Button
                onClick={() => navigate('/collaborative-forms')}
                size="lg"
                className="h-auto py-6 text-lg justify-start"
                data-testid="button-collaborative-forms"
              >
                <Plus className="w-6 h-6" />
                <span className="flex-1 text-left">Collaborative Forms</span>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </Button>
            )}
            {(user.role === 'AEO' || user.role === 'HEAD_TEACHER' || user.role === 'DEO' || user.role === 'DDEO') && (
              <Button
                onClick={() => navigate('/create-request')}
                size="lg"
                className="h-auto py-6 text-lg justify-start"
                data-testid="button-create-request"
              >
                <Plus className="w-6 h-6" />
                <span className="flex-1 text-left">Create Data Request</span>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </Button>
            )}
            <Button
              onClick={() => navigate('/data-requests')}
              variant="secondary"
              size="lg"
              className="h-auto py-6 text-lg justify-start"
              data-testid="button-view-requests"
            >
              <FileText className="w-6 h-6" />
              <span className="flex-1 text-left">View All Requests</span>
              <ChevronRight className="w-5 h-5 opacity-60" />
            </Button>
            <Button
              onClick={() => navigate('/calendar')}
              variant="secondary"
              size="lg"
              className="h-auto py-6 text-lg justify-start"
              data-testid="button-view-calendar"
            >
              <Calendar className="w-6 h-6" />
              <span className="flex-1 text-left">Staff Leave Calendar</span>
              <ChevronRight className="w-5 h-5 opacity-60" />
            </Button>
            <Button
              onClick={() => navigate('/school-data')}
              variant="secondary"
              size="lg"
              className="h-auto py-6 text-lg justify-start"
              data-testid="button-view-schools"
            >
              <Building2 className="w-6 h-6" />
              <span className="flex-1 text-left">School Inventory</span>
              <ChevronRight className="w-5 h-5 opacity-60" />
            </Button>
            {(user.role === 'AEO' || user.role === 'DEO' || user.role === 'DDEO') && (
              <Button
                onClick={() => navigate('/school-visits')}
                variant="secondary"
                size="lg"
                className="h-auto py-6 text-lg justify-start"
                data-testid="button-view-visits"
              >
                <MapPin className="w-6 h-6" />
                <span className="flex-1 text-left">School Visits</span>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </Button>
            )}
          </div>
        </Card>

        {/* AEO Activity Summary */}
        {user.role === 'AEO' && activities && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Activities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 card-interactive cursor-pointer bg-blue-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monitoring</p>
                    <p className="text-3xl font-bold text-foreground">{activities.monitoring.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 card-interactive cursor-pointer bg-purple-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mentoring</p>
                    <p className="text-3xl font-bold text-foreground">{activities.mentoring.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 card-interactive cursor-pointer bg-emerald-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Office</p>
                    <p className="text-3xl font-bold text-foreground">{activities.office.length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 card-interactive cursor-pointer bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <CheckSquare className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Other</p>
                    <p className="text-3xl font-bold text-foreground">{activities.other.length}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Recent Requests */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          {userRequests.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-lg text-muted-foreground">No requests yet</p>
            </Card>
          ) : (
            <Card className="p-0 overflow-hidden">
              <ul className="divide-y divide-border/50">
                {userRequests.slice(0, 5).map((req) => (
                  <li
                    key={req.id}
                    className="flex items-center justify-between p-6 hover:bg-secondary/30 transition-colors cursor-pointer"
                    onClick={() => navigate(`/request/${req.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-foreground">{req.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Due: {req.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/request/${req.id}`);
                      }}
                      data-testid={`button-view-request-${req.id}`}
                    >
                      View
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>

      {/* Activity Forms Modal */}
      {user.role === 'AEO' && activeActivityForm === 'visit-selector' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Select Visit Type</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveActivityForm(null)}
                  data-testid="button-close-modal"
                  className="rounded-full"
                >
                  ✕
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                <Card
                  className="p-6 cursor-pointer card-interactive border-2 border-transparent hover:border-blue-400"
                  onClick={() => setActiveActivityForm('monitoring')}
                  data-testid="card-visit-type-monitoring"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                      <FileText className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">Monitoring Visit</h3>
                      <p className="text-muted-foreground">Infrastructure, attendance & facilities</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                </Card>

                <Card
                  className="p-6 cursor-pointer card-interactive border-2 border-transparent hover:border-purple-400"
                  onClick={() => setActiveActivityForm('mentoring')}
                  data-testid="card-visit-type-mentoring"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                      <Award className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">Mentoring Visit</h3>
                      <p className="text-muted-foreground">Higher-Order Thinking Skills (HOTS)</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                </Card>

                <Card
                  className="p-6 cursor-pointer card-interactive border-2 border-transparent hover:border-emerald-400"
                  onClick={() => setActiveActivityForm('office')}
                  data-testid="card-visit-type-office"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <Building2 className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">Office Visit</h3>
                      <p className="text-muted-foreground">Administrative tasks & coordination</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                </Card>
              </div>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => setActiveActivityForm(null)}
                data-testid="button-cancel-visit-selector"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Monitoring Visit Form */}
      {activeActivityForm === 'monitoring' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl my-8 animate-slideUp">
            <div className="bg-card rounded-2xl shadow-2xl">
              <MonitoringVisitForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Mentoring Visit Form */}
      {activeActivityForm === 'mentoring' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-4xl my-8 animate-slideUp">
            <div className="bg-card rounded-2xl shadow-2xl">
              <MentoringVisitForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Office Visit Form */}
      {activeActivityForm === 'office' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-2xl my-8 animate-slideUp">
            <div className="bg-card rounded-2xl shadow-2xl">
              <OfficeVisitForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Other Activity Form */}
      {activeActivityForm === 'other-activity' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="w-full max-w-2xl my-8 animate-slideUp">
            <div className="bg-card rounded-2xl shadow-2xl">
              <OtherActivityForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
