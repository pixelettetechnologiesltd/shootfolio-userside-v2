import Dropdown from 'react-bootstrap/Dropdown';
import { RxHamburgerMenu } from "react-icons/rx";
import "../Css/Dropdown.css"
function BasicExample() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <span className='sethamburg'><RxHamburgerMenu/></span>Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/">Home</Dropdown.Item>
        <Dropdown.Item href="/about">About Us</Dropdown.Item>
        <Dropdown.Item href="/contact">Contact</Dropdown.Item>
        <Dropdown.Item href="/portfolio">Portfolio</Dropdown.Item>
        <Dropdown.Item href="/performance">Performance</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;