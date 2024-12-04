import { Link } from "react-router-dom";
import "./UserCard.css";
import { DEST_IMG, DEST_ROOT } from "../../target_config";

interface UserCardData {
    id: number;
    name: string;
    phone: string;
    avatar?: string;
}

const UserCard = ({ id, avatar, name, phone }: UserCardData) => {
    let avatarSrc = DEST_ROOT + './default.png'
    if (avatar) {
        avatarSrc = DEST_IMG + avatar
    }
    return (
        <>
            <Link to={"" + id} className="user-card">
                <img
                    className="avatar"
                    src={avatarSrc}
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
