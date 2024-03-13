import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../context/ModalContext";
import { FORM_API_URL, KEY_1003_LINK } from "../../utils/utils";
import Button from "../Button";
import Input from "../Input";
import SearchSelect from "../SearchSelect";

const API_URL = "https://api.pipedrive.com/v1";
const API_KEY = import.meta.env.VITE_PIPEDRIVE_API_KEY;

export default function NewFormView() {
    const { state, dispatch } = useContext(ModalContext);

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [deals, setDeals] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const searchDeals = async (query) => {
        if (query === "" || query.length < 3) return [];

        try {
            const url = `${API_URL}/deals/search?term=${query}&fields=title&start=0&api_token=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.data.items.map(({ item }) => ({
                name: item.title,
                id: item.id,
                person: item.person,
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const onSelectedDeal = async (deal) => {
        setValue("deal", deal);
        setValue("formTitle", deal.name);
        if (!deal.person) setValue("keyContactPersonName", "");
        setValue("keyContactPersonName", deal.person.name);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const pipedriveUrl = `${API_URL}/deals/${data.deal.id}?api_token=${API_KEY}`;

            const payload = {
                action: "addToForm",
                formData: {
                    dealId: data.deal.id.toString(),
                    ...data,
                },
            };

            const res = await fetch(FORM_API_URL, {
                method: "POST",
                redirect: "follow",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify(payload),
            });
            const resJson = await res.json();

            const fileReviewLink = `https://docs.google.com/spreadsheets/d/1QYdsX4NOqOrWOq7eYT8B8q0LnBTt4_dbXXACk3A3GyM/edit#gid=${resJson.data}`;

            const fieldData = {
                [KEY_1003_LINK]: fileReviewLink,
            };

            await fetch(pipedriveUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fieldData),
            });

            state.payload();
            reset();
            dispatch({ type: "CLOSE_MODAL" });
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredData =
        query === "" ? deals : deals.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mt-5 gap-6">
                <SearchSelect
                    className="flex-1"
                    label="Deal"
                    control={control}
                    name="deal"
                    register={register("deal", {
                        required: true,
                    })}
                    data={filteredData}
                    placeholder="Type to search..."
                    errors={errors.deal && "This field is required"}
                    query={query}
                    onChange={(e) => onSelectedDeal(e)}
                    onChangeQuery={async (e) => {
                        setQuery(e.target.value);
                        const data = await searchDeals(e.target.value);
                        setDeals(data);
                    }}
                />
                <Input
                    label="Form Title"
                    className="flex-1"
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
