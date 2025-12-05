import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMockDataRequests } from '@/hooks/useMockDataRequests';
import { useMockTeacherData } from '@/hooks/useMockTeacherData';
import { useMockVisits } from '@/hooks/useMockVisits';
import { useMockAEOActivities } from '@/hooks/useMockAEOActivities';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { LogOut, Plus, FileText, TrendingUp, Users, Calendar, Building2, MapPin, ClipboardList, CheckSquare, Award } from 'lucide-react';
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
      { label: 'Total Teachers', value: totalTeachers, icon: Users },
      { label: 'Present Today', value: presentToday, icon: TrendingUp },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar },
    ],
    DEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users },
      { label: 'Present Today', value: presentToday, icon: TrendingUp },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar },
    ],
    DDEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users },
      { label: 'Present Today', value: presentToday, icon: TrendingUp },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar },
    ],
    AEO: [
      { label: 'Total Teachers', value: totalTeachers, icon: Users },
      { label: 'Present Today', value: presentToday, icon: TrendingUp },
      { label: 'On Leave Today', value: onLeaveToday, icon: Calendar },
    ],
    HEAD_TEACHER: [
      { label: 'Pending Tasks', value: pendingCount, icon: FileText },
      { label: 'Completed', value: completedCount, icon: TrendingUp },
      { label: 'Staff Present Today', value: presentToday, icon: Users },
    ],
    TEACHER: [
      { label: 'My Tasks', value: pendingCount, icon: FileText },
      { label: 'Completed', value: completedCount, icon: TrendingUp },
      { label: 'Colleagues Present', value: presentToday, icon: Users },
    ],
  };

  const stats = dashboardStats[user.role];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.role.replace(/_/g, ' ')}</p>
          </div>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-primary/20" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.role === 'HEAD_TEACHER' && (
              <Button
                onClick={() => navigate('/collaborative-forms')}
                size="lg"
                className="h-auto py-4"
                data-testid="button-collaborative-forms"
              >
                <Plus className="w-5 h-5 mr-2" />
                Collaborative Forms
              </Button>
            )}
            {(user.role === 'AEO' || user.role === 'HEAD_TEACHER' || user.role === 'DEO' || user.role === 'DDEO') && (
              <Button
                onClick={() => navigate('/create-request')}
                size="lg"
                className="h-auto py-4"
                data-testid="button-create-request"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Data Request
              </Button>
            )}
            <Button
              onClick={() => navigate('/data-requests')}
              variant="secondary"
              size="lg"
              className="h-auto py-4"
              data-testid="button-view-requests"
            >
              <FileText className="w-5 h-5 mr-2" />
              View All Requests
            </Button>
            <Button
              onClick={() => navigate('/calendar')}
              variant="secondary"
              size="lg"
              className="h-auto py-4"
              data-testid="button-view-calendar"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Staff Leave Calendar
            </Button>
            <Button
              onClick={() => navigate('/school-data')}
              variant="secondary"
              size="lg"
              className="h-auto py-4"
              data-testid="button-view-schools"
            >
              <Building2 className="w-5 h-5 mr-2" />
              School Inventory
            </Button>
            {(user.role === 'AEO' || user.role === 'DEO' || user.role === 'DDEO') && (
              <Button
                onClick={() => navigate('/school-visits')}
                variant="secondary"
                size="lg"
                className="h-auto py-4"
                data-testid="button-view-visits"
              >
                <MapPin className="w-5 h-5 mr-2" />
                School Visits
              </Button>
            )}
            {user.role === 'AEO' && (
              <>
                <Button
                  onClick={() => setActiveActivityForm('visit-selector')}
                  size="lg"
                  className="h-auto py-4 bg-blue-600 hover:bg-blue-700"
                  data-testid="button-plan-visit"
                >
                  <ClipboardList className="w-5 h-5 mr-2" />
                  Plan a Visit
                </Button>
                <Button
                  onClick={() => setActiveActivityForm('other-activity')}
                  size="lg"
                  className="h-auto py-4 bg-emerald-600 hover:bg-emerald-700"
                  data-testid="button-log-activity"
                >
                  <CheckSquare className="w-5 h-5 mr-2" />
                  Log Other Activity
                </Button>
              </>
            )}
          </div>
        </div>

        {/* AEO Activity Summary */}
        {user.role === 'AEO' && activities && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Your Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Monitoring Visits</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{activities.monitoring.length}</p>
                  </div>
                  <FileText className="w-6 h-6 text-blue-200" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Mentoring Visits</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{activities.mentoring.length}</p>
                  </div>
                  <Award className="w-6 h-6 text-purple-200" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Office Visits</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{activities.office.length}</p>
                  </div>
                  <Building2 className="w-6 h-6 text-emerald-200" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Other Activities</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{activities.other.length}</p>
                  </div>
                  <CheckSquare className="w-6 h-6 text-slate-200" />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Recent Requests */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          {userRequests.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No requests yet</p>
            </Card>
          ) : (
            <Card className="p-6">
              <ul className="space-y-4">
                {userRequests.slice(0, 5).map((req) => (
                  <li
                    key={req.id}
                    className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{req.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {req.dueDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/request/${req.id}`)}
                      data-testid={`button-view-request-${req.id}`}
                    >
                      View
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Select Visit Type</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveActivityForm(null)}
                  data-testid="button-close-modal"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-6">
                <Card
                  className="p-4 border-2 border-border hover:border-blue-400 cursor-pointer transition-all"
                  onClick={() => setActiveActivityForm('monitoring')}
                  data-testid="card-visit-type-monitoring"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Monitoring Visit</h3>
                      <p className="text-sm text-muted-foreground">Infrastructure, attendance & facilities</p>
                    </div>
                    <Button size="sm">Select</Button>
                  </div>
                </Card>

                <Card
                  className="p-4 border-2 border-border hover:border-purple-400 cursor-pointer transition-all"
                  onClick={() => setActiveActivityForm('mentoring')}
                  data-testid="card-visit-type-mentoring"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Mentoring Visit</h3>
                      <p className="text-sm text-muted-foreground">Higher-Order Thinking Skills (HOTS)</p>
                    </div>
                    <Button size="sm">Select</Button>
                  </div>
                </Card>

                <Card
                  className="p-4 border-2 border-border hover:border-emerald-400 cursor-pointer transition-all"
                  onClick={() => setActiveActivityForm('office')}
                  data-testid="card-visit-type-office"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Office Visit</h3>
                      <p className="text-sm text-muted-foreground">Administrative tasks & coordination</p>
                    </div>
                    <Button size="sm">Select</Button>
                  </div>
                </Card>
              </div>

              <Button
                variant="outline"
                className="w-full"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-4xl my-8">
            <div className="bg-background rounded-lg">
              <MonitoringVisitForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Mentoring Visit Form */}
      {activeActivityForm === 'mentoring' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-4xl my-8">
            <div className="bg-background rounded-lg">
              <MentoringVisitForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Office Visit Form */}
      {activeActivityForm === 'office' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <div className="bg-background rounded-lg">
              <OfficeVisitForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}

      {/* Other Activity Form */}
      {activeActivityForm === 'other-activity' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <div className="bg-background rounded-lg">
              <OtherActivityForm onClose={() => setActiveActivityForm(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
