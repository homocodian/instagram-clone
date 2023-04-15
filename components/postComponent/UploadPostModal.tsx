import dynamic from "next/dynamic";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Dialog, Transition } from "@headlessui/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useRecoilState, useSetRecoilState } from "recoil";
import { XIcon, PhotographIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import Loader from "../Loader";
import PostCarousel from "./PostCarousel";
import isOnline from "@utils/checkNetwork";
import ConfirmDialog from "../ConfirmDialog";
import { useAuth } from "@utils/AuthProvider";
import { db, storage } from "@utils/firebase";
import getErrorMessage from "@utils/firebaseErrors";
import { errorMessage } from "@utils/atoms/errorMessage";
import { addPostState } from "@utils/atoms/addPostState";
import useOutsideAlerter from "@utils/hooks/useOutsideAlerter";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

function UploadPostModal() {
	// states and recoil states for global state management
	const { user } = useAuth();
	const [caption, setCaption] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const setUploadError = useSetRecoilState(errorMessage);
	const [confirmDialog, setConfirmDialog] = useState(false);
	const initialSelectButtonRef = useRef<HTMLButtonElement | null>(null);
	const { visible, setVisible, elementRef } = useOutsideAlerter(false);
	const [isPostModalOpen, setIsPostModalOpen] = useRecoilState(addPostState);
	const [postToUpload, setPostToUpload] = useState<string[] | null | undefined>(
		null
	);

	const closeConfirmDialog = () => setConfirmDialog(false);

	function removeImage(index: number) {
		setPostToUpload((prev) => prev?.splice(index, 1));
	}

	useEffect(() => {
		if (!postToUpload?.length) {
			setCaption("");
			setVisible(false);
		}
	}, [postToUpload, setVisible]);

	function readFileAsDataUrl<T extends File>(file: T): Promise<string> {
		return new Promise(function (resolve, reject) {
			let fr = new FileReader();

			fr.onload = function () {
				if (typeof fr.result === "string") {
					resolve(fr.result);
				} else {
					reject("Failed to read file");
				}
			};

			fr.onerror = function () {
				reject(fr);
			};

			fr.readAsDataURL(file);
		});
	}

	const onDrop = useCallback(
		<T extends File>(acceptedFiles: T[]) => {
			if (!acceptedFiles || !acceptedFiles.length) return;
			const readers = acceptedFiles.map((file) => readFileAsDataUrl(file));
			Promise.all(readers)
				.then((values) => {
					setPostToUpload(values);
				})
				.catch((reason) => {
					if (typeof reason === "string") {
						toast.error(reason);
						return;
					}
					toast.error("Failed to read file/files!");
				});
			resetFileState();
		},
		[setPostToUpload]
	);

	// only 5 files and upto only 5 mb is allowed
	const { getRootProps, getInputProps, inputRef } = useDropzone({
		onDrop,
		maxFiles: 5,
		maxSize: 5 * 1024 * 1024,
	});

	function resetFileState() {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	}

	function closeModal() {
		if (postToUpload && postToUpload.length > 0) {
			setConfirmDialog(true);
		} else {
			setIsPostModalOpen(false);
		}
	}

	function discardUploadPost() {
		setConfirmDialog(false);
		setVisible(false);
		setCaption("");
		setPostToUpload(null);
		setIsPostModalOpen(false);
	}

	function handleCaptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setCaption(e.target.value);
	}

	function handleEmojiPickerClick() {
		setVisible((prev) => !prev);
	}

	function onEmojiClick(_: any, emojiObject: any) {
		setCaption((prev) => prev + emojiObject.emoji);
	}

	async function uploadPost(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!isOnline()) {
			setUploadError("Check your internet connection.");
			return;
		}
		if (!postToUpload || !postToUpload.length) return;
		setIsUploading(true);
		const uploadTasks: Promise<{ imageUrl: string; imageName: number }>[] = [];
		postToUpload.map((post) => {
			const imageName = Date.now();
			const uploadTask = uploadString(
				ref(storage, `posts/${imageName}`),
				post,
				"data_url"
			).then(async (data) => {
				const imageUrl = await getDownloadURL(data.ref);
				return { imageUrl, imageName };
			});
			uploadTasks.push(uploadTask);
		});
		try {
			const images = await Promise.all(uploadTasks);
			await addDoc(collection(db, `posts`), {
				displayName: user?.displayName,
				uid: user?.uid,
				profile: user?.photoURL,
				email: user?.email,
				caption: caption,
				images,
				timestamp: serverTimestamp(),
			});
		} catch (error: any) {
			setUploadError(getErrorMessage(error));
		} finally {
			setIsUploading(false);
			setPostToUpload(null);
			setIsPostModalOpen(false);
		}
	}

	return (
		<>
			<Transition appear show={isPostModalOpen} as={Fragment}>
				<Dialog
					as="div"
					initialFocus={initialSelectButtonRef}
					className="fixed inset-0 z-30 overflow-y-auto"
					onClose={closeModal}
					open={isPostModalOpen}
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
							<Dialog.Overlay className="fixed inset-0 bg-black opacity-80">
								<button
									className="fixed top-4 right-4 focus:outline-none outline-none"
									onClick={closeModal}
								>
									<XIcon className="h-8 text-white" />
								</button>
							</Dialog.Overlay>
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
								className={`inline-block max-w-3xl p-4
              my-8 overflow-hidden text-left align-middle transition-all 
              transform bg-white shadow-xl rounded-2xl`}
							>
								<Dialog.Title
									as="h3"
									className="text-lg text-center font-semibold 
                leading-6 text-gray-900 border-b pb-4"
								>
									Upload new post
								</Dialog.Title>

								<form onSubmit={uploadPost}>
									<div className="flex flex-col md:flex-row md:gap-4">
										{/* drop file and image preview */}
										<div
											className={`my-4 h-full flex justify-center items-center md:w-64`}
										>
											{!postToUpload || !postToUpload?.length ? (
												<div
													className="flex justify-center items-center flex-col"
													{...getRootProps()}
												>
													<PhotographIcon className="h-10 w-10" />
													<p className="text-center font-medium">
														Drag photos and videos here
													</p>
												</div>
											) : (
												<PostCarousel>
													{postToUpload.map((postImage, index) => (
														<div
															className="relative h-36 w-auto select-none"
															key={index}
														>
															<img
																src={postImage}
																alt="picked image"
																className="h-36 w-36 aspect-auto object-contain"
															/>
															<span
																aria-label="remove image"
																role="button"
																className="p-1 rounded-full bg-black 
                              absolute top-0 right-0 cursor-pointer"
																onClick={() => removeImage(index)}
															>
																<XIcon className="h-5 w-5 text-white" />
															</span>
														</div>
													))}
												</PostCarousel>
											)}
											<input
												hidden
												type="file"
												maxLength={3}
												{...getInputProps({
													accept: "image/jpeg,image/png",
													multiple: true,
												})}
											/>
										</div>
										{/* write caption for post */}
										{postToUpload && postToUpload.length > 0 && (
											<div className="border-t md:border-0 pt-4 flex flex-col gap-2 mx-2 relative md:flex-1">
												<div className="flex gap-3">
													<img
														src={user?.photoURL || ""}
														alt="profile"
														className="h-8 w-8 rounded-full"
													/>
													<p className="flex-1">{user?.email}</p>
												</div>
												<div className="flex-1">
													<textarea
														name="caption"
														id="post-caption"
														maxLength={2200}
														value={caption}
														rows={3}
														onChange={handleCaptionChange}
														placeholder="Write a caption..."
														className="w-full resize-none outline-none focus:outline-none"
													></textarea>
												</div>
												<div className="flex items-center justify-between relative">
													<button
														aria-label="emoji picker"
														type="button"
														onClick={handleEmojiPickerClick}
													>
														<EmojiHappyIcon className="h-5 w-6 text-gray-400" />
													</button>
													{visible && (
														<div ref={elementRef}>
															<Picker
																onEmojiClick={onEmojiClick}
																pickerStyle={{
																	position: "absolute",
																	left: "4px",
																	bottom: "100%",
																	height: "200px",
																}}
																disableSearchBar
																disableSkinTonePicker
																disableAutoFocus
																native
															/>
														</div>
													)}
													<p className="text-xs text-gray-400">
														{`${caption.length}/2,200`}
													</p>
												</div>
											</div>
										)}
									</div>
									{/* buttons */}
									<div className="mt-4 flex flex-col gap-2">
										{postToUpload && postToUpload.length > 0 ? (
											<button
												type="submit"
												className="px-4 py-2 text-sm grid place-items-center
                        font-semibold text-white bg-red-600 border 
                        border-transparent rounded-md hover:bg-red-700 disabled:bg-red-300 
                        focus:outline-none focus:ring-2 focus:ring-red-200"
												disabled={isUploading ? true : false}
											>
												{isUploading ? <Loader /> : "Upload post"}
											</button>
										) : (
											<button
												type="button"
												ref={initialSelectButtonRef}
												className="px-4 py-2 text-sm text-center
                        font-semibold text-white bg-blue-600 border 
                        border-transparent rounded-md hover:bg-blue-700 focus:outline-none 
                        focus:ring-4 focus:ring-blue-200"
												onClick={() => inputRef.current?.click()}
											>
												Select from device
											</button>
										)}
									</div>
								</form>
							</div>
						</Transition.Child>
					</div>
					<ConfirmDialog
						isOpen={confirmDialog}
						closeModal={closeConfirmDialog}
						title="Discard Post!"
						subtitle="If you leave, your edits won't be saved."
						positiveButtonColor="text-red-500"
						positiveButtonLable="Discard"
						onPositiveClick={discardUploadPost}
					/>
				</Dialog>
			</Transition>
		</>
	);
}

export default UploadPostModal;
