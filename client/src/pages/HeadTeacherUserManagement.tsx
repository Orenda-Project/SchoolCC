import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, UserX, CheckCircle, XCircle, Trash2, ArrowLeft, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

interface UserAccount {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: 'pending' | 'active' | 'restricted';
  schoolName?: string;
  email?: string;
  createdAt: string;
}

export default function HeadTeacherUserManagement() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pendingUsers, setPendingUsers] = useState<UserAccount[]>([]);
  const [activeUsers, setActiveUsers] = useState<UserAccount[]>([]);
  const [restrictedUsers, setRestrictedUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Permission check - only HEAD_TEACHER can access
  if (!user || user.role !== 'HEAD_TEACHER') {
    navigate('/');
    return null;
  }

  // Helper function to filter and sort users alphabetically
  const filterAndSortUsers = (users: UserAccount[]) => {
    return users
      .filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phoneNumber.includes(searchQuery)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredPendingUsers = filterAndSortUsers(pendingUsers);
  const filteredActiveUsers = filterAndSortUsers(activeUsers);
  const filteredRestrictedUsers = filterAndSortUsers(restrictedUsers);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const [pendingRes, allUsersRes] = await Promise.all([
        fetch(`/api/admin/pending-users?userId=${user.id}`),
        fetch(`/api/admin/users?userId=${user.id}`),
      ]);

      if (pendingRes.ok) {
        const pending = await pendingRes.json();
        setPendingUsers(pending);
      }

      if (allUsersRes.ok) {
        const usersData = await allUsersRes.json();
        setActiveUsers(usersData.filter((u: UserAccount) => u.status === 'active'));
        setRestrictedUsers(usersData.filter((u: UserAccount) => u.status === 'restricted'));
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load teachers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approverId: user.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to approve');
      }

      const approvedUser = pendingUsers.find(u => u.id === userId);
      analytics.admin.userApproved(userId, approvedUser?.role as any);

      toast({
        title: 'Success',
        description: 'Teacher account approved',
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to approve teacher',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm('Are you sure you want to reject this account request? This will permanently delete the request.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approverId: user.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to reject');
      }

      const rejectedUser = pendingUsers.find(u => u.id === userId);
      analytics.admin.userRejected(userId, rejectedUser?.role as any);

      toast({
        title: 'Success',
        description: 'Account request rejected',
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reject request',
        variant: 'destructive',
      });
    }
  };

  const handleRestrict = async (userId: string) => {
    if (!confirm('Are you sure you want to restrict this teacher? They will not be able to log in.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}/restrict`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: user.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to restrict');
      }

      toast({
        title: 'Success',
        description: 'Teacher account restricted',
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to restrict teacher',
        variant: 'destructive',
      });
    }
  };

  const handleUnrestrict = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/unrestrict`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: user.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to unrestrict');
      }

      toast({
        title: 'Success',
        description: 'Teacher account unrestricted',
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to unrestrict teacher',
        variant: 'destructive',
      });
    }
  };

  const handleRemove = async (userId: string) => {
    if (!confirm('Are you sure you want to permanently delete this teacher? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete');
      }

      toast({
        title: 'Success',
        description: 'Teacher deleted successfully',
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete teacher',
        variant: 'destructive',
      });
    }
  };

  const renderUserCard = (userAccount: UserAccount, showActions: 'approve' | 'manage' | 'unrestrict') => (
    <Card key={userAccount.id} className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{userAccount.name}</h3>
            <Badge variant="secondary">Teacher</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{userAccount.phoneNumber}</p>
          {userAccount.email && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{userAccount.email}</p>
          )}
        </div>
      </div>

      {showActions === 'approve' && (
        <div className="flex gap-2">
          <Button
            onClick={() => handleApprove(userAccount.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
          <Button
            onClick={() => handleReject(userAccount.id)}
            variant="destructive"
            className="flex-1"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
        </div>
      )}

      {showActions === 'manage' && (
        <div className="flex gap-2">
          <Button
            onClick={() => handleRestrict(userAccount.id)}
            variant="outline"
            className="flex-1"
          >
            <UserX className="w-4 h-4 mr-2" />
            Restrict
          </Button>
          <Button
            onClick={() => handleRemove(userAccount.id)}
            variant="destructive"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}

      {showActions === 'unrestrict' && (
        <div className="flex gap-2">
          <Button
            onClick={() => handleUnrestrict(userAccount.id)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Unrestrict
          </Button>
          <Button
            onClick={() => handleRemove(userAccount.id)}
            variant="destructive"
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-8 h-8" />
              Manage Teachers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Approve and manage teachers in your school
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name or phone number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending" className="gap-2">
              <UserCheck className="w-4 h-4" />
              Pending ({pendingUsers.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              <Users className="w-4 h-4" />
              Active ({activeUsers.length})
            </TabsTrigger>
            <TabsTrigger value="restricted" className="gap-2">
              <UserX className="w-4 h-4" />
              Restricted ({restrictedUsers.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Teachers Tab */}
          <TabsContent value="pending">
            <div className="space-y-4">
              {loading ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Loading...</p>
                </Card>
              ) : filteredPendingUsers.length === 0 ? (
                <Card className="p-8 text-center">
                  <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No pending teacher account requests</p>
                </Card>
              ) : (
                filteredPendingUsers.map(u => renderUserCard(u, 'approve'))
              )}
            </div>
          </TabsContent>

          {/* Active Teachers Tab */}
          <TabsContent value="active">
            <div className="space-y-4">
              {loading ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Loading...</p>
                </Card>
              ) : filteredActiveUsers.length === 0 ? (
                <Card className="p-8 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No active teachers in your school</p>
                </Card>
              ) : (
                filteredActiveUsers.map(u => renderUserCard(u, 'manage'))
              )}
            </div>
          </TabsContent>

          {/* Restricted Teachers Tab */}
          <TabsContent value="restricted">
            <div className="space-y-4">
              {loading ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Loading...</p>
                </Card>
              ) : filteredRestrictedUsers.length === 0 ? (
                <Card className="p-8 text-center">
                  <UserX className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">No restricted teachers</p>
                </Card>
              ) : (
                filteredRestrictedUsers.map(u => renderUserCard(u, 'unrestrict'))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
