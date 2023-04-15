import { useRef } from "react";

import { SearchIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";

function Middle() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const clearInput = () => {
		if (!inputRef.current?.value) return;
		inputRef.current.value = "";
	};

	return (
		<div
			className="hidden sm:flex items-center group px-4 py-2 
      rounded-lg bg-insta-white"
		>
			<div
				className="flex 
        items-center pointer-events-none justify-center"
			>
				<SearchIcon className="h-5 w-5 text-gray-500" />
			</div>
			<input
				ref={inputRef}
				className="bg-transparent block w-full px-2
        sm:text-sm text-gray-600 outline-none focus:outline-none"
				type="text"
				placeholder="Search"
			/>
			<div
				className="opacity-0 group-focus-within:opacity-100 inline-flex 
        items-center justify-center cursor-pointer"
				onClick={clearInput}
			>
				<XCircleIcon className="h-5 w-5 text-gray-500" />
			</div>
		</div>
	);
}

export default Middle;
