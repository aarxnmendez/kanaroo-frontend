import { create } from "zustand";

export const useTaskModalStore = create((set) => ({
  isTaskModalOpen: false,
  currentTaskId: null,
  currentProjectId: null,

  openTaskModal: (projectId, taskId) => {
    set({
      isTaskModalOpen: true,
      currentProjectId: projectId,
      currentTaskId: taskId,
    });
  },

  closeTaskModal: () => {
    set({
      isTaskModalOpen: false,
      currentTaskId: null,
      currentProjectId: null,
    });
    // }
  },
}));
