export interface QualityIssue {
  id: number;
  user_id?: number;
  issue_id: string | string[];
  problem: string;
  machine_performance: string;
  trouble_duration_minutes: number;
  solution: string;
  impact: string;
}

export interface QualityIssueForm {
  id?: number;
  issue_id: string | string[];
  user_id: number;
  problem: string;
  machine_performance: string;
  trouble_duration_minutes: number;
  solution: string;
  impact: string;
}

export interface QualityIssueWithIssueAndUser {
  id: number;
  user_id?: number;
  issue_id: string | string[];
  problem: string;
  machine_performance: string;
  trouble_duration_minutes: number;
  solution: string;
  impact: string;
  shift: number;
  issue_date: string;
  user_name: string;
  created_at: string;
}
