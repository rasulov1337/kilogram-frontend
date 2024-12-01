import "./App.css";
import Header from "./components/Header/Header";
import RecipientPage from "./pages/ProfilePage/RecipientPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipientsPage from "./pages/RecipientsPage/RecipientsPage";
import StartPage from "./pages/StartPage/StartPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import { ROUTES } from "./modules/Routes";
import TransfersPage from "./pages/TransfersPage/TransfersPage";

function App() {
    return (
        <BrowserRouter basename="/kilogram-frontend">
            <Header></Header>

            <Routes>
                <Route path="/" index element={<StartPage />} />
                <Route path={ROUTES.RECIPIENTS} element={<RecipientsPage />} />
                <Route path={ROUTES.RECIPIENT} element={<RecipientPage />} />
                <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
                <Route path={ROUTES.TRANSFERS} element={<TransfersPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
