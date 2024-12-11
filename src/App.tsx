import "./App.css";
import Header from "./components/Header/Header";
import RecipientPage from "./pages/RecipientPage/RecipientPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipientsPage from "./pages/RecipientsPage/RecipientsPage";
import StartPage from "./pages/StartPage/StartPage";
import SigninPage from "./pages/AuthPage/AuthPage";
import { ROUTES } from "./modules/Routes";
import TransfersPage from "./pages/TransfersPage/TransfersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DraftTransferPage from "./pages/TransferPage/TransferPage";
import Page403 from "./components/403/403";
import Page404 from "./components/404/404";

function App() {
    return (
        <BrowserRouter basename="/kilogram-frontend/">
            <Header></Header>

            <Routes>
                <Route path="/" index element={<StartPage />} />
                <Route path={ROUTES[403]} element={<Page403 />} />
                <Route path={ROUTES[404]} element={<Page404 />} />
                <Route path={ROUTES.RECIPIENTS} element={<RecipientsPage />} />
                <Route path={ROUTES.RECIPIENT} element={<RecipientPage />} />
                <Route path={ROUTES.SIGNIN} element={<SigninPage />} />
                <Route path={ROUTES.TRANSFERS} element={<TransfersPage />} />
                <Route path={ROUTES.TRANSFER} element={<DraftTransferPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
