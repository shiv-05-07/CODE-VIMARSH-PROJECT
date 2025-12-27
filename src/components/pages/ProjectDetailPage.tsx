import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, Code2 } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      const projectData = await BaseCrudService.getById<Projects>('projects', id);
      setProject(projectData);
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-charcoal">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-white mb-4">Project not found</h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-neon-cyan font-paragraph hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Header />

      <section className="w-full py-12 flex-1">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-neon-cyan font-paragraph mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {project.projectImage && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-neon-cyan/10">
                    <Image
                      src={project.projectImage}
                      alt={project.projectName || 'Project image'}
                      className="w-full h-full object-cover"
                      width={1200}
                    />
                  </div>
                )}

                {project.status && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-paragraph font-semibold bg-neon-cyan/20 text-neon-cyan capitalize">
                      {project.status}
                    </span>
                  </div>
                )}

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {project.projectName}
                </h1>

                {project.shortDescription && (
                  <p className="font-paragraph text-xl text-neon-cyan mb-6">
                    {project.shortDescription}
                  </p>
                )}

                <div className="prose prose-invert max-w-none">
                  <p className="font-paragraph text-lg text-white/80 leading-relaxed whitespace-pre-wrap">
                    {project.fullDescription}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-neon-cyan/10 sticky top-24 space-y-6"
              >
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4">Project Details</h3>

                  {project.technologiesUsed && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-5 h-5 text-neon-cyan" />
                        <p className="font-paragraph text-sm text-white/60">Technologies</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologiesUsed.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded text-sm font-mono text-white"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project._createdDate && (
                    <div className="pt-4 border-t border-neon-cyan/10">
                      <p className="font-paragraph text-sm text-white/60 mb-1">Created</p>
                      <p className="font-paragraph text-white">
                        {new Date(project._createdDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-neon-cyan text-charcoal px-6 py-3 rounded-lg font-paragraph font-semibold hover:bg-neon-cyan/90 transition-colors"
                  >
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
