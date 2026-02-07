import { useAuth } from "@/contexts/auth";
import { useActivities } from "@/contexts/activities";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import {
  LogOut,
  Users,
  Calendar,
  Building2,
  MapPin,
  ClipboardList,
  Award,
  ChevronRight,
  User,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Menu,
  X,
  FileText,
  TrendingUp,
  Target,
  BarChart3,
  Eye,
  GraduationCap,
  Clipboard,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NotificationBell from "@/components/NotificationBell";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MetricCard } from "@/components/dashboard";
import { analytics } from "@/lib/analytics";

interface TrainingTip {
  text: string;
  category: string;
  gradient: string;
  icon: typeof Target;
}

export default function TrainingManagerDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(false);
  const [staffStats, setStaffStats] = useState({
    aeos: { total: 0, present: 0, onLeave: 0, absent: 0 },
    headTeachers: { total: 0, present: 0, onLeave: 0, absent: 0 },
    teachers: { total: 0, present: 0, onLeave: 0, absent: 0 },
  });
  const [activityStats, setActivityStats] = useState({
    totalVisits: 0,
    mentoringSessions: 0,
    pendingReviews: 0,
    completedThisMonth: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    analytics.navigation.dashboardViewed("TRAINING_MANAGER");
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetch(`/api/staff-stats?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setStaffStats(data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch staff stats:", err);
        });
    }
  }, [user]);

  if (!user) return null;

  const trainingTips: TrainingTip[] = [
    {
      text: "Observe AEO school visits and provide constructive feedback on monitoring techniques.",
      category: "Observation",
      gradient: "from-blue-500 to-indigo-600",
      icon: Eye,
    },
    {
      text: "Facilitate peer learning circles where AEOs share successful mentoring strategies.",
      category: "Peer Learning",
      gradient: "from-purple-500 to-violet-600",
      icon: Users,
    },
    {
      text: "Use visit data to identify schools needing extra support and prioritize coaching there.",
      category: "Data-Driven",
      gradient: "from-emerald-500 to-teal-600",
      icon: BarChart3,
    },
    {
      text: "Model effective classroom observation techniques during joint school visits.",
      category: "Lead by Example",
      gradient: "from-amber-500 to-orange-600",
      icon: Target,
    },
    {
      text: "Build a culture of continuous improvement by celebrating AEO achievements regularly.",
      category: "Recognition",
      gradient: "from-rose-500 to-pink-600",
      icon: Award,
    },
    {
      text: "Set clear monthly coaching goals with each AEO and track progress together.",
      category: "Goal Setting",
      gradient: "from-cyan-500 to-blue-600",
      icon: ClipboardList,
    },
    {
      text: "Document best practices from high-performing schools to share across the cluster.",
      category: "Knowledge Sharing",
      gradient: "from-teal-500 to-emerald-600",
      icon: BookOpen,
    },
    {
      text: "Focus on building AEO capacity — empower them to solve problems independently.",
      category: "Empowerment",
      gradient: "from-indigo-500 to-purple-600",
      icon: GraduationCap,
    },
  ];

  const shuffledTips = [...trainingTips].sort(() => Math.random() - 0.5);
  const displayTips = shuffledTips.slice(0, 3);

  const quickActions = [
    {
      label: "School Visits",
      icon: MapPin,
      gradient: "from-indigo-400 to-indigo-600",
      hoverBg: "hover:bg-indigo-50 dark:hover:bg-indigo-900/30",
      path: "/school-visits",
    },
    {
      label: "School Inventory",
      icon: Building2,
      gradient: "from-teal-400 to-teal-600",
      hoverBg: "hover:bg-teal-50 dark:hover:bg-teal-900/30",
      path: "/school-data",
    },
    {
      label: "Data Requests",
      icon: FileText,
      gradient: "from-violet-400 to-violet-600",
      hoverBg: "hover:bg-violet-50 dark:hover:bg-violet-900/30",
      path: "/data-requests",
    },
    {
      label: "Queries",
      icon: MessageSquare,
      gradient: "from-purple-400 to-purple-600",
      hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/30",
      path: "/queries",
    },
  ];

  const sidebarNavItems = [
    {
      label: "School Visits",
      icon: MapPin,
      gradient: "from-indigo-400 to-indigo-600",
      hoverBg: "hover:bg-indigo-100/80 dark:hover:bg-indigo-900/30",
      path: "/school-visits",
      testId: "nav-school-visits",
    },
    {
      label: "Data Requests",
      icon: FileText,
      gradient: "from-violet-400 to-violet-600",
      hoverBg: "hover:bg-violet-100/80 dark:hover:bg-violet-900/30",
      path: "/data-requests",
      testId: "nav-data-requests",
    },
    {
      label: "School Inventory",
      icon: Building2,
      gradient: "from-teal-400 to-teal-600",
      hoverBg: "hover:bg-teal-100/80 dark:hover:bg-teal-900/30",
      path: "/school-data",
      testId: "nav-school-inventory",
    },
    {
      label: "Leave Calendar",
      icon: Calendar,
      gradient: "from-blue-400 to-blue-600",
      hoverBg: "hover:bg-blue-100/80 dark:hover:bg-blue-900/30",
      path: "/calendar",
      testId: "nav-leave-calendar",
    },
    {
      label: "Community Album",
      icon: BookOpen,
      gradient: "from-pink-400 to-pink-600",
      hoverBg: "hover:bg-pink-100/80 dark:hover:bg-pink-900/30",
      path: "/community-album",
      testId: "nav-community-album",
    },
    {
      label: "Queries",
      icon: MessageSquare,
      gradient: "from-purple-400 to-purple-600",
      hoverBg: "hover:bg-purple-100/80 dark:hover:bg-purple-900/30",
      path: "/queries",
      testId: "nav-queries",
    },
    {
      label: "Lesson Plans",
      icon: BookOpen,
      gradient: "from-indigo-400 to-indigo-500",
      hoverBg: "hover:bg-indigo-100/80 dark:hover:bg-indigo-900/30",
      path: "/lesson-plans",
      testId: "nav-lesson-plans",
    },
    {
      label: "Help Guide",
      icon: HelpCircle,
      gradient: "from-blue-500 to-purple-600",
      hoverBg: "hover:bg-blue-100/80 dark:hover:bg-blue-900/30",
      path: null,
      testId: "nav-help-guide",
      action: () => window.dispatchEvent(new CustomEvent("openHelpGuide")),
    },
  ];

  return (
    <div
      className="min-h-screen bg-background flex"
      data-testid="training-manager-dashboard"
    >
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-card dark:bg-card border-r border-border animate-slideInLeft flex flex-col"
            data-testid="training-manager-mobile-sidebar"
          >
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src="/taleemhub-logo.png"
                  alt="TaleemHub Logo"
                  className="w-12 h-12"
                />
                <div>
                  <h1 className="text-lg font-bold gradient-text-gold">
                    TaleemHub
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Training Manager
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(false)}
                data-testid="button-close-training-manager-menu"
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              <nav className="space-y-2">
                {sidebarNavItems.map((item) => (
                  <button
                    key={item.testId}
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                      } else if (item.action) {
                        item.action();
                      }
                      setShowSidebar(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${item.hoverBg} transition-all duration-300 group press-effect`}
                    data-testid={`mobile-${item.testId}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                data-testid="button-training-manager-logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {showSidebar && (
        <aside
          className="hidden lg:flex w-72 bg-card dark:bg-card border-r border-border flex-col fixed left-0 top-0 h-full z-40"
          data-testid="training-manager-desktop-sidebar"
        >
          <div className="p-4 border-b border-border flex items-center gap-3 shrink-0 h-[88px]">
            <img
              src="/taleemhub-logo.png"
              alt="TaleemHub Logo"
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-lg font-bold gradient-text-gold">
                TaleemHub
              </h1>
              <p className="text-xs text-muted-foreground">
                Training Manager Panel
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <nav className="space-y-2">
              {sidebarNavItems.map((item) => (
                <button
                  key={item.testId}
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    } else if (item.action) {
                      item.action();
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left ${item.hoverBg} transition-all duration-300 group press-effect`}
                  data-testid={item.testId}
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300"
              onClick={() => {
                logout();
                navigate("/");
              }}
              data-testid="button-training-manager-logout-desktop"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </aside>
      )}

      <div
        className={`flex-1 transition-all duration-300 ${showSidebar ? "lg:ml-72" : ""}`}
      >
        <div className="lg:hidden bg-card/95 dark:bg-card backdrop-blur-xl border-b border-border sticky top-0 z-50">
          <div className="px-3 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                data-testid="button-training-manager-toggle-menu"
                className="rounded-full h-9 w-9"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-sm font-bold gradient-text truncate">
                  Welcome, {user.name.split(" ")[0]}
                </h1>
                <p className="text-[10px] text-muted-foreground">
                  Training Manager Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <NotificationBell />
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer"
                data-testid="training-manager-mobile-profile"
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shadow-md ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md ring-2 ring-primary/20">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-card/95 dark:bg-card backdrop-blur-xl border-b border-border sticky top-0 z-30 h-[88px]">
          <div className="px-8 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                data-testid="button-training-manager-toggle-menu-desktop"
                className="rounded-full"
              >
                <Menu className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Welcome back, {user.name}
                </h1>
                <p className="text-base text-muted-foreground mt-1">
                  Training Manager Dashboard — Training & Mentoring Overview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <span className="text-sm text-muted-foreground hidden xl:inline">
                  Theme
                </span>
              </div>
              <div className="flex items-center gap-2">
                <NotificationBell />
                <span className="text-sm text-muted-foreground hidden xl:inline">
                  Alerts
                </span>
              </div>
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-muted/50 cursor-pointer transition-all duration-200"
                data-testid="training-manager-header-profile"
              >
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md ring-2 ring-primary/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <span className="text-sm text-muted-foreground hidden xl:inline">
                  Profile
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-5 lg:py-8">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div data-testid="widget-training-manager-stats">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                <MetricCard
                  value={staffStats.aeos.total}
                  label="AEOs"
                  icon={Award}
                  iconGradient="from-purple-500 to-purple-600"
                  size="md"
                  breakdown={[
                    {
                      label: "Present",
                      value: staffStats.aeos.present,
                      valueColor: "text-emerald-600",
                      showAsBadge: false,
                    },
                    {
                      label: "On Leave",
                      value: staffStats.aeos.onLeave,
                      valueColor: "text-amber-600",
                      showAsBadge: false,
                    },
                  ]}
                  className="hover-lift card-shine h-full"
                  data-testid="card-training-manager-aeos"
                />
                <MetricCard
                  value={staffStats.headTeachers.total}
                  label="Head Teachers"
                  icon={Building2}
                  iconGradient="from-teal-500 to-teal-600"
                  size="md"
                  breakdown={[
                    {
                      label: "Present",
                      value: staffStats.headTeachers.present,
                      valueColor: "text-emerald-600",
                      showAsBadge: false,
                    },
                    {
                      label: "On Leave",
                      value: staffStats.headTeachers.onLeave,
                      valueColor: "text-amber-600",
                      showAsBadge: false,
                    },
                  ]}
                  className="hover-lift card-shine h-full"
                  data-testid="card-training-manager-headteachers"
                />
                <MetricCard
                  value={staffStats.teachers.total}
                  label="Teachers"
                  icon={Users}
                  iconGradient="from-blue-500 to-blue-600"
                  size="md"
                  breakdown={[
                    {
                      label: "Present",
                      value: staffStats.teachers.present,
                      valueColor: "text-emerald-600",
                      showAsBadge: false,
                    },
                    {
                      label: "On Leave",
                      value: staffStats.teachers.onLeave,
                      valueColor: "text-amber-600",
                      showAsBadge: false,
                    },
                  ]}
                  className="hover-lift card-shine h-full"
                  data-testid="card-training-manager-teachers"
                />
                <MetricCard
                  value={
                    staffStats.aeos.total +
                    staffStats.headTeachers.total +
                    staffStats.teachers.total
                  }
                  label="Total Staff"
                  icon={TrendingUp}
                  iconGradient="from-amber-500 to-amber-600"
                  size="md"
                  className="hover-lift card-shine h-full"
                  data-testid="card-training-manager-total-staff"
                />
              </div>
            </div>

            <div data-testid="widget-training-manager-quick-actions">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold gradient-text mb-2 sm:mb-3 lg:mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => {
                      if (action.path) {
                        navigate(action.path);
                      } else if (action.action) {
                        action.action();
                      }
                    }}
                    className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-card border border-border ${action.hoverBg} transition-all duration-300 group active:scale-[0.97] shadow-sm hover:shadow-md`}
                    data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                    >
                      <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div data-testid="widget-training-manager-training-tips">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold gradient-text mb-2 sm:mb-3 lg:mb-4">
                Training Tips
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {displayTips.map((tip, idx) => (
                  <Card
                    key={idx}
                    className="p-3 sm:p-4 bg-white dark:bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${tip.gradient} flex items-center justify-center shadow-sm shrink-0`}
                      >
                        <tip.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold mb-1.5 bg-gradient-to-r ${tip.gradient} text-white`}
                        >
                          {tip.category}
                        </span>
                        <p className="text-xs sm:text-sm font-medium leading-relaxed text-foreground">
                          {tip.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div data-testid="widget-training-manager-visit-overview">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold gradient-text mb-2 sm:mb-3 lg:mb-4">
                Visit & Activity Hub
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <Card
                  className="p-4 sm:p-5 bg-white dark:bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group active:scale-[0.98]"
                  onClick={() => navigate("/school-visits")}
                  data-testid="card-training-manager-visit-hub"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-foreground">
                        School Visits
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Monitor and track field visits
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                  </div>
                </Card>

                <Card
                  className="p-4 sm:p-5 bg-white dark:bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group active:scale-[0.98]"
                  onClick={() => navigate("/data-requests")}
                  data-testid="card-training-manager-data-requests"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clipboard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-foreground">
                        Data Requests
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Manage data collection tasks
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                  </div>
                </Card>

                <Card
                  className="p-4 sm:p-5 bg-white dark:bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group active:scale-[0.98]"
                  onClick={() => navigate("/calendar")}
                  data-testid="card-training-manager-calendar"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-foreground">
                        Leave Calendar
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Attendance & leave management
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                  </div>
                </Card>

                <Card
                  className="p-4 sm:p-5 bg-white dark:bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group active:scale-[0.98]"
                  onClick={() => navigate("/school-data")}
                  data-testid="card-training-manager-school-inventory"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-foreground">
                        School Inventory
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        View school infrastructure data
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-teal-500 transition-colors" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
