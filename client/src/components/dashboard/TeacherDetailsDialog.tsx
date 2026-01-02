import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  schoolId: string;
  schoolName: string;
  subject: string;
  status: 'present' | 'on_leave' | 'absent';
}

interface LeaveRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'special';
  startDate: Date;
  endDate: Date;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
  school: string;
}

interface TeacherDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'total' | 'present' | 'onLeave' | 'absent';
  teachers: Teacher[];
  leaves: LeaveRecord[];
}

export function TeacherDetailsDialog({
  open,
  onOpenChange,
  type,
  teachers,
  leaves,
}: TeacherDetailsDialogProps) {
  const getFilteredTeachers = () => {
    switch (type) {
      case 'total':
        return teachers;
      case 'present':
        return teachers.filter((t) => t.status === 'present');
      case 'onLeave':
        return teachers.filter((t) => t.status === 'on_leave');
      case 'absent':
        return teachers.filter((t) => t.status === 'absent');
      default:
        return teachers;
    }
  };

  const getLeaveReason = (teacherId: string) => {
    const leave = leaves.find((l) => l.teacherId === teacherId);
    return leave ? leave.reason : 'No reason provided';
  };

  const getLeaveType = (teacherId: string) => {
    const leave = leaves.find((l) => l.teacherId === teacherId);
    return leave ? leave.leaveType : null;
  };

  const filteredTeachers = getFilteredTeachers();

  const getTitleAndIcon = () => {
    switch (type) {
      case 'total':
        return { title: 'All Teachers', icon: Users, color: 'text-blue-600' };
      case 'present':
        return { title: 'Present Teachers', icon: CheckCircle, color: 'text-emerald-600' };
      case 'onLeave':
        return { title: 'Teachers On Leave', icon: Calendar, color: 'text-amber-600' };
      case 'absent':
        return { title: 'Absent Teachers', icon: XCircle, color: 'text-red-600' };
      default:
        return { title: 'Teachers', icon: Users, color: 'text-blue-600' };
    }
  };

  const { title, icon: Icon, color } = getTitleAndIcon();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Present</Badge>;
      case 'on_leave':
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">On Leave</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Absent</Badge>;
      default:
        return null;
    }
  };

  const getLeaveTypeBadge = (leaveType: string | null) => {
    if (!leaveType) return null;
    const colors: Record<string, string> = {
      sick: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      casual: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      earned: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      special: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    };
    return <Badge className={colors[leaveType] || 'bg-gray-100 text-gray-700'}>{leaveType.charAt(0).toUpperCase() + leaveType.slice(1)} Leave</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            {title} ({filteredTeachers.length})
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No teachers found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="p-4 bg-muted/50 rounded-xl border border-border hover:bg-muted/80 transition-colors"
                  data-testid={`teacher-card-${teacher.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{teacher.name}</h4>
                        {type === 'total' && getStatusBadge(teacher.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        <span className="font-medium">School:</span> {teacher.schoolName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Subject:</span> {teacher.subject}
                      </p>
                      {(type === 'onLeave' || (type === 'total' && teacher.status === 'on_leave')) && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <div className="flex items-center gap-2 mb-1">
                            {getLeaveTypeBadge(getLeaveType(teacher.id))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Reason:</span> {getLeaveReason(teacher.id)}
                          </p>
                        </div>
                      )}
                      {(type === 'absent' || (type === 'total' && teacher.status === 'absent')) && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="text-sm text-red-600 dark:text-red-400">
                            <span className="font-medium">Status:</span> Absent without leave
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
