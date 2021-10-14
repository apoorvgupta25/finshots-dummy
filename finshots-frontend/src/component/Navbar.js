import {React, useState, useEffect} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

import {getAllUniqueCategories} from '../user/helper/categoryAPICalls';
import './style.css';

const NavbarTop = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([])

    const toggle = () => setIsOpen(!isOpen);

    const preload = () => {
        getAllUniqueCategories()
        .then(data => {
            if(data.error){
                console.log(data.error);
            }
            else{
                setCategories(data)
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    return (
        <div className="nav-container">
            <Navbar light expand="md sticky-top nav-color">
                <NavbarBrand className="ml-sm-5 nav-link">
                    NewsShots
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Topics
                            </DropdownToggle>
                            <DropdownMenu right>
                                {categories.map((category, index) => {
                                    return(
                                            <Link
                                                className="text-bold"
                                                key={index}
                                                to={{
                                                    pathname:`/category/${category.name}`,
                                                    state: {
                                                      categoryId: category._id,
                                                    },
                                                }}>
                                                <DropdownItem>
                                                {category.name}
                                                </DropdownItem>
                                            </Link>
                                    )
                                })}

                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>

                    <Nav className="ml-auto" navbar>
                        <NavItem className="nav-link">
                            Daily
                        </NavItem>

                        <NavItem className="nav-link">
                            Subscribe
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default withRouter(NavbarTop);
