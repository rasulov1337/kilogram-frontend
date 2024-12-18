import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROUTES } from "../../modules/Routes";

export default function Page403() {
    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "30vh" }}>
                403: Доступ запрещен
            </h2>
            <Button style={{ display: "block", margin: "0 auto" }}>
                <Link to={ROUTES.HOME}>Вернуться на главную</Link>
            </Button>
        </>
    );
}
