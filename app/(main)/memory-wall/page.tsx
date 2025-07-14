"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  Brain,
  Star,
  Trophy,
  Book,
  Target,
  Lightbulb,
  Award,
  LucideIcon,
  Icon
} from "lucide-react";
import { useFetchAllMemories } from "../../../hooks/useFetchAllMemories"; // 1. Import the hook
import { MemoryListItem } from "../../../types/api/chat"; // 2. Import the correct type

const categoryStyles: { [key: string]: { icon: LucideIcon; color: string } } = {
  Learning: { icon: Book, color: "from-green-500 to-emerald-600" },
  Achievement: { icon: Brain, color: "from-purple-500 to-indigo-600" },
  Milestone: { icon: Star, color: "from-yellow-500 to-orange-500" },
  Progress: { icon: Target, color: "from-blue-500 to-cyan-600" },
  Discovery: { icon: Lightbulb, color: "from-pink-500 to-rose-600" },
  Project: { icon: Trophy, color: "from-amber-500 to-yellow-600" },
  Recent: { icon: Award, color: "from-teal-500 to-cyan-600" },
  Default: { icon: CheckCircle, color: "from-gray-500 to-gray-600" },
};

const MemoryWall = () => {
  const { memories, isLoading, error } = useFetchAllMemories();
  const [selectedMemory, setSelectedMemory] = useState<MemoryListItem | null>(null);


  const getCategoryStyle=(category:string)=>{
    return categoryStyles[category] ?? categoryStyles.Default;
  }

  // This function renders the modal. It's only called when needed.
  const renderMemoryModal = () => {
    // The check happens right at the beginning. If no memory is selected, we return nothing.
    if (!selectedMemory) {
      return null;
    }

    // Inside this function, TypeScript knows `selectedMemory` is not null.
    const style = getCategoryStyle(selectedMemory.category);
    const IconComponent = style?.icon;
    if(!IconComponent){
      return null;
    }

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-full w-6 h-6 text-white bg-gradient-to-r ${style?.color} shadow-lg`}>
              <IconComponent/>
            </div>
            <button
              onClick={() => setSelectedMemory(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{selectedMemory.title}</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
              {selectedMemory.category}
            </span>
          </div>
          <p className="text-gray-300 mb-6">{selectedMemory.summary}</p>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedMemory(null)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg transition-all">
              Share Memory
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Memory Wall<span className="text-2xl ml-2">🧠</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your journey of learning and discovery.
          </p>
        </div>
      </div>

      {/* Memory Grid */}
      <div className="max-w-6xl mx-auto">
        {isLoading && <div className="text-center text-white">Loading memories...</div>}
        {error && <div className="text-center text-red-400">Error: {error}</div>}
        
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory) => {
              const style = categoryStyles[memory.category] || categoryStyles.Default;
              const IconComponent = style?.icon;
              if(!IconComponent)return null;
              return (
                <div
                  key={memory._id}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedMemory(memory)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full w-6 h-6 text-white bg-gradient-to-r ${style?.color} shadow-lg`}>
                      <IconComponent/>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                      {memory.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{memory.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{memory.summary}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Render the modal by calling the function */}
      {renderMemoryModal()}

      {/* Stats Footer */}
      <div className="max-w-6xl mx-auto mt-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{memories.length}</div>
            <div className="text-gray-400 text-sm">Total Memories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{memories.length}</div>
            <div className="text-gray-400 text-sm">Achievements</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">{memories.filter((m) => m.category === "Learning").length}</div>
            <div className="text-gray-400 text-sm">Learning Goals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{memories.filter((m) => m.category === "Milestone").length}</div>
            <div className="text-gray-400 text-sm">Milestones</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MemoryWall;
