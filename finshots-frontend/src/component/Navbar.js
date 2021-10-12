import {React, useState, useEffect} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

import './style.css';

const NavbarTop = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="nav-container">
            <Navbar light expand="md sticky-top nav-color">
                <NavbarBrand className="ml-sm-5" style={{cursor:"pointer"}}>
                    Portfolio
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem style={{cursor:"pointer"}} className="nav-link">
                            Daily
                        </NavItem>
                        <NavItem style={{cursor:"pointer"}} className="nav-link">
                            Subscribe
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default withRouter(NavbarTop);
