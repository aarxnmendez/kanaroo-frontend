import React, { useState } from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { KanbanItem } from "@/components/dashboard/kanban/KanbanItem";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useTaskModalStore } from "@/store/taskModal.store";

export function KanbanColumn({ section, tasks, projectId, onTaskDropOnBoard }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { openTaskModal } = useTaskModalStore();

  const handleDragEnd = (event) => {
    const movedTask = event.data.value;
    const sourceColumnId = event.data.source.el.dataset.columnId;
    const targetColumnId = event.data.target.el.dataset.columnId;
    const targetColumnNewTasks = event.data.target.newValues;

    if (onTaskDropOnBoard) {
      onTaskDropOnBoard(
        movedTask,
        sourceColumnId,
        targetColumnId,
        targetColumnNewTasks
      );
    }
  };

  const [parent, dndTasks, updateConfig] = useDragAndDrop(tasks || [], {
    group: "kanban",
    onEnd: handleDragEnd,
  });

  if (!section) {
    return null;
  }

  const itemCount = dndTasks?.length || 0;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddNewTask = () => {
    console.log(
      `Add new task to column: ${section.name} (ID: ${section.id}, Project: ${projectId})`
    );
    openTaskModal(projectId, null, section.name);
  };

  const columnBaseClasses =
    "bg-accent rounded-lg flex flex-col w-72 md:w-80 flex-shrink-0 lg:flex-shrink lg:flex-1 lg:w-0 lg:min-w-[280px] transition-all duration-200 ease-in-out";
  const columnDynamicStyles = isCollapsed
    ? "px-3 py-1.5 h-fit"
    : "p-3 max-h-full";

  const headerClasses = isCollapsed ? "mb-0" : "mb-3";

  const taskListContainerClasses = `overflow-y-auto min-h-[50px] transition-all duration-200 ease-in-out ${
    isCollapsed
      ? "hidden h-0 min-h-0 opacity-0 pointer-events-none"
      : "opacity-100"
  }`;

  return (
    <div
      data-column-id={section.id}
      className={`${columnBaseClasses} ${columnDynamicStyles}`}
    >
      <div
        className={`flex justify-between items-center ${headerClasses} flex-shrink-0`}
      >
        <h3 className="text-sm text-accent-foreground select-none">
          {section.name}
        </h3>
        <div className="flex items-center">
          <span className="text-sm px-2 py-0.5 text-accent-foreground select-none">
            {itemCount}
          </span>
          <button
            onClick={toggleCollapse}
            className="p-1 hover:bg-accent-foreground/10 rounded-md text-accent-foreground"
            aria-label={isCollapsed ? "Expandir columna" : "Contraer columna"}
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>

      <div ref={parent} className={taskListContainerClasses}>
        {dndTasks && dndTasks.length > 0
          ? dndTasks.map((task) => (
              <KanbanItem key={task.id} task={task} projectId={projectId} />
            ))
          : !isCollapsed && (
              <p className="text-xs text-muted-foreground text-center pt-4 select-none">
                No tasks here.
              </p>
            )}
      </div>

      {!isCollapsed && (
        <button
          onClick={handleAddNewTask}
          className="mt-3 flex items-center justify-start w-full p-2 rounded-md hover:bg-accent-foreground/5 text-accent-foreground/70 hover:text-accent-foreground transition-colors duration-150 text-sm flex-shrink-0"
        >
          <Plus size={16} className="mr-2" />
          Nueva tarea
        </button>
      )}
    </div>
  );
}
