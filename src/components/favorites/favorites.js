import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useFavorites} from "../providers/favorite-context"
import './favorites.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartSolid, faStar} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";


function Favorites() {
    const {favorites} = useFavorites()
    const {isFavorite, toggleFavorite} = useFavorites()
    const [favoritesList, setFavoritesList] = useState(null);
    let ids = favorites.join(',')

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas', {params: {ids}})
            .then(response => {
                let countryHouses = {};
                response.data.data.forEach((f) => {
                    if (!countryHouses[f.country])
                        countryHouses[f.country] = [];
                    countryHouses[f.country].push(f);
                })
                setFavoritesList(countryHouses);
            });
    }, []);

    console.log(favoritesList)

    if(!favoritesList) return null

            return <div className={"favorites"}>
                {!Object.keys(favoritesList) && <p>A carregar</p>}
                {Object.keys(favoritesList) && <>
                {Object.keys(favoritesList).length === 0 && <p>Sem resultados</p>}
                {Object.keys(favoritesList).length > 0 && Object.keys(favoritesList).map((country) => <div key={country.id}>
                    <div className={'title'}>
                        <h1>{country}</h1>
                    </div>

                    {favoritesList[country].map(l => {
                       return  <div key={l.id} className={'favorite-container'}>
                               <div className={'favorite-house'}>
                                   <div className={"heart-icon"}>
                                       <FontAwesomeIcon className={"fav-icon"} onClick={() => {
                                           toggleFavorite(l.id)
                                       }} icon={isFavorite(l.id) ? faHeartSolid : faHeart}/>
                                   </div>
                                   <Link to={"/house/" + l.id}>
                                       <div className={'house-img'} style={{backgroundImage: `url('${l.featured_photo}')`}}></div>
                                   </Link>
                               </div>

                           <div className={'favorite-info'}>
                               <h3>{l.city}</h3>
                               <p>{l.host_type}</p>
                               <div className={'price'}>
                                   <h3>{l.price}€</h3>
                                   <p>noite</p>
                               </div>
                               <div className={'rating'}>
                                   <FontAwesomeIcon icon={faStar}/>
                                   <p>{l.rating}</p>
                               </div>
                           </div>
                        </div>})
                    }
                </div>)}
                </>}
    </div>;
}

export default Favorites;