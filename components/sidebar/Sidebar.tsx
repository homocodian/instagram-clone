import React from "react";
import Profile from "./Profile";
import Suggestion from "./Suggestion";

function Sidebar() {
  return (
    <aside>
      <Profile />
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-400 font-semibold capitalize text-sm">
          suggestion for you
        </p>
        <button className="text-xs font-semibold capitalize">see all</button>
      </div>
      <Suggestion />
      <Suggestion />
      <Suggestion />
      <Suggestion />
      <Suggestion />
      <p className="mt-8 text-gray-500 capitalize text-xs opacity-40">
        &copy; {` ${new Date().getFullYear()} instagram clone by ashish singh`}
      </p>
    </aside>
  );
}

export default Sidebar;
