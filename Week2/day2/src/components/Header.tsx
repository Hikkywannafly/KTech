import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="flex items-center p-4 bg-base-200 w-full relative">
            <div className="flex items-center gap-x-4">
                <Link to="/">
                    <h1 className="text-sm font-bold hover:text-primary transition-all duration-300 text-red">
                        Home
                    </h1>
                </Link>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-4">
                <Link to="/Widget1">
                    <h1 className="text-sm   font-bold hover:text-primary transition-all duration-300">
                        Blog
                    </h1>
                </Link>
                <Link to="/Widget2">
                    <h1 className="text-sm  font-bold hover:text-primary transition-all duration-300">
                        Category
                    </h1>
                </Link>
                <Link to="/Widget3">
                    <h1 className="text-sm  font-bold hover:text-primary transition-all duration-300">
                        Customer
                    </h1>
                </Link>
                <Link to="/Widget4">
                    <h1 className="text-sm  font-bold hover:text-primary transition-all duration-300">
                        Product
                    </h1>
                </Link>
            </div>
            {/* login */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Link to="/login">
                    <button className="btn btn-primary">Login</button>
                </Link>
            </div>
        </nav>
    )
}
