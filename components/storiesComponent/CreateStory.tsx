import React, { useState } from "react";
import UploadStoryModal from "./UploadStoryModal";
import { PlusIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { getConfirmDialogState } from "../../utils/atoms/getConfirmModalState";
import { getStoryState } from "../../utils/atoms/getStoryState";

function CreateStory() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStory, setHasStory] = useRecoilState(getStoryState);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useRecoilState(
    getConfirmDialogState
  );

  const closeConfirmDialog = () => setConfirmDialogOpen(false);
  const openStoryModal = () => setIsOpen(true);
  const closeModal = () => {
    if (hasStory) setConfirmDialogOpen(true);
    else setIsOpen(false);
  };
  const onPositiveClick = () => {
    setConfirmDialogOpen(false);
    setHasStory(null);
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-16 cursor-pointer space-y-2">
        <div
          aria-label="create story"
          role={"button"}
          className="h-[64px] w-[64px] rounded-full p-[2px] 
          bg-gradient-to-bl from-fuchsia-600 to-amber-500"
          onClick={openStoryModal}
        >
          <div className="p-[2px] rounded-full bg-white">
            <div
              className="inline-grid w-[56px] h-[56px] place-items-center 
              rounded-full gradient-bg"
            >
              <PlusIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="text-xs text-center truncate">You</div>
      </div>
      {/* dialogs */}
      <UploadStoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        isConfirmDialogOpen={isConfirmDialogOpen}
        closeConfirmDialog={closeConfirmDialog}
        onPositiveClick={onPositiveClick}
      />
    </>
  );
}

export default CreateStory;
