import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiClient from "../../modules/ApiClient";
import { ROUTE_LABELS, ROUTES } from "../../modules/Routes";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { Spinner } from "react-bootstrap";
import "./RecipientPage.css";

interface RecipientData {
    id: number;
    name: string;
    desc: string;
    birthdate: string;
    city: string;
    phone: string;
    uni: string;
    avatar: string;
}

const RecipientPage = () => {
    const { id } = useParams();

    const [pageData, setPageData] = useState<RecipientData>();

    useEffect(() => {
        if (!id) return;
        ApiClient.getRecipient(id).then((data) => setPageData(data));
    }, [id]);

    if (!pageData) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    const { avatar, name, desc, birthdate, city, phone, uni } = pageData;

    return (
        <>
            <div className="container">
                <BreadCrumbs
                    crumbs={[
                        {
                            label: ROUTE_LABELS.RECIPIENTS,
                            path: ROUTES.RECIPIENTS,
                        },
                        { label: name, path: ROUTES.RECIPIENT },
                    ]}
                />
            </div>

            <div className="block block-padding user-main-info">
                <img
                    className="avatar avatar-offset"
                    src={avatar || "/kilogram-frontend/default.png"}
                    alt="User"
                />
                <div className="user-main-info__text">
                    <div className="name">{name}</div>
                    <p className="status-text">{desc}</p>
                </div>
            </div>

            <div className="block add-info block-padding">
                <p>
                    День рождения:{" "}
                    <span className="blue-text">{birthdate}</span>
                </p>
                <p>
                    Город: <span className="blue-text">{city}</span>
                </p>
                <p>
                    Телефон: <span className="blue-text">{phone}</span>
                </p>
                <p>
                    ВУЗ: <span className="blue-text">{uni}</span>
                </p>
            </div>
        </>
    );
};

export default RecipientPage;
