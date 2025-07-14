import { useState } from "react";
import { createAPIClient } from "../lib/apiClient";
import { useAuth } from "../context/AuthContext";
import { Memory, AddMemoryRequestBody, AddMemoryResponse } from "../types/api/chat";

const api = createAPIClient(() => null);

export const useAddMemory=()=>{
    const {user}=useAuth();
    const [isSending,setIsSending]=useState<boolean>(false);

    const addMemory=async (memoryData:AddMemoryRequestBody):Promise<Memory|null>=>{
        if(!memoryData || !user){
            console.error("User not authenticated or no memory data provided");
            return null;
        }
        setIsSending(true);
        try{
            const token=await user.getIdToken();
            const newMemory = await api.POST('/api/v1/chat/memory-wall', memoryData, {
                headers: { Authorization: `Bearer ${token}` },
                withAuth: false, // Prevent default auth logic
            }) as AddMemoryResponse;
            return newMemory;
        }catch(err){
            console.error("failed to add to memory");
            return null;
        }finally{
            setIsSending(false);
        }
    };
    return {addMemory,isSending};
};