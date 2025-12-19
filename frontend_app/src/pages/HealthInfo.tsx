import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Shield, 
  Activity, 
  Brain, 
  Apple, 
  Moon,
  Droplet,
  Footprints,
  CheckCircle
} from 'lucide-react';

export const HealthInfo = () => {
  const healthTips = [
    {
      icon: Footprints,
      title: "Stay Active",
      description: "Aim for at least 150 minutes of moderate aerobic activity per week. Regular exercise helps prevent chronic diseases and maintains mental health.",
      tips: [
        "Take 10,000 steps daily",
        "Include strength training twice a week",
        "Find activities you enjoy",
        "Start small and build gradually"
      ]
    },
    {
      icon: Apple,
      title: "Eat Well",
      description: "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains provides essential nutrients for optimal health.",
      tips: [
        "Eat 5-9 servings of fruits and vegetables daily",
        "Choose whole grains over refined ones",
        "Limit processed foods and added sugars",
        "Stay hydrated with water"
      ]
    },
    {
      icon: Moon,
      title: "Sleep Better",
      description: "Quality sleep is crucial for physical health, mental well-being, and cognitive function. Adults need 7-9 hours of sleep per night.",
      tips: [
        "Maintain a consistent sleep schedule",
        "Create a relaxing bedtime routine",
        "Limit screen time before bed",
        "Keep your bedroom cool and dark"
      ]
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Mental health is just as important as physical health. Practice stress management and seek support when needed.",
      tips: [
        "Practice mindfulness or meditation",
        "Stay connected with friends and family",
        "Manage stress through healthy coping mechanisms",
        "Seek professional help when needed"
      ]
    },
    {
      icon: Droplet,
      title: "Stay Hydrated",
      description: "Proper hydration supports all bodily functions, from temperature regulation to nutrient transport.",
      tips: [
        "Drink 8-10 glasses of water daily",
        "Monitor urine color for hydration status",
        "Increase intake during exercise or hot weather",
        "Eat water-rich foods like fruits and vegetables"
      ]
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description: "Regular check-ups and screenings can detect health issues early when they're most treatable.",
      tips: [
        "Schedule annual physical exams",
        "Stay up to date with vaccinations",
        "Follow recommended screening schedules",
        "Know your family health history"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-blue-200 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Health Information & Wellness
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Evidence-based health information to help you make informed decisions about your well-being. 
              Learn about preventive care and healthy lifestyle practices.
            </p>
          </div>
        </div>
      </section>

      {/* Health Tips Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Guide to Better Health
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, actionable steps you can take today to improve your health and prevent chronic diseases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <tip.icon className="h-8 w-8 text-blue-600 mr-3" />
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((item, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preventive Care Schedule */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preventive Care Guidelines
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay healthy with regular screenings and check-ups. Early detection saves lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Annual Checkups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Physical Exam</span>
                  <span className="text-gray-600">Yearly</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Blood Pressure</span>
                  <span className="text-gray-600">Every 2 years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Cholesterol</span>
                  <span className="text-gray-600">Every 4-6 years</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Diabetes Screening</span>
                  <span className="text-gray-600">Every 3 years</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Cancer Screenings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Mammogram</span>
                  <span className="text-gray-600">Every 1-2 years (50+)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Colonoscopy</span>
                  <span className="text-gray-600">Every 10 years (50+)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium">Cervical Cancer</span>
                  <span className="text-gray-600">Every 3 years (21+)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Skin Cancer</span>
                  <span className="text-gray-600">Annual exam</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Note</h3>
                <p className="text-gray-700">
                  These are general guidelines. Your healthcare provider may recommend different screening schedules 
                  based on your personal and family health history, risk factors, and current health status. 
                  Always consult with your healthcare provider for personalized medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Privacy & Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Our Commitment to Your Privacy</h3>
                <p className="text-gray-700 mb-4">
                  HealthBuddy is committed to protecting your personal health information in compliance with HIPAA 
                  and other applicable privacy regulations. Your health data is encrypted, secure, and only shared 
                  with authorized healthcare providers involved in your care.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">How We Protect Your Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    End-to-end encryption for all data transmission
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Secure authentication and authorization systems
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Regular security audits and compliance assessments
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    Limited access controls for healthcare providers
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Data Usage Consent:</strong> By using our platform, you consent to the collection and 
                  use of your health information for the purpose of providing healthcare services, improving 
                  care coordination, and supporting your wellness goals as described in our privacy policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};