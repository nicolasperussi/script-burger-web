import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import Button from "./subcomponents/button.components";

type ConfirmationModalProps = {
  isOpen: boolean;
  handleToggleModal: (state: boolean) => void;
  title: string;
  message: string;
  icon: "success" | "alert" | "warning";
  confirmFunction: () => void;
  cancelTitle: string;
  confirmTitle: string;
};

function ConfirmationModal({
  isOpen,
  handleToggleModal,
  title,
  message,
  icon,
  confirmFunction,
  cancelTitle,
  confirmTitle,
}: ConfirmationModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => handleToggleModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background-secondary bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-background-primary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-background-primary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {icon === "alert" ? (
                      <ExclamationTriangleIcon
                        className="h-12 w-12 text-red-600"
                        aria-hidden="true"
                      />
                    ) : icon === "warning" ? (
                      <QuestionMarkCircleIcon
                        className="h-12 w-12 text-amber-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckBadgeIcon
                        className="h-12 w-12 text-green-600"
                        aria-hidden="true"
                      />
                    )}

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-text-primary"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-text-primary">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-background-primary px-4 py-3 sm:flex sm:flex-row-reverse gap-3 sm:px-6">
                  <Button
                    title={confirmTitle}
                    onClick={confirmFunction}
                    size="sm"
                    variant={
                      icon === "alert"
                        ? "fill_red"
                        : icon === "warning"
                        ? "fill_amber"
                        : "fill_green"
                    }
                  />
                  <Button
                    title={cancelTitle}
                    onClick={() => handleToggleModal(false)}
                    size="sm"
                    variant="text_stone"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ConfirmationModal;
