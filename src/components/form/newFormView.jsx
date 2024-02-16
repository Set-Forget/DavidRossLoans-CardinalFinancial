import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function NewFormView() {
    const { state, dispatch } = useContext(ModalContext);

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const newDate = new Date().toISOString();
            const formData = JSON.stringify({
                time: newDate,
                ...data,
            });
            const encodedFormData = encodeURIComponent(formData);
            const url = `https://script.google.com/macros/s/AKfycbwTcsaRy7JXT_w1yW3npDdwqOAeuH9z3wPoeWRmnhKSDMtxNlJ8NVzmpI3QWRBSpVyr/exec?action=addToForm&&formData=${encodedFormData}`;
            await fetch(url);
            state.payload();
            reset();
            dispatch({ type: "CLOSE_MODAL" });
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
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
                    <Input label="Scenario" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-3">
                    <Input label="Deal Goal Expressed By Borrower" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income⬦Employment B1⬦Loan Officer Notes⬦Loan App"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income⬦Employment B2⬦Loan Officer Notes⬦Loan App"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input label="Best Case⬦Cash from borrower (Goal)" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Worst Case⬦Cash from borrower (Max Cash Out of pocket)"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Account the assets to close are coming from?"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Borrower current estimated balance in the account?"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-full">
                    <Input label="Assets⬦1003⬦Notes" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-3">
                    <Input label="Questions For Borrower" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-3">
                    <Input label="Questions For Operations/Underwriting" placeholder="Your answer" textarea />
                </div>
            </div>

            <div className="relative mt-5 flex py-5 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400">Ops⬦Review</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="grid gap-x-6 gap-y-8 grid-cols-6">
                <div className="col-span-full">
                    <Input label="Income⬦Employment⬦Notes" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income Documents Needed & Follow Up Questions⬦B1"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-3">
                    <Input
                        label="Income Documents Needed & Follow Up Questions⬦B2"
                        placeholder="Your answer"
                        textarea
                    />
                </div>

                <div className="col-span-full">
                    <Input label="Assets⬦Notes" placeholder="Your answer" textarea />
                </div>

                <div className="col-span-full">
                    <Input
                        label="Asset Documents Still Needed⬦Follow Up Questions"
                        placeholder="Your answer"
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
