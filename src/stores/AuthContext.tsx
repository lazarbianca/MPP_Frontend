import {jwtDecode} from 'jwt-decode';
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import User from '../model/User';

interface AuthState {
    token: string | null;
    user?: User | any;
}

interface AuthContextProps {
    auth: AuthState;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [auth, setAuth] = useState<AuthState>({token: null, user: null});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            setAuth({token, user});
        }
    }, []);

    const login = (token: string) => {
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        setAuth({token, user});
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({token: null, user: null});
    };

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
