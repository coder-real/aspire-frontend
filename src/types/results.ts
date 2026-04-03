export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface Result {
  id: string;
  subject: string;
  ca: number;
  exam: number;
  total: number;
  term: string;
  session: string;
  grade: Grade;
}

export interface ResultsSummary {
  average: number;
  highest: number;
  lowest: number;
  totalSubjects: number;
  term: string;
  session: string;
}

export interface ResultsResponse {
  results: Result[];
  summary: ResultsSummary;
}

export interface UploadResultItem {
  subject: string;
  ca: number;
  exam: number;
}

export interface UploadResultsRequest {
  studentId: string;
  term: string;
  session: string;
  results: UploadResultItem[];
}
