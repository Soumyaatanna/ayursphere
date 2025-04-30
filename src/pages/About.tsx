
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-ayur-cream to-ayur-sage/20 py-16">
          <div className="ayur-container">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-ayur-green mb-6 text-center">
              About AyurSphere
            </h1>
            <p className="text-lg text-center max-w-3xl mx-auto text-foreground/80">
              A community platform dedicated to preserving and sharing traditional Ayurvedic wisdom
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="ayur-container">
            <div className="prose prose-ayur mx-auto">
              <h2>Our Mission</h2>
              <p>
                AyurSphere was created with a simple yet powerful mission: to create a space where the ancient wisdom of Ayurveda can be preserved, shared, and made accessible to everyone seeking natural approaches to health and wellness.
              </p>
              
              <p>
                In today's fast-paced world, traditional healing knowledge is at risk of being lost. AyurSphere aims to be a digital sanctuary where this 5,000-year-old system of natural healing can thrive through community contributions and discussions.
              </p>
              
              <h2>What is Ayurveda?</h2>
              <p>
                Ayurveda, which translates to "knowledge of life," is one of the world's oldest holistic healing systems. Developed in India thousands of years ago, Ayurveda is founded on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
              </p>
              
              <p>
                The primary focus of Ayurveda is to promote good health, rather than fight disease. However, treatments may be recommended for specific health problems.
              </p>
              
              <h2>Our Community Values</h2>
              <ul>
                <li><strong>Authenticity:</strong> We value traditional knowledge and encourage the sharing of authentic Ayurvedic practices.</li>
                <li><strong>Respect:</strong> We respect the cultural origins of Ayurveda and seek to honor its traditions.</li>
                <li><strong>Accessibility:</strong> We believe Ayurvedic wisdom should be accessible to everyone, explained in clear, understandable terms.</li>
                <li><strong>Community:</strong> We foster a supportive environment where members can share experiences and learn from one another.</li>
                <li><strong>Balance:</strong> In line with Ayurvedic principles, we promote balance in all aspects of life.</li>
              </ul>
              
              <Separator className="my-8" />
              
              <h2>Medical Disclaimer</h2>
              <p className="text-sm text-muted-foreground">
                The information provided on AyurSphere is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before starting any new health regimen or if you have questions about a medical condition.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
