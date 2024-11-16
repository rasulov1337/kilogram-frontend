import { Link } from "react-router-dom";
import "./UserCard.css";

interface UserCardData {
    id: number;
    name: string;
    phone: string;
    avatar?: string;
}

const UserCard = ({ id, avatar, name, phone }: UserCardData) => {
    return (
        <>
            <Link to={"" + id} className="user-card">
                <img
                    className="avatar"
                    src={avatar || "/kilogram-frontend/default.png"}
                    alt="User"
                />
                <div className="user-info">
                    <div className="name">{name}</div>
                    <p className="grey-text">{phone}</p>
                </div>
            </Link>
        </>
    );
};

export default UserCard;
