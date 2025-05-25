import { useTaskModalStore } from "@/store/taskModal.store";
import {
  CalendarDays,
  CircleDot,
  CheckCircle2,
  XCircle,
  Archive,
  ClipboardList,
  Flame,
  ArrowUpCircle,
  MinusCircle,
  ArrowDownCircle,
  CalendarX,
} from "lucide-react";

const priorityColors = {
  high: "text-orange-400",
  urgent: "text-red-500",
  medium: "text-yellow-400",
  low: "text-blue-400",
};

const priorityIcons = {
  high: ArrowUpCircle,
  urgent: Flame,
  medium: MinusCircle,
  low: ArrowDownCircle,
};

const priorityDisplayNames = {
  high: "Alta",
  urgent: "Urgente",
  medium: "Media",
  low: "Baja",
};

const statusVisuals = {
  todo: { icon: ClipboardList, color: "text-blue-500" },
  in_progress: { icon: CircleDot, color: "text-orange-500" },
  done: { icon: CheckCircle2, color: "text-green-500" },
  blocked: { icon: XCircle, color: "text-red-500" },
  archived: { icon: Archive, color: "text-gray-500" },
};

export function KanbanItem({ task, projectId }) {
  const { openTaskModal } = useTaskModalStore();

  if (!task) {
    return null;
  }

  const handleItemClick = () => {
    if (projectId && task && task.id) {
      openTaskModal(projectId, task.id);
    } else {
      console.warn(
        "KanbanItem: Missing projectId or taskId for modal display. Task:",
        task
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const isPastDue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString + "T00:00:00");
    return dueDate < today;
  };

  const taskIsPastDue = isPastDue(task.due_date);

  const CurrentStatusIcon = task.status
    ? statusVisuals[task.status]?.icon
    : null;
  const statusColor = task.status
    ? statusVisuals[task.status]?.color
    : "text-gray-400";

  return (
    <div
      className="bg-card border border-border rounded-md p-3 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col gap-3"
      data-kanban-item-part="true"
      onClick={handleItemClick}
    >
      <div className="flex flex-col gap-3 h-full">
        <div className="flex justify-between items-start">
          <div className="flex items-start flex-grow">
            {CurrentStatusIcon && (
              <CurrentStatusIcon
                className={`h-4 w-4 mr-2 flex-shrink-0 mt-0.5 ${statusColor}`}
                aria-label={`Status: ${task.status}`}
              />
            )}
            <h4 className="text-sm text-card-foreground flex-grow break-words">
              {task.title}
            </h4>
          </div>
          {task.user && task.user.avatar && (
            <img
              src={task.user.avatar}
              alt={task.user.name || "User avatar"}
              className="h-6 w-6 rounded-full ml-2 flex-shrink-0"
              title={task.user.name}
            />
          )}
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className={`flex-grow ${CurrentStatusIcon ? "ml-6" : ""}`}>
            <div className="flex flex-wrap gap-1">
              {task.tags.length <= 3
                ? task.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-0.5 rounded-full text-xs border"
                      style={{
                        backgroundColor: `${tag.color}20`,
                        borderColor: tag.color,
                        color: tag.color,
                      }}
                    >
                      {tag.name}
                    </span>
                  ))
                : [
                    ...task.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 rounded-full text-xs border"
                        style={{
                          backgroundColor: `${tag.color}20`,
                          borderColor: tag.color,
                          color: tag.color,
                        }}
                      >
                        {tag.name}
                      </span>
                    )),
                    <span
                      key="more-tags"
                      className="px-2 py-0.5 rounded-full text-xs border text-accent-foreground border-accent-foreground"
                    >
                      +{task.tags.length - 2} more
                    </span>,
                  ]}
            </div>
          </div>
        )}

        <div
          className={`flex items-center justify-between text-xs mt-auto ${
            CurrentStatusIcon ? "ml-6" : ""
          }`}
        >
          {task.priority &&
            (() => {
              const IconComponent = priorityIcons[task.priority];
              const iconColor =
                priorityColors[task.priority] || "text-gray-500";
              if (!IconComponent) return null;

              return (
                <div className="flex items-center">
                  <IconComponent
                    className={`h-4 w-4 mr-1 ${iconColor}`}
                    aria-hidden="true"
                  />
                  <span
                    title={priorityDisplayNames[task.priority] || task.priority}
                  >
                    {priorityDisplayNames[task.priority] || task.priority}
                  </span>
                </div>
              );
            })()}
          {!task.priority && <div className="flex-grow"></div>}

          {task.due_date && (
            <span
              className={`flex items-center ${
                taskIsPastDue ? "text-red-600" : "text-foreground"
              }`}
            >
              {taskIsPastDue ? (
                <CalendarX className="h-3.5 w-3.5 mr-1" />
              ) : (
                <CalendarDays className="h-3.5 w-3.5 mr-1" />
              )}
              {formatDate(task.due_date)}
            </span>
          )}
          {task.priority && !task.due_date && <div className="flex-grow"></div>}
        </div>
      </div>
    </div>
  );
}
