import React, { useState } from "react";

import Profile from "./Profile";
import { data } from "@utils/data";
import Suggestion from "./Suggestion";

function Sidebar() {
	const [suggestions] = useState(data.slice(0, 5));
	return (
		<aside className="w-full">
			<Profile />
			<div className="flex items-center justify-between mt-4 w-full">
				<p className="text-gray-400 font-semibold capitalize text-sm flex-1">
					suggestion for you
				</p>
				<button className="text-xs font-semibold capitalize">see all</button>
			</div>
			{suggestions.map(({ id, email, imageUrl, followers }) => (
				<Suggestion
					key={id}
					email={email}
					follower={followers[0]}
					imageUrl={imageUrl}
				/>
			))}
			<p className="mt-8 text-gray-500 capitalize text-xs opacity-40">
				&copy; {` ${new Date().getFullYear()} instagram clone by ashish singh`}
			</p>
		</aside>
	);
}

export default Sidebar;
