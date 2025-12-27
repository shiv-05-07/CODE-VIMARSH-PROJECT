import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Code2, MessageSquare, CheckCircle2 } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', expertise: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Community',
      description: 'Join a network of thoughtful developers who value deliberation over haste.',
    },
    {
      icon: Code2,
      title: 'Architectural Excellence',
      description: 'Work on projects that prioritize clean architecture and sustainable code.',
    },
    {
      icon: MessageSquare,
      title: 'Meaningful Discourse',
      description: 'Engage in deep technical discussions that shape better solutions.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-gray-900 to-charcoal py-20">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join Code Vimarsh
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-white/80">
              Become part of a community that values thoughtful deliberation, architectural excellence, and collaborative refinement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 bg-charcoal">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-xl p-8 border border-neon-cyan/10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-neon-cyan" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="font-paragraph text-white/70">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full py-16 flex-1">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/50 rounded-xl p-8 border border-neon-cyan/10"
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">
                Express Your Interest
              </h2>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <p className="font-paragraph text-green-500">
                    Thank you for your interest! We'll be in touch soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-paragraph text-white mb-2 block">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-900 border-neon-cyan/30 text-white focus:border-neon-cyan"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="font-paragraph text-white mb-2 block">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-900 border-neon-cyan/30 text-white focus:border-neon-cyan"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="expertise" className="font-paragraph text-white mb-2 block">
                    Areas of Expertise
                  </Label>
                  <Input
                    id="expertise"
                    name="expertise"
                    type="text"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="bg-gray-900 border-neon-cyan/30 text-white focus:border-neon-cyan"
                    placeholder="e.g., Backend Development, System Design, DevOps"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-paragraph text-white mb-2 block">
                    Why do you want to join? *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-gray-900 border-neon-cyan/30 text-white focus:border-neon-cyan min-h-[150px]"
                    placeholder="Tell us about your interest in deliberate software development and what you hope to contribute..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-cyan text-charcoal hover:bg-neon-cyan/90 font-paragraph font-semibold py-6 text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Application
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              <p className="font-paragraph text-sm text-white/60 mt-6 text-center">
                We review all applications carefully and will respond within 5-7 business days.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
