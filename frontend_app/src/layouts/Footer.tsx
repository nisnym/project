import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 icon-primary" />
              <span className="text-lg font-bold text-gray-900">
                HealthBuddy
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Your comprehensive healthcare wellness and preventive care portal.
              Helping patients achieve health goals and maintain compliance with
              preventive checkups.
            </p>
            <p className="text-sm text-gray-500">
              Built with ❤️ by Team TechnoSphere.{" "}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4"></h3>
            <ul className="space-y-2"></ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">
                  Patient Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-blue-600">
                  Doctor Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HealthBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
