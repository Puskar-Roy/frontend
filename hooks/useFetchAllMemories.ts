import { useState, useEffect, useCallback } from "react";
import { createAPIClient } from "../lib/apiClient";
import { useAuth } from "../context/AuthContext";
import { MemoryListItem, GetAllMemoriesResponse } from "../types/api/chat";

const api = createAPIClient(() => null);

export const useFetchAllMemories=()=>{
    const {user}=useAuth();
    const [memories,setMemories]=useState<MemoryListItem[]>([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState<string|null>(null);

    const fetchMemories=useCallback(async ()=>{
        if(!user){
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try{
            const token=await user.getIdToken();
            console.log(token);
            
            // Make the authenticated API call
            const response = await api.GET("/api/v1/chat/get-memory", {
                headers: { Authorization: `Bearer ${token}` },
                withAuth: false, // Prevent default auth logic
            }) as GetAllMemoriesResponse;

            setMemories(response);
        }catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            console.error("Failed to fetch memories:", errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    },[user]);
    useEffect(()=>{
        fetchMemories();
    },[fetchMemories]);
    return{memories,isLoading,error,refetch:fetchMemories};
}