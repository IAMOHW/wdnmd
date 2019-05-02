import React from "react";
import { NavLink } from "react-router-dom";
require('../css/Navigation.css')

const Navigation = () => {
    return (
        <div>
            <div id="NaviBar">
                <NavLink to="/" id="logoLink">
                    <img src={require('../Img/BoomTubeLogo.png')} alt="Website's logo" /></NavLink>
                <span> </span>
                <NavLink to="/" id="home">Home</NavLink>
                <span> </span>
                <NavLink to="/about" id="home">About</NavLink>
                <span> </span>
                <NavLink to="/contact" id="home">Contact</NavLink>
                <span> </span>
            </div>
            <div id="v-nbar">
                <ul>
                    <li><a className="active" href="#home">主页</a></li>
                    <li><a href="#news">新闻</a></li>
                    <li><a href="#contact">联系</a></li>
                    <li><a href="#about">关于</a></li>
                </ul>
            </div>
        </div>

    );
};

export default Navigation;