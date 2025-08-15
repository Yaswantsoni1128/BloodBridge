import React from "react";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const DonorActions = ({ onView, onEdit }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={onView} className="p-2 bg-red-100 hover:bg-red-200 rounded-full">
        <EyeIcon className="h-5 w-5 text-red-600" />
      </button>
      <button onClick={onEdit} className="p-2 bg-red-100 hover:bg-red-200 rounded-full">
        <PencilSquareIcon className="h-5 w-5 text-red-600" />
      </button>
    </div>
  );
};

export default DonorActions;
