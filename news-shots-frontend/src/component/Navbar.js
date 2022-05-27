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
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {getAllUniqueCategories} from '../user/helper/categoryAPICalls';
import Subscribe from './Subscribe'

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

    //Modal
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    const closeBtn = <button className="close" onClick={toggleModal}>&times;</button>;

    const showModal = () => {
        return(
            <Modal isOpen={modal}>
                <ModalHeader toggle={toggleModal} close={closeBtn}>Subscribe</ModalHeader>
                    <ModalBody>
                        Subscribe to NewsShots and Get Daily dose of News.<br/> Pinky Promise<br/><br/>
                        <Subscribe isModal={true}/>
                    </ModalBody>
            </Modal>
        )
    }
    return (
        <div className="nav-container">
            {showModal()}
            <Navbar light expand="md sticky-top nav-color">
                <NavbarBrand className="ml-sm-5 nav-link">
                    <Link to="/" style={{ textDecoration:'none', color: 'black'}}>NewsShots</Link>
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
                                                style={{ textDecoration:'none', color: 'black'}}
                                                key={index}
                                                to={`/tag/${category.name}`}>
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
                            <Link to="/daily" style={{ textDecoration:'none', color: 'black'}}>Daily</Link>
                        </NavItem>

                        <NavItem className="nav-link" onClick={toggleModal}>
                            Subscribe
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarTop;
