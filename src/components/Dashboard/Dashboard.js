import React from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
// import MainContent from "./MainContent";
import './Dashboard.css'
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div className="row nm-np justify-content-center">
                Dashnoard main page
            </div>
            <div className="row nm-np">
                <div className="col-3">
                    <LeftMenu/>
                </div>
                <div className="col-9">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Dashboard;