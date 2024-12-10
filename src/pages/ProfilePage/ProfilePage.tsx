import { FormEvent } from "react";
import { ROUTE_LABELS, ROUTES } from "../../modules/Routes";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Button, Form, Spinner } from "react-bootstrap";
import "./ProfilePage.css";

import {
    usePassword,
    useUsername,
    profilePageActions,
    useIsFetchingData,
    updateProfile,
} from "../../slices/ProfilePageSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../modules/Types";

export default function ProfilePage() {
    const username = useUsername();
    const password = usePassword();
    const isFetchingData = useIsFetchingData();
    const dispatch = useDispatch<AppDispatch>();

    if (isFetchingData) {
        return (
            <div className="loading-screen">
                <Spinner animation="border"></Spinner>
            </div>
        );
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const resultAction = await dispatch(
                updateProfile({ username, password })
            );
            if (!resultAction.error) {
                dispatch(profilePageActions.setUsername(""));
                dispatch(profilePageActions.setPassword(""));
                alert("Обновление данных выполнено успешно");
            } else {
                alert("Ошибка при обновлении данных");
            }
        } catch {
            alert("Ошибка при обновлении данных");
        }
    };

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

            <Form onSubmit={handleFormSubmit}>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder="Новый логин"
                        onChange={(e) =>
                            dispatch(
                                profilePageActions.setUsername(e.target.value)
                            )
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Новый Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Новый пароль"
                        value={password}
                        onChange={(e) =>
                            dispatch(
                                profilePageActions.setPassword(e.target.value)
                            )
                        }
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Изменить
                </Button>
            </Form>
        </div>
    );
}
