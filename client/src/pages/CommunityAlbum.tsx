import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMockActivities, Activity } from '@/hooks/useMockActivities';
import { useLocation } from 'wouter';
import { ArrowLeft, Plus, MessageCircle, Download, Archive, School, User } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { analytics } from '@/lib/analytics';

export default function CommunityAlbum() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { activities, addComment, addReaction, removeReaction } = useMockActivities();
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [userReactions, setUserReactions] = useState<Record<string, string>>({});

  if (!user) {
    return null;
  }

  const allActivities = [...activities].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleAddComment = (activityId: string) => {
    if (!commentText.trim()) return;
    addComment(activityId, commentText, user.id, user.name, user.role);
    analytics.album.commentAdded(activityId);
    setCommentText('');
  };

  const handleReaction = (activityId: string, type: 'like' | 'love' | 'clap' | 'celebrate') => {
    const key = `${activityId}-${user.id}`;
    if (userReactions[key] === type) {
      removeReaction(activityId, user.id);
      analytics.album.reactionRemoved(activityId, type);
      setUserReactions((prev) => {
        const newReactions = { ...prev };
        delete newReactions[key];
        return newReactions;
      });
    } else {
      addReaction(activityId, type, user.id, user.name);
      analytics.album.reactionAdded(activityId, type);
      setUserReactions((prev) => ({ ...prev, [key]: type }));
    }
  };

  const downloadMiniAlbum = async (activity: Activity) => {
    const zip = new JSZip();
    const folder = zip.folder(activity.title.substring(0, 30));

    const metadata = `Title: ${activity.title}\nDate: ${activity.createdAt.toLocaleDateString()}\nCreated By: ${activity.createdByName} (${activity.createdByRole.replace(/_/g, ' ')})\nSchool: ${activity.schoolName}\nDescription: ${activity.description}\n\nPhotos: ${activity.photos.length}`;
    folder?.file('README.txt', metadata);

    activity.photos.forEach((photo, index) => {
      const photoInfo = `Photo ${index + 1}\nCaption: ${photo.caption}\nURL: ${photo.url}`;
      folder?.file(`photo_${index + 1}_${photo.caption.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.txt`, photoInfo);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `Community_${activity.title.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.zip`);
    analytics.report.zipDownloaded('mini_album', activity.photos.length);
  };

  const downloadFullAlbum = async () => {
    const zip = new JSZip();

    const albumInfo = `TaleemHub Community Album\nTotal Activities: ${allActivities.length}\nDownloaded: ${new Date().toLocaleString()}`;
    zip.file('Community_Album_Info.txt', albumInfo);

    allActivities.forEach((activity, idx) => {
      const activityFolder = zip.folder(`${idx + 1}_${activity.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}`);

      const metadata = `Title: ${activity.title}\nSchool: ${activity.schoolName}\nDate: ${activity.createdAt.toLocaleDateString()}\nCreated By: ${activity.createdByName} (${activity.createdByRole.replace(/_/g, ' ')})\nDescription: ${activity.description}\n\nComments: ${activity.comments.length}\nReactions: ${activity.reactions.length}`;
      activityFolder?.file('Activity_Info.txt', metadata);

      activity.photos.forEach((photo, photoIdx) => {
        const photoInfo = `Photo ${photoIdx + 1}\nCaption: ${photo.caption}\nURL: ${photo.url}`;
        activityFolder?.file(`${photoIdx + 1}_${photo.caption.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.txt`, photoInfo);
      });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `TaleemHub_Community_Album_${new Date().toISOString().split('T')[0]}.zip`);
    analytics.report.zipDownloaded('full_album', allActivities.length);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'CEO': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'DEO': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'DDEO': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'AEO': return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300';
      case 'HEAD_TEACHER': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'TEACHER': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-foreground">Community Album</h1>
              <p className="text-sm text-muted-foreground">See activities from all schools</p>
            </div>
          </div>
          <div className="flex gap-2">
            {allActivities.length > 0 && (
              <Button
                variant="outline"
                onClick={downloadFullAlbum}
                data-testid="button-download-full-album"
              >
                <Archive className="w-4 h-4 mr-2" />
                Download All
              </Button>
            )}
            {(user.role === 'TEACHER' || user.role === 'HEAD_TEACHER') && user.schoolId && (
              <Button
                onClick={() => navigate(`/create-activity/${user.schoolId}`)}
                data-testid="button-create-activity"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {allActivities.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No activities yet in the community</p>
            {(user.role === 'TEACHER' || user.role === 'HEAD_TEACHER') && user.schoolId && (
              <Button onClick={() => navigate(`/create-activity/${user.schoolId}`)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-6">
            {allActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-foreground">{activity.createdByName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRoleBadgeColor(activity.createdByRole)}`}>
                            {activity.createdByRole.replace(/_/g, ' ')}
                          </span>
                        </div>
                        {(activity.createdByRole === 'TEACHER' || activity.createdByRole === 'HEAD_TEACHER') && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <School className="w-3 h-3" />
                            <span>{activity.schoolName}</span>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.createdAt.toLocaleDateString()} at {activity.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadMiniAlbum(activity)}
                      data-testid={`button-download-activity-${activity.id}`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mt-4">{activity.title}</h2>
                  <p className="text-foreground mt-2">{activity.description}</p>
                </div>

                {activity.photos.length > 0 && (
                  <div className="p-6 border-b border-border">
                    <div className="grid grid-cols-2 gap-4">
                      {activity.photos.map((photo) => (
                        <div key={photo.id} className="bg-muted/20 rounded-lg p-4 text-center">
                          <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-md flex items-center justify-center mb-2">
                            <span className="text-4xl">📸</span>
                          </div>
                          <p className="text-sm font-medium text-foreground">{photo.caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-6 py-3 border-b border-border flex gap-4">
                  {(['like', 'love', 'clap', 'celebrate'] as const).map((type) => (
                    <Button
                      key={type}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction(activity.id, type)}
                      className={userReactions[`${activity.id}-${user.id}`] === type ? 'bg-primary/10' : ''}
                      data-testid={`button-reaction-${type}-${activity.id}`}
                    >
                      {type === 'like' && '👍'}
                      {type === 'love' && '❤️'}
                      {type === 'clap' && '👏'}
                      {type === 'celebrate' && '🎉'}
                      {activity.reactions.filter((r) => r.type === type).length > 0 && (
                        <span className="ml-2 text-xs">{activity.reactions.filter((r) => r.type === type).length}</span>
                      )}
                    </Button>
                  ))}
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {activity.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-foreground">{comment.authorName}</p>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getRoleBadgeColor(comment.authorRole)}`}>
                              {comment.authorRole.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{comment.timestamp.toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm text-foreground">{comment.text}</p>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        value={expandedActivity === activity.id ? commentText : ''}
                        onChange={(e) => {
                          setExpandedActivity(activity.id);
                          setCommentText(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(activity.id);
                          }
                        }}
                        data-testid={`input-comment-${activity.id}`}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddComment(activity.id)}
                        disabled={!commentText.trim()}
                        data-testid={`button-add-comment-${activity.id}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
