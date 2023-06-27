import React from "react"
import Reservation from "./reservation";
import "./reservations.scss";
import {useEffect, useState} from "react";
import axios from "axios";


function Reservations() {
    const [currentReservations, setCurrentReservations] = useState(null);
    const [pastReservations, setPastReservations] = useState(null);


    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/current')
            .then(res => setCurrentReservations(res.data.data))
    }, [])
    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas/past')
            .then(res => setPastReservations(res.data.data))
    }, [])


    if (!currentReservations) return null;
    if (!pastReservations) return null;


    return <div className={"reservations"}>
        <div className={"title"}>
            <h1>Bem-Vindo(a)</h1>
            <p>Ao seu perfil</p>
        </div>

        {!currentReservations && <p>A carregar</p>}
        <div className={"reservations-info-title"}>
            <p>As minhas reservas</p>
        </div>
        {currentReservations && <div className={"reservations-content"}>
            {currentReservations.length === 0 && <p>Sem resultados</p>}
            {currentReservations.map(l => <Reservation
                key={l.id}
                {...l}
            />)}
        </div>}
        <div className={"reservations-info-title"}>
            <p>Reservas passadas</p>
        </div>
        {pastReservations && <div className={"reservations-content"}>
            {pastReservations.length === 0 && <p>Sem resultados</p>}
            {pastReservations.map(l => <Reservation
                key={l.id}
                {...l}
            />)}
        </div>}
    </div>;
}

export default Reservations