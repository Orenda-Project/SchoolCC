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
    schoolName: 'Government Primary School, Zone A',
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
    schoolName: 'Government Primary School, Zone A',
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
  {
    id: 'act-3',
    schoolId: 'school-1',
    schoolName: 'Government Primary School, Zone A',
    createdBy: 'teacher-1',
    createdByName: 'Teacher 1',
    createdByRole: 'TEACHER',
    title: 'Tree Plantation Drive',
    description: 'Students and staff came together for a tree plantation drive. Over 50 saplings were planted in the school premises. Students learned about environmental conservation.',
    photos: [
      { id: 'p-6', url: 'photo6.jpg', caption: 'Students planting saplings' },
      { id: 'p-7', url: 'photo7.jpg', caption: 'Group photo with planted trees' },
    ],
    comments: [
      {
        id: 'c-2',
        authorId: 'deo-1',
        authorName: 'DEO User',
        authorRole: 'DEO',
        text: 'This is exactly the kind of initiative we need! Well done team.',
        timestamp: new Date(Date.now() - 43200000),
      },
    ],
    reactions: [
      { id: 'r-4', type: 'love', userId: 'deo-1', userName: 'DEO User' },
      { id: 'r-5', type: 'clap', userId: 'aeo-1', userName: 'AEO User' },
      { id: 'r-6', type: 'celebrate', userId: 'ceo-1', userName: 'CEO User' },
    ],
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 345600000),
  },
  {
    id: 'act-4',
    schoolId: 'school-2',
    schoolName: 'Government Upper Primary School',
    createdBy: 'teacher-3',
    createdByName: 'Teacher 3',
    createdByRole: 'TEACHER',
    title: 'Annual Function 2024',
    description: 'Our annual function was a grand success! Students performed various cultural programs including traditional dances, poetry recitation, and drama. Parents and community members attended in large numbers.',
    photos: [
      { id: 'p-8', url: 'photo8.jpg', caption: 'Cultural dance performance' },
      { id: 'p-9', url: 'photo9.jpg', caption: 'Poetry recitation by students' },
      { id: 'p-10', url: 'photo10.jpg', caption: 'Prize distribution ceremony' },
    ],
    comments: [
      {
        id: 'c-3',
        authorId: 'ddeo-1',
        authorName: 'DDEO User',
        authorRole: 'DDEO',
        text: 'Wonderful event! Great job organizing such a comprehensive program.',
        timestamp: new Date(Date.now() - 129600000),
      },
    ],
    reactions: [
      { id: 'r-7', type: 'celebrate', userId: 'ddeo-1', userName: 'DDEO User' },
      { id: 'r-8', type: 'love', userId: 'aeo-1', userName: 'AEO User' },
    ],
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 432000000),
  },
  {
    id: 'act-5',
    schoolId: 'school-2',
    schoolName: 'Government Upper Primary School',
    createdBy: 'teacher-4',
    createdByName: 'Teacher 4',
    createdByRole: 'TEACHER',
    title: 'Computer Lab Inauguration',
    description: 'New computer lab with 20 computers has been inaugurated. Students are now learning basic computing skills and coding. This will greatly enhance their digital literacy.',
    photos: [
      { id: 'p-11', url: 'photo11.jpg', caption: 'Students in the new computer lab' },
      { id: 'p-12', url: 'photo12.jpg', caption: 'First coding session' },
    ],
    comments: [
      {
        id: 'c-4',
        authorId: 'ceo-1',
        authorName: 'CEO User',
        authorRole: 'CEO',
        text: 'Excellent progress! Digital education is the future.',
        timestamp: new Date(Date.now() - 216000000),
      },
      {
        id: 'c-5',
        authorId: 'deo-1',
        authorName: 'DEO User',
        authorRole: 'DEO',
        text: 'Great investment in student development!',
        timestamp: new Date(Date.now() - 215000000),
      },
    ],
    reactions: [
      { id: 'r-9', type: 'celebrate', userId: 'ceo-1', userName: 'CEO User' },
      { id: 'r-10', type: 'love', userId: 'deo-1', userName: 'DEO User' },
      { id: 'r-11', type: 'clap', userId: 'ddeo-1', userName: 'DDEO User' },
    ],
    createdAt: new Date(Date.now() - 518400000),
    updatedAt: new Date(Date.now() - 518400000),
  },
  {
    id: 'act-6',
    schoolId: 'school-3',
    schoolName: 'Government Secondary School',
    createdBy: 'teacher-5',
    createdByName: 'Teacher 5',
    createdByRole: 'TEACHER',
    title: 'Mathematics Olympiad Winners',
    description: 'Our students won first and second prizes in the district level Mathematics Olympiad! Hard work and dedication of both students and teachers paid off.',
    photos: [
      { id: 'p-13', url: 'photo13.jpg', caption: 'Winners with their trophies' },
      { id: 'p-14', url: 'photo14.jpg', caption: 'Award ceremony moment' },
    ],
    comments: [
      {
        id: 'c-6',
        authorId: 'deo-1',
        authorName: 'DEO User',
        authorRole: 'DEO',
        text: 'Proud moment for the district! Congratulations to all.',
        timestamp: new Date(Date.now() - 302400000),
      },
    ],
    reactions: [
      { id: 'r-12', type: 'celebrate', userId: 'deo-1', userName: 'DEO User' },
      { id: 'r-13', type: 'clap', userId: 'ddeo-1', userName: 'DDEO User' },
      { id: 'r-14', type: 'love', userId: 'aeo-1', userName: 'AEO User' },
      { id: 'r-15', type: 'like', userId: 'ceo-1', userName: 'CEO User' },
    ],
    createdAt: new Date(Date.now() - 604800000),
    updatedAt: new Date(Date.now() - 604800000),
  },
  {
    id: 'act-7',
    schoolId: 'school-3',
    schoolName: 'Government Secondary School',
    createdBy: 'teacher-6',
    createdByName: 'Teacher 6',
    createdByRole: 'TEACHER',
    title: 'Library Renovation Complete',
    description: 'Our school library has been completely renovated with new furniture, books, and a reading corner. Students now have access to over 1000 books covering various subjects.',
    photos: [
      { id: 'p-15', url: 'photo15.jpg', caption: 'Renovated library interior' },
      { id: 'p-16', url: 'photo16.jpg', caption: 'Students exploring new books' },
    ],
    comments: [],
    reactions: [
      { id: 'r-16', type: 'love', userId: 'ddeo-1', userName: 'DDEO User' },
    ],
    createdAt: new Date(Date.now() - 691200000),
    updatedAt: new Date(Date.now() - 691200000),
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
