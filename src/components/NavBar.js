import React, {Component} from "react";
import {Link} from "react-router-dom";

class NavBar extends Component{
    closeNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
        if (navbar.classList.contains("show")) {
        navbar.classList.remove("show");
        }
    };

    render() {
        return(
                <nav className={`navbar navbar-expand-lg navbar-${this.props.mode} navbar-${this.props.mode} fixed-top`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" onClick={this.closeNavbar} to="/">NewsMonkey</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/" onClick={this.closeNavbar} >Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/business" onClick={this.closeNavbar} >Business</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/entertainment" onClick={this.closeNavbar} >Entertainment</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/health" onClick={this.closeNavbar} >Health</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/science" onClick={this.closeNavbar} >Science</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/sports" onClick={this.closeNavbar} >Sports</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/technology" onClick={this.closeNavbar} >Technology</Link>
                        </li>                            
                    </ul>
                     {/* Dark/Light mode toggle */}
                        <div className="form-check form-switch text-light mx-3">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                onClick={this.props.toggleMode} 
                                id="modeSwitch"
                            />
                            <label className="form-check-label" htmlFor="modeSwitch">
                                {this.props.mode === "light" ? "Dark Mode" : "Light Mode"}
                            </label>
                        </div>
                    </div>
                </div>
                </nav>


        )             
    }

}



export default NavBar


