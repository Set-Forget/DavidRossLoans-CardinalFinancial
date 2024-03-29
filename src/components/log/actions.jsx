import { useContext } from "react";
import { LogsContext } from "../../context/LogContext";
import { Popover } from "@headlessui/react";
import Button from "../Button";
import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/20/solid";

export default function PopoverComponent({ row }) {
  const { dispatch } = useContext(LogsContext);

  return (
    <Popover className="relative">
      <Popover.Button onClick={handleClick}>
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-white p-1 rounded-lg w-44 right-0">
        <div className="grid grid-cols-1 truncate">
          <Button variant="ghost" className="flex justify-center items-center text-black" onClick={openModal}>
            <EyeIcon className="h-5 w-5 mr-3" />
            See more info
          </Button>
        </div>
      </Popover.Panel>
    </Popover>
  );

  function handleClick() {
    dispatch({
      type: "SET_SELECTED_ROW",
      payload: row,
    });
  }

  function openModal() {
    dispatch({
      type: "SHOW_MODAL",
      payload: true,
    });
  }
}
