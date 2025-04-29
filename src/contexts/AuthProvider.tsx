import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import jwt from 'jsonwebtoken';
import { User } from "../types/user";
import { DecodedToken } from "../types/decodedToken";

// Define the context value shape
type AuthContextType = {
    user: DecodedToken | User;
    login: (token: string, user_temp: User) => { success: boolean; message: string };
    logout: () => { success: boolean; message: string };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

    console.log("auth invoked")

    const [token, setToken] = useState<string | null>(
        () => sessionStorage.getItem("token")
    );
    const [user, setUser] = useState<User | DecodedToken>({ username: "none" });

    useEffect(() => {
        if (token) {
            if (user.username === "none") {
                const userData: string | null = localStorage.getItem('user');
                if (userData !== null)
                    setUser(JSON.parse(userData))
            }
        }
    }, [token]);

    const login = (newtoken: string, user_temp: User) => {
        try {
            setToken(newtoken);
            setUser(user_temp)
            sessionStorage.setItem("token", newtoken)
            localStorage.setItem('user', JSON.stringify(user_temp));
            return { success: true, message: "successful" };

        } catch (error) {
            return { success: false, message: "failed" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser({ username: "none" })
        sessionStorage.removeItem("token");
        localStorage.removeItem("user")
        return { success: true, message: "Logout successful" };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook with type safety
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};