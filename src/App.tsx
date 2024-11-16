import "./App.css";
import Header from "./components/Header/Header";
import RecipientPage from "./components/ProfilePage/RecipientPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipientsPage from "./components/RecipientsPage/RecipientsPage";
import StartPage from "./components/StartPage/StartPage";

function App() {
    return (
        <BrowserRouter basename="/kilogram-frontend">
            <Header></Header>

            <Routes>
                <Route path="/" index element={<StartPage />} />
                <Route path="/recipients/" element={<RecipientsPage />} />
                <Route path="/recipients/:id" element={<RecipientPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
