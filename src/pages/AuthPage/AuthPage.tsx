import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AuthPage.css";
import { api } from "../../modules/ApiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions, signIn } from "../../slices/AuthDataSlice";
import { Spinner } from "react-bootstrap";
import { AppDispatch } from "../../modules/Types";
import {
    authPageActions,
    useAuthPageError,
    useAuthPageState,
    useAuthPageValidated,
    usePassword,
    useUsername,
} from "../../slices/AuthPageSlice";

export default function SigninPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [fetchingData, setFetchingData] = useState<boolean>(false);

    const username = useUsername();
    const password = usePassword();
    const isSignUp = useAuthPageState() === "signup";
    const error = useAuthPageError();
    const validated = useAuthPageValidated();

    const signin = () => {
        if (!username || !password) return;

        dispatch(signIn({ username: username, password: password }))
            .then(() => {
                dispatch(authPageActions.setError(null));
                navigate("/");
            })
            .catch(() => {
                dispatch(authPageActions.setError("Неверный логин или пароль"));
                setFetchingData(false);
            });
    };

    const signup = (username: string, password: string) => {
        api.user
            .userCreate({ username, password }, { withCredentials: false })
            .then(() => {
                dispatch(authPageActions.setError(null));
                dispatch(authActions.setUsername(username));
                navigate("/");
            })
            .catch((err) => {
                setFetchingData(false);
                switch (err.response.status) {
                    case 400:
                        dispatch(
                            authPageActions.setError(
                                "Логин уже используется другим пользователем"
                            )
                        );
                        break;
                    case 401:
                        dispatch(
                            authPageActions.setError(
                                "Неверный логин или пароль"
                            )
                        );
                        break;
                    case 500:
                        dispatch(
                            authPageActions.setError("Внутрення ошибка сервера")
                        );
                        break;
                    default:
                        dispatch(
                            authPageActions.setError("Неизвестная ошибка")
                        );
                        break;
                }
            });
    };

    const handleAuthChange = () => {
        dispatch(authPageActions.toggleAuthPageState());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            setFetchingData(true);

            if (isSignUp) {
                signup(username, password);
            } else {
                signin();
            }
        }

        dispatch(authPageActions.setValidated(true));
    };

    return (
        <div className="auth">
            <img
                className="auth__logo"
                src="logo.png"
                alt="KiloGram Logo"
            ></img>
            <p className="auth__header-text">
                {!isSignUp ? "Вход" : "Регистрация"} в KiloGram
            </p>
            {error && <p className="auth__error">{error}</p>}

            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="auth__form"
            >
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите логин"
                        value={username}
                        onChange={(e) =>
                            dispatch(
                                authPageActions.setUsername(e.target.value)
                            )
                        }
                        required
                        minLength={2}
                    />
                    <Form.Control.Feedback type="invalid">
                        Логин должен содержать минимум 2 символа
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) =>
                            dispatch(
                                authPageActions.setPassword(e.target.value)
                            )
                        }
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, введите пароль
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="auth__buttons">
                    <Button className="auth__signin-btn" type="submit">
                        {fetchingData && <Spinner animation="border"></Spinner>}
                        {!fetchingData &&
                            (isSignUp ? "Зарегистрироваться" : "Войти")}
                    </Button>
                    <Button
                        className="auth__signup-btn"
                        onClick={handleAuthChange}
                    >
                        {!isSignUp ? "Зарегистрироваться" : "Войти"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
