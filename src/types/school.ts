export interface School {
  id: string;
  name: string;
  code: string;
  logoUrl: string | null;
}

export interface SchoolConfig {
  id: string;
  name: string;
  code: string;
  logoUrl: string | null;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  layoutType: 'primary' | 'secondary';
  features: SchoolFeature[];
}

export type SchoolFeature = 'results' | 'profile' | 'timetable' | 'fees';
