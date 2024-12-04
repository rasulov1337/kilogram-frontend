import "./App.css";
import Header from "./components/Header/Header";
import RecipientPage from "./pages/ProfilePage/RecipientPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipientsPage from "./pages/RecipientsPage/RecipientsPage";
import StartPage from "./pages/StartPage/StartPage";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { DEST_ROOT } from "./target_config";


function App() {
    useEffect(()=>{
        invoke('tauri', {cmd:'create'})
          .then(() =>{console.log("Tauri launched")})
          .catch(() =>{console.log("Tauri not launched")})
        return () =>{
          invoke('tauri', {cmd:'close'})
            .then(() =>{console.log("Tauri launched")})
            .catch(() =>{console.log("Tauri not launched")})
        }
      }, [])
      
    return (
        <BrowserRouter basename={DEST_ROOT}>
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
