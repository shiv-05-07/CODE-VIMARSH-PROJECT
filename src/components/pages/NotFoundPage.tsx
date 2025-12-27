import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2 } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header />

      {/* 404 Section */}
      <section className="w-full flex-1 flex items-center justify-center py-20">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Animated 404 Code Block */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block bg-white/5 border border-neon-cyan/30 rounded-2xl p-8 backdrop-blur-xl">
                <div className="font-mono text-6xl sm:text-7xl font-bold text-neon-cyan mb-4">
                  404
                </div>
                <div className="font-mono text-sm text-white/60">
                  <span className="text-neon-cyan">Error:</span> Page not found
                </div>
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                This page has been garbage collected.
              </h1>
              <p className="font-paragraph text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                The page you're looking for has been removed from memory. It seems the memory manager decided this wasn't worth keeping around. Let's get you back on track.
              </p>
            </motion.div>

            {/* Code Snippet */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12 inline-block bg-gray-900/50 border border-white/10 rounded-xl p-6 max-w-md"
            >
              <div className="font-mono text-sm text-left space-y-2">
                <div className="text-white/60">
                  <span className="text-neon-cyan">const</span> page = <span className="text-orange-400">null</span>;
                </div>
                <div className="text-white/60">
                  <span className="text-neon-cyan">if</span> (!page) {'{'}
                </div>
                <div className="text-white/60 ml-4">
                  <span className="text-neon-cyan">return</span> <span className="text-green-400">"404"</span>;
                </div>
                <div className="text-white/60">
                  {'}'}
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neon-cyan text-charcoal font-heading font-bold rounded-lg hover:bg-neon-cyan/90 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/30"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-heading font-bold rounded-lg border border-white/20 hover:bg-white/20 hover:border-neon-cyan/50 transition-all duration-300"
              >
                <Code2 className="w-5 h-5" />
                Explore Projects
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mt-16 text-neon-cyan/20 text-6xl"
            >
              {'</>'}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
