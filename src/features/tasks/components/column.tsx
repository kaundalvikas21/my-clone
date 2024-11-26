"use client";

import { ArrowUpDown } from "lucide-react"  
import { ColumnDef } from "@tanstack/react-table";

import { TaskDate } from "./task-date";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Button } from "@/components/ui/button";

import { Task } from "../types";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Badge } from "@/components/ui/badge";


export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Task Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }) => {
            const name = row.original.name;

            return <p className="line-clamp-1">{name}</p>
          }
    },
    {
        accessorKey: "project",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  Projects
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },

        cell: ({ row }) => {
            const project = row.original.project;

            return(
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <ProjectAvatar 
                    className="size-6"
                    name={project.name}
                    image={project.imageUrl}
                    />
                    <p className="line-clamp-1">{project.name}</p>
                </div>
            )
        }
    },
    {
      accessorKey: "assignee",
      header: ({ column }) => {
          return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Assignee
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
      },

      cell: ({ row }) => {
          const assignee = row.original.assignee;

          return(
              <div className="flex items-center gap-x-2 text-sm font-medium">
                  <MemberAvatar 
                  className="size-6"
                  fallbackClassName="text-xs"
                  name={assignee.name}
                  />
                  <p className="line-clamp-1">{assignee.name}</p>
              </div>
          )
      }
  },

    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },

        cell: ({ row }) => {
            const dueDate = row.original.dueDate;

            return <TaskDate value = {dueDate} />
        }
    },

    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              )
        },

        cell: ({ row }) => {
            const status = row.original.status;

            return <Badge>{status}</Badge>
        }
    }

];