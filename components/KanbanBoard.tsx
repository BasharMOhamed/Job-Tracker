"use client";
import React from "react";
import { Badge } from "./ui/badge";
import { ApplicationCard } from "./ApplicationCards";
import { Draggable } from "./Draggable";
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

type Columns = {
  Applied: JobCardProps[];
  Interview: JobCardProps[];
  Offer: JobCardProps[];
  Rejected: JobCardProps[];
};
const columnstemp: Columns = {
  Applied: [
    {
      id: "1",
      position: "Frontend Developer",
      company: "Google",
      location: "Remote",
      dateApplied: "2025-09-10",
      status: "Applied",
    },
  ],
  Interview: [
    {
      id: "2",
      position: "Backend Engineer",
      company: "Amazon",
      location: "NYC",
      dateApplied: "2025-09-12",
      status: "Interview",
    },
    {
      id: "5",
      position: "Backend Engineer",
      company: "Amazon",
      location: "NYC",
      dateApplied: "2025-09-12",
      status: "Interview",
    },
  ],
  Offer: [
    {
      id: "3",
      position: "Product Manager",
      company: "Meta",
      location: "SF",
      dateApplied: "2025-09-14",
      status: "Offer",
    },
  ],
  Rejected: [],
};

const KanbanBoard = () => {
  const [columns, setColumns] = React.useState<Columns>(columnstemp);
  const [activeJob, setActiveJob] = React.useState<JobCardProps | null>(null);

  const findContainer = (id: string) => {
    return Object.keys(columns).find((key) =>
      columns[key as keyof typeof columns].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    const container = findContainer(active.id);
    if (!container) return;

    const job = columns[container as keyof Columns].find(
      (i) => i.id === active.id
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
      setColumns((prev) => {
        const originItems = [...prev[origin]];
        const destinationItems = [...prev[destination]];
        const [movedItem] = originItems.splice(
          originItems.findIndex((i) => i.id === active.id),
          1
        );

        // ✅ update the status of the moved job
        movedItem.status = destination;

        destinationItems.push(movedItem);
        return {
          ...prev,
          [origin]: originItems,
          [destination]: destinationItems,
        };
      });
    } else {
      // Reordering inside same column
      setColumns((prev) => {
        const items = [...prev[origin]];
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return { ...prev, [origin]: arrayMove(items, oldIndex, newIndex) };
      });
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

interface KanbanColumnProps {
  id: string;
  title: string;
  jobs: JobCardProps[];
  activeJob: JobCardProps | null;
}

interface JobCardProps {
  id: string;
  position: string;
  company: string;
  location: string;
  dateApplied: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
}

const KanbanColumn = ({ id, jobs, title, activeJob }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  const colorMap: Record<string, string> = {
    Offer: "bg-green-400",
    Interview: "bg-amber-400",
    Applied: "bg-blue-400",
    Rejected: "bg-danger",
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
        items={jobs.map((j) => j.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-5">
          {jobs.map((job) => (
            <Draggable key={job.id} id={job.id}>
              {job.id === activeJob?.id ? (
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
