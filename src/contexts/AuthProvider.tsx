import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Define the shape of the JWT payload
type DecodedToken = {
    username: string;
    exp?: number;
    // [key: string]: any;
};

// Define the context value shape
type AuthContextType = {
    user: DecodedToken;
    login: (token: string) => { success: boolean; message: string };
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
    const [user, setUser] = useState<DecodedToken>({ username: "none" });

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (token) {
            const decoded: DecodedToken = token ? jwtDecode(token) : { username: "none" };
            setUser(decoded)
            timeout = setTimeout(() => {
                setUser({ username: "none" })
                setToken(null); // Clear token after 15 minutes
            }, 15 * 60 * 1000);
        }
        return () => clearTimeout(timeout);
    }, [token]);

    const login = (newtoken: string) => {

        try {
            if (true) {
                setToken(newtoken);
                // const decoded = newtoken ? jwtDecode(newtoken) : { username: "none" };
                // setUser(decoded)
                sessionStorage.setItem("token", newtoken)
                return { success: true, message: "Login successful" };
            } else {
                return {
                    success: false,
                    message: "Login failed"
                };
            }
        } catch (error) {
            return { success: false, message: "Network error" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser({ username: "none" })
        sessionStorage.removeItem("token");
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