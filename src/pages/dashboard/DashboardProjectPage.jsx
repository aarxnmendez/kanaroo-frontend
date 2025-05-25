import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { KanbanBoard } from "@/components/dashboard/kanban/KanbanBoard";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";

// Los mocks se pueden eliminar o comentar una vez que la carga de API funcione.
// const mockColumnsData = [...];
// const mockTasksData = [...];

export default function DashboardProjectPage() {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [processedColumns, setProcessedColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectError, setProjectError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId) {
        setIsLoading(false);
        setProjectError("ID del proyecto no encontrado.");
        return;
      }

      setIsLoading(true);
      setProjectError(null);

      try {
        const response = await apiClient.get(`/projects/${projectId}`);

        if (response && response.data) {
          const fetchedProject = response.data;
          setProjectDetails(fetchedProject);

          const sections =
            fetchedProject.sections || fetchedProject.columns || [];

          const columnsWithTasks = sections
            .sort((a, b) => a.position - b.position)
            .map((section) => {
              return {
                ...section,
                tasks: section.items || [],
              };
            });

          setProcessedColumns(columnsWithTasks);
        } else {
          setProjectError(API_MESSAGES.UNEXPECTED_RESPONSE);
        }
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
        if (error.isNetworkError) {
          setProjectError(API_MESSAGES.NETWORK_ERROR);
        } else if (error.response?.status === 404) {
          setProjectError(API_MESSAGES.PROJECT_NOT_FOUND);
        } else if (error.response?.data?.message) {
          setProjectError(error.response.data.message);
        } else {
          setProjectError(API_MESSAGES.GENERIC_ERROR_PROJECT_LOAD);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (isLoading) {
    return <p className="p-4 text-center">Cargando detalles del proyecto...</p>;
  }

  if (projectError) {
    return (
      <div className="p-4 text-center text-destructive">
        <p>Error al cargar el proyecto: {projectError}</p>
        <p>Por favor, intenta recargar la página o selecciona otro proyecto.</p>
      </div>
    );
  }

  if (!projectDetails) {
    return (
      <p className="p-4 text-center">No se encontraron datos del proyecto.</p>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <KanbanBoard
        initialColumns={processedColumns}
        projectId={projectId}
        projectName={projectDetails.name}
      />
    </div>
  );
}
