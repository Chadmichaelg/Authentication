import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
// import { Navbar, Nav, Container } from "react-bootstrap";

export const Navbar = () => {
const { store, actions } = useContext(Context);
const [expanded, setExpanded] = useState(true);

// return (
//     <Navbar collapseOnSelect expand="lg" bg="transparent">
//     <Container style={{ marginLeft: "0", fontFamily: "Raleway, sans-serif" }}>
//         <Navbar.Brand href="/main">
//         <img src={mindsetLogo} margin="0 5px" height="180px" width="auto" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//         <Nav justify className="me-auto">
//             <div className="navbar-nav ml-auto fs-4 justify-content-between">
//             <a className="nav-link" aria-current="page" href="/main">
//                 Home
//             </a>

// 				<a className="nav-link" href="#" onClick={() => actions.logOut()}>
//                 Sign Out
//             </a>
//             </div>
//         </Nav>
//         </Navbar.Collapse>
//     </Container>
//     </Navbar>

return (
    <nav className="navbar navbar-light bg-light">
        <div className="container">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">React Boilerplate</span>
            </Link>
            <div className="ml-auto">
                <Link to="/FormSignup">
                    <button className="btn btn-primary">Sign up</button>
                </Link>
            </div>
            <div className="ml-auto">
                <Link to="/Login">
                    <button className="btn btn-primary">Log in</button>
                </Link>
            </div>
        </div>
    </nav>
);
// );
};

