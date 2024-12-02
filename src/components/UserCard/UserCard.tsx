import { Link } from "react-router-dom";
import "./UserCard.css";
import { Button } from "react-bootstrap";

interface UserCardData {
    id: number;
    name: string;
    phone: string;
    avatar?: string;
}

const UserCard = ({ id, avatar, name, phone }: UserCardData) => {
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
                <Button className="user-card__add-btn">Добавить</Button>
            </div>
        </>
    );
};

export default UserCard;
