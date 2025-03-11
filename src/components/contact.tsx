import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import mail from './images/mail.png';
import call from './images/call.png';
import location from './images/location.png';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const sendGridAPI = "https://nilavan-email.vercel.app/send-email";
  
    try {
      const response = await fetch(sendGridAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly
      });
  
      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "We'll get back to you as soon as possible!",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message || "Something went wrong!" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-brand-bgPrimary py-16 md:py-24 overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-[1300px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-base font-medium mb-4">Contact Us</p>
              <h2 className="text-3xl md:text-4xl font-playfair text-black mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-2">
                Have questions? We're here to help! Fill out the form below.
              </p>
              <p className="text-gray-700">
                Your dream home journey begins here!
              </p>
            </div>

            <div className="space-y-6">
              {[{ img: mail, text: "Reach us anytime", link: "mailto:info@nilavanrealtors.com" },
                { img: call, text: "Call us for assistance", link: "tel:+919876543210" },
                { img: location, text: "Nilavan Real Estate, Malumichampatti, Coimbatore, TN 641001", link: "https://maps.google.com" }]
                .map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    className="flex flex-wrap items-start space-x-4"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src={item.img} alt="" className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <p className="font-medium">{item.text}</p>
                      <a href={item.link} className="text-gray-700 hover:text-primary break-all">
                        {item.link.includes('maps') ? "Get Directions" : item.link.replace('mailto:', '').replace('tel:', '')}
                      </a>
                    </div>
                  </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-primary p-6 sm:p-8 md:p-10 rounded-lg shadow-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "phone"].map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                    required
                    className="w-full bg-primary border border-gray-400 text-white p-4 focus:outline-none focus:border-secondary placeholder-gray-300 rounded-md"
                  />
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Message"
                  rows={5}
                  required
                  className="w-full bg-primary border border-gray-400 text-white p-4 focus:outline-none focus:border-secondary placeholder-gray-300 rounded-md"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="w-full bg-secondary text-white py-4 font-medium transition duration-300 hover:bg-secondary/90 disabled:opacity-70 rounded-md"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
