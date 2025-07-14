
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserProvider';

function UserDetail() {
    const { id } = useParams<{ id: string }>();
    const { users } = useUserContext();
    const user = users.find(u => u.id === id);

    if (!user) {
        return <div className="p-8 text-center text-red-500 font-bold">User not found</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white border border-purple-200 rounded-2xl p-6 shadow-lg my-4 hover:scale-105 hover:shadow-2xl transition-all duration-200 flex flex-col gap-2">
            <h2 className="text-2xl font-bold mb-4">User Detail</h2>
            <div><span className="font-semibold">Name:</span> {user.name}</div>
            <div><span className="font-semibold">Email:</span> {user.email}</div>
            <div><span className="font-semibold">Age:</span> {user.age !== undefined && user.age !== null ? user.age : 'N/A'}</div>
        </div>
    );
}

export default UserDetail;