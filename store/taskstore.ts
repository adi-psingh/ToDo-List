import { create } from "zustand";


interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}


interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
