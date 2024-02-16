import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import Button from "../Button";

export default function Modal() {
    const { state, dispatch } = useContext(ModalContext);

    const handleClose = () => {
        dispatch({ type: "CLOSE_MODAL" });
    };

    const View = state.view ? state.view : Fragment;

    return (
        <Transition.Root show={state.open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                    />
                </Transition.Child>
                <div className="fixed inset-0 z-10">
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
                            <Dialog.Panel className="relative w-min min-w-[900px] max-w-7xl z-10 rounded-lg transform bg-white text-left shadow-xl transition-all my-8">
                                <div className="rounded-lg">
                                    <div className="flex flex-col items-center">
                                        <div className="text-center w-full">
                                            <div className="border-b py-4">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-base font-semibold leading-7 text-gray-900"
                                                >
                                                    {state.title}
                                                </Dialog.Title>
                                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                                    {state.subtitle}
                                                </p>
                                                <Button
                                                    className="absolute top-2 right-2 !p-1.5 !rounded-full !text-gray-600"
                                                    variant="ghost"
                                                    onClick={handleClose}
                                                >
                                                    <XMarkIcon className="h-5 w-5" />
                                                </Button>
                                            </div>
                                            <div className="overflow-y-auto overflow-x-hidden max-h-[60vh] px-5 pb-5">
                                                <View />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
