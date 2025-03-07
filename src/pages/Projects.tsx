
import Navbar from '@/components/Navbar';

const Projects = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 bg-brand-bgPrimary">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-primary text-center mb-16">
            Our Projects
          </h1>
          
          <div className="max-w-6xl mx-auto">
            <p className="text-lg text-center mb-12">
              Explore our portfolio of completed and ongoing interior design projects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* This is a placeholder for project items */}
              <div className="bg-white shadow-md">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-primary mb-2">Modern Apartment</h3>
                  <p className="text-gray-600">Residential Interior</p>
                </div>
              </div>
              
              <div className="bg-white shadow-md">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-primary mb-2">Luxury Villa</h3>
                  <p className="text-gray-600">Residential Interior</p>
                </div>
              </div>
              
              <div className="bg-white shadow-md">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-primary mb-2">Corporate Office</h3>
                  <p className="text-gray-600">Commercial Interior</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
