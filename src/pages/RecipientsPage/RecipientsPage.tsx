import "./RecipientsPage.css";
import UserCard from "../../components/UserCard/UserCard";
import ApiClient from "../../modules/ApiClient";
import { ReactElement, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS } from "../../modules/Routes";
import {
    setRecipientNameQuery,
    useRecipientNameQuery,
} from "../../slices/FilterSlice";
import { useDispatch } from "react-redux";

interface DraftTransferInfo {
    draftId: number | null;
    draftRecipientsLen: number;
}

interface RecipientCardData {
    id: number;
    name: string;
    avatar: string;
    phone: string;
}

type DataArray = (RecipientCardData | DraftTransferInfo)[];

const RecipientsPage = () => {
    const recipientNameQuery = useRecipientNameQuery();
    const dispatch = useDispatch();
    const [pageData, setPageData] = useState<DataArray | null>(null);

    useEffect(() => {
        (async () => {
            const data = await ApiClient.getRecipients(
                recipientNameQuery ? recipientNameQuery : undefined
            );
            setPageData(data);
        })();
    }, [recipientNameQuery]);

    if (!pageData) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    const recipientsData = pageData.slice(0, -1) as RecipientCardData[];
    const cards: ReactElement[] = [];
    recipientsData.forEach((recipient, i) => {
        cards.push(<UserCard key={i} {...recipient}></UserCard>);
    });

    return (
        <>
            <div className="container">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.RECIPIENTS }]} />
            </div>

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
                        dispatch(setRecipientNameQuery(recipientName));
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

                <div className="grid-block">{cards}</div>
            </div>
        </>
    );
};

export default RecipientsPage;
