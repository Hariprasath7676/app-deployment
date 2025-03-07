
import Navbar from '@/components/Navbar';

const About = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 bg-brand-bgPrimary">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-primary text-center mb-16">
            About Us
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8">
              Content for the About Us page will go here. This page is a placeholder and can be expanded with more detailed information about the company, team members, philosophy, and approach to design.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
