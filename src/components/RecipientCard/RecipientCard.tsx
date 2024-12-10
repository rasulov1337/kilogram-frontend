import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./RecipientCard.css";
import { addRecipientToDraft } from "../../slices/RecipientsPageSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../modules/Types";
import { useUsername } from "../../slices/AuthDataSlice";

interface RecipientCardData {
    id: number;
    name: string;
    phone: string;
    avatar?: string;
    disabled: boolean;
}

export default function RecipientCard({
    id,
    avatar,
    name,
    phone,
    disabled,
}: RecipientCardData) {
    const dispatch = useDispatch<AppDispatch>();

    const onAddClick = () => dispatch(addRecipientToDraft(id));

    return (
        <>
            <div className="user-card">
                <img
                    className="user-card__avatar"
                    src={avatar || "/kilogram-frontend/default.png"}
                    alt="User"
                />
                <div className="user-card__user-info">
                    <Link className="user-card__name" to={"" + id}>
                        {name}
                    </Link>
                    <p className="grey-text">{phone}</p>
                </div>
                {!disabled && (
                    <Button className="user-card__add-btn" onClick={onAddClick}>
                        Добавить
                    </Button>
                )}
            </div>
        </>
    );
}
