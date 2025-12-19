import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Heart } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className=" text-blue-600 mr-2" />
            <Link to="/" className="text-xl font-bold text-gray-900">
              HealthBuddy
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/health-info"
              className="text-gray-700 hover:text-blue-600"
            >
              Health Information
            </Link>
            {!user && (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </nav>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`/avatars/${user.role}.jpg`}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback>
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
