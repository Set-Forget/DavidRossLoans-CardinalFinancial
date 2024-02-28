import {
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
    LinkIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Menu from "../components/Menu";
import Table from "../components/Table";
import NewFormView from "../components/form/newFormView";
import Dialog from "../components/form/dialog";
import EditFormView from "../components/form/editFormView";
import FormDetailsView from "../components/form/formDetailsView";
import Modal from "../components/form/modal";
import { DialogContext } from "../context/DialogContext";
import { ModalContext } from "../context/ModalContext";
import { FORM_API_URL } from "../utils/utils";

const columns = [
    { name: "Form Name", accessor: "formName" },
    { name: "Key Contact Person Name", accessor: "keyContactPersonName" },
    { name: "Deal ID", accessor: "dealId" },
    { name: "", accessor: "actions" },
];

const itemsPerPage = 10;

export default function FormPage() {
    const modalDispatch = useContext(ModalContext).dispatch;
    const dialogDispatch = useContext(DialogContext).dispatch;

    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const getAllForms = async () => {
        setLoading(true);
        try {
            const url = `${FORM_API_URL}?action=getForms`;
            const response = await fetch(url);
            const resJson = await response.json();
            const formattedData = resJson.data.map((item) => {
                return {
                    formName: item[1],
                    keyContactPersonName: item[2],
                    dealId: item[19],
                    actions: (
                        <Menu
                            icon={<EllipsisHorizontalIcon className="h-5 w-5" />}
                            className="!p-1.5 !rounded-full"
                            variant="ghost"
                            options={[
                                {
                                    name: "View form",
                                    onClick: () => handleViewFormDetails(item),
                                    icon: ({ className }) => <ChevronRightIcon className={className} />,
                                },
                                {
                                    name: "Edit form",
                                    onClick: () => handleEditForm(item),
                                    icon: ({ className }) => <PencilIcon className={className} />,
                                },
                                {
                                    name: "Delete form",
                                    onClick: () => handleDeleteForm(item),
                                    icon: ({ className }) => <TrashIcon className={className} />,
                                    divider: true,
                                },
                                {
                                    name: "View document",
                                    onClick: () => handleGoToForm(item),
                                    icon: ({ className }) => <LinkIcon className={className} />,
                                },
                            ]}
                        />
                    ),
                };
            });
            setForms(formattedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewFormDetails = (form) => {
        modalDispatch({
            type: "OPEN_MODAL",
            title: `${form[1]}`,
            view: FormDetailsView,
            subtitle: "View form details",
            payload: form,
        });
    };

    const handleGoToForm = (form) => {
        const fileDetailsLink = `https://docs.google.com/spreadsheets/d/1QYdsX4NOqOrWOq7eYT8B8q0LnBTt4_dbXXACk3A3GyM/edit#gid=${form[0]}`;
        window.open(fileDetailsLink, "_blank").focus();
    };

    const handleEditForm = (form) => {
        modalDispatch({
            type: "OPEN_MODAL",
            title: `${form[1]}`,
            view: EditFormView,
            subtitle: "Edit form details",
            payload: { form, getAllForms },
        });
    };

    const handleDeleteForm = (form) => {
        dialogDispatch({
            type: "OPEN_DIALOG",
            title: `Delete ${form[1]} form`,
            description: "Are you sure you want to delete this form? This action cannot be undone.",
            onConfirm: async () => {
                try {
                    const dealId = form[19];
                    const encodedDealId = encodeURIComponent(dealId);
                    const url = `${FORM_API_URL}?action=deleteForm&&dealId=${encodedDealId}`;
                    await fetch(url);
                } catch (error) {
                    throw new Error(error);
                } finally {
                    getAllForms();
                }
            },
        });
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const totalPages = Math.ceil(forms.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = forms.slice(startIndex, endIndex);

    useEffect(() => {
        getAllForms();
    }, []);

    return (
        <>
            <Table
                title="1003 Forms"
                subtitle="List of all 1003 forms created"
                columns={columns}
                data={paginatedData}
                isLoading={loading}
                className="w-full"
                toolbar={
                    <div className="flex justify-end mt-4">
                        <Button
                            onClick={() =>
                                modalDispatch({
                                    type: "OPEN_MODAL",
                                    view: NewFormView,
                                    title: "1003 Notes | File Review Link | Master",
                                    subtitle:
                                        "Please provide the following information to complete your 1003 form.",
                                    payload: getAllForms,
                                })
                            }
                        >
                            <PlusIcon className="h-5 w-5 mr-2" />
                            New form
                        </Button>
                    </div>
                }
                footer={
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-200">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, forms.length)} of{" "}
                            {forms.length} entries
                        </span>
                        <div className="flex gap-2">
                            <Button onClick={handlePrevious} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button onClick={handleNext} disabled={currentPage === totalPages}>
                                Next
                            </Button>
                        </div>
                    </div>
                }
            />
            <Modal />
            <Dialog />
        </>
    );
}
