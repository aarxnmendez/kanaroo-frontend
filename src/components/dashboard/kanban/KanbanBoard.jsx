import React, { useState, useRef, useEffect, useCallback } from "react";
import { KanbanColumn } from "@/components/dashboard/kanban/KanbanColumn";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";

export function KanbanBoard({ initialColumns, projectId }) {
  const scrollContainerRef = useRef(null);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const [boardColumns, setBoardColumns] = useState([]);

  useEffect(() => {
    setBoardColumns(
      initialColumns
        ? initialColumns.map((col) => ({
            ...col,
            tasks: [...(col.tasks || [])],
          }))
        : []
    );
  }, [initialColumns]);

  const handleTaskDrop = useCallback(
    async (movedTask, sourceColumnId, targetColumnId, targetColumnNewTasks) => {
      let previousBoardColumnsState = null;
      setBoardColumns((prevBoardColumns) => {
        previousBoardColumnsState = JSON.parse(
          JSON.stringify(prevBoardColumns)
        );
        const newBoardColumns = prevBoardColumns.map((col) => ({
          ...col,
          tasks: col.tasks ? [...col.tasks] : [],
        }));

        const sourceCol = newBoardColumns.find((c) => c.id === sourceColumnId);
        const targetCol = newBoardColumns.find((c) => c.id === targetColumnId);

        if (!sourceCol || !targetCol || !movedTask || !movedTask.id) {
          console.error(
            "Drag drop failed: source, target column, or task data missing."
          );
          return prevBoardColumns;
        }

        const taskToUpdateInState = { ...movedTask };

        taskToUpdateInState.status = targetCol.filter_value || targetCol.name;

        if (sourceColumnId !== targetColumnId) {
          sourceCol.tasks = sourceCol.tasks.filter(
            (task) => task.id !== taskToUpdateInState.id
          );
        }
        targetCol.tasks = targetCol.tasks.filter(
          (task) => task.id !== taskToUpdateInState.id
        );

        const newPositionInTargetTasks = targetColumnNewTasks.findIndex(
          (t) => t.id === taskToUpdateInState.id
        );
        if (newPositionInTargetTasks !== -1) {
          targetCol.tasks = [
            ...targetColumnNewTasks.slice(0, newPositionInTargetTasks),
            taskToUpdateInState,
            ...targetColumnNewTasks.slice(newPositionInTargetTasks + 1),
          ];
        } else {
          targetCol.tasks.push(taskToUpdateInState);
        }

        targetCol.tasks = targetCol.tasks.map((task, index) => ({
          ...task,
          position: index + 1,
        }));
        if (sourceColumnId !== targetColumnId && sourceCol) {
          sourceCol.tasks = sourceCol.tasks.map((task, index) => ({
            ...task,
            position: index + 1,
          }));
        }

        return newBoardColumns;
      });

      const targetColForApi = initialColumns.find(
        (col) => col.id === targetColumnId
      );
      if (!targetColForApi || !movedTask || !movedTask.id) {
        console.error(
          "API call skipped: target column for API or task ID missing."
        );
        setBoardColumns(previousBoardColumnsState);
        return;
      }

      const newStatus = targetColForApi.filter_value;
      const newPosition =
        targetColumnNewTasks.findIndex((t) => t.id === movedTask.id) + 1;

      const payload = {
        section_id: targetColumnId,
        status: newStatus,
        position: newPosition,
      };

      try {
        console.log(
          `API Call: Updating item ${movedTask.id} with payload:`,
          payload
        );
        await apiClient.put(`/items/${movedTask.id}`, payload);
        console.log(`Item ${movedTask.id} updated successfully via API.`);
      } catch (error) {
        console.error("Error updating item via API:", error);
        alert(API_MESSAGES.GENERIC_ERROR_ITEM_UPDATE);

        if (previousBoardColumnsState) {
          setBoardColumns(previousBoardColumnsState);
        }
      }
    },
    [initialColumns, setBoardColumns]
  );

  useEffect(() => {
    const currentRef = scrollContainerRef.current;

    const onMouseMove = (e) => {
      if (!isDraggingHorizontal || !scrollContainerRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
    };

    const onMouseUpOrLeave = () => {
      if (!isDraggingHorizontal || !scrollContainerRef.current) return;
      setIsDraggingHorizontal(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = "grab";
      }
    };

    if (isDraggingHorizontal) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUpOrLeave);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUpOrLeave);
      if (currentRef) {
        currentRef.style.cursor = "grab";
      }
    };
  }, [isDraggingHorizontal, startX, scrollLeftStart]);

  if (!boardColumns || boardColumns.length === 0) {
    return <p className="p-4">No columns to display.</p>;
  }

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;

    if (e.target.closest('[data-kanban-item-part="true"]')) {
      return;
    }

    setIsDraggingHorizontal(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftStart(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDraggingHorizontal || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingHorizontal || !scrollContainerRef.current) return;
    setIsDraggingHorizontal(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex space-x-4 p-4 h-full overflow-x-auto bg-background cursor-grab select-none items-start"
      onMouseDown={handleMouseDown}
    >
      {boardColumns.map((column) => (
        <KanbanColumn
          key={column.id}
          section={column}
          tasks={column.tasks || []}
          projectId={projectId}
          onTaskDropOnBoard={handleTaskDrop}
        />
      ))}
    </div>
  );
}
