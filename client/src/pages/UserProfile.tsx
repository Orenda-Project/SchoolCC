import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Edit, Save, X, User, ArrowLeft, School, Camera, Users, Search, Check, Trash2, GraduationCap, BookOpen, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { analytics } from '@/lib/analytics';
import { ProfilePictureEditor } from "@/components/ProfilePictureEditor";

interface AEOUser {
  id: string;
  name: string;
  phoneNumber: string;
  markazName?: string;
  markazId?: string;
}

interface StaffMember {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  schoolName?: string;
  schoolId?: string;
}

interface HierarchySchool {
  id: string;
  name: string;
  emisNumber: string;
  markazId?: string;
  address?: string;
  principals: StaffMember[];
  teachers: StaffMember[];
}

interface HierarchyEntry {
  aeo: AEOUser;
  markaz: string;
  schools: HierarchySchool[];
}

interface UserProfile {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  schoolId?: string;
  schoolName?: string;
  clusterId?: string;
  districtId?: string;
  fatherName?: string;
  email?: string;
  residentialAddress?: string;
  cnic?: string;
  dateOfBirth?: string;
  dateOfJoining?: string;
  qualification?: string;
  profilePicture?: string;
  assignedSchools?: string[];
  assignedAEOs?: string[];
  markaz?: string;
}

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [availableSchools, setAvailableSchools] = useState<Array<{ id: string; name: string; emisNumber?: string }>>([]);
  const [showPictureEditor, setShowPictureEditor] = useState(false);
  const [availableAEOs, setAvailableAEOs] = useState<AEOUser[]>([]);
  const [editedAEOs, setEditedAEOs] = useState<string[]>([]);
  const [aeoSearchQuery, setAeoSearchQuery] = useState("");
  const [savingAEOs, setSavingAEOs] = useState(false);
  const [aeoEditMode, setAeoEditMode] = useState(false);
  const [hierarchyData, setHierarchyData] = useState<HierarchyEntry[]>([]);
  const [hierarchyLoading, setHierarchyLoading] = useState(false);
  const [aeoStaffData, setAeoStaffData] = useState<{ schools: HierarchySchool[]; headTeachers: StaffMember[]; teachers: StaffMember[] } | null>(null);

  useEffect(() => {
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "Please log in again to view your profile",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    fetchProfile();
    analytics.navigation.profileViewed();

    if (user?.role === 'AEO') {
      fetchAvailableSchools();
      fetchAEOStaffData(user.id);
    }

    if (user?.role === 'TRAINING_MANAGER') {
      fetchAvailableAEOs();
      fetchHierarchy(user.id);
    }
  }, [user?.id]);

  const fetchAvailableAEOs = async () => {
    try {
      const response = await fetch("/api/training-manager/aeos");
      if (response.ok) {
        const aeos = await response.json();
        if (Array.isArray(aeos)) {
          setAvailableAEOs(aeos.filter((a: AEOUser) => a.id));
        }
      }
    } catch (error) {
      console.error("Error fetching AEOs:", error);
    }
  };

  const fetchHierarchy = async (userId: string) => {
    setHierarchyLoading(true);
    try {
      const response = await fetch(`/api/training-manager/${userId}/hierarchy`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setHierarchyData(data);
        }
      }
    } catch (error) {
      console.error("Error fetching hierarchy:", error);
    } finally {
      setHierarchyLoading(false);
    }
  };

  const fetchAEOStaffData = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) return;
      const aeoUser = await response.json();
      const assignedSchoolIds = aeoUser.assignedSchools || [];
      if (assignedSchoolIds.length === 0) {
        setAeoStaffData({ schools: [], headTeachers: [], teachers: [] });
        return;
      }

      const schoolsRes = await fetch("/api/admin/schools");
      if (!schoolsRes.ok) return;
      const allSchools = await schoolsRes.json();

      const matchedSchools = allSchools.filter((s: any) =>
        assignedSchoolIds.some((assigned: string) => 
          assigned === s.id || 
          assigned.toUpperCase() === (s.name || '').toUpperCase() ||
          (s.emisNumber && assigned.includes(s.emisNumber))
        )
      );

      const usersRes = await fetch("/api/users?role=HEAD_TEACHER,TEACHER");
      let allStaff: any[] = [];
      if (usersRes.ok) {
        allStaff = await usersRes.json();
        if (!Array.isArray(allStaff)) allStaff = [];
      }

      const schoolIds = matchedSchools.map((s: any) => s.id);
      const headTeachers = allStaff.filter((u: any) => u.role === "HEAD_TEACHER" && schoolIds.includes(u.schoolId));
      const teachers = allStaff.filter((u: any) => u.role === "TEACHER" && schoolIds.includes(u.schoolId));

      setAeoStaffData({
        schools: matchedSchools.map((s: any) => ({ ...s, principals: [], teachers: [] })),
        headTeachers: headTeachers.map((u: any) => ({ id: u.id, name: u.name, phoneNumber: u.phoneNumber, role: u.role, schoolName: u.schoolName, schoolId: u.schoolId })),
        teachers: teachers.map((u: any) => ({ id: u.id, name: u.name, phoneNumber: u.phoneNumber, role: u.role, schoolName: u.schoolName, schoolId: u.schoolId })),
      });
    } catch (error) {
      console.error("Error fetching AEO staff data:", error);
    }
  };

  const fetchAvailableSchools = async () => {
    try {
      const response = await fetch("/api/admin/schools");
      if (response.ok) {
        const schools = await response.json();
        setAvailableSchools(schools.map((s: any) => ({ id: s.id, name: s.name, emisNumber: s.emisNumber })));
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const fetchProfile = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/users/${user.id}`);
      if (!response.ok) {
        // If API fails, use user data from auth context as fallback
        if (user) {
          const contextProfile: UserProfile = {
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            role: user.role,
            schoolId: user.schoolId,
            schoolName: user.schoolName,
            clusterId: user.clusterId,
            districtId: user.districtId,
            fatherName: user.fatherName,
            email: user.email,
            residentialAddress: user.residentialAddress,
            cnic: user.cnic,
            dateOfBirth: user.dateOfBirth,
            dateOfJoining: user.dateOfJoining,
            qualification: user.qualification,
            profilePicture: user.profilePicture,
            assignedSchools: user.assignedSchools,
            assignedAEOs: user.assignedAEOs,
          };
          setProfile(contextProfile);
          setEditedProfile(contextProfile);
          return;
        }
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
      setEditedProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (user) {
        const contextProfile: UserProfile = {
          id: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          role: user.role,
          schoolId: user.schoolId,
          schoolName: user.schoolName,
          clusterId: user.clusterId,
          districtId: user.districtId,
          fatherName: user.fatherName,
          email: user.email,
          residentialAddress: user.residentialAddress,
          cnic: user.cnic,
          dateOfBirth: user.dateOfBirth,
          dateOfJoining: user.dateOfJoining,
          qualification: user.qualification,
          profilePicture: user.profilePicture,
          assignedSchools: user.assignedSchools,
          assignedAEOs: user.assignedAEOs,
        };
        setProfile(contextProfile);
        setEditedProfile(contextProfile);
      } else {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Use profile ID first (from API), fall back to phone number, then user.id
    const saveId = profile?.id || user?.phoneNumber || user?.id;
    if (!saveId) return;

    try {
      setSaving(true);
      console.log("Saving profile with ID:", saveId, "data:", editedProfile);
      const response = await fetch(`/api/users/${saveId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      
      // Sync profile picture and other fields to auth context so they appear everywhere
      updateUser({
        profilePicture: updatedProfile.profilePicture,
        name: updatedProfile.name,
        fatherName: updatedProfile.fatherName,
        email: updatedProfile.email,
        residentialAddress: updatedProfile.residentialAddress,
        cnic: updatedProfile.cnic,
        dateOfBirth: updatedProfile.dateOfBirth,
        dateOfJoining: updatedProfile.dateOfJoining,
        qualification: updatedProfile.qualification,
        assignedSchools: updatedProfile.assignedSchools,
      });
      
      setEditMode(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile || {});
    setEditMode(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSchool = (schoolName: string) => {
    setEditedProfile((prev) => {
      const current = prev.assignedSchools || [];
      const exists = current.some(s => s.toUpperCase() === schoolName.toUpperCase());
      const updated = exists
        ? current.filter(s => s.toUpperCase() !== schoolName.toUpperCase())
        : [...current, schoolName];
      return { ...prev, assignedSchools: updated };
    });
  };

  const handleStartAEOEdit = () => {
    setEditedAEOs(profile?.assignedAEOs || []);
    setAeoSearchQuery("");
    setAeoEditMode(true);
  };

  const handleCancelAEOEdit = () => {
    setEditedAEOs([]);
    setAeoSearchQuery("");
    setAeoEditMode(false);
  };

  const toggleAEO = (aeoId: string) => {
    setEditedAEOs((prev) =>
      prev.includes(aeoId) ? prev.filter((id) => id !== aeoId) : [...prev, aeoId]
    );
  };

  const removeAEO = (aeoId: string) => {
    setEditedAEOs((prev) => prev.filter((id) => id !== aeoId));
  };

  const handleSaveAEOs = async () => {
    if (!user?.id) return;

    setSavingAEOs(true);
    try {
      const response = await fetch(`/api/training-manager/${user.id}/assigned-aeos`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedAEOs: editedAEOs }),
      });

      if (!response.ok) {
        throw new Error("Failed to update AEOs");
      }

      const updatedUser = await response.json();
      const newAEOs = updatedUser.assignedAEOs || editedAEOs;
      updateUser({ assignedAEOs: newAEOs });
      setProfile((prev) => prev ? { ...prev, assignedAEOs: newAEOs } : prev);
      setAeoEditMode(false);
      if (user?.id) fetchHierarchy(user.id);
      toast({
        title: "Success",
        description: `Updated AEO assignments (${newAEOs.length} AEO${newAEOs.length !== 1 ? "s" : ""})`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update AEO assignments",
        variant: "destructive",
      });
    } finally {
      setSavingAEOs(false);
    }
  };

  const filteredAvailableAEOs = availableAEOs.filter(
    (aeo) =>
      aeo.name.toLowerCase().includes(aeoSearchQuery.toLowerCase()) ||
      (aeo.markazName || "").toLowerCase().includes(aeoSearchQuery.toLowerCase()) ||
      aeo.phoneNumber.includes(aeoSearchQuery)
  );

  const tmLinkedSchools = hierarchyData.flatMap((entry) =>
    entry.schools.map((s) => ({ ...s, aeoName: entry.aeo.name, markaz: entry.markaz }))
  );
  const tmHeadTeachers = hierarchyData.flatMap((entry) =>
    entry.schools.flatMap((s) =>
      s.principals.map((p) => ({ ...p, schoolName: s.name, aeoName: entry.aeo.name }))
    )
  );
  const tmTeachers = hierarchyData.flatMap((entry) =>
    entry.schools.flatMap((s) =>
      s.teachers.map((t) => ({ ...t, schoolName: s.name, aeoName: entry.aeo.name }))
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate('/dashboard')}
        className="mb-4"
        data-testid="button-back"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className={`relative h-16 w-16 shrink-0 rounded-full bg-primary/10 flex items-center justify-center ${editMode ? 'cursor-pointer group' : ''}`}
                onClick={() => editMode && setShowPictureEditor(true)}
                data-testid="button-change-profile-picture"
              >
                {(editedProfile.profilePicture || profile.profilePicture) ? (
                  <img
                    src={editedProfile.profilePicture || profile.profilePicture}
                    alt={profile.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-primary" />
                )}
                {editMode && (
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl truncate">{profile.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
                {editMode && (
                  <button 
                    onClick={() => setShowPictureEditor(true)}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    Change photo
                  </button>
                )}
              </div>
            </div>
            {!editMode ? (
              <Button onClick={() => setEditMode(true)} className="w-full sm:w-auto">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 sm:flex-none"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving} className="flex-1 sm:flex-none">
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                {editMode ? (
                  <Input
                    value={editedProfile.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm">{profile.name}</p>
                )}
              </div>

              <div>
                <Label>Father Name</Label>
                {editMode ? (
                  <Input
                    value={editedProfile.fatherName || ""}
                    onChange={(e) => handleChange("fatherName", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm">{profile.fatherName || "Not provided"}</p>
                )}
              </div>

              <div>
                <Label>CNIC</Label>
                {editMode ? (
                  <Input
                    value={editedProfile.cnic || ""}
                    onChange={(e) => handleChange("cnic", e.target.value)}
                    placeholder="XXXXX-XXXXXXX-X"
                  />
                ) : (
                  <p className="mt-1 text-sm">{profile.cnic || "Not provided"}</p>
                )}
              </div>

              <div>
                <Label>Date of Birth</Label>
                {editMode ? (
                  <Input
                    type="date"
                    value={editedProfile.dateOfBirth || ""}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {profile.dateOfBirth
                      ? new Date(profile.dateOfBirth).toLocaleDateString()
                      : "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <Label>Date of Joining</Label>
                {editMode ? (
                  <Input
                    type="date"
                    value={editedProfile.dateOfJoining || ""}
                    onChange={(e) => handleChange("dateOfJoining", e.target.value)}
                    className="cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {profile.dateOfJoining
                      ? new Date(profile.dateOfJoining).toLocaleDateString()
                      : "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                {editMode && profile.role === 'DEO' ? (
                  <Input
                    type="tel"
                    data-testid="input-phone-number"
                    value={editedProfile.phoneNumber || ""}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="mt-1 text-sm" data-testid="text-phone-number">{profile.phoneNumber}</p>
                )}
              </div>

              <div>
                <Label>Email</Label>
                {editMode ? (
                  <Input
                    type="email"
                    value={editedProfile.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm">{profile.email || "Not provided"}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label>Residential Address</Label>
                {editMode ? (
                  <Textarea
                    value={editedProfile.residentialAddress || ""}
                    onChange={(e) => handleChange("residentialAddress", e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {profile.residentialAddress || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Role</Label>
                <p className="mt-1 text-sm">{profile.role}</p>
              </div>

              <div>
                <Label>Qualification</Label>
                {editMode ? (
                  <Input
                    value={editedProfile.qualification || ""}
                    onChange={(e) => handleChange("qualification", e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm">{profile.qualification || "Not provided"}</p>
                )}
              </div>

              {profile.schoolName && (
                <div>
                  <Label>School</Label>
                  <p className="mt-1 text-sm">{profile.schoolName}</p>
                </div>
              )}

              {profile.districtId && (
                <div>
                  <Label>District</Label>
                  <p className="mt-1 text-sm">{profile.districtId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Training Manager AEO Management */}
          {profile.role === 'TRAINING_MANAGER' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Managed AEOs
                </h3>
                {!aeoEditMode ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartAEOEdit}
                    data-testid="button-edit-aeos"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Manage AEOs
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelAEOEdit}
                      disabled={savingAEOs}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveAEOs}
                      disabled={savingAEOs || editedAEOs.length === 0}
                      data-testid="button-save-aeos-profile"
                    >
                      {savingAEOs ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Save
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Select the AEOs you oversee. Their schools, principals, and teachers will be linked to your account.
              </p>

              {aeoEditMode ? (
                <div className="space-y-3">
                  {editedAEOs.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Currently Selected ({editedAEOs.length})
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {editedAEOs.map((aeoId) => {
                          const aeo = availableAEOs.find((a) => a.id === aeoId);
                          return (
                            <div
                              key={aeoId}
                              className="flex items-center justify-between p-2.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg"
                              data-testid={`selected-aeo-${aeoId}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                                  <User className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {aeo?.name || "Unknown AEO"}
                                  </p>
                                  {aeo?.markazName && (
                                    <p className="text-xs text-muted-foreground truncate">
                                      {aeo.markazName}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => removeAEO(aeoId)}
                                className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-muted-foreground hover:text-red-600 transition-colors shrink-0"
                                data-testid={`button-remove-aeo-${aeoId}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search AEOs by name, markaz, or phone..."
                      value={aeoSearchQuery}
                      onChange={(e) => setAeoSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      data-testid="input-aeo-search-profile"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto border rounded-lg p-3">
                    {filteredAvailableAEOs.length === 0 ? (
                      <p className="text-sm text-muted-foreground col-span-2 text-center py-4">
                        {aeoSearchQuery ? "No AEOs match your search" : "No AEOs available"}
                      </p>
                    ) : (
                      filteredAvailableAEOs.map((aeo) => {
                        const isSelected = editedAEOs.includes(aeo.id);
                        return (
                          <button
                            key={aeo.id}
                            onClick={() => toggleAEO(aeo.id)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all duration-150 ${
                              isSelected
                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                : "border-border hover:border-primary/30 hover:bg-muted/50"
                            }`}
                            data-testid={`aeo-profile-option-${aeo.id}`}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground/30"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium truncate">{aeo.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {aeo.markazName || aeo.phoneNumber}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {editedAEOs.length} AEO{editedAEOs.length !== 1 ? "s" : ""} selected
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {profile.assignedAEOs && profile.assignedAEOs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {profile.assignedAEOs.map((aeoId) => {
                        const aeo = availableAEOs.find((a) => a.id === aeoId);
                        return (
                          <div
                            key={aeoId}
                            className="flex items-center gap-2 p-2.5 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                            data-testid={`assigned-aeo-${aeoId}`}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">
                                {aeo?.name || "Loading..."}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {aeo?.markazName || aeo?.phoneNumber || ""}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No AEOs assigned. Click "Manage AEOs" to select AEOs.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Training Manager: Linked Schools */}
          {profile.role === 'TRAINING_MANAGER' && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <School className="w-5 h-5" />
                Linked Schools
                <span className="text-sm font-normal text-muted-foreground">({tmLinkedSchools.length})</span>
              </h3>
              {hierarchyLoading ? (
                <div className="flex items-center gap-2 py-4 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading schools...</span>
                </div>
              ) : tmLinkedSchools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                  {tmLinkedSchools.map((school, idx) => (
                    <div
                      key={school.id || idx}
                      className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                      data-testid={`tm-school-${school.id}`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                        <School className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{school.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          EMIS: {school.emisNumber} | AEO: {school.aeoName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic py-2">
                  No schools linked. Assign AEOs to see their schools here.
                </p>
              )}
            </div>
          )}

          {/* Training Manager: Head Teachers */}
          {profile.role === 'TRAINING_MANAGER' && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5" />
                Head Teachers
                <span className="text-sm font-normal text-muted-foreground">({tmHeadTeachers.length})</span>
              </h3>
              {hierarchyLoading ? (
                <div className="flex items-center gap-2 py-4 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading head teachers...</span>
                </div>
              ) : tmHeadTeachers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                  {tmHeadTeachers.map((ht, idx) => (
                    <div
                      key={ht.id || idx}
                      className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                      data-testid={`tm-headteacher-${ht.id}`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{ht.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {ht.schoolName || "Unknown School"}
                        </p>
                        {ht.phoneNumber && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {ht.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic py-2">
                  No head teachers found at linked schools.
                </p>
              )}
            </div>
          )}

          {/* Training Manager: Teachers */}
          {profile.role === 'TRAINING_MANAGER' && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5" />
                Teachers
                <span className="text-sm font-normal text-muted-foreground">({tmTeachers.length})</span>
              </h3>
              {hierarchyLoading ? (
                <div className="flex items-center gap-2 py-4 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading teachers...</span>
                </div>
              ) : tmTeachers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                  {tmTeachers.map((t, idx) => (
                    <div
                      key={t.id || idx}
                      className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                      data-testid={`tm-teacher-${t.id}`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {t.schoolName || "Unknown School"}
                        </p>
                        {t.phoneNumber && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {t.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic py-2">
                  No teachers found at linked schools.
                </p>
              )}
            </div>
          )}

          {/* AEO Staff Overview */}
          {profile.role === 'AEO' && aeoStaffData && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <School className="w-5 h-5" />
                  My Schools
                  <span className="text-sm font-normal text-muted-foreground">({aeoStaffData.schools.length})</span>
                </h3>
                {aeoStaffData.schools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aeoStaffData.schools.map((school, idx) => (
                      <div
                        key={school.id || idx}
                        className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                        data-testid={`aeo-school-${school.id}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shrink-0">
                          <School className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{school.name}</p>
                          <p className="text-xs text-muted-foreground truncate">EMIS: {school.emisNumber}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic py-2">No schools assigned yet.</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5" />
                  Head Teachers
                  <span className="text-sm font-normal text-muted-foreground">({aeoStaffData.headTeachers.length})</span>
                </h3>
                {aeoStaffData.headTeachers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aeoStaffData.headTeachers.map((ht, idx) => (
                      <div
                        key={ht.id || idx}
                        className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                        data-testid={`aeo-headteacher-${ht.id}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{ht.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{ht.schoolName || "Unknown School"}</p>
                          {ht.phoneNumber && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" /> {ht.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic py-2">No head teachers found at your schools.</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5" />
                  Teachers
                  <span className="text-sm font-normal text-muted-foreground">({aeoStaffData.teachers.length})</span>
                </h3>
                {aeoStaffData.teachers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aeoStaffData.teachers.map((t, idx) => (
                      <div
                        key={t.id || idx}
                        className="flex items-center gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg border border-border"
                        data-testid={`aeo-teacher-${t.id}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{t.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{t.schoolName || "Unknown School"}</p>
                          {t.phoneNumber && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" /> {t.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic py-2">No teachers found at your schools.</p>
                )}
              </div>
            </div>
          )}

          {/* AEO School Selection - Only for AEO users */}
          {profile.role === 'AEO' && (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <School className="w-5 h-5" />
                Assigned Schools
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select schools you want to monitor. Data will be filtered to show only selected schools.
              </p>
              {editMode ? (
                availableSchools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto border rounded-lg p-4">
                    {availableSchools.map((school) => {
                      const isChecked = editedProfile.assignedSchools?.some(
                        s => s.toUpperCase() === school.name.toUpperCase()
                      ) || false;
                      return (
                        <div key={school.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                          <Checkbox
                            id={`school-${school.id}`}
                            checked={isChecked}
                            onCheckedChange={() => toggleSchool(school.name)}
                          />
                          <label
                            htmlFor={`school-${school.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {school.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Loading schools...</p>
                )
              ) : (
                <div className="space-y-2">
                  {profile.assignedSchools && profile.assignedSchools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {profile.assignedSchools.map((schoolName, idx) => {
                        const school = availableSchools.find(s => s.name.toUpperCase() === schoolName.toUpperCase());
                        const displayName = school ? school.name : schoolName;
                        return (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <School className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{displayName}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No schools assigned. Click Edit Profile to select schools.
                    </p>
                  )}
                </div>
              )}
              {editMode && (
                <p className="text-xs text-muted-foreground mt-2">
                  Selected {editedProfile.assignedSchools?.length || 0} out of {availableSchools.length} schools
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <ProfilePictureEditor
        open={showPictureEditor}
        currentImage={editedProfile.profilePicture || profile.profilePicture}
        onSave={(imageDataUrl) => {
          setEditedProfile(prev => ({ ...prev, profilePicture: imageDataUrl }));
          setShowPictureEditor(false);
          toast({
            title: "Photo updated",
            description: "Click Save to apply your changes",
          });
        }}
        onCancel={() => setShowPictureEditor(false)}
      />
    </div>
  );
}
