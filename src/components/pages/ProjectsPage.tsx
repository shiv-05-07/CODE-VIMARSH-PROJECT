import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, Github } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      const { items } = await BaseCrudService.getAll<Projects>('projects');
      setProjects(items);
    };

    fetchProjects();
  }, []);

  const statuses = ['all', ...Array.from(new Set(projects.map((p) => p.status).filter(Boolean)))];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

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
              Our Projects
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-white/80">
              Explore the solutions we've architected through deliberate design, collaborative refinement, and technical excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-charcoal py-8 border-b border-neon-cyan/10">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-paragraph font-medium transition-colors capitalize ${
                  filter === status
                    ? 'bg-neon-cyan text-charcoal'
                    : 'bg-transparent text-white border border-neon-cyan/30 hover:bg-neon-cyan/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-16 flex-1">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/projects/${project._id}`}
                    className="block group h-full"
                  >
                    {/* Glassmorphism Card */}
                    <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-cyan/20">
                      {/* Image Container with Hover Scale */}
                      {project.projectImage && (
                        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neon-cyan/10 to-transparent">
                          <Image
                            src={project.projectImage}
                            alt={project.projectName || 'Project image'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={600}
                          />
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                        </div>
                      )}

                      {/* Content Container */}
                      <div className="relative p-6 flex flex-col h-full">
                        {/* GitHub Icon & Tech Tag */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            {project.status && (
                              <span className="inline-block px-3 py-1 rounded-full text-xs font-paragraph font-semibold bg-neon-cyan/20 text-neon-cyan capitalize mb-3">
                                {project.status}
                              </span>
                            )}
                          </div>
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-neon-cyan hover:bg-neon-cyan hover:text-charcoal transition-all duration-300 ml-2"
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors line-clamp-2">
                          {project.projectName}
                        </h3>

                        {/* Description */}
                        <p className="font-paragraph text-sm text-white/70 mb-4 line-clamp-2 flex-grow">
                          {project.shortDescription}
                        </p>

                        {/* Tech Stack Tags */}
                        {project.technologiesUsed && (
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                            {project.technologiesUsed.split(',').map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/5 hover:bg-neon-cyan/20 rounded-full text-xs font-paragraph font-medium text-white/80 hover:text-neon-cyan transition-colors"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Folder className="w-16 h-16 text-neon-cyan/30 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-white/60">
                No {filter !== 'all' ? filter : ''} projects found.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
