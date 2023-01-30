import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import logo from './logo/magna-logo.png'

function App() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt='logo'/>
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/features">Features</Nav.Link>
          <Nav.Link href="/pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;
