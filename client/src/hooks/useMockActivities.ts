import { useState, useCallback } from 'react';

export interface ActivityComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  text: string;
  timestamp: Date;
}

export interface ActivityReaction {
  id: string;
  type: 'like' | 'love' | 'clap' | 'celebrate';
  userId: string;
  userName: string;
}

export interface Activity {
  id: string;
  schoolId: string;
  schoolName: string;
  createdBy: string;
  createdByName: string;
  createdByRole: string;
  title: string;
  description: string;
  photos: { id: string; url: string; caption: string }[];
  comments: ActivityComment[];
  reactions: ActivityReaction[];
  createdAt: Date;
  updatedAt: Date;
}

const mockActivities: Activity[] = [
  {
    id: 'act-1',
    schoolId: 'school-1',
    schoolName: 'Demo School',
    createdBy: 'teacher-1',
    createdByName: 'Teacher 1',
    createdByRole: 'TEACHER',
    title: 'Science Fair - Interactive Learning',
    description: 'Our students participated in an amazing science fair where they learned about renewable energy and created working models. Great enthusiasm and learning outcomes!',
    photos: [
      { id: 'p-1', url: 'photo1.jpg', caption: 'Students presenting renewable energy projects' },
      { id: 'p-2', url: 'photo2.jpg', caption: 'Solar panel demonstration' },
      { id: 'p-3', url: 'photo3.jpg', caption: 'Interactive learning session' },
    ],
    comments: [
      {
        id: 'c-1',
        authorId: 'aeo-1',
        authorName: 'AEO User',
        authorRole: 'AEO',
        text: 'Excellent initiative! Great to see students so engaged in learning.',
        timestamp: new Date(Date.now() - 86400000),
      },
    ],
    reactions: [
      { id: 'r-1', type: 'love', userId: 'aeo-1', userName: 'AEO User' },
      { id: 'r-2', type: 'clap', userId: 'head-1', userName: 'Head Teacher' },
    ],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
  {
    id: 'act-2',
    schoolId: 'school-1',
    schoolName: 'Demo School',
    createdBy: 'teacher-2',
    createdByName: 'Teacher 2',
    createdByRole: 'TEACHER',
    title: 'Sports Day Celebrations',
    description: 'Amazing sports day with students showing great sportsmanship and team spirit. Various competitions were held.',
    photos: [
      { id: 'p-4', url: 'photo4.jpg', caption: '100m race finals' },
      { id: 'p-5', url: 'photo5.jpg', caption: 'Relay race action' },
    ],
    comments: [],
    reactions: [
      { id: 'r-3', type: 'celebrate', userId: 'head-1', userName: 'Head Teacher' },
    ],
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
  },
];

export function useMockActivities() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const getActivitiesForSchool = useCallback(
    (schoolId: string) => {
      return activities.filter((a) => a.schoolId === schoolId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    [activities]
  );

  const getActivity = useCallback(
    (activityId: string) => {
      return activities.find((a) => a.id === activityId);
    },
    [activities]
  );

  const createActivity = useCallback(
    (
      schoolId: string,
      schoolName: string,
      title: string,
      description: string,
      photos: { id: string; url: string; caption: string }[],
      userId: string,
      userName: string,
      userRole: string
    ): Activity => {
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        schoolId,
        schoolName,
        createdBy: userId,
        createdByName: userName,
        createdByRole: userRole,
        title,
        description,
        photos,
        comments: [],
        reactions: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setActivities((prev) => [newActivity, ...prev]);
      return newActivity;
    },
    []
  );

  const addComment = useCallback(
    (activityId: string, text: string, userId: string, userName: string, userRole: string) => {
      setActivities((prev) =>
        prev.map((a) =>
          a.id === activityId
            ? {
                ...a,
                comments: [
                  ...a.comments,
                  {
                    id: `c-${Date.now()}`,
                    authorId: userId,
                    authorName: userName,
                    authorRole: userRole,
                    text,
                    timestamp: new Date(),
                  },
                ],
                updatedAt: new Date(),
              }
            : a
        )
      );
    },
    []
  );

  const addReaction = useCallback(
    (activityId: string, type: 'like' | 'love' | 'clap' | 'celebrate', userId: string, userName: string) => {
      setActivities((prev) =>
        prev.map((a) => {
          if (a.id === activityId) {
            const existingReaction = a.reactions.find((r) => r.userId === userId);
            if (existingReaction) {
              return {
                ...a,
                reactions: a.reactions.map((r) => (r.userId === userId ? { ...r, type } : r)),
                updatedAt: new Date(),
              };
            } else {
              return {
                ...a,
                reactions: [...a.reactions, { id: `r-${Date.now()}`, type, userId, userName }],
                updatedAt: new Date(),
              };
            }
          }
          return a;
        })
      );
    },
    []
  );

  const removeReaction = useCallback((activityId: string, userId: string) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId
          ? {
              ...a,
              reactions: a.reactions.filter((r) => r.userId !== userId),
              updatedAt: new Date(),
            }
          : a
      )
    );
  }, []);

  return {
    activities,
    getActivitiesForSchool,
    getActivity,
    createActivity,
    addComment,
    addReaction,
    removeReaction,
  };
}
