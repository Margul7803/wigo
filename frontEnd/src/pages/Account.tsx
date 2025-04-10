
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Heart, Mail, User } from "lucide-react";

const Account = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Mon Compte</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Nom d'utilisateur</p>
                  <p className="text-muted-foreground">{user.username}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-secondary/50 p-4 rounded-lg">
                <FileText className="h-12 w-12 mr-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Articles publiés</p>
                  <p className="text-2xl font-bold">{user.postsCount}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-secondary/50 p-4 rounded-lg">
                <Heart className="h-12 w-12 mr-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Likes reçus</p>
                  <p className="text-2xl font-bold">{user.likesCount}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline" 
            className="text-destructive hover:text-destructive"
            onClick={() => alert("Fonctionnalité en cours de développement")}
          >
            Supprimer mon compte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
