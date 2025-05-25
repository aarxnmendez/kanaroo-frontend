import React from "react";
import { useTaskModalStore } from "@/store/taskModal.store";

export function TaskDetailPageContent() {
  const { currentProjectId: projectId, currentTaskId: taskId } =
    useTaskModalStore();

  if (!projectId || !taskId) {
    return <p className="p-1 text-muted-foreground">Loading task details...</p>;
  }

  return (
    <div className="p-1">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Task: {taskId} (Project: {projectId})
      </h2>

      <p className="mb-2">
        <span className="font-semibold">Project ID:</span> {projectId}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Task ID:</span> {taskId}
      </p>

      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Task editing form or more detailed information will be displayed here.
        </p>
      </div>
    </div>
  );
}
