import { useContext } from "react";
import { LogsContext } from "../../context/LogContext";
import { Popover } from "@headlessui/react";
import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/20/solid";

export default function PopoverComponent({ row }) {
  const { dispatch } = useContext(LogsContext);

  return (
    <Popover className="relative">
      <Popover.Button onClick={handleClick}>
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-slate-700 text-white p-3 rounded-lg">
        <div className="grid grid-cols-1 truncate">
          <button className="flex items-center gap-3" onClick={openModal}>
            <EyeIcon className="h-5 w-5" />
            See more info
          </button>
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
