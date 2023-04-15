import React, { Fragment, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { XIcon, PhotographIcon } from "@heroicons/react/solid";

import ConfirmDialog from "../ConfirmDialog";
import { errorMessage } from "@utils/atoms/errorMessage";
import { getStoryState } from "@utils/atoms/getStoryState";

interface IProps {
	isOpen: boolean;
	setIsOpen: (prop: boolean) => void;
	closeModal: () => void;
	isConfirmDialogOpen: boolean;
	closeConfirmDialog: () => void;
	onPositiveClick: () => void;
}

function UploadStoryModal({
	isOpen,
	setIsOpen,
	closeModal,
	isConfirmDialogOpen,
	closeConfirmDialog,
	onPositiveClick,
}: IProps) {
	const setUploadError = useSetRecoilState(errorMessage);
	const [storyToUpload, setStoryToUpload] = useRecoilState(getStoryState);

	const removeImage = () => setStoryToUpload(null);

	const onDrop = useCallback(
		<T extends File>(files: T[]) => {
			const newFile = files[0];
			const fileReader = new FileReader();
			if (!newFile) return;
			fileReader.readAsDataURL(newFile);
			fileReader.onload = (readerEvent) =>
				setStoryToUpload(readerEvent.target?.result as string);
		},
		[setStoryToUpload]
	);

	const { getRootProps, getInputProps, inputRef } = useDropzone({ onDrop });

	function uploadStory() {
		removeImage();
		setIsOpen(false);
		setUploadError("This feature will be ready soon.");
	}

	return (
		<>
			<Transition show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-30 overflow-y-auto"
					onClose={closeModal}
					unmount
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
								className="inline-block w-full max-w-md p-4
              my-8 overflow-hidden text-left align-middle transition-all 
              transform bg-white shadow-xl rounded-2xl"
							>
								<Dialog.Title
									as="h3"
									className="text-lg text-center font-semibold 
                leading-6 text-gray-900 border-b pb-4"
								>
									Create new story
								</Dialog.Title>

								{/* drop file and image preview */}
								<div className="my-4 h-36 flex justify-center items-center">
									{!storyToUpload ? (
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
										<div className="relative">
											<img
												src={storyToUpload}
												alt=""
												className="aspect-auto h-36"
											/>
											<span
												aria-label="remove image"
												role="button"
												className="p-1 rounded-full bg-black 
                      absolute top-0 right-0 cursor-pointer"
												onClick={removeImage}
											>
												<XIcon className="h-5 w-5 text-white" />
											</span>
										</div>
									)}
									<input
										hidden
										type="file"
										{...getInputProps({ accept: "image/*", multiple: false })}
									/>
								</div>

								{/* buttons */}
								<div className="mt-4 flex flex-col gap-2">
									{storyToUpload ? (
										<button
											type="button"
											className="px-4 py-2 text-sm text-center
                      font-semibold text-white bg-red-600 border 
                      border-transparent rounded-md hover:bg-red-700"
											onClick={uploadStory}
										>
											Upload story
										</button>
									) : (
										<button
											type="button"
											className="px-4 py-2 text-sm text-center
                      font-semibold text-white bg-blue-600 border 
                      border-transparent rounded-md hover:bg-blue-700"
											onClick={() => inputRef.current?.click()}
										>
											Select from device
										</button>
									)}
								</div>
							</div>
						</Transition.Child>
					</div>
					<ConfirmDialog
						title="Discard Post?"
						subtitle="If you leave, your edits won't be saved"
						positiveButtonColor="text-red-500"
						positiveButtonLable="Discard"
						isOpen={isConfirmDialogOpen}
						closeModal={closeConfirmDialog}
						onPositiveClick={onPositiveClick}
					/>
				</Dialog>
			</Transition>
		</>
	);
}

export default UploadStoryModal;
