import { NavLink } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
    return (
        <nav className="nav-container">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : 'link'}>
                Home
            </NavLink>

            <NavLink to="collection" className={({ isActive }) => isActive ? 'active-link' : 'link'}>
                Favorite Breeds
            </NavLink>
        </nav>
    );
}