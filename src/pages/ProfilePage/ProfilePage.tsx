import { useEffect, useState } from "react";
import { api } from "../../modules/ApiClient";
import { ROUTE_LABELS, ROUTES } from "../../modules/Routes";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Button, Form, Spinner } from "react-bootstrap";
import "./ProfilePage.css";

interface RecipientData {
    name: string;
    password: string;
}

export default function ProfilePage() {
    const [pageData, setPageData] = useState<RecipientData>();

    useEffect(() => {
        api.session
            .sessionList({ withCredentials: true })
            .then((sessionData) => {
                console.log(sessionData["data"]);
                api.user
                    .userRead(parseInt(sessionData.data["user_id"]), {
                        withCredentials: true,
                    })
                    .then(({ data }) => setPageData(data));
            });
    }, []);

    if (!pageData) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    const { username, password } = pageData;

    return (
        <div className="profile-page">
            <div className="container">
                <BreadCrumbs
                    crumbs={[
                        {
                            label: ROUTE_LABELS.PROFILE,
                            path: ROUTES.PROFILE,
                        },
                    ]}
                />
            </div>

            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" value={username} />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Button variant="primary">Изменить</Button>
            </Form>
        </div>
    );
}
