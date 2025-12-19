import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  Heart,
  FileText,
  Target
} from 'lucide-react';

export const DoctorDashboard = () => {
  const { user } = useAuth();

  // Mock data - would come from API in real app
  const todayStats = {
    totalPatients: 24,
    todayAppointments: 8,
    completedAppointments: 5,
    pendingReviews: 3,
    patientsAtRisk: 2
  };

  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "10:00 AM",
      type: "Follow-up",
      status: "confirmed",
      notes: "Diabetes management review"
    },
    {
      id: 2,
      patient: "Sarah Johnson",
      time: "11:30 AM", 
      type: "Annual Physical",
      status: "confirmed",
      notes: "Routine annual checkup"
    },
    {
      id: 3,
      patient: "Michael Davis",
      time: "2:00 PM",
      type: "Consultation",
      status: "pending",
      notes: "Blood pressure concerns"
    }
  ];

  const patientsNeedingAttention = [
    {
      id: 1,
      name: "Emily Brown",
      issue: "Missed medication for 3 days",
      priority: "high",
      lastContact: "2 days ago"
    },
    {
      id: 2,
      name: "Robert Wilson",
      issue: "Overdue blood work",
      priority: "medium", 
      lastContact: "1 week ago"
    },
    {
      id: 3,
      name: "Lisa Garcia",
      issue: "No goal progress in 2 weeks",
      priority: "low",
      lastContact: "3 days ago"
    }
  ];

  const patientComplianceData = [
    { name: "John Smith", compliance: 95, goals: 4, completedGoals: 4, risk: "low" },
    { name: "Sarah Johnson", compliance: 88, goals: 3, completedGoals: 3, risk: "low" },
    { name: "Michael Davis", compliance: 72, goals: 5, completedGoals: 3, risk: "medium" },
    { name: "Emily Brown", compliance: 45, goals: 4, completedGoals: 2, risk: "high" },
    { name: "Robert Wilson", compliance: 65, goals: 3, completedGoals: 2, risk: "medium" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your practice overview for today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.totalPatients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {todayStats.completedAppointments}/{todayStats.todayAppointments}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.pendingReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">At Risk Patients</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.patientsAtRisk}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Compliance</p>
                <p className="text-2xl font-bold text-gray-900">73%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Today's Schedule
              </div>
              <Button size="sm" variant="outline">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{appointment.patient}</span>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                  <p className="text-xs text-gray-500">{appointment.notes}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {appointment.time}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Manage Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Patients Needing Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Patients Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {patientsNeedingAttention.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{patient.name}</span>
                    <Badge className={getPriorityColor(patient.priority)}>
                      {patient.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{patient.issue}</p>
                  <p className="text-xs text-gray-500">Last contact: {patient.lastContact}</p>
                </div>
                <Button size="sm" variant="outline">
                  Contact
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Patient Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-blue-600" />
            Patient Compliance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patientComplianceData.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{patient.name}</span>
                    <span className={`font-medium ${getRiskColor(patient.risk)}`}>
                      {patient.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Compliance: {patient.compliance}%
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Goals: {patient.completedGoals}/{patient.goals}
                    </div>
                  </div>
                  
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        patient.compliance >= 80 ? 'bg-green-500' :
                        patient.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${patient.compliance}%` }}
                    />
                  </div>
                </div>
                
                <div className="ml-4 space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm">
                    Set Goals
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Button className="w-full">
              View All Patients
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manage Patients</h3>
            <p className="text-sm text-gray-600 mb-4">
              View patient details, update records, and track progress
            </p>
            <Button variant="outline" className="w-full">
              Go to Patients
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Schedule Management</h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage appointments, availability, and scheduling
            </p>
            <Button variant="outline" className="w-full">
              Manage Schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">
              View practice analytics and patient outcome reports
            </p>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};