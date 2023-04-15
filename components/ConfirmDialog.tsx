import { Fragment, useRef } from "react";

import { Dialog, Transition } from "@headlessui/react";

interface IProps {
	title: string;
	subtitle?: string;
	positiveButtonLable?: string;
	negativeButtonLabel?: string;
	positiveButtonColor?: "text-green-500" | "text-red-500";
	onPositiveClick: () => void;
	isOpen: boolean;
	closeModal: () => void;
}

function ConfirmDialog({
	title,
	subtitle,
	positiveButtonLable = "OK",
	negativeButtonLabel = "Cancel",
	positiveButtonColor = "text-green-500",
	onPositiveClick,
	isOpen,
	closeModal,
}: IProps) {
	const initialCancelButtonRef = useRef<HTMLButtonElement | null>(null);
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				initialFocus={initialCancelButtonRef}
				className="fixed inset-0 z-40 overflow-y-auto"
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
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
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
							className="inline-block w-full max-w-md p-6 my-8 overflow-hidden 
              text-left align-middle transition-all transform bg-white 
              shadow-xl rounded-2xl"
						>
							<Dialog.Title as="div" className="text-center py-2 border-b">
								<h3
									className="text-lg font-semibold leading-6
                text-gray-900 text-center"
								>
									{title}
								</h3>
								{subtitle && (
									<p className="text-sm mt-2 text-gray-500">{subtitle}</p>
								)}
							</Dialog.Title>
							<div className="mt-2 flex flex-col justify-center divide-y gap-1">
								<button
									type="button"
									className={`inline-flex justify-center px-4 py-2 
                  text-sm font-semibold ${positiveButtonColor}
                  focus:outline-none capitalize`}
									onClick={onPositiveClick}
								>
									{positiveButtonLable}
								</button>
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 
                  text-sm font-medium text-gray-900 focus:outline-none"
									onClick={closeModal}
									ref={initialCancelButtonRef}
								>
									{negativeButtonLabel}
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ConfirmDialog;
