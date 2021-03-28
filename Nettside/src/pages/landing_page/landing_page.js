
import React from 'react';
import { NavBar } from '../../components/navbar/navbar.js';
import "./landing_page.scss";
import { Gradient_canvas } from "../../components/gradient_canvas/gradient_canvas";



export function Landing_page(){
    
    return(
    <div>
        <div className="section-skew header">
            <div className="section-content">
                <NavBar />
                
            </div>
            <Gradient_canvas></Gradient_canvas>
        </div>
    </div>
)};

