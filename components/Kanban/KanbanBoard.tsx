"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ApplicationCard } from "@/components/Applications/ApplicationCards";
import { Draggable } from "@/components/Kanban/Draggable";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import { Columns, KanbanColumnProps } from "@/types/Kanban";
import { Application } from "@/types/Application";
import { useAppStore } from "@/store/useAppStore";

const KanbanBoard = () => {
  const { applications, fetchApplications, moveApplication } = useAppStore();
  useEffect(() => {
    fetchApplications();
  }, []);

  const columns: Columns = {
    Applied: applications.filter((app) => app.status == "Applied"),
    Interview: applications.filter((app) => app.status == "Interview"),
    Offer: applications.filter((app) => app.status == "Offer"),
    Rejected: applications.filter((app) => app.status == "Rejected"),
  };

  const [activeJob, setActiveJob] = React.useState<Application | null>(null);

  const findContainer = (id: string) => {
    return Object.keys(columns).find((key) =>
      columns[key as keyof typeof columns].some(
        (item) => item._id.toString() === id
      )
    );
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    console.log("Active: ", active);
    const container = findContainer(active.id);
    if (!container) return;

    const job = columns[container as keyof Columns].find(
      (i) => i._id.toString() === active.id
    );
    setActiveJob(job || null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const origin = findContainer(active.id) as keyof Columns | undefined;
    const destination =
      (findContainer(over.id) as keyof Columns | undefined) ||
      (over.id as keyof Columns);

    if (!origin || !destination) return;

    if (origin !== destination) {
      // Moving across columns
      moveApplication(active.id, destination);
    } else {
      // Reordering inside same column
      const items = [...columns[origin]];
      const oldIndex = items.findIndex((i) => i._id.toString() === active.id);
      const newIndex = items.findIndex((i) => i._id.toString() === over.id);

      if (oldIndex !== newIndex) {
        const reordered = arrayMove(items, oldIndex, newIndex);
        // optional: update store ordering if needed
        moveApplication(active.id, origin); // <-- extend your store to accept newIndex
      }
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(columns).map((status) => (
          <KanbanColumn
            key={status}
            id={status}
            title={status}
            jobs={columns[status as keyof typeof columns]}
            activeJob={activeJob}
          />
        ))}
      </div>

      {/* 👇 Drag overlay follows mouse cursor */}
      <DragOverlay>
        {activeJob ? <ApplicationCard {...activeJob} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;

const KanbanColumn = ({ id, jobs, title, activeJob }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  const colorMap: Record<string, string> = {
    Offer: "bg-green-600",
    Interview: "bg-amber-500",
    Applied: "bg-blue-500",
    Rejected: "bg-red-600",
  };

  return (
    <div ref={setNodeRef}>
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center">
          <span className={`h-2 w-2 rounded-full ${colorMap[id]}`} />
          <h3 className="text-lg font-bold ml-2">{title}</h3>
        </div>
        <Badge className="rounded-lg py-0.5">{jobs.length}</Badge>
      </div>
      <SortableContext
        items={jobs.map((j) => j._id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div
          style={{ scrollbarWidth: "none" }}
          className="space-y-5 max-h-[600px] overflow-y-auto"
        >
          {jobs.map((job) => (
            <Draggable key={job._id.toString()} id={job._id.toString()}>
              {job._id.toString() === activeJob?._id.toString() ? (
                <div className="opacity-0">
                  <ApplicationCard {...job} />
                </div>
              ) : (
                <ApplicationCard {...job} />
              )}
            </Draggable>
          ))}

          {jobs.length === 0 && (
            <div className="h-16 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};
