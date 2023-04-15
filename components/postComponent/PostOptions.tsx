import { Fragment, useRef, useState } from "react";

import { useSetRecoilState } from "recoil";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Dialog, Transition } from "@headlessui/react";

import isOnline from "@utils/checkNetwork";
import ConfirmDialog from "../ConfirmDialog";
import { useAuth } from "@utils/AuthProvider";
import { db, storage } from "@utils/firebase";
import getErrorMessage from "@utils/firebaseErrors";
import { errorMessage } from "@utils/atoms/errorMessage";

interface IProps {
	id: string;
	isOpen: boolean;
	username: string;
	images: { imageUrl: string; imageName: number }[];
	closeModal: () => void;
	deleteRealtimePost: (id: string) => void;
}

function PostOptions({
	id,
	isOpen,
	username,
	closeModal,
	images,
	deleteRealtimePost,
}: IProps) {
	const { user } = useAuth();
	const setDeleteError = useSetRecoilState(errorMessage);
	const initialCancelButtonRef = useRef<HTMLParagraphElement | null>(null);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

	async function deletePost() {
		closeModal();
		if (!isOnline()) {
			setDeleteError("Check your network.");
			return;
		}
		const deleteImagesPromise: Promise<void>[] = [];
		const deletePostDoc = deleteDoc(doc(db, `posts/${id}`));
		deleteImagesPromise.push(deletePostDoc);
		images.forEach((image) => {
			const imageToBeDeleted = deleteObject(
				ref(storage, `posts/${image.imageName}`)
			);
			deleteImagesPromise.push(imageToBeDeleted);
		});
		try {
			await Promise.all(deleteImagesPromise);
			deleteRealtimePost(id);
		} catch (error: any) {
			setDeleteError(getErrorMessage(error));
		}
	}

	const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				initialFocus={initialCancelButtonRef}
				className="fixed inset-0 z-30 overflow-y-auto"
				onClose={closeModal}
				open={isOpen}
			>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div
							className="inline-block w-full max-w-[400px] my-8 overflow-hidden 
              text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
						>
							<div className="flex flex-col items-center justify-center divide-y">
								<p
									aria-label="report post"
									className="p-[13px] text-sm capitalize text-red-500 font-bold w-full 
                  text-center cursor-pointer"
									role={"button"}
								>
									report
								</p>
								<p
									aria-label="unfollow account"
									className="p-[13px] text-sm capitalize text-red-500 font-bold w-full 
                  text-center cursor-pointer"
								>
									unfollow
								</p>
								{username === user?.email && (
									<p
										aria-label="delete post"
										className="p-[13px] text-sm capitalize text-red-500 font-bold w-full 
                  text-center cursor-pointer"
										role={"button"}
										onClick={() => setIsConfirmDialogOpen(true)}
									>
										delete
									</p>
								)}
								<p
									aria-label="go to post"
									className="p-[13px] text-sm capitalize w-full text-center cursor-pointer"
									role={"button"}
								>
									go to post
								</p>
								<p
									aria-label="share post"
									className="p-[13px] text-sm capitalize w-full text-center cursor-pointer"
									role={"button"}
								>
									share to...
								</p>
								<p
									aria-label="copy link"
									className="p-[13px] text-sm capitalize w-full text-center cursor-pointer"
									role={"button"}
								>
									copy link
								</p>
								<p
									aria-label="embed post"
									className="p-[13px] text-sm capitalize w-full text-center cursor-pointer"
									role={"button"}
								>
									embed
								</p>
								<p
									ref={initialCancelButtonRef}
									aria-label="close menu"
									className="p-[13px] text-sm capitalize w-full text-center cursor-pointer"
									role={"button"}
									onClick={closeModal}
								>
									cancel
								</p>
							</div>
						</div>
					</Transition.Child>
				</div>
				<ConfirmDialog
					isOpen={isConfirmDialogOpen}
					closeModal={closeConfirmDialog}
					onPositiveClick={deletePost}
					title="Do you want to delete this post?"
					positiveButtonColor="text-red-500"
					positiveButtonLable="delete"
				/>
			</Dialog>
		</Transition>
	);
}

export default PostOptions;
