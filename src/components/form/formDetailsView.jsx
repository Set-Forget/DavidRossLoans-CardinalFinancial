import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function FormDetailsView() {
  const data = useContext(ModalContext).state.payload;

  const formatLoanOfficerTextForEmail = (data) => {
    return `
Loan Officer:
• Scenario: ${data[3] || "N/A"}
• Deal Goal Expressed By Borrower: ${data[4] || "N/A"}
• Income⬦Employment B1⬦Loan Officer Notes⬦Loan App: ${data[5] || "N/A"}
• Income⬦Employment B2⬦Loan Officer Notes⬦Loan App: ${data[6] || "N/A"}

Cash From Borrower:
• Best Case⬦Cash from borrower: ${data[7] || "N/A"}
• Worst Case⬦Cash from borrower: ${data[8] || "N/A"}
• Account the assets to close are coming from: ${data[9] || "N/A"}
• Borrower current estimated balance in the account: ${data[10] || "N/A"}
• Assets⬦1003⬦Notes: ${data[11] || "N/A"}
• Questions for Borrower: ${data[12] || "N/A"}
• Questions for Operations/Underwriting: ${data[13] || "N/A"}
    `.trim();
};


  const formatOpsReviewTextForEmail = (data) => {
    return `
Ops Review:
• Questions For Operations ⬦ Underwriting: ${data[13] || "N/A"}
• Income ⬦ Employment ⬦ Notes: ${data[14] || "N/A"}
• Income Documents Needed & Follow Up Questions ⬦ B1: ${data[15] || "N/A"}
• Income Documents Needed & Follow Up Questions ⬦ B2: ${data[16] || "N/A"}
• Assets ⬦ Notes: ${data[17] || "N/A"}
• Asset Documents Still Needed ⬦ Follow Up Questions: ${data[18] || "N/A"}
    `.trim();
};

  const copySectionTextToClipboard = (section) => {
    // Assuming `section` is the identifier for which section's text to format and copy
    let textToCopy;
    if (section == "loanOfficer") {
      textToCopy = formatLoanOfficerTextForEmail(data);
    } else {
      textToCopy = formatOpsReviewTextForEmail(data);
    }
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

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
        <div className="relative flex items-center w-full mt-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 -mt-6">
            Loan Officer
          </span>
          <button
            onClick={() => copySectionTextToClipboard("loanOfficer")}
            className="absolute right-0 text-xs bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full -mt-10"
          >
            Copy text
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 !border-t-0">
          <div className="px-6 py-4">
            <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
              Scenario
            </dt>
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
          <span className="flex-shrink mx-4 text-gray-400 text-sm">
            Cash From Borrower
          </span>
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
        <div className="relative flex items-center w-full mt-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 -mt-6">
            Ops⬦Review
          </span>
          <button
            onClick={() => copySectionTextToClipboard("opsReview")}
            className="absolute right-0 text-xs bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full -mt-10"
          >
            Copy text
          </button>
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
          <dt className="text-sm font-medium leading-6 text-gray-900 text-left">
            Assets⬦Notes
          </dt>
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
