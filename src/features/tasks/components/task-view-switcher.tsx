"use client";

import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";

import { DataFilters } from "./data-filters";

import { columns } from "./column";
import { DataTable } from "./data-table";

import { useGetTasks } from "../api/use-get-tasks";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataKanban } from "./data-kanban";



export const TaskViewSwitcher = () => {
    const [{
        status,
        assigneeId,
        projectId,
        search,
        dueDate
    }] = useTaskFilters();

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    });

    const workspaceId = useWorkspaceId();
    const { open } = useCreateTaskModal();
    const { 
        data: tasks, 
        isLoading: IsLoadingTasks 
    } = useGetTasks({
        workspaceId,
        projectId,
        status,
        assigneeId,
        dueDate,
     });

    return(
        <Tabs
        defaultValue={view}
        onValueChange={setView}
        className="flex-1 w-full border rounded-lg"
        >
         <div className="h-full flex flex-col overflow-auto p-4">
            <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                <TabsList className="w-full lg:w-auto">
                    <TabsTrigger
                    className="h-8 w-full lg:w-auto"
                    value="table"
                    >
                        Table
                    </TabsTrigger>
                    <TabsTrigger
                    className="h-8 w-full lg:w-auto"
                    value="kanban"
                    >
                        Kanban
                    </TabsTrigger>
                    <TabsTrigger
                    className="h-8 w-full lg:w-auto"
                    value="calendar"
                    >
                        Calendar
                    </TabsTrigger>
                </TabsList>
                <Button
                onClick={open}
                size="sm"
                className="w-full lg:w-auto"
                >
                    <PlusIcon className="size-4 mr-2" />
                    New
                </Button>
            </div>
            <DottedSeparator className="my-4"/>
              <DataFilters />
            <DottedSeparator className="my-4"/>
            {IsLoadingTasks ? (
                <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </div>
            ): (

            <>
            <TabsContent value="table" className="mt-0">
               <DataTable columns={columns} data={tasks?.documents ?? []}/>
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
             <DataKanban data={tasks?.documents ?? []}/>
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
             {JSON.stringify(tasks)}
            </TabsContent>
            </>
             )}

         </div>
        </Tabs>
    );
};

