import React, { useState } from "react";
import UploadStoryModal from "./UploadStoryModal";
import { PlusIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { getConfirmDialogState } from "../../utils/atoms/getConfirmModalState";
import { getStoryState } from "../../utils/atoms/getStoryState";
import ConfirmDialog from "../Dialog/ConfirmDialog";

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
          className="h-16 w-16 rounded-full p-[2px] border-2 
        border-red-600"
          onClick={openStoryModal}
        >
          <div
            className="inline-grid w-full h-full place-items-center 
          rounded-full gradient-bg"
          >
            <PlusIcon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="text-xs text-center truncate">You</div>
      </div>
      <UploadStoryModal isOpen={isOpen} closeModal={closeModal} />
      <ConfirmDialog
        title="Discard Post?"
        subtitle="If you leave, your edits won't be saved"
        positiveButtonColor="text-red-500"
        positiveButtonLable="Discard"
        isOpen={isConfirmDialogOpen}
        closeModal={closeConfirmDialog}
        onPositiveClick={onPositiveClick}
      />
    </>
  );
}

export default CreateStory;
