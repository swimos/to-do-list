export interface TodoItem {
  key: number;
  label: string;
  completed: boolean;
  editing?: boolean;
  editLabel?: string;
}
