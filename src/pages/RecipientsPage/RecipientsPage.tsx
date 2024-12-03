import "./RecipientsPage.css";
import RecipientCard from "../../components/RecipientCard/RecipientCard";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from "../../modules/Routes";
import {
    useRecipientNameQuery,
    useRecipients,
    recipientsPageActions,
    getRecipientsData,
} from "../../slices/RecipientsPageSlice";
import { useDispatch } from "react-redux";
import DraftProcessInfo from "../../components/DraftProcessInfo/DraftProcessInfo";
import { AppDispatch } from "../../modules/Types";

const RecipientsPage = () => {
    const recipients = useRecipients();
    const recipientNameQuery = useRecipientNameQuery();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(
            getRecipientsData(
                recipientNameQuery ? recipientNameQuery : undefined
            )
        );
    }, [dispatch, recipientNameQuery]);

    if (!recipients) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.RECIPIENTS }]} />
            </div>
            <DraftProcessInfo />

            <div className="block users-block">
                <form
                    action="{% url 'index' %}"
                    method="get"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(
                            e.target as HTMLFormElement
                        );
                        const recipientName = formData.get(
                            "recipient-name"
                        ) as string;
                        dispatch(
                            recipientsPageActions.setRecipientNameQuery(
                                recipientName
                            )
                        );
                    }}
                >
                    <input
                        className="search-field"
                        type="text"
                        id="name"
                        name="recipient-name"
                        minLength={1}
                        maxLength={70}
                        placeholder="Поиск"
                        defaultValue={recipientNameQuery}
                    />
                </form>

                <div className="grid-block">
                    {recipients.map((recipientData, i) => (
                        <RecipientCard
                            key={i}
                            {...recipientData}
                            disabled={false}
                        ></RecipientCard>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RecipientsPage;
