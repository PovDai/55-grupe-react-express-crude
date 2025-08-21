import { Link, NavLink } from "react-router"
export function Header() {
    
    return (
    
        <div className="container">
            <div className="row">
    <header
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0"> <NavLink to="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                </NavLink> </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><NavLink to="/" className="nav-link px-2 link-secondary">Home</NavLink></li>
        
                        <li><NavLink to="/categories" className="nav-link px-2">Categories </NavLink></li>
                        <li><NavLink to="/students" className="nav-link px-2">Students </NavLink></li>
                        <li><NavLink to="/komentarai" className="nav-link px-2">Komentarai </NavLink></li>
                        <li><NavLink to="/upload" className="nav-link px-2">Upload photo </NavLink></li>
                        
           
        </ul>
        <Link to="/register" className="btn btn-outline-primary me-2">Register</Link>
                    <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                    <Link to="/logout"  className="btn btn-outline-primary me-2">Logout</Link>
    </header>
            </div>
            </div>
        
    )
}