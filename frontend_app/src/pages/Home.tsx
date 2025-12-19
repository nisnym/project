import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Shield,
  Calendar,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Stethoscope,
} from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#00AFBE] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Health, <span className="text-white/80">Our Priority</span>
              </h1>
              <p className="text-xl mb-8 text-white/70">
                Comprehensive healthcare wellness and preventive care portal.
                Helping patients achieve health goals and maintain compliance
                with preventive checkups.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 text-gray-900">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 icon-primary mr-3" />
                  <h3 className="text-lg font-semibold">Quick Access</h3>
                </div>
                <div className="space-y-3">
                  <Link to="/login" className="block">
                    <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <Users className="h-5 w-5 icon-primary mr-3" />
                      <span>Patient Portal</span>
                    </div>
                  </Link>
                  <Link to="/login" className="block">
                    <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <Stethoscope className="h-5 w-5 icon-info mr-3" />
                      <span>Doctor Portal</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Healthcare Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform focuses on wellness and preventive care with
              usability and key preventive care features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Patient Features */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-8 w-8 icon-primary mr-3" />
                  <h3 className="text-lg font-semibold">
                    Appointment Management
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Easy appointment booking with doctor availability. Track your
                  appointment history and upcoming visits.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Real-time availability
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Appointment reminders
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 icon-warning mr-3" />
                  <h3 className="text-lg font-semibold">Wellness Goals</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Track daily health goals like steps, water intake, sleep, and
                  medications. Monitor your progress over time.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Daily goal logging
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Progress visualization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 icon-success mr-3" />
                  <h3 className="text-lg font-semibold">Secure & Private</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  HIPAA compliant platform with end-to-end encryption. Your
                  health data is protected and secure.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    HIPAA compliant
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Data encryption
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Doctor Features */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 icon-info mr-3" />
                  <h3 className="text-lg font-semibold">Patient Management</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Healthcare providers can view patient compliance, set goals,
                  and track preventive care progress.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Compliance overview
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Goal setting tools
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Stethoscope className="h-8 w-8 icon-primary mr-3" />
                  <h3 className="text-lg font-semibold">Preventive Care</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Focus on preventive care with automated reminders and
                  compliance tracking for better health outcomes.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Preventive reminders
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Health screenings
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 icon-danger mr-3" />
                  <h3 className="text-lg font-semibold">Personalized Care</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Tailored healthcare experience with personalized
                  recommendations and treatment plans.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Custom recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 icon-success mr-2" />
                    Treatment tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#00AFBE] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients and healthcare providers using our
            platform for better health management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
