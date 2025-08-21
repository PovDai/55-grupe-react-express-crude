import { Link } from "react-router";

export function Footer() {
    
    return (
        <div className="container">
    <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></li>
                    <li className="nav-item"><Link to="/categories" className="nav-link px-2 text-body-secondary">Categories</Link></li>
                    <li className="nav-item"><Link to="/students" className="nav-link px-2 text-body-secondary">Students</Link></li>
                    <li className="nav-item"><Link to="/komentarai" className="nav-link px-2 text-body-secondary">Komentarai</Link></li>
                    
            
        </ul>
        <p className="text-center text-body-secondary">&copy; {new Date().getFullYear()} Company, Inc  </p>
    </footer>
</div>

        
    )
}