import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useFavorites} from "../providers/favorite-context";
import {faStar, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

function Reservation(props) {
    const {isFavorite, toggleFavorite} = useFavorites()

    return <div className={"reservation"}>

        <div className={'img-container'}>
            <div className={'heart-icon'}>
                <FontAwesomeIcon className={'fav-icon'} onClick={() => {
                    toggleFavorite(props.id)
                }} icon={isFavorite(props.id) ? faHeartSolid : faHeart}/>
            </div>
            <Link to={"/house/" + props.id}>
                <div className={'house-img'}
                     style={{backgroundImage: `url('${props.featured_photo}')`}}></div>
            </Link>
        </div>


        <div className={"content"}>
            <div className={"informations"}>
                <h3>{props.city}, {props.country}</h3>
                <p>{props.time}</p>
                <h5>{props.price}€</h5>
            </div>
            <div className={"rating"}>
                <p>{props.rating}</p>
                <FontAwesomeIcon icon={faStar}/>
            </div>
        </div>
    </div>;
}

export default Reservation;