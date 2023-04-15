import { useState } from "react";
import Image from "next/image";

import { Timestamp } from "firebase/firestore";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

import Footer from "./Footer";
import PostOptions from "./PostOptions";
import PostCarousel from "./PostCarousel";

interface IProps {
	id: string;
	profile: string;
	username: string;
	caption: string;
	timestamp: Timestamp;
	images: { imageUrl: string; imageName: number }[];
	deleteRealtimePost: (id: string) => void;
}

function Post({
	id,
	username,
	timestamp,
	profile,
	caption,
	images,
	deleteRealtimePost,
}: IProps) {
	const [isPostOptionOpen, setIsPostOptionsOpen] = useState(false);

	function closeModal() {
		setIsPostOptionsOpen(false);
	}

	function openModal() {
		setIsPostOptionsOpen(true);
	}

	return (
		<>
			<div className="border rounded-[3px] bg-white mb-6">
				<div>
					<header className="px-3 py-[10px] flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div
								className="p-[2px] rounded-full bg-gradient-to-bl 
              from-fuchsia-700 to-amber-500"
							>
								<div className="p-[2px] bg-white rounded-full">
									<img
										className="rounded-full object-cover h-[36px] w-[36px]"
										src={profile}
										alt=""
									/>
								</div>
							</div>
							<p className="font-semibold text-sm">{username}</p>
						</div>
						<div className="text-center cursor-pointer" onClick={openModal}>
							<DotsHorizontalIcon className="h-4 w-4 text-gray-900" />
						</div>
					</header>
					<PostCarousel>
						{images.map((image) => (
							<div
								key={id}
								className="relative w-full h-[450px] sm:h-[600px] select-none"
							>
								<Image
									priority
									layout="fill"
									objectFit="cover"
									src={image.imageUrl}
									alt=""
								/>
							</div>
						))}
					</PostCarousel>
					<Footer
						id={id}
						username={username}
						date={timestamp}
						caption={caption}
					/>
				</div>
			</div>
			<PostOptions
				id={id}
				images={images}
				isOpen={isPostOptionOpen}
				closeModal={closeModal}
				username={username}
				deleteRealtimePost={deleteRealtimePost}
			/>
		</>
	);
}

export default Post;
