import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { ROUTES } from "../../modules/Routes";
import { api } from "../../modules/ApiClient";
import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";

import "./Header.css";
import { getCookie } from "../../modules/Utils";

export default function Header() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        api.session.sessionList({ withCredentials: true }).then(({ data }) => {
            setUsername(data["username"]);
        });
    }, []);

    const onSignoutBtnClick = () => {
        api.signout
            .signoutCreate({
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                withCredentials: true,
            })
            .then(() => {
                setUsername("");
            });
    };

    return (
        <>
            <Navbar className="header" expand="lg">
                <Container>
                    <Navbar.Brand className="text-white fs-2 header__logo">
                        <Link to={ROUTES.HOME}>KiloGram</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto text-white fs-5 d-flex gap-3 align-items-center">
                            <Link
                                className="text-white header__link"
                                to={ROUTES.RECIPIENTS}
                            >
                                Получатели
                            </Link>
                            <Link
                                className="text-white header__link"
                                to={ROUTES.TRANSFERS}
                            >
                                Отправки файлов
                            </Link>

                            {username && (
                                <Dropdown className="header__dropdown">
                                    <Dropdown.Toggle className="header__dropdown-toggle">
                                        {username}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            as="button"
                                            className="header__dropdown__item"
                                        >
                                            <Link to={ROUTES.PROFILE}>
                                                Изменить профиль
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as="button"
                                            className="header__dropdown__item"
                                            onClick={onSignoutBtnClick}
                                        >
                                            Выход
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}

                            {!username && (
                                <Button className="header__signin-button">
                                    <Link
                                        className="header__link"
                                        to={ROUTES.SIGNIN}
                                    >
                                        Войти
                                    </Link>
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
