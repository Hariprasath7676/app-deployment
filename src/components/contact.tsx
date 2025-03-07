
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import mail from './images/mail.png'
import call from './images/call.png'
import location from './images/location.png'
const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible!",
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-brand-bgPrimary py-16 md:py-24 reveal mx-w-[1400px] " id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-base font-medium mb-4">Contact Us</p>
              <h2 className="text-4xl md:text-5xl font-playfair text-black mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-2">
                Have questions? We're here to help! Fill out the form below,
              </p>
              <p className="text-gray-700">
                Your dream home journey begins here!
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <img src={mail} alt="" />
                </div>
                <div>
                  <p className="font-medium">Reach us anytime</p>
                  <a href="mailto:info@nilavanrealtors.com" className="text-gray-700 hover:text-primary">
                    info@nilavanrealtors.com
                  </a>
                </div>
              </div>
              
              <div className="w-full h-px bg-gray-300" />

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={call} alt="" />
                </div>
                <div>
                  <p className="font-medium">Call us for assistance</p>
                  <a href="tel:+919876543210" className="text-gray-700 hover:text-primary">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="w-full h-px bg-gray-300" />

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <img src={location} alt="" />
                </div>
                <div>
                  <p className="font-medium">Nilavan Real Estate. malumichampatti, Coimbatore, TN 641001</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary">
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-primary p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-primary border border-gray-400 text-white p-4 focus:outline-none focus:border-secondary placeholder-gray-300"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                  className="w-full bg-primary border border-gray-400 text-white p-4 focus:outline-none focus:border-secondary placeholder-gray-300"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full bg-primary border border-gray-400 text-white p-4 focus:outline-none focus:border-secondary placeholder-gray-300"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Message"
                  rows={5}
                  required
                  className="w-full bg-primary border border-gray-400 text-white p-4 focus:outline-none focus:border-secondary placeholder-gray-300"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white py-4 font-medium transition duration-300 hover:bg-secondary/90 disabled:opacity-70"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;