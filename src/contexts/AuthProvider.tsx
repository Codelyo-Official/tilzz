import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";
import { DecodedToken } from "../types/decodedToken";
import axios from "axios";
import { ApiError } from "../types/apiError";

// Define the context value shape
type AuthContextType = {
    user: DecodedToken | User;
    login: (token: string, user_temp: User) => { success: boolean; message: string };
    logout: () => Promise<{ success: boolean; message: string }>;
    setUser: React.Dispatch<React.SetStateAction<User | DecodedToken>>;
};

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {


    const [token, setToken] = useState<string | null>(
        () => sessionStorage.getItem("token")
    );
    const [user, setUser] = useState<User | DecodedToken>({ username: "none", id: 0 });

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
            console.log(user_temp)
            setToken(newtoken);
            setUser(user_temp)
            sessionStorage.setItem("token", newtoken)
            localStorage.setItem('user', JSON.stringify(user_temp));
            return { success: true, message: "successful" };

        } catch (error) {
            return { success: false, message: "failed" };
        }
    };

    const logout = async (): Promise<{ success: boolean; message: string }> => {
        try {
            const token = sessionStorage.getItem("token");
            console.log(token)
            // const logoutUserInfoApi_response = await axios.post(`${API_BASE_URL}/api/users/logout/`, {
            //     headers: {
            //         Authorization: `Token ${token}`,
            //     }
            // });
            
            // console.log(logoutUserInfoApi_response);
            console.log("came here")
            setToken(null);
            setUser({ username: "none", id: 0 })
            sessionStorage.removeItem("token");
            localStorage.removeItem("user")
            return { success: true, message: "Logout successful" };


        } catch (err: any) {
            console.log(err)
            const apiError = err as ApiError;
            if (apiError.response) {
                const status = apiError.response.status;
                const errorMessage = apiError.response.data?.username || 'could not update user info';
            }
            return { success: false, message: "Logout unsuccessful" };

        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                setUser
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