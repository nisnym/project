import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  Target, 
  User, 
  LogOut,
  Users,
  Heart
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const patientNavItems = [
  { name: 'Dashboard', href: '/patient/dashboard', icon: LayoutDashboard },
  { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
  { name: 'Goals', href: '/patient/goals', icon: Target },
  { name: 'Profile', href: '/patient/profile', icon: User },
];

const doctorNavItems = [
  { name: 'Dashboard', href: '/doctor/dashboard', icon: LayoutDashboard },
  { name: 'Patients', href: '/doctor/patients', icon: Users },
  { name: 'Appointments', href: '/doctor/appointments', icon: Calendar },
  { name: 'Profile', href: '/doctor/profile', icon: User },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = user?.role === 'patient' ? patientNavItems : doctorNavItems;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <Heart className="h-6 w-6 text-blue-600 mr-2" />
          <span className="text-lg font-semibold text-gray-900">HealthBuddy</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};