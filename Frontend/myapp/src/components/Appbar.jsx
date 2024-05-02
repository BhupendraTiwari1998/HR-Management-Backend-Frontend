import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom'
import image1 from './image/hr1.jpg'

const Appbar = () => {

    const navigate = useNavigate()

    const onlogoutHandle = () => {
        localStorage.clear()
        navigate("/sign-in")

    }
    return (
        <div className='back'>
            <Navbar expand="lg" className="navv">
                <Container>
                    <Navbar.Brand href="#home">
                        <div className='w-[6vw]'>
                            <img src={image1} className='h-full w-full object-cover' alt="" />
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto font-bold" variant='pills' defaultActiveKey={'/'} >
                            <NavLink className="nav-link mx-3" to='/' >Student List</NavLink>
                            <NavLink className="nav-link mx-3" to='/add_student' >Add Student</NavLink>
                            <NavLink className="nav-link mx-3" to='/course' >Course</NavLink>
                        </Nav>

                        <button className='nav-butt text-white rounded px-6 py-2 ms-4' onClick={onlogoutHandle}>Logout</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Appbar