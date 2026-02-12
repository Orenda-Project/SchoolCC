import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useAuth } from './auth';

export const OTHER_ACTIVITIES_LIST = [
  'Attending in-service/departmental training',
  'Preparing/compiling official reports or data',
  'Community mobilization/outreach activities',
  'Handling hotline/complaint resolution',
  'Supervising or coordinating office/admin work',
  'Supporting school audits/inventory',
  'Facilitating exams/assessments',
  'Curriculum review and planning',
  'Teacher capacity building sessions',
  'Community engagement activities',
  'District-level coordination meetings',
  'Quality assurance and monitoring',
];

export const MENTORING_AREAS = [
  {
    id: 'classroom-env',
    name: 'Classroom Environment',
    indicators: [
      {
        id: 'ce-1',
        name: 'The classroom fosters open discussions and critical thinking.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Discussions are teacher-dominated with minimal student input. Example: Students answer only factual questions without follow-up.',
          developing: 'Some encouragement for discussions, but student participation is limited. Example: Students share ideas, but few questions are asked to probe deeper.',
          proficient: 'Open discussions are encouraged, with students freely sharing and debating ideas. Example: Students discuss multiple solutions to a problem collaboratively.',
        },
      },
      {
        id: 'ce-2',
        name: 'Resources and space are organized to support collaboration and problem-solving.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Resources and space are disorganized, limiting collaborative learning. Example: No designated group work areas or materials for problem-solving tasks.',
          developing: 'Some organization, but space/resources do not fully support collaboration. Example: Materials are present but not effectively used for group activities.',
          proficient: 'Resources and space are well-organized for collaborative tasks. Example: Tables are arranged for group work, and materials are easily accessible.',
        },
      },
      {
        id: 'ce-3',
        name: 'Students are actively encouraged to participate in complex tasks with clear expectations.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Students are given basic tasks without clear expectations. Example: Instructions are vague, and students struggle to engage in complex activities.',
          developing: 'Some students engage in complex tasks, but expectations are not consistently clear. Example: Instructions lack clarity for all groups.',
          proficient: 'Students actively participate in complex, clearly defined tasks. Example: The teacher assigns roles for group problem-solving and explains expectations.',
        },
      },
    ],
  },
  {
    id: 'lesson-plan',
    name: 'Lesson Planning',
    indicators: [
      {
        id: 'lp-1',
        name: 'Lesson objectives explicitly link to critical thinking, problem-solving, or creative skills.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Objectives are vague or focused on rote learning. Example: "Understand the topic" with no reference to critical thinking or problem-solving.',
          developing: 'Objectives mention higher-order skills but lack detailed alignment with activities. Example: "Analyse the text" without clear support for the analysis.',
          proficient: 'Objectives are explicit and linked to HOTS. Example: "Evaluate the author\'s argument and create your counterpoint with supporting evidence."',
        },
      },
      {
        id: 'lp-2',
        name: 'Lesson plans include strategies for promoting analysis, evaluation, and synthesis.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Strategies focus on recall and comprehension. Example: Activities ask for definitions but no analysis or synthesis.',
          developing: 'Some activities promote analysis or synthesis but lack variety or depth. Example: Students analyse a passage but do not synthesize ideas.',
          proficient: 'Strategies explicitly foster HOTS, including evaluation and synthesis. Example: Students compare arguments and propose their solutions based on evidence.',
        },
      },
      {
        id: 'lp-3',
        name: 'The lesson integrates interdisciplinary or real-world applications.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Lessons are taught in isolation without real-world relevance. Example: Math concepts are taught with no application.',
          developing: 'Some connections to real-world or interdisciplinary themes, but not fully integrated. Example: Mentioning real-world examples without exploring them.',
          proficient: 'Lessons integrate real-world applications and interdisciplinary links. Example: Students use math to design a sustainable business model.',
        },
      },
    ],
  },
  {
    id: 'instructional-strategies',
    name: 'Instructional Strategies',
    indicators: [
      {
        id: 'inst-1',
        name: 'The teacher poses open-ended and thought-provoking questions.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Questions are mostly close-ended, requiring one-word answers. Example: "What is the capital of France?"',
          developing: 'Some open-ended questions are asked, but they lack depth. Example: "Why is the capital important?" without encouraging further exploration.',
          proficient: 'Open-ended, thought-provoking questions dominate the lesson. Example: "How would you redesign this city to make it more sustainable?"',
        },
      },
      {
        id: 'inst-2',
        name: 'Instruction actively involves students in analyzing, interpreting, and critiquing content.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Students passively receive information. Example: The teacher explains a text without student critique.',
          developing: 'Some analysis and critique are encouraged, but it is not consistent. Example: Students are asked to analyse but not interpret or critique.',
          proficient: 'Students actively analyse, interpret, and critique content. Example: Students critique a historical argument with supporting evidence.',
        },
      },
      {
        id: 'inst-3',
        name: 'The teacher demonstrates problem-solving and creativity in real-time scenarios.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Simple tasks are demonstrated without explanation of the problem-solving process. Example: "This is the solution," without steps.',
          developing: 'Problem-solving is modeled, but the teacher does not explain strategies. Example: "Let me solve this quickly for you."',
          proficient: 'Problem-solving and creativity are modeled with clear strategies. Example: The teacher brainstorms solutions and explains the reasoning behind choices.',
        },
      },
      {
        id: 'inst-4',
        name: 'Scaffolding is used effectively to help students explore complex ideas.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Minimal or no scaffolding is provided. Example: Students are asked to solve problems independently without guidance.',
          developing: 'Some scaffolding is provided, but it is inconsistent. Example: The teacher provides hints but does not guide students through complex steps.',
          proficient: 'Effective scaffolding supports student exploration. Example: The teacher provides step-by-step guidance and gradually reduces support as students improve.',
        },
      },
    ],
  },
  {
    id: 'student-engagement',
    name: 'Student Engagement',
    indicators: [
      {
        id: 'se-1',
        name: 'Students collaborate on tasks requiring synthesis, evaluation, or innovative problem-solving.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Collaboration is minimal or absent. Example: Students work individually without interaction.',
          developing: 'Some collaboration occurs, but tasks lack depth. Example: Students share ideas but do not work towards a synthesized solution.',
          proficient: 'Collaboration is structured and focused on synthesis and problem-solving. Example: Students work in teams to design a solution to a community problem.',
        },
      },
      {
        id: 'se-2',
        name: 'The teacher encourages students to explore multiple perspectives or create novel solutions.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Content is presented from a single perspective. Example: Students are taught one method without alternatives.',
          developing: 'Multiple perspectives are mentioned, but exploration is limited. Example: The teacher describes perspectives but doesn\'t encourage student evaluation.',
          proficient: 'Students actively explore and evaluate multiple perspectives. Example: Students debate solutions and propose creative alternatives to a problem.',
        },
      },
      {
        id: 'se-3',
        name: 'Students actively engage in discussions and debates on complex topics.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Discussions are teacher-led with limited student involvement. Example: The teacher talks, and students answer briefly.',
          developing: 'Some discussions and debates occur, but only a few students participate. Example: A few students contribute to a debate while others stay silent.',
          proficient: 'Discussions and debates actively involve all students. Example: Students collaboratively debate and refine their arguments in a group setting.',
        },
      },
    ],
  },
  {
    id: 'assessment-feedback',
    name: 'Assessment & Feedback',
    indicators: [
      {
        id: 'af-1',
        name: 'Students engage in self-assessment or peer-assessment to evaluate reasoning and solutions.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Assessment is limited to teacher-led grading. Example: Students receive a grade without reflecting on their performance.',
          developing: 'Some self- or peer-assessment occurs, but it is inconsistent. Example: Students assess each other\'s work but without clear criteria.',
          proficient: 'Self- and peer-assessment are structured and purposeful. Example: Students use rubrics to assess their work and suggest improvements for peers.',
        },
      },
      {
        id: 'af-2',
        name: 'The teacher provides feedback that guides students in refining reasoning or solutions.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Feedback is generic and not actionable. Example: "Good job" or "Try again" without specifics.',
          developing: 'Feedback is specific but does not consistently guide improvement. Example: "You missed this part; try to include it."',
          proficient: 'Feedback is specific, actionable, and focused on improvement. Example: "Your argument is clear, but adding evidence will make it stronger."',
        },
      },
      {
        id: 'af-3',
        name: 'Assessment tasks require students to analyse, evaluate, or create based on the lesson content.',
        description: '',
        rating: null,
        rubric: {
          emerging: 'Assessment tasks focus on recall and do not involve higher-order thinking. Example: Quizzes with factual questions only.',
          developing: 'Some tasks involve analysis or evaluation but lack depth. Example: "Write a short analysis" with limited criteria for success.',
          proficient: 'Assessment tasks consistently require analysis, evaluation, or creation. Example: "Develop a project that evaluates and improves this system."',
        },
      },
    ],
  },
];

export interface MonitoringVisitData {
  id: string;
  aeoId: string;
  schoolId: string;
  tehsil: string;
  markaz: string;
  aeoName: string;
  schoolName: string;
  visitDate: string;
  arrivalTime: string;
  departureTime: string;
  teacherTotal: number;
  teacherPresent: number;
  teacherPercentage: number;
  headTeacherStatus: 'yes' | 'no' | 'on_duty' | 'leave' | 'other';
  studentTotal: number;
  studentPresent: number;
  studentPercentage: number;
  furnitureTotal: number;
  furnitureWith: number;
  furnitureWithout: number;
  classroomObservation: 'good' | 'average' | 'need_improvement';
  lndEnglishPercent: number;
  lndUrduPercent: number;
  lndMathsPercent: number;
  nsbAllocation: number;
  nsbExpenditure: number;
  nsbBalance: number;
  nsbUtilizationPercent: number;
  toiletStudentTotal: number;
  toiletTotal: number;
  toiletRequired: number;
  drinkingWater: 'available' | 'not_available' | 'taste_issue';
  hygieneWashrooms: 'good' | 'average' | 'poor';
  hygieneBuilding: 'good' | 'average' | 'poor';
  hygieneClassrooms: 'good' | 'average' | 'poor';
  retentionTotal: number;
  retentionRetained: number;
  retentionDropped: number;
  partialFacilityTypes: string;
  partialFacilityReason: string;
  dataHealthVariation: number;
  generalRemarks: string;
  headTeacherSignature: boolean;
  aeoSignature: boolean;
  evidence: { id: string; name: string; type: 'photo' | 'document' | 'voice'; url: string }[];
  status: 'draft' | 'submitted';
  submittedAt?: Date;
}

export interface MentoringVisitIndicator {
  id: string;
  name: string;
  rating: 'emerging' | 'developing' | 'proficient' | null;
  rubricText: string;
  examples: string;
}

export interface MentoringVisitData {
  id: string;
  userId: string;
  roleId?: number;
  aeoId?: string;
  schoolId: string;
  observerName: string;
  aeoName?: string;
  schoolName: string;
  markaz?: string;
  tehsil?: string;
  visitDate: string;
  arrivalTime: string;
  departureTime: string;
  classObserved: string;
  teacherName: string;
  subject: string;
  indicators?: MentoringVisitIndicator[];
  observations?: { areaId: number; indicatorId: number; optionsId: number; rationaleId?: number | null }[];
  generalFeedback: string;
  strengthsObserved: string;
  areasForImprovement: string;
  actionItems: string;
  tmNotes?: string;
  evidence: { id: string; name: string; type: 'photo' | 'document' | 'voice'; url: string }[];
  status: 'draft' | 'submitted';
  submittedAt?: Date;
}

export interface OfficeVisitData {
  id: string;
  aeoId: string;
  aeoName: string;
  visitDate: string;
  arrivalTime: string;
  departureTime: string;
  purpose: string;
  activitiesCompleted: {
    admin: boolean;
    reporting: boolean;
    meeting: boolean;
    coordination: boolean;
    oversight: boolean;
    audit: boolean;
    exams: boolean;
    other: boolean;
    otherDescription?: string;
  };
  comments: string;
  evidence: { id: string; name: string; type: 'photo' | 'document' | 'voice'; url: string }[];
  status: 'draft' | 'submitted';
  submittedAt?: Date;
}

export interface OtherActivityData {
  id: string;
  aeoId: string;
  aeoName: string;
  activityType: string;
  activityDate: string;
  startTime: string;
  endTime: string;
  description: string;
  comments: string;
  evidence: { id: string; name: string; type: 'photo' | 'document' | 'voice'; url: string }[];
  status: 'draft' | 'submitted';
  submittedAt?: Date;
}

interface ActivitiesContextType {
  monitoringVisits: MonitoringVisitData[];
  mentoringVisits: MentoringVisitData[];
  officeVisits: OfficeVisitData[];
  otherActivities: OtherActivityData[];
  addMonitoringVisit: (visit: MonitoringVisitData) => void;
  addMentoringVisit: (visit: MentoringVisitData) => void;
  addOfficeVisit: (visit: OfficeVisitData) => void;
  addOtherActivity: (activity: OtherActivityData) => void;
  getAllActivities: () => {
    monitoring: MonitoringVisitData[];
    mentoring: MentoringVisitData[];
    office: OfficeVisitData[];
    other: OtherActivityData[];
  };
  refreshActivities: () => Promise<void>;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(undefined);

export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [monitoringVisits, setMonitoringVisits] = useState<MonitoringVisitData[]>([]);
  const [mentoringVisits, setMentoringVisits] = useState<MentoringVisitData[]>([]);
  const [officeVisits, setOfficeVisits] = useState<OfficeVisitData[]>([]);
  const [otherActivities, setOtherActivities] = useState<OtherActivityData[]>([]);

  const buildFilterParam = useCallback(async () => {
    if (!user) return '';
    if (user.role === 'AEO') return `?aeoId=${user.id}`;
    if (user.role === 'TRAINING_MANAGER') {
      try {
        const res = await fetch(`/api/training-manager/${user.id}/hierarchy`);
        if (res.ok) {
          const hierarchy = await res.json();
          if (Array.isArray(hierarchy)) {
            const aeoIds = hierarchy.map((entry: any) => entry.aeo?.id || entry.aeoId).filter(Boolean);
            const allIds = [user.id, ...aeoIds];
            return `?aeoIds=${allIds.join(',')}`;
          }
        }
      } catch (error) {
        console.error('Failed to fetch TM hierarchy for activity filtering:', error);
      }
      return `?aeoId=${user.id}`;
    }
    if (['CEO', 'DEO', 'DDEO'].includes(user.role)) return '';
    return '';
  }, [user?.id, user?.role]);

  // Load activities from the API on mount and when user changes
  useEffect(() => {
    const loadActivities = async () => {
      if (!user) {
        setMonitoringVisits([]);
        setMentoringVisits([]);
        setOfficeVisits([]);
        setOtherActivities([]);
        return;
      }

      try {
        const filterParam = await buildFilterParam();
        
        const [monitoringRes, mentoringRes, officeRes, otherRes] = await Promise.all([
          fetch(`/api/activities/monitoring${filterParam}`),
          fetch(`/api/activities/mentoring${filterParam}`),
          fetch(`/api/activities/office${filterParam}`),
          fetch(`/api/activities/other${filterParam}`),
        ]);

        if (monitoringRes.ok) {
          const data = await monitoringRes.json();
          setMonitoringVisits(data);
        }
        if (mentoringRes.ok) {
          const data = await mentoringRes.json();
          setMentoringVisits(data);
        }
        if (officeRes.ok) {
          const data = await officeRes.json();
          setOfficeVisits(data);
        }
        if (otherRes.ok) {
          const data = await otherRes.json();
          setOtherActivities(data);
        }
      } catch (error) {
        console.error('Failed to load activities:', error);
      }
    };

    loadActivities();
  }, [user?.id, user?.role, buildFilterParam]);

  const addMonitoringVisit = useCallback(async (visit: MonitoringVisitData) => {
    // Omit frontend-generated id - server will generate it
    const { id, ...visitData } = visit as any;
    const response = await fetch('/api/activities/monitoring', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to save monitoring visit' }));
      throw new Error(error.details || error.error || 'Failed to save monitoring visit');
    }
    const savedVisit = await response.json();
    setMonitoringVisits((prev) => [...prev, savedVisit]);
    return savedVisit;
  }, []);

  const addMentoringVisit = useCallback(async (visit: MentoringVisitData) => {
    const { id, ...visitData } = visit as any;
    const response = await fetch('/api/activities/mentoring', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to save mentoring visit' }));
      throw new Error(error.details || error.error || 'Failed to save mentoring visit');
    }
    const savedVisit = await response.json();
    setMentoringVisits((prev) => [...prev, savedVisit]);
    return savedVisit;
  }, []);

  const addOfficeVisit = useCallback(async (visit: OfficeVisitData) => {
    const { id, ...visitData } = visit as any;
    const response = await fetch('/api/activities/office', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to save office visit' }));
      throw new Error(error.details || error.error || 'Failed to save office visit');
    }
    const savedVisit = await response.json();
    setOfficeVisits((prev) => [...prev, savedVisit]);
    return savedVisit;
  }, []);

  const addOtherActivity = useCallback(async (activity: OtherActivityData) => {
    const { id, ...activityData } = activity as any;
    const response = await fetch('/api/activities/other', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to save other activity' }));
      throw new Error(error.details || error.error || 'Failed to save other activity');
    }
    const savedActivity = await response.json();
    setOtherActivities((prev) => [...prev, savedActivity]);
    return savedActivity;
  }, []);

  const getAllActivities = useCallback(() => {
    return {
      monitoring: monitoringVisits,
      mentoring: mentoringVisits,
      office: officeVisits,
      other: otherActivities,
    };
  }, [monitoringVisits, mentoringVisits, officeVisits, otherActivities]);

  const refreshActivities = useCallback(async () => {
    if (!user) return;
    
    try {
      const filterParam = await buildFilterParam();
      
      const [monitoringRes, mentoringRes, officeRes, otherRes] = await Promise.all([
        fetch(`/api/activities/monitoring${filterParam}`),
        fetch(`/api/activities/mentoring${filterParam}`),
        fetch(`/api/activities/office${filterParam}`),
        fetch(`/api/activities/other${filterParam}`),
      ]);

      if (monitoringRes.ok) {
        const data = await monitoringRes.json();
        setMonitoringVisits(data);
      }
      if (mentoringRes.ok) {
        const data = await mentoringRes.json();
        setMentoringVisits(data);
      }
      if (officeRes.ok) {
        const data = await officeRes.json();
        setOfficeVisits(data);
      }
      if (otherRes.ok) {
        const data = await otherRes.json();
        setOtherActivities(data);
      }
    } catch (error) {
      console.error('Failed to refresh activities:', error);
    }
  }, [user?.id, user?.role, buildFilterParam]);

  return (
    <ActivitiesContext.Provider
      value={{
        monitoringVisits,
        mentoringVisits,
        officeVisits,
        otherActivities,
        addMonitoringVisit,
        addMentoringVisit,
        addOfficeVisit,
        addOtherActivity,
        getAllActivities,
        refreshActivities,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (context === undefined) {
    throw new Error('useActivities must be used within an ActivitiesProvider');
  }
  return context;
}
