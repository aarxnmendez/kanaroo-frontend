import React from "react";
import { X } from "lucide-react";
import { useTaskModalStore } from "@/store/taskModal.store";
import { TaskDetailPageContent } from "@/pages/dashboard/DashboardTaskDetailPage";

export function TaskEditModal() {
  const { isTaskModalOpen, closeTaskModal } = useTaskModalStore();

  const handleClose = () => {
    closeTaskModal();
  };

  if (!isTaskModalOpen) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 bg-black/30 backdrop-blur-xs z-30 flex items-center justify-center p-4 ${
        isTaskModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-150 ease-in-out`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-card text-card-foreground rounded-lg shadow-xl w-full max-w-2xl max-h-[90%] overflow-y-auto p-6 relative transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <TaskDetailPageContent />
        </div>
      </div>
      <style jsx global>{`
        @keyframes modal-appear {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s forwards;
        }
      `}</style>
    </div>
  );
}
