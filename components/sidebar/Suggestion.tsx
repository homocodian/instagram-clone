import React from "react";

function Suggestion() {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
          }
          alt="profile"
          className="rounded-full w-8 h-8 object-cover"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold">ashish_s_singh</p>
          <p className="capitalize text-xs text-gray-400 font-medium w-[96%] truncate">
            followed by ashish_s_singh
          </p>
        </div>
      </div>
      <button
        aria-label="follow"
        className="text-xs text-blue-500 font-semibold capitalize"
      >
        follow
      </button>
    </div>
  );
}

export default Suggestion;
