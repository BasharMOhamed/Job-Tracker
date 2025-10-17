import React from "react";
import KanbanBoard from "@/components/Kanban/KanbanBoard";

const KanbanTab = () => {
  return (
    <div>
      <div className="flex justify-between items-centermb-4">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <p className="text-sm text-muted-foreground">
          Drag applications between columns to update their status
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
};

export default KanbanTab;
