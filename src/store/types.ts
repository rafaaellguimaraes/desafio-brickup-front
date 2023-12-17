export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  image: string | null;
}

export interface RootState {
  tasks: Task[];
}