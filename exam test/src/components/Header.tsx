import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="flex items-center p-4 bg-base-200 w-full relative bg-blue-300">
            <div className="flex items-center gap-x-4">
                <Link to="/">
                    <h1 className="text-sm font-bold hover:text-primary transition-all duration-300 text-red">
                        Home
                    </h1>
                </Link>

                <Link to="/users">
                    <h1 className="text-sm   font-bold hover:text-primary transition-all duration-300">
                        Users
                    </h1>
                </Link>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-4">

            </div>
        </nav>
    )
}
