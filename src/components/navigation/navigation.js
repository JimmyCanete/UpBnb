import "./navigation.scss";
import {NavLink} from "react-router-dom";
import logo_menu from "../images/logo_menu.svg"
import favorite_icon from "../images/heart_open.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function Navigation() {
    return <div className={"Navigation"}>
        <div className={"footer-items"}>
            <NavLink to={"/search"}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={"search-logo"} />
            </NavLink>
            <NavLink to={"/home"} className={"center-icon"}>
                <img src={logo_menu} className={"footer-item logo-icon"} alt={'logo'}/>
            </NavLink>
            <NavLink to={"/favorites"}>
                <img src={favorite_icon} className={"footer-item favorite-icon"} alt={'fav-logo'}/>
            </NavLink>
        </div>
    </div>
}

export default Navigation;