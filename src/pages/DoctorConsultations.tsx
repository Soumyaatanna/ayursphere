
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Video, 
  MessageSquare, 
  Clock, 
  Star, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const doctors = [
  {
    id: 1,
    name: 'Dr. Aisha Sharma',
    specialty: 'Ayurvedic Practitioner',
    avatar: 'https://img.freepik.com/premium-photo/3d-doctor-cartoon-character_115032-5118.jpg',
    rating: 4.9,
    reviewCount: 124,
    expertise: ['Digestive Health', 'Stress Management', 'Women\'s Health'],
    availableToday: true
  },
  {
    id: 2,
    name: 'Dr. Rajesh Patel',
    specialty: 'Panchakarma Specialist',
    avatar: 'https://img.freepik.com/premium-photo/male-doctor-cartoon_975306-50.jpg',
    rating: 4.8,
    reviewCount: 98,
    expertise: ['Detoxification', 'Chronic Pain', 'Immunity', 'Stress Management'],
    availableToday: false
  },
  {
    id: 3,
    name: 'Dr. Meera Iyer',
    specialty: 'Ayurvedic Nutritionist',
    avatar: 'https://cdn1.vectorstock.com/i/1000x1000/86/90/cute-little-female-doctor-cartoon-waving-hand-vector-1468690.jpg',
    rating: 4.7,
    reviewCount: 87,
    expertise: ['Diet Planning', 'Weight Management', 'Metabolic Disorders'],
    availableToday: true
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    specialty: 'Nadi Pariksha Expert',
    avatar: 'https://cdn5.vectorstock.com/i/1000x1000/50/14/cartoon-male-doctor-holding-a-clipboard-vector-25495014.jpg',
    rating: 4.9,
    reviewCount: 112,
    expertise: ['Pulse Diagnosis', 'Constitutional Analysis', 'Preventive Care'],
    availableToday: false
  }
];

const ConsultationOption = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <Card className="border-ayur-sage/40 hover:border-ayur-green transition-colors duration-300">
    <CardContent className="pt-6">
      <div className="mb-4 w-12 h-12 bg-ayur-green/10 rounded-full flex items-center justify-center">
        <Icon className="h-6 w-6 text-ayur-green" />
      </div>
      <CardTitle className="text-lg mb-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const DoctorCard = ({ doctor }: { doctor: typeof doctors[0] }) => (
  <Card className="border-ayur-sage/40 hover:border-ayur-green transition-colors duration-300">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={doctor.avatar} alt={doctor.name} />
            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <CardDescription>{doctor.specialty}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{doctor.rating}</span>
          <span className="text-muted-foreground">({doctor.reviewCount})</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pb-3">
      <div className="mb-3">
        <h4 className="text-sm font-medium mb-2">Expertise</h4>
        <div className="flex flex-wrap gap-2">
          {doctor.expertise.map((item, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-ayur-green/10 text-ayur-green px-2 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {doctor.availableToday && (
        <div className="text-sm text-ayur-green flex items-center gap-1 mt-2">
          <Clock className="h-3 w-3" />
          <span>Available today</span>
        </div>
      )}
    </CardContent>
    <CardFooter>
      <Button className="w-full" asChild>
        <Link to={`/doctor/${doctor.id}`}>Book Consultation</Link>
      </Button>
    </CardFooter>
  </Card>
);

const DoctorConsultations = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ayur-sage/30 to-ayur-sage/10 py-16">
          <div className="ayur-container">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Connect with Ayurvedic Practitioners
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Schedule a personal consultation with certified Ayurvedic doctors and specialists to receive tailored health guidance based on your unique constitution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  Find a Doctor
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Consultations
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Options */}
        <section className="py-16">
          <div className="ayur-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Consultation Options</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the consultation method that works best for you and your schedule
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <ConsultationOption
                icon={Video}
                title="Video Consultation"
                description="Connect face-to-face with an Ayurvedic doctor from anywhere via secure video call"
              />
              <ConsultationOption
                icon={MessageSquare}
                title="Chat Consultation"
                description="Discuss your health concerns through our secure messaging platform"
              />
              <ConsultationOption
                icon={Calendar}
                title="In-Person Visit"
                description="Schedule a visit to meet with a practitioner at their clinic"
              />
            </div>
          </div>
        </section>

        {/* Featured Doctors */}
        <section className="py-16 bg-ayur-green/5">
          <div className="ayur-container">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Featured Practitioners</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Our network includes certified Ayurvedic doctors specializing in various aspects of holistic health
                </p>
              </div>
              <Link to="/doctors" className="text-ayur-green flex items-center hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="ayur-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your journey to personalized Ayurvedic care in three simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-ayur-green flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-medium mb-2">Browse Practitioners</h3>
                <p className="text-muted-foreground">
                  Explore profiles of certified Ayurvedic practitioners and find the right specialist for your needs
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-ayur-green flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-medium mb-2">Book Your Consultation</h3>
                <p className="text-muted-foreground">
                  Select a convenient time and your preferred consultation method (video, chat, or in-person)
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-ayur-green flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-medium mb-2">Receive Personalized Care</h3>
                <p className="text-muted-foreground">
                  Meet with your practitioner and get customized health recommendations based on your constitution
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default DoctorConsultations;
