import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../modules/Routes";
import "./StartPage.css";

export default function StartPage() {
    return (
        <div className="start-page">
            <h1 className="start-page__title">
                KiloGram — групповая отправка файлов в мессенджере
            </h1>
            <p className="start-page__desc">
                Цель проекта — предоставить наиболее удобный интерфейс для
                групповой отправки файла нескольким пользователям.
            </p>
            <Link style={{ marginTop: "50px" }} to={ROUTES.RECIPIENTS}>
                <Button variant="primary">Просмотреть получаталей</Button>
            </Link>
        </div>
    );
}
