import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
}

function PostOptions({ isOpen, closeModal }: IProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
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
                  className="p-[13px] text-sm capitalize text-red-500 font-bold w-full 
                  text-center cursor-pointer"
                >
                  report
                </p>
                <p
                  className="p-[13px] text-sm capitalize text-red-500 font-bold w-full 
                  text-center cursor-pointer"
                >
                  unfollow
                </p>
                <p className="p-[13px] text-sm capitalize w-full text-center cursor-pointer">
                  go to post
                </p>
                <p className="p-[13px] text-sm capitalize w-full text-center cursor-pointer">
                  share to...
                </p>
                <p className="p-[13px] text-sm capitalize w-full text-center cursor-pointer">
                  copy link
                </p>
                <p className="p-[13px] text-sm capitalize w-full text-center cursor-pointer">
                  embed
                </p>
                <p
                  className="p-[13px] text-sm capitalize w-full text-center cursor-pointer"
                  onClick={closeModal}
                >
                  cancel
                </p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default PostOptions;
