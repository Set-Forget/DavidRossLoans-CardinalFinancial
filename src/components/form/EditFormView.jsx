import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { FORM_API_URL } from "../../utils/utils";

export default function EditFormView() {
    const { state, dispatch } = useContext(ModalContext);

    const [loading, setLoading] = useState(false);

    const formData = state.payload.form;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            formTitle: formData[1],
            keyContactPersonName: formData[2],
            scenario: formData[3],
            dealGoal: formData[4],
            incomeEmploymentB1: formData[5],
            incomeEmploymentB2: formData[6],
            bestCaseCash: formData[7],
            worstCaseCash: formData[8],
            accountAssets: formData[9],
            borrowerBalance: formData[10],
            loanOfficerNotes: formData[11],
            questionsBorrower: formData[12],
            questionsOperations: formData[13],
            incomeEmploymentNotes: formData[14],
            incomeDocumentsB1: formData[15],
            incomeDocumentsB2: formData[16],
            opsAssetsNotes: formData[17],
            assetDocuments: formData[18],
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const newData = JSON.stringify(data);
            const encodedNewData = encodeURIComponent(newData);
            const encodedTargetTime = encodeURIComponent(formData[0]);
            const url = `${FORM_API_URL}?action=editForm&&targetTime=${encodedTargetTime}&&newData=${encodedNewData}`;
            await fetch(url);
            reset();
            dispatch({ type: "CLOSE_MODAL" });
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
            state.payload.getAllForms();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-full mt-5">
                <Input
                    label="Form Title"
                    placeholder="Your answer"
                    register={register("formTitle", {
                        required: true,
                    })}
                    errors={errors.formTitle && "This field is required"}
                />
            </div>

            <div className="mt-5 relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400">Loan Officer</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid gap-x-6 gap-y-8 grid-cols-6">
                <div className="col-span-full">
                    <Input
                        label="Key Contact Person Name"
                        placeholder="Your answer"
                        register={register("keyContactPersonName", {
                            required: true,
                        })}
                        errors={errors.keyContactPersonName && "This field is required"}
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Scenario"
                        placeholder="Your answer"
                        register={register("scenario", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Deal Goal Expressed By Borrower"
                        placeholder="Your answer"
                        register={register("dealGoal", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income⬦Employment B1⬦Loan Officer Notes⬦Loan App"
                        placeholder="Your answer"
                        register={register("incomeEmploymentB1", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income⬦Employment B2⬦Loan Officer Notes⬦Loan App"
                        placeholder="Your answer"
                        register={register("incomeEmploymentB2", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Best Case⬦Cash from borrower (Goal)"
                        placeholder="Your answer"
                        register={register("bestCaseCash", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Worst Case⬦Cash from borrower (Max Cash Out of pocket)"
                        placeholder="Your answer"
                        register={register("worstCaseCash", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Account the assets to close are coming from?"
                        placeholder="Your answer"
                        register={register("accountAssets", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Borrower current estimated balance in the account?"
                        placeholder="Your answer"
                        register={register("borrowerBalance", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-full">
                    <Input
                        label="Assets⬦1003⬦Notes"
                        placeholder="Your answer"
                        register={register("loanOfficerNotes", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Questions For Borrower"
                        placeholder="Your answer"
                        register={register("questionsBorrower", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Questions For Operations/Underwriting"
                        placeholder="Your answer"
                        register={register("questionsOperations", {
                            required: false,
                        })}
                        textarea
                    />
                </div>
            </div>

            <div className="relative mt-5 flex py-5 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400">Ops⬦Review</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid gap-x-6 gap-y-8 grid-cols-6">
                <div className="col-span-full">
                    <Input
                        label="Income⬦Employment⬦Notes"
                        placeholder="Your answer"
                        register={register("incomeEmploymentNotes", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income Documents Needed & Follow Up Questions⬦B1"
                        placeholder="Your answer"
                        register={register("incomeDocumentsB1", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income Documents Needed & Follow Up Questions⬦B2"
                        placeholder="Your answer"
                        register={register("incomeDocumentsB2", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-full">
                    <Input
                        label="Assets⬦Notes"
                        placeholder="Your answer"
                        register={register("opsAssetsNotes", {
                            required: false,
                        })}
                        textarea
                    />
                </div>

                <div className="col-span-full">
                    <Input
                        label="Asset Documents Still Needed⬦Follow Up Questions"
                        placeholder="Your answer"
                        register={register("assetDocuments", {
                            required: false,
                        })}
                        textarea
                    />
                </div>
            </div>
            <div className="mt-5 flex justify-end">
                <Button type="submit" isLoading={loading}>
                    Submit
                </Button>
            </div>
        </form>
    );
}
