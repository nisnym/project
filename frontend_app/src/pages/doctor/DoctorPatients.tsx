import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { 
  Users, 
  Search, 
  Filter, 
  Target, 
  TrendingUp, 
  Calendar,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Activity
} from 'lucide-react';

export const DoctorPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock patient data - would come from API
  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      lastVisit: "2024-01-10",
      nextVisit: "2024-01-15",
      riskLevel: "low",
      compliance: 95,
      goals: [
        { type: "steps", target: 10000, current: 9500, unit: "steps" },
        { type: "blood pressure", target: 120, current: 118, unit: "mmHg" },
        { type: "medication", target: 2, current: 2, unit: "doses/day" }
      ],
      conditions: ["Diabetes Type 2", "Hypertension"],
      medications: ["Metformin", "Lisinopril"],
      notes: "Patient is doing well with current treatment plan."
    },
    {
      id: 2,
      name: "Sarah Johnson", 
      age: 32,
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      lastVisit: "2024-01-08",
      nextVisit: "2024-01-20",
      riskLevel: "low",
      compliance: 88,
      goals: [
        { type: "weight", target: 140, current: 142, unit: "lbs" },
        { type: "exercise", target: 3, current: 4, unit: "sessions/week" },
        { type: "water", target: 8, current: 6, unit: "glasses/day" }
      ],
      conditions: ["Obesity"],
      medications: ["Multivitamin"],
      notes: "Making good progress with weight management."
    },
    {
      id: 3,
      name: "Michael Davis",
      age: 58,
      email: "m.davis@email.com", 
      phone: "(555) 345-6789",
      lastVisit: "2024-01-05",
      nextVisit: "2024-01-18",
      riskLevel: "medium",
      compliance: 72,
      goals: [
        { type: "steps", target: 8000, current: 5500, unit: "steps" },
        { type: "cholesterol", target: 200, current: 220, unit: "mg/dL" },
        { type: "medication", target: 3, current: 2, unit: "doses/day" }
      ],
      conditions: ["High Cholesterol", "Prediabetes"],
      medications: ["Atorvastatin", "Aspirin"],
      notes: "Needs to improve medication adherence and exercise routine."
    },
    {
      id: 4,
      name: "Emily Brown",
      age: 29,
      email: "emily.brown@email.com",
      phone: "(555) 456-7890", 
      lastVisit: "2024-01-03",
      nextVisit: "2024-01-25",
      riskLevel: "high",
      compliance: 45,
      goals: [
        { type: "medication", target: 2, current: 0, unit: "doses/day" },
        { type: "sleep", target: 8, current: 5, unit: "hours" },
        { type: "stress", target: 3, current: 8, unit: "scale 1-10" }
      ],
      conditions: ["Depression", "Anxiety"],
      medications: ["Sertraline", "Lorazepam"],
      notes: "High priority - missed several medication doses. Needs immediate follow-up."
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'high-risk' && patient.riskLevel === 'high') ||
                         (filterStatus === 'low-compliance' && patient.compliance < 70);
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800'; 
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 80) return 'text-green-600';
    if (compliance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const PatientCard = ({ patient }: { patient: any }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => setSelectedPatient(patient)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-600">Age: {patient.age}</p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {patient.email}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {patient.phone}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getRiskColor(patient.riskLevel)}>
              {patient.riskLevel.toUpperCase()} RISK
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Compliance Rate</p>
            <p className={`text-2xl font-bold ${getComplianceColor(patient.compliance)}`}>
              {patient.compliance}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Goals</p>
            <p className="text-2xl font-bold text-gray-900">{patient.goals.length}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Visit:</span>
            <span className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Next Visit:</span>
            <span className="font-medium">{new Date(patient.nextVisit).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {patient.conditions.map((condition: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {condition}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule
          </Button>
          <Button size="sm" className="flex-1">
            <Target className="h-4 w-4 mr-1" />
            Set Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PatientDetails = ({ patient }: { patient: any }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
        <Button variant="outline" onClick={() => setSelectedPatient(null)}>
          Back to List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk Level</p>
                <Badge className={getRiskColor(patient.riskLevel)}>
                  {patient.riskLevel.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{patient.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Conditions</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {patient.conditions.map((condition: string, index: number) => (
                  <Badge key={index} variant="secondary">{condition}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Medications</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {patient.medications.map((medication: string, index: number) => (
                  <Badge key={index} variant="outline">{medication}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Compliance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className={`text-4xl font-bold ${getComplianceColor(patient.compliance)}`}>
                {patient.compliance}%
              </p>
              <p className="text-sm text-gray-600">Overall Compliance Rate</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full ${
                  patient.compliance >= 80 ? 'bg-green-500' :
                  patient.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${patient.compliance}%` }}
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Excellent (80-100%)</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex justify-between">
                <span>Good (60-79%)</span>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex justify-between">
                <span>Needs Improvement (&lt;60%)</span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Current Health Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient.goals.map((goal: any, index: number) => {
              const progress = Math.min((goal.current / goal.target) * 100, 100);
              const isOnTrack = progress >= 80;
              
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium capitalize">{goal.type}</h4>
                    <Badge variant={isOnTrack ? 'default' : 'secondary'}>
                      {isOnTrack ? 'On Track' : 'Needs Attention'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
                    <span>Current: {goal.current} {goal.unit}</span>
                    <span>Target: {goal.target} {goal.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isOnTrack ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <Button className="w-full mt-4">
            <Target className="h-4 w-4 mr-2" />
            Modify Goals
          </Button>
        </CardContent>
      </Card>

      {/* Clinical Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{patient.notes}</p>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Add New Note
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
        <p className="text-gray-600 mt-2">
          Monitor patient compliance and manage health goals
        </p>
      </div>

      {selectedPatient ? (
        <PatientDetails patient={selectedPatient} />
      ) : (
        <>
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select 
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <option value="all">All Patients</option>
                  <option value="high-risk">High Risk</option>
                  <option value="low-compliance">Low Compliance</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Patient Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No patients found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};