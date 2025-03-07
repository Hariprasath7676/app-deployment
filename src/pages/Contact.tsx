
import Navbar from '@/components/Navbar';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16 bg-brand-bgPrimary">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-playfair font-medium text-primary text-center mb-16">
            Contact Us
          </h1>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-playfair text-2xl text-primary mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-8">
                We'd love to hear from you. Contact us for a consultation or to discuss your project.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 shadow-sm">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Phone</p>
                    <p className="text-gray-700">+1 (234) 567-8900</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 shadow-sm">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Email</p>
                    <p className="text-gray-700">info@nilavan.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 shadow-sm">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Office</p>
                    <p className="text-gray-700">123 Design Street, Creative City,<br/>State 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 shadow-md">
              <h2 className="font-playfair text-2xl text-primary mb-6">Send a Message</h2>
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-primary text-white px-6 py-3 transition-all duration-300 hover:bg-primary/90"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
