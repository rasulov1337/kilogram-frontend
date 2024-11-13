import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
    return (
        <>
            <Navbar className="header" expand="lg">
                <Container>
                    <Navbar.Brand href="/" className="text-white fs-2">
                        KiloGram
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto text-white fs-5">
                            <Nav.Link
                                href="/recipients/"
                                className="text-white"
                            >
                                Получатели
                            </Nav.Link>
                            <Nav.Link href="/transfers/" className="text-white">
                                Отправки файлов
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
