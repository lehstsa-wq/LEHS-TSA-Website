import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Facebook, Send, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in bg-gray-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-[#0E1320] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-blue uppercase bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/30">
            Get in Touch
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Have questions about TSA? Want to learn more about our chapter? We'd love to hear from you. Reach out using the form below or through our social channels.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
             <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Send a Message</span>
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Form</h2>
             
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your Name</label>
                     <input type="text" placeholder="Full name" className="w-full bg-transparent border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
                     <input type="email" placeholder="your@email.com" className="w-full bg-transparent border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600" />
                   </div>
                </div>
                
                <div>
                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Subject</label>
                   <div className="relative">
                     <select className="w-full bg-transparent border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors appearance-none cursor-pointer">
                       <option>What is this about?</option>
                       <option>Membership Inquiry</option>
                       <option>Competition Question</option>
                       <option>General Question</option>
                     </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                     </div>
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Message</label>
                   <textarea rows={6} placeholder="Type your message here..." className="w-full bg-transparent border border-gray-300 dark:border-dark-border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-600 resize-none"></textarea>
                </div>

                <button type="button" className="bg-accent-blue hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center shadow-lg shadow-accent-blue/20">
                   <Send size={16} className="mr-2" /> Send Message
                </button>
             </form>
          </div>

          {/* Right Column: Info */}
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Contact Info</span>
            
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 mb-8 space-y-6 shadow-sm">
               <div className="flex items-start">
                 <div className="bg-blue-100 dark:bg-blue-900/20 p-2.5 rounded-lg mr-4 text-accent-blue shrink-0">
                    <Mail size={20} />
                 </div>
                 <div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Email</h4>
                    <a href="mailto:tsa@littleelmisd.net" className="text-accent-blue hover:text-accent-hover dark:hover:text-white transition-colors text-sm">tsa@littleelmisd.net</a>
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="bg-blue-100 dark:bg-blue-900/20 p-2.5 rounded-lg mr-4 text-accent-blue shrink-0">
                    <Phone size={20} />
                 </div>
                 <div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">(123) 456-7890</p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-0.5">School Hours: 8:00 AM - 4:00 PM</p>
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="bg-blue-100 dark:bg-blue-900/20 p-2.5 rounded-lg mr-4 text-accent-blue shrink-0">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Little Elm High School<br/>
                      1600 Walker Lane<br/>
                      Little Elm, TX 75068
                    </p>
                 </div>
               </div>
            </div>

            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Follow Us</span>
            
            <div className="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-900 dark:text-white font-bold mb-4">Social Media</h3>
              <div className="space-y-4">
                 {[
                   { name: 'Instagram', handle: '@littleelmtsa', icon: Instagram },
                   { name: 'X', handle: '@littleelmtsa', icon: Twitter },
                   { name: 'YouTube', handle: 'Little Elm TSA', icon: Youtube },
                   { name: 'Facebook', handle: 'Little Elm TSA', icon: Facebook },
                 ].map((social, i) => (
                   <a key={i} href="#" className="flex items-center justify-between group p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors -mx-2">
                     <div className="flex items-center">
                       <div className="bg-gray-100 dark:bg-dark-bg p-2 rounded text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors border border-gray-200 dark:border-dark-border">
                         <social.icon size={16} />
                       </div>
                       <div className="ml-3">
                         <div className="text-gray-900 dark:text-white font-medium text-sm">{social.name}</div>
                         <div className="text-gray-500 text-xs">{social.handle}</div>
                       </div>
                     </div>
                     <ExternalLink size={14} className="text-gray-400 dark:text-gray-600 group-hover:text-accent-blue transition-colors" />
                   </a>
                 ))}
                 {/* Discord Link (special) */}
                  <a href="#" className="flex items-center justify-between group p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors -mx-2">
                     <div className="flex items-center">
                       <div className="bg-gray-100 dark:bg-dark-bg p-2 rounded text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors border border-gray-200 dark:border-dark-border">
                         {/* Discord Icon placeholder since it might not be in the lucide import above */}
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 1.9 1.9 0 0 0-1.006 1.776c-1.353-.193-2.738-.288-4.133-.288-1.395 0-2.78.095-4.133.288-.344-.65-.69-1.256-1.006-1.776a.074.074 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                       </div>
                       <div className="ml-3">
                         <div className="text-gray-900 dark:text-white font-medium text-sm">Discord</div>
                         <div className="text-gray-500 text-xs">Join our server</div>
                       </div>
                     </div>
                     <ExternalLink size={14} className="text-gray-400 dark:text-gray-600 group-hover:text-accent-blue transition-colors" />
                   </a>
              </div>
            </div>
          </div>
          
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="w-full h-96 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
             <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/5"></div>
             <div className="text-center z-10">
                <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-blue/20">
                   <MapPin size={32} className="text-accent-blue" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-2">Find Us</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Google Maps Embed Placeholder</p>
                <p className="text-xs text-gray-500 mt-1">Replace with embedded Google Map</p>
             </div>
          </div>
          <div className="bg-white dark:bg-[#0E1320] border-x border-b border-gray-200 dark:border-dark-border rounded-b-xl p-6 text-center">
             <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
               Little Elm High School is located at 1600 Walker Lane, Little Elm, TX 75068. TSA meetings are held in Room 204 of the Technology Building.
             </p>
             <button className="inline-flex items-center text-xs font-bold text-gray-900 dark:text-white border border-gray-300 dark:border-dark-border hover:border-gray-500 bg-transparent px-4 py-2 rounded transition-colors">
               <ExternalLink size={12} className="mr-2" /> Open in Google Maps
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;