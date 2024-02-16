import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/form/modal";
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import NewFormView from "../components/form/newFormView";
import FormDetailsView from "../components/form/formDetailsView";

const columns = [
    { name: "Form Name", accessor: "formName" },
    { name: "Key Contact Person Name", accessor: "keyContactPersonName" },
    { name: "Creation date", accessor: "date" },
    { name: "", accessor: "actions" },
];

const itemsPerPage = 10;

export default function FormPage() {
    const [forms, setForms] = useState([]);
    const { dispatch } = useContext(ModalContext);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const getAllForms = async () => {
        setLoading(true);
        try {
            const url = `https://script.google.com/macros/s/AKfycbwTcsaRy7JXT_w1yW3npDdwqOAeuH9z3wPoeWRmnhKSDMtxNlJ8NVzmpI3QWRBSpVyr/exec?action=getForms`;
            const response = await fetch(url);
            const resJson = await response.json();
            const formattedData = resJson.data
                .filter((_item, index) => index !== 0)
                .map((item) => {
                    return {
                        date:
                            new Date(item[0]).toLocaleDateString() +
                            " " +
                            new Date(item[0]).toLocaleTimeString(),
                        formName: item[1],
                        keyContactPersonName: item[2],
                        actions: (
                            <Button
                                onClick={() =>
                                    dispatch({
                                        type: "OPEN_MODAL",
                                        title: `${item[1]}`,
                                        view: FormDetailsView,
                                        subtitle: "View form details",
                                        payload: item,
                                    })
                                }
                                variant="link"
                            >
                                View form
                            </Button>
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
                                dispatch({
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
        </>
    );
}
