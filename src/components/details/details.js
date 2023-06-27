import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './details.scss'
import {useFavorites} from "../providers/favorite-context";
import {faStar, faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ac from '../icons/ac.svg'
import dog from '../icons/dog.svg'
import fireplace from '../icons/fireplace.svg'
import microwave from '../icons/microwave.svg'
import smoking from '../icons/smoking.svg'
import tv from '../icons/tv.svg'
import washer from '../icons/washer.svg'
import wifi from '../icons/wifi.svg'

function Details() {
    const {isFavorite, toggleFavorite} = useFavorites()
    const {houseId} = useParams();
    const [details, setDetails] = useState(null)
    const [hostInfo, setHostInfo] = useState(null)
    const [housePhotos, setHousePhotos] = useState(null)
    const [houseReviews, setHouseReviews] = useState(null)
     const [houseRules, setHouseRules] = useState(null)


    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${houseId}`)
            .then(response => {
                setDetails(response.data)
            });
    }, [houseId])
   useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${houseId}/features`)
            .then(response => {
                setHouseRules(response.data)
            });
    }, [houseId])
    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${houseId}/host`)
            .then(response => setHostInfo(response.data));
    }, [houseId])
    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${houseId}/photos`)
            .then(response => setHousePhotos(response.data));
    }, [houseId])
    useEffect(() => {
        axios.get(`https://m9-frontend.upskill.appx.pt/upbnb/casas/${houseId}/reviews`)
            .then(response => setHouseReviews(response.data.reviews));
    }, [houseId])

    if (!details) return null;
    if(!hostInfo) return null
    if(!housePhotos) return null
    if(!houseReviews) return null

    return <div className={'detail'}>
        <div className={'house-container'}>
            <div className={'house-info'}>
                <div className={'title'}>
                    <h1>{details.title}</h1>
                </div>

                <div className={'info-2'}>
                    <div className={"rating"}>
                        <FontAwesomeIcon icon={faStar}/>
                        <p>{details.rating}</p>
                    </div>
                    <h3>{details.city}, {details.country}</h3>
                </div>
            </div>

                <div className={"img-container"}>
                    <div className={"heart-icon"}>
                        <FontAwesomeIcon className={"fav-icon"} onClick={() => {
                            toggleFavorite(details.id)
                        }} icon={isFavorite(details.id) ? faHeartSolid : faHeart}/>
                    </div>
                    <div className={'house-img'}
                          style={{backgroundImage: `url('${details.featured_photo}')`}}>
                    </div>
                </div>

                <div className={'price'}>
                    <h3>{details.price}€</h3>
                    <p>noite</p>
                </div>
                <div className={'description'}>
                    {details.description}
                </div>
        </div>

        <div className={'house-rules'}>
            <div className={"allowed"}>
                {houseRules.features.includes("airConditioner") && <img className={"active"} src={ac}/>}
                {houseRules.features.includes("petsAllowed") && <img className={"active"} src={dog}/>}
                {houseRules.features.includes("tv") && <img className={"active"} src={tv}/>}
                {houseRules.features.includes("microwave") && <img className={"active"} src={microwave}/>}
                {houseRules.features.includes("wifi") && <img className={"active"} src={wifi}/>}
                {houseRules.features.includes("fireplace") && <img className={"active"} src={fireplace}/>}
                {houseRules.features.includes("washingMachine") && <img className={"active"} src={washer}/>}
                {houseRules.features.includes("smokingAllowed") && <img className={"active"} src={smoking}/>}
            </div>
            <div className={"not-allowed"}>
                {!houseRules.features.includes("airConditioner") && <img className={"not-active"} src={ac}/>}
                {!houseRules.features.includes("petsAllowed") && <img className={"not-active"} src={dog}/>}
                {!houseRules.features.includes("tv") && <img className={"not-active"} src={tv}/>}
                {!houseRules.features.includes("microwave") && <img className={"not-active"} src={microwave}/>}
                {!houseRules.features.includes("wifi") && <img className={"not-active"} src={wifi}/>}
                {!houseRules.features.includes("fireplace") && <img className={"not-active"} src={fireplace}/>}
                {!houseRules.features.includes("washingMachine") && <img className={"not-active"} src={washer}/>}
                {!houseRules.features.includes("smokingAllowed") && <img className={"not-active"} src={smoking}/>}
            </div>
        </div>

        <div className={'host-container'}>
            <div className={'title'}>
                <h5>Sobre o anfitrião</h5>
            </div>

            <div className={'profile'}>
                <div className={'avatar'}>
                    <img src={hostInfo.photo} alt={'avatar'}/>
                </div>
                <div className={'host-info'}>
                    <div className={'name'}>{hostInfo.name}</div>
                    <div className={'rating'}>
                        <FontAwesomeIcon icon={faStar}/>
                        <p>{hostInfo.rating}</p>
                    </div>
                </div>
            </div>
            <div className={'host-description'}>Sou um afritrião rigoroso, quero a causão paga por completo e vai ficar comigo mesmo que a casa seja devolvida como foi entregue, não quero saber. Aceito doações no valor minimo de 100€ e sem maximo definido</div>
        </div>

        <div className={'gallery-container'}>
            <div className={'title'}>
                <h5>Galeria</h5>
            </div>
            <div className={'house-images'}>
                    <div className={"gallery"}>
                        {housePhotos.photos.slice(1).map(l => {
                            return <div className={'house-photo'} key={l}
                                 style={{backgroundImage: `url('${l}')`}}>
                            </div>
                        })}
                    </div>
            </div>
        </div>

        <div className={'reviews-container'}>
            <div className={'title'}>
                <h4>Comentários</h4>
            </div>
            <div className={'reviews'}>
                {houseReviews.map(review => {
                    return <div className={'container'} key={review.id}>
                        <div className={'profile'}>
                            <div className={'avatar'}>
                                <img src={review.photo} alt={'avatar'}/>
                            </div>
                            <div className={'client-info'}>
                                <div className={'name'}>{review.name}</div>
                                <div className={'date'}>
                                    <p>{review.date}</p>
                                </div>
                            </div>
                        </div>
                        <div className={'comment'}>
                            <p>{review.comment}</p>
                        </div>
                    </div>


                })}
            </div>
        </div>
    </div>
}

export default Details