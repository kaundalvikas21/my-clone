import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {client} from "@/lib/rpc";
type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    
    const mutation = useMutation<
    ResponseType,
    Error  
    >({
        mutationFn:async () => {
            const response = await client.api.auth.logout["$post"]();

            if (!response.ok){
                throw new Error ("Failed to logout");
            }

            return await response.json();
        },  
        onSuccess:() =>{
            toast.success("Logged out");  // Display a success toast notification
            
            router.refresh();  // Refresh the current route/page
            queryClient.invalidateQueries();   // Invalidate React Query caches
            // queryClient.invalidateQueries({queryKey: ["workspaces"] });
        },
        onError: () =>{
            toast.error("Failed to logout");
            },
    }); 
    return mutation; 
};
