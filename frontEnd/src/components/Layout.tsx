
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div 
            className="text-2xl font-bold cursor-pointer flex items-center" 
            onClick={() => navigate("/")}
          >
            <span className="text-primary">Wigo</span>
          </div>
          
          {user && (
            <>
              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-4">
                <Button
                  variant={location.pathname === "/" ? "default" : "ghost"}
                  onClick={() => navigateTo("/")}
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Accueil
                </Button>
                <Button
                  variant={location.pathname === "/account" ? "default" : "ghost"}
                  onClick={() => navigateTo("/account")}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Mon Compte
                </Button>
              </nav>
              
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                className="md:hidden" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu />
              </Button>
            </>
          )}
          
          {!user && (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {location.pathname !== "/login" && (
                <Button 
                  variant="default"
                  onClick={() => navigate("/login")}
                >
                  Connexion
                </Button>
              )}
              {location.pathname !== "/register" && (
                <Button 
                  variant="outline"
                  onClick={() => navigate("/register")}
                >
                  Inscription
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && user && (
          <div className="md:hidden bg-background border-b py-2 animate-fadeIn">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => navigateTo("/")}
              >
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Button>
              <Button 
                variant={location.pathname === "/account" ? "default" : "ghost"}
                className="justify-start"
                onClick={() => navigateTo("/account")}
              >
                <User className="h-4 w-4 mr-2" />
                Mon Compte
              </Button>
              <Button 
                variant="ghost"
                className="justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-background border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Wigo - What Is Going On. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
