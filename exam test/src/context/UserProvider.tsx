import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    age?: number;
}

interface UserContextType {
    users: User[];
    addUser: (user: Omit<User, 'id'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUserContext must be used within UserProvider');
    return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);

    const addUser = (user: Omit<User, 'id'>) => {
        setUsers((prev) => [
            ...prev,
            { ...user, id: Date.now().toString() },
        ]);
    };

    return (
        <UserContext.Provider value={{ users, addUser }}>
            {children}
        </UserContext.Provider>
    );
};
