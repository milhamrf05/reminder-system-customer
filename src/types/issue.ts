import { QualityIssue } from './qualityIssue';

export interface Issue {
  id: number;
  user_id: number;
  shift: number;
  issue_date: Date;
}

export interface AddIssueForm {
  shift: number;
  issue_date: string | number | null | undefined;
}

export interface EditedIssue {
  id: number;
  user_id: number;
  shift: number;
  issue_date: string | null | number | undefined;
}

export interface IssueWithQualityIssue {
  id: number;
  user_id: number;
  shift: number;
  issue_date: string;
  quality_issues: QualityIssue[];
}

export interface IssueChartData {
  labels: string[];
  datasets: [{ data: string[]; backgroundColor: string[] }];
  issue: any;
}
