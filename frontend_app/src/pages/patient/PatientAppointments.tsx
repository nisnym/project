import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Plus, Search } from 'lucide-react';

export const PatientAppointments = () => {

  // Mock data - would come from API in real app
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Smith",
      specialty: "General Medicine",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      notes: "Annual physical checkup"
    },
    {
      id: 2,
      doctor: "Dr. Johnson",
      specialty: "Cardiology", 
      date: "2024-01-20",
      time: "2:30 PM",
      status: "pending",
      notes: "Follow-up consultation"
    },
    {
      id: 3,
      doctor: "Dr. Williams",
      specialty: "Dermatology",
      date: "2024-01-25",
      time: "11:15 AM", 
      status: "confirmed",
      notes: "Skin screening"
    }
  ];

  const appointmentHistory = [
    {
      id: 4,
      doctor: "Dr. Smith",
      specialty: "General Medicine",
      date: "2023-12-15",
      time: "9:30 AM",
      status: "completed",
      notes: "Routine checkup - all vitals normal"
    },
    {
      id: 5,
      doctor: "Dr. Brown",
      specialty: "Ophthalmology",
      date: "2023-11-10",
      time: "3:00 PM",
      status: "completed", 
      notes: "Eye exam - prescription updated"
    }
  ];

  const availableDoctors = [
    { id: 1, name: "Dr. Smith", specialty: "General Medicine" },
    { id: 2, name: "Dr. Johnson", specialty: "Cardiology" },
    { id: 3, name: "Dr. Williams", specialty: "Dermatology" },
    { id: 4, name: "Dr. Brown", specialty: "Ophthalmology" },
  ];

  const availableSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const AppointmentCard = ({ appointment, showActions = true }: { appointment: any, showActions?: boolean }) => (
    <Card key={appointment.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <User className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
            </div>
          </div>
          <Badge className={getStatusColor(appointment.status)}>
            {appointment.status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(appointment.date)}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {appointment.time}
          </div>
        </div>
        
        {appointment.notes && (
          <p className="text-sm text-gray-700 mb-4 p-3 bg-gray-50 rounded-md">
            {appointment.notes}
          </p>
        )}
        
        {showActions && appointment.status !== 'completed' && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              Reschedule
            </Button>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
            {appointment.status === 'pending' && (
              <Button size="sm">
                Confirm
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const BookingForm = () => {
    const [bookingData, setBookingData] = useState({
      doctor: '',
      date: '',
      time: '',
      reason: ''
    });

    const handleBooking = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Booking appointment:', bookingData);
      // In real app, would make API call here
      alert('Appointment booking request submitted!');
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Book New Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select 
                value={bookingData.doctor}
                onValueChange={(value) => setBookingData({...bookingData, doctor: value})}
                required
              >
                <option value="">Choose a doctor...</option>
                {availableDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <Select
                  value={bookingData.time}
                  onValueChange={(value) => setBookingData({...bookingData, time: value})}
                  required
                >
                  <option value="">Select time...</option>
                  {availableSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input
                id="reason"
                placeholder="Brief description of your concern or routine checkup"
                value={bookingData.reason}
                onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Request Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-600 mt-2">
          Manage your healthcare appointments and schedule new visits
        </p>
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Upcoming ({upcomingAppointments.length})</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>History ({appointmentHistory.length})</span>
          </TabsTrigger>
          <TabsTrigger value="book" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Book New</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No upcoming appointments
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Schedule your next appointment to stay on top of your health.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search appointment history..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <option value="all">All appointments</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
            
            {appointmentHistory.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
                showActions={false} 
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="book">
          <BookingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};