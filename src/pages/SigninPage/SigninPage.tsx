import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SigninPage.css";
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            signin(login, password);
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
            <p className="auth__header-text">Вход в KiloGram</p>
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
                        Войти
                    </Button>
                    <Button className="auth__signup-btn">
                        Зарегистрироваться
                    </Button>
                </div>
            </Form>
        </div>
    );
}
