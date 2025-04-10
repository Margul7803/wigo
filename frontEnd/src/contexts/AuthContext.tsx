import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { User } from "@/types";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "../graphql/mutations";
import { jwtDecode } from "jwt-decode"; // Import de jwt-decode

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("wigo-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const [loginMutation] = useMutation(LOGIN_USER);
  const [registerMutation] = useMutation(REGISTER_USER);

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded; // Décodé, peut être utilisé pour extraire l'ID ou autres informations
    } catch (error) {
      toast.error("Le token est invalide");
      return null;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { data } = await loginMutation({
        variables: { username, password },
      });

      // Vérifier la réponse du serveur
      const token = data.login; // Le token JWT renvoyé par le serveur
      if (token) {
        // Décoder le token
        const decodedUser = decodeToken(token);
        if (decodedUser) {
          localStorage.setItem("auth-token", token); // Sauvegarder le token dans localStorage
          localStorage.setItem("wigo-user", JSON.stringify(decodedUser)); // Sauvegarder l'utilisateur décodé dans localStorage

          setUser(decodedUser as User); // Mettre à jour l'état de l'utilisateur
          toast.success("Connexion réussie!");
          return true;
        }
      } else {
        toast.error("Username ou mot de passe incorrect");
        return false;
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion");
      return false;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await registerMutation({
        variables: { username, email, password },
      });

      // Le message de confirmation pour l'enregistrement
      const message = data.register; // Message comme "User testinguser created"
      if (message.includes("created")) {
        // Simuler les données utilisateur après l'inscription
        const userData = { username, email, postsCount: 0, likesCount: 0 };

        localStorage.setItem("wigo-user", JSON.stringify(userData)); // Sauvegarder dans localStorage
        toast.success("Inscription réussie!");
        return true;
      } else {
        toast.error("Une erreur est survenue lors de l'inscription");
        return false;
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription");
      return false;
    }
  };

  const logout = () => {
    setUser(null); // Réinitialiser l'utilisateur dans l'état
    localStorage.removeItem("auth-token"); // Supprimer le token de l'authentification
    localStorage.removeItem("wigo-user"); // Supprimer l'utilisateur du localStorage
    toast.success("Déconnexion réussie");
  };

  // Vérifier si un token existe déjà dans localStorage
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        setUser(decodedUser as User); // Mettre à jour l'état avec l'utilisateur décodé
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
