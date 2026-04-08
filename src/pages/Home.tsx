import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { STATS } from '@/constants';
import { Layout, Code, PenTool, Mail, Github, Twitter, Instagram, ArrowRight, ExternalLink, Menu, X, Camera, Smartphone, Globe, Database, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const iconMap: Record<string, any> = {
  Layout,
  Code,
  PenTool,
  Camera,
  Smartphone,
  Globe,
  Database,
  Search,
};

export default function Home() {
  const { posts, services, settings, loading } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
        <div className="w-8 h-8 border-4 border-[#ff3b3b] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">
            RAJU<span className="text-[#ff3b3b]">.</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-white/70">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-[#ff3b3b] transition-colors">{link.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex border-[#ff3b3b] text-[#ff3b3b] hover:bg-[#ff3b3b] hover:text-white transition-all duration-300" asChild>
              <a href="#contact">Hire Me</a>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1a1a1a] border-b border-white/5"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map(link => (
                  <a 
                    key={link.href} 
                    href={link.href} 
                    className="text-lg font-medium hover:text-[#ff3b3b]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button className="bg-[#ff3b3b] w-full" asChild>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)}>Hire Me</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#ff3b3b]/10 text-[#ff3b3b] text-xs font-bold tracking-widest uppercase">
              Available for Projects
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
              {settings.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-[#ff3b3b] font-medium">
              {settings.heroSubtitle}
            </p>
            <p className="text-white/60 max-w-lg mx-auto md:mx-0 text-base sm:text-lg leading-relaxed">
              {settings.heroDescription}
            </p>
            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 text-white px-8 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(255,59,59,0.3)]" asChild>
                <a href="#portfolio">View Work <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/5 px-8 py-6 text-lg rounded-xl" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative w-full"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-[#ff3b3b] rounded-full blur-[60px] md:blur-[80px] opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full border-2 border-[#ff3b3b]/30 p-2 sm:p-4">
                <img 
                  src={settings.profileImage} 
                  alt={settings.profileName}
                  className="w-full h-full object-cover rounded-full border-4 border-[#ff3b3b]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Mobile Buttons - Below Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex md:hidden flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Button className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 text-white px-8 py-6 text-lg rounded-xl shadow-[0_0_20px_rgba(255,59,59,0.3)]" asChild>
              <a href="#portfolio">View Work <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/5 px-8 py-6 text-lg rounded-xl border border-white/10" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/5 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {STATS.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#ff3b3b] mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">My <span className="text-[#ff3b3b]">Services</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto">I provide high-quality services to help you achieve your goals and create a lasting impact.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service, index) => {
                const Icon = iconMap[service.icon] || Layout;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="bg-[#1a1a1a] border-white/5 hover:border-[#ff3b3b]/50 transition-all duration-300 h-full group">
                      <CardContent className="p-8 space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#ff3b3b]/10 flex items-center justify-center text-[#ff3b3b] group-hover:bg-[#ff3b3b] group-hover:text-white transition-colors duration-300">
                          <Icon className="h-7 w-7" />
                        </div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <p className="text-white/50 leading-relaxed">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-10 text-center text-white/30 italic">
                No services added yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Featured <span className="text-[#ff3b3b]">Projects</span></h2>
              <p className="text-white/50 max-w-xl">A collection of my recent works across different disciplines.</p>
            </div>
            <Button variant="outline" className="border-white/10 hover:border-[#ff3b3b] hover:text-[#ff3b3b]">View All Projects</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-[#1a1a1a] border-white/5 overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button variant="outline" size="icon" className="rounded-full border-[#ff3b3b] text-[#ff3b3b] hover:bg-[#ff3b3b] hover:text-white">
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-2">
                      <h3 className="text-xl font-bold group-hover:text-[#ff3b3b] transition-colors">{post.title}</h3>
                      <p className="text-white/50 text-sm line-clamp-2">{post.caption}</p>
                      <Button variant="link" className="text-[#ff3b3b] p-0 h-auto font-bold group/btn">
                        Read More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-white/30 italic">
                No projects added yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 md:order-1"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border-2 border-white/5">
                <img 
                  src="https://picsum.photos/seed/about/800/800" 
                  alt="About Me"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-[#ff3b3b] p-6 sm:p-8 rounded-3xl hidden sm:block">
                <div className="text-3xl sm:text-4xl font-bold">2+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest font-bold opacity-80">Years of<br/>Experience</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 md:order-2 text-center md:text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">About <span className="text-[#ff3b3b]">Me</span></h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                {settings.aboutText}
              </p>
              <div className="space-y-4 pt-4 flex flex-col items-center md:items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#ff3b3b]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-white/50">Email me at</div>
                    <div className="font-bold break-all">{settings.contactEmail}</div>
                  </div>
                </div>
              </div>
              <Button className="bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 text-white px-8 py-6 rounded-xl" asChild>
                <a href="#contact">Download CV</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-[2rem] p-6 sm:p-8 md:p-16 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3b3b]/10 blur-[100px] -z-10"></div>
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Let's <span className="text-[#ff3b3b]">Connect</span></h2>
              <p className="text-white/50">Have a project in mind? Let's talk about how I can help you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8 text-center md:text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Contact Info</h3>
                  <p className="text-white/50">Feel free to reach out through any of these channels.</p>
                </div>
                <div className="space-y-4">
                  <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-[#ff3b3b]/10 transition-colors group justify-center md:justify-start">
                    <Mail className="h-6 w-6 text-[#ff3b3b]" />
                    <span className="font-medium group-hover:text-[#ff3b3b] transition-colors break-all">{settings.contactEmail}</span>
                  </a>
                  <div className="flex gap-4 justify-center md:justify-start">
                    {[Twitter, Github, Instagram].map((Icon, i) => (
                      <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#ff3b3b] transition-all duration-300">
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff3b3b] transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff3b3b] transition-colors"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff3b3b] transition-colors resize-none"
                ></textarea>
                <Button className="w-full bg-[#ff3b3b] hover:bg-[#ff3b3b]/90 text-white py-6 rounded-xl font-bold">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="text-2xl font-bold tracking-tighter">
            RAJU<span className="text-[#ff3b3b]">.</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-white/40 text-sm">
              {settings.footerText}
            </div>
            <div className="text-white/60 text-sm font-medium">
              Developer: <a href="https://www.facebook.com/mahfujul.islam08" target="_blank" rel="noopener noreferrer" className="text-[#ff3b3b] hover:underline">Mahfujul Islam</a>
            </div>
          </div>
          <div className="flex gap-6 text-sm font-medium text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
