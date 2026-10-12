import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    Search,
    UserRound,
    ShoppingBag,
    Menu,
    X,
} from "lucide-react";
import "./navbar.css";

const API_URL = "http://localhost:4000";

const navLinks = [
    { name: "Home", path: "/", end: true },
    { name: "About", path: "/about", end: false},
    { name: "Shop", path: "/shop" },
    { name: "Recipes", path: "/recipes" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [logo, setLogo] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        fetch(`${API_URL}/navbar`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load navbar data");
                }

                return response.json();
            })
            .then((data) => {
                const logoPath = data.navbar?.logo;

                if (logoPath) {
                    setLogo(
                        logoPath.startsWith("http")
                            ? logoPath
                            : `${API_URL}${logoPath}`
                    );
                }
            })
            .catch((error) => {
                console.error("Navbar error:", error);
            });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header
            className={`navbar ${isScrolled ? "scrolled" : ""} ${
                menuOpen ? "menu-open" : ""
            }`}
        >
            <div className="navbar-logo">
                <NavLink to="/" aria-label="Elaicher Ghor Home">
                    {logo && (
                        <img
                            src={logo}
                            alt="Elaicher Ghor"
                        />
                    )}
                </NavLink>
            </div>

            <div className="navbar-actions">
                <button
                    type="button"
                    className="navbar-icon"
                    aria-label="Search"
                    onClick={() => {
                        // Connect your search functionality here
                    }}
                >
                    <Search />
                </button>

                <NavLink
                    to="/profile"
                    className="navbar-icon"
                    aria-label="My account"
                >
                    <UserRound />
                </NavLink>

                <NavLink
                    to="/cart"
                    className="navbar-icon"
                    aria-label="Shopping bag"
                >
                    <ShoppingBag />
                </NavLink>

                <button
                    type="button"
                    className="navbar-toggle"
                    aria-label={
                        menuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                    onClick={() =>
                        setMenuOpen((previous) => !previous)
                    }
                >
                    {menuOpen ? <X /> : <Menu />}
                </button>
            </div>

            <nav
                id="main-navigation"
                className={`navbar-menu ${menuOpen ? "show" : ""}`}
                aria-label="Main navigation"
                aria-hidden={!menuOpen}
            >
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.end}
                        tabIndex={menuOpen ? 0 : -1}
                        className={({ isActive }) =>
                            `navbar-link ${isActive ? "active" : ""}`
                        }
                    >
                        {link.name}
                        <span className="navbar-link-arrow">
                            ↗
                        </span>
                    </NavLink>
                ))}
            </nav>

            <button
                type="button"
                className={`navbar-backdrop ${
                    menuOpen ? "show" : ""
                }`}
                aria-label="Close navigation menu"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
            />
        </header>
    );
};

export default Navbar;