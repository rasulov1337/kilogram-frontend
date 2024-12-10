import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AuthPage.css";
import { api } from "../../modules/ApiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsernameAction } from "../../slices/HeaderSlice";

export default function SigninPage() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setisSignUp] = useState<boolean>(false);

    const signin = (username: string, password: string) => {
        api.signin
            .signinCreate({ username, password }, { withCredentials: true })
            .then(() => {
                setError(null);
                dispatch(setUsernameAction(username));
                navigate("/");
            })
            .catch(() => {
                setError("Неверный логин или пароль");
            });
    };

    const signup = (username: string, password: string) => {
        api.user
            .userCreate({ username, password }, { withCredentials: true })
            .then(() => {
                setError(null);
                dispatch(setUsernameAction(username));
                navigate("/");
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 400:
                        setError("Логин уже используется другим пользователем");
                        break;
                    case 401:
                        setError("Неверный логин или пароль");
                        break;
                    case 500:
                        setError("Внутрення ошибка сервера");
                        break;
                    default:
                        setError("Неизвестная ошибка");
                        break;
                }
            });
    };

    const handleAuthChange = () => {
        setisSignUp(!isSignUp);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            if (isSignUp) {
                signup(login, password);
            } else {
                signin(login, password);
            }
        }

        setValidated(true);
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
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Пожалуйста, введите пароль
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="auth__buttons">
                    <Button className="auth__signin-btn" type="submit">
                        {isSignUp ? "Зарегистрироваться" : "Войти"}
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
