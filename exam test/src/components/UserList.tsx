import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserProvider';

function UserList() {
    const { users } = useUserContext();
    return (
        <div className="">
            <div className=" flex flex-col w-screen p-4 rounded-2xl  justify-center">

                <div className='grid bg-white rounded-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                    <h1 className='font-bold'>User list</h1>
                    {users.length === 0 && <div className="col-span-full text-gray-500">No users</div>}
                    {users.map((user) => (
                        <Link to={`/users/${user.id}`} key={user.id} className="border rounded p-4 shadow block hover:bg-gray-50 transition">
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm text-gray-700">{user.email}</div>
                            <div className="text-sm">Age: {user.age !== undefined && user.age !== null ? user.age : 'N/A'}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserList;