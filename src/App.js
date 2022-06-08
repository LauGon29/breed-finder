import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Home from "./pages/Home";
import FavoriteBreeds from "./pages/FavoritesBreeds";
import Container from '@mui/material/Container';
import { CollectionContext } from "./Context/Context";

export default function App() {
    const [collection, setCollection] = useState([]);

    return (
        <CollectionContext.Provider value={[ collection, setCollection ]}>
            <Container>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<FavoriteBreeds />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </Container>
        </CollectionContext.Provider>
    )
}
