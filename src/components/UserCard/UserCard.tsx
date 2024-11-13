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
            <a href={"/recipients/" + id} className="user-card">
                <img
                    className="avatar"
                    src={avatar || "/default.png"}
                    alt="User"
                />
                <div className="user-info">
                    <div className="name">{name}</div>
                    <p className="grey-text">{phone}</p>
                </div>
            </a>
        </>
    );
};

export default UserCard;
