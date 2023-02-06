import React from "react";
import './LeftMenu.css'
import { NavLink } from "react-router-dom";

const LeftMenu = () => {
    return (
        <>
            <ul className="cross-rental-menu">
                <li><NavLink to={'firm-info'}>Dane Twojej firmy</NavLink></li>
                <li><NavLink to={'info'}>Twoje Dane</NavLink></li>
                <li><NavLink to={'users-info'}>Użytkownicy przypisani do konta firmowego</NavLink></li>
                <li><NavLink to={'announces'}>Twoje ogłoszenia</NavLink></li>
                <li><NavLink to={'devices'}>Twój sprzęt w Cross Rental</NavLink></li>
                <li><NavLink to={'sales-devices'}>Twój sprzęt w do sprzedaży</NavLink></li>
                <li><NavLink to={'riders'}>Twoje Ridery</NavLink></li>
                <li><NavLink to={'locations'}>Twoje lokalizacje</NavLink></li>
                <li><NavLink to={'messages'}>Wiadomości</NavLink></li>
            </ul>
        </>
    )
}

export default LeftMenu;