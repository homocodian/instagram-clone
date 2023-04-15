import Image from "next/image";

import InstagramLogo from "../../public/instagram.png";
import InstagramLetterLogo from "../../public/instagram-letter-logo.png";

function Left() {
	return (
		<>
			<div
				className="relative hidden lg:inline-grid w-24
        cursor-pointer place-items-center"
			>
				<Image
					priority
					layout="fill"
					objectFit="contain"
					src={InstagramLetterLogo}
					alt="logo"
				/>
			</div>
			<div
				className="relative w-24 lg:hidden
        cursor-pointer"
			>
				<Image
					priority
					layout="fill"
					objectFit="contain"
					src={InstagramLogo}
					alt="logo"
				/>
			</div>
		</>
	);
}

export default Left;
