import React, {useState} from "react";

const favoriteContext = React.createContext();

function ProviderFavorites(props) {

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("history")) || []);

    const isFavorite = (houseId) => {
        return favorites.includes(houseId);
    }

    function toggleFavorite(houseId) {
        let clone = [...favorites];
        if (isFavorite(houseId)) {
            // Remove
            clone.splice(clone.indexOf(houseId), 1);
        } else {
            // Add
            clone.push(houseId);
        }
        localStorage.setItem("history", JSON.stringify(clone));
        setFavorites(clone);
    }

    return <favoriteContext.Provider value={{favorites, setFavorites, isFavorite, toggleFavorite}}>
        {props.children}
    </favoriteContext.Provider>
}

function useFavorites() {
    return React.useContext(favoriteContext);
}


export {useFavorites, ProviderFavorites};