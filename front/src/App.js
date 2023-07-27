// Importations des modules.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profil from "./pages/Profil";
import Trending from "./pages/Trending";
import NoPage from './pages/NoPage';

// Exportation de la fonction App.
export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Profil" element={<Profil />} />
                    <Route path="/Trending" element={<Trending />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
// Créer les différentes pages disponibles pour les utilisateurs.
// Chaque routes appelle un fichier qui correspond à la page.
// La route * redirige toutes les pages qui n'existent pas sur une page spécifique.