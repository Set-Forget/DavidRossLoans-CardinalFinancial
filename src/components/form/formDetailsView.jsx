import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function FormDetailsView() {
    const data = useContext(ModalContext).state.payload;

    return (
        <div>
            <dl className="divide-y divide-gray-100 flex flex-col gap-4">
                <div className="px-6 py-6 grid grid-cols-3 gap-4">
                    <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                        Key Contact Person Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                        {data[2] || "N/A"}
                    </dd>
                </div>
                <div className="relative flex items-center !border-t-0">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Loan Officer</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 !border-t-0">
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">Scenario</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[3] || "N/A"}
                        </dd>
                    </div>
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                            Deal Goal Expressed By Borrower
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[4] || "N/A"}
                        </dd>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                            Income⬦Employment B1⬦Loan Officer Notes⬦Loan App
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[5] || "N/A"}
                        </dd>
                    </div>
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                            Income⬦Employment B2⬦Loan Officer Notes⬦Loan App
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[6] || "N/A"}
                        </dd>
                    </div>
                </div>
                <div className="border !border-t-0 !border-b rounded-lg">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm">Cash From Borrower</span>
                    <div className="flex-grow border-t border-gray-100"></div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="px-6 py-4 gap-4">
                            <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                                Best Case⬦Cash from borrower
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                                {data[7] || "N/A"}
                            </dd>
                        </div>
                        <div className="px-6 py-4 gap-4">
                            <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                                Worst Case⬦Cash from borrower
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                                {data[8] || "N/A"}
                            </dd>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="px-6 py-4">
                            <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                                Account the assets to close are coming from?
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                                {data[9] || "N/A"}
                            </dd>
                        </div>
                        <div className="px-6 py-4">
                            <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                                Borrower current estimated balance in the account?
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                                {data[10] || "N/A"}
                            </dd>
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                            Assets⬦1003⬦Notes:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[11] || "N/A"}
                        </dd>
                    </div>
                </div>
                <div className="px-6 py-4 !border-t-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                        Questions For Borrower
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                        {data[12] || "N/A"}
                    </dd>
                </div>
                <div className="px-6 py-4">
                    <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                        Questions For Operations/Underwriting
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                        {data[13] || "N/A"}
                    </dd>
                </div>
                <div className="relative flex items-center !border-t-0">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Ops⬦Review</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>
                <div className="px-6 py-4 !border-t-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                        Income⬦Employment⬦Notes
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                        {data[14] || "N/A"}
                    </dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                            Income Documents Needed & Follow Up Questions⬦B1
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[15] || "N/A"}
                        </dd>
                    </div>
                    <div className="px-6 py-4">
                        <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                            Income Documents Needed & Follow Up Questions⬦B2
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                            {data[16] || "N/A"}
                        </dd>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <dt className="text-sm font-medium leading-6 text-gray-900 text-left">Assets⬦Notes</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                        {data[17] || "N/A"}
                    </dd>
                </div>
                <div className="px-6 py-4">
                    <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
                        Asset Documents Still Needed⬦Follow Up Questions{" "}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 col-span-2 text-left">
                        {data[18] || "N/A"}
                    </dd>
                </div>
            </dl>
        </div>
    );
}
