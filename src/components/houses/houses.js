import House from "./house";
import {useEffect, useState} from "react";
import axios from "axios";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Houses() {
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);
    const [limitpages,setLimitPages] = useState(1)
    const [listHouses, setListHouses] = useState(null);

    useEffect(() => {
        axios.get('https://m9-frontend.upskill.appx.pt/upbnb/casas', {params: {page, search:filter}})
            .then(response => {
                    setLimitPages(response.data.pages)
                    setListHouses(page === 1 ? response.data.data : [...listHouses, ...response.data.data])
            });
    }, [page, filter]);

    useEffect(() => {
        setPage(1);
    }, [filter]);

    return <div className={"houses"}>
        <div className={"search"}>
            <input className={"search-bar"}
                   type="text"
                   placeholder="Procurar"
                   onChange={e => {
                       setFilter(e.target.value)
                       setPage(1)
                   }}
            />
            <FontAwesomeIcon icon={faSearch} className={"search-icon"} />
        </div>


            {!listHouses && <p>A carregar</p>}
            {listHouses && <div className={"houses-content"}>
            {listHouses.length === 0 && <p>Sem resultados</p>}
            {listHouses.map(l => <House
                key={l.id}
                {...l}
            />)}

            <div className={"pagination"}>
                {page < limitpages && <div onClick={() => setPage(page + 1)}>
                    Mais Resultados
                </div>}
            </div>
        </div>}
    </div>;
}

export default Houses