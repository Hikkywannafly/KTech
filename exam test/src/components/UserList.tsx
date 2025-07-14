import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserProvider';

function UserList() {
    const { users } = useUserContext();
    return (
        <div className="w-screen py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-xl font-bold text-center mb-8  drop-shadow">User List</h1>
                <div className="grid bg-white/80 rounded-3xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 shadow-2xl">
                    {users.length === 0 ? (
                        <div className="col-span-full text-gray-400 text-center text-lg py-12">No users</div>
                    ) : (
                        users.map((user) => (
                            <Link
                                to={`/users/${user.id}`}
                                key={user.id}
                                className="border border-purple-200 rounded-2xl p-6 shadow-lg bg-white hover:scale-105 hover:shadow-2xl transition-all duration-200 flex flex-col gap-2"
                            >
                                <div className="font-bold text-xl text-purple-800">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                                <div className="text-sm text-gray-500">Age: {user.age !== undefined && user.age !== null ? user.age : 'N/A'}</div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserList;