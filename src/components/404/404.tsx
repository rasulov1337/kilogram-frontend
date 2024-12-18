import { Button } from "react-bootstrap";
import { ROUTES } from "../../modules/Routes";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "30vh" }}>
                404: Страница не найдена
            </h2>

            <Button style={{ display: "block", margin: "0 auto" }}>
                <Link to={ROUTES.HOME}>Вернуться на главную</Link>
            </Button>
        </>
    );
}
