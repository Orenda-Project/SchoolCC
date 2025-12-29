import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, UserX, CheckCircle, XCircle, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserAccount {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: 'pending' | 'active' | 'restricted';
  schoolName?: string;
  clusterId?: string;
  email?: string;
  createdAt: string;
}

export default function UserManagement() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pendingUsers, setPendingUsers] = useState<UserAccount[]>([]);
  const [activeUsers, setActiveUsers] = useState<UserAccount[]>([]);
  const [restrictedUsers, setRestrictedUsers] = useState<UserAccount[]>([]);

  // Permission check
  if (!user || user.role !== 'DEO') {
    navigate('/');
    return null;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const [pendingRes, allUsersRes] = await Promise.all([
        fetch(`/api/admin/pending-users?userId=${user.id}`),
        fetch('/api/admin/users'),
      ]);

      if (pendingRes.ok) {
        const pending = await pendingRes.json();
        setPendingUsers(pending);
      }

      if (allUsersRes.ok) {
        const allUsers = await allUsersRes.json();
        setActiveUsers(allUsers.filter((u: UserAccount) => u.status === 'active'));
        setRestrictedUsers(allUsers.filter((u: UserAccount) => u.status === 'restricted'));
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load users',
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

      if (!res.ok) throw new Error('Failed to approve');

      toast({
        title: 'Success',
        description: 'User account approved',
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve user',
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

      if (!res.ok) throw new Error('Failed to reject');

      toast({
        title: 'Success',
        description: 'Account request rejected',
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject request',
        variant: 'destructive',
      });
    }
  };

  const handleRestrict = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/restrict`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: user.id }),
      });

      if (!res.ok) throw new Error('Failed to restrict');

      toast({
        title: 'Success',
        description: 'User account restricted',
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to restrict user',
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

      if (!res.ok) throw new Error('Failed to unrestrict');

      toast({
        title: 'Success',
        description: 'User account reactivated',
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reactivate user',
        variant: 'destructive',
      });
    }
  };

  const handleRemove = async (userId: string) => {
    if (!confirm('Are you sure you want to permanently delete this user account?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast({
        title: 'Success',
        description: 'User account deleted',
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const UserCard = ({ user: userAccount, actions }: { user: UserAccount; actions: React.ReactNode }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {userAccount.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold">{userAccount.name}</h3>
              <p className="text-sm text-muted-foreground">{userAccount.phoneNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Role:</span>
              <Badge className="ml-2">{userAccount.role}</Badge>
            </div>
            {userAccount.schoolName && (
              <div>
                <span className="text-muted-foreground">School:</span>
                <span className="ml-2 font-medium">{userAccount.schoolName}</span>
              </div>
            )}
            {userAccount.email && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="ml-2">{userAccount.email}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {actions}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/deo-dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage account requests and user access</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              <Users className="w-4 h-4 mr-2" />
              Pending Requests ({pendingUsers.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              <UserCheck className="w-4 h-4 mr-2" />
              Active Users ({activeUsers.length})
            </TabsTrigger>
            <TabsTrigger value="restricted">
              <UserX className="w-4 h-4 mr-2" />
              Restricted ({restrictedUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : pendingUsers.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                No pending account requests
              </Card>
            ) : (
              pendingUsers.map((userAccount) => (
                <UserCard
                  key={userAccount.id}
                  user={userAccount}
                  actions={
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(userAccount.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(userAccount.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  }
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              activeUsers.map((userAccount) => (
                <UserCard
                  key={userAccount.id}
                  user={userAccount}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRestrict(userAccount.id)}
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        Restrict
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(userAccount.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </>
                  }
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="restricted" className="space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : restrictedUsers.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                No restricted users
              </Card>
            ) : (
              restrictedUsers.map((userAccount) => (
                <UserCard
                  key={userAccount.id}
                  user={userAccount}
                  actions={
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleUnrestrict(userAccount.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Unrestrict
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(userAccount.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </>
                  }
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
