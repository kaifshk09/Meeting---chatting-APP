import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav className="landingNav">
                <div className="navHeader">
                    <h2>FARHA Video Call</h2>
                </div>

                <div className="navlist" role="navigation" aria-label="Authentication navigation">
                    <button className="navLink" onClick={() => router("/guest")}>Join as Guest</button>
                    <button className="navLink" onClick={() => router("/auth")}>Register</button>
                    <button className="navLink" onClick={() => router("/auth")}>Login</button>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

                    <p>Cover a distance by Apna Video Call</p>
                    <Link className="ctaButton" to="/auth">
                        Get Started
                    </Link>
                </div>
                <div>

                    <img src="/mobile.png" alt="" />

                </div>
            </div>



        </div>
    )
}
