import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../modules/Routes";
import { Button, Dropdown } from "react-bootstrap";

import "./Header.css";
import { useUsername, signOut } from "../../slices/AuthDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../modules/Types";

export default function Header() {
    const username = useUsername();
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const onSignoutBtnClick = () => {
        dispatch(signOut()).then(() => {
            navigate(ROUTES.HOME);
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
                            {username && (
                                <Link
                                    className="text-white header__link"
                                    to={ROUTES.TRANSFERS}
                                >
                                    Отправки файлов
                                </Link>
                            )}

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
