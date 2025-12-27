import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Target } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { BaseCrudService } from '@/integrations';
import { RoadmapMilestones } from '@/entities';
import CareerTimeline from '../CareerTimeline';

export default function RoadmapPage() {
  const [milestones, setMilestones] = useState<RoadmapMilestones[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchMilestones = async () => {
      const { items } = await BaseCrudService.getAll<RoadmapMilestones>('roadmapmilestones');
      const sorted = items.sort((a, b) => {
        const dateA = a.targetDate ? new Date(a.targetDate).getTime() : 0;
        const dateB = b.targetDate ? new Date(b.targetDate).getTime() : 0;
        return dateA - dateB;
      });
      setMilestones(sorted);
    };

    fetchMilestones();
  }, []);

  const categories = ['all', ...Array.from(new Set(milestones.map((m) => m.category).filter(Boolean)))];

  const filteredMilestones = milestones.filter((milestone) => {
    if (filter === 'all') return true;
    return milestone.category === filter;
  });

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'in progress':
        return <Clock className="w-6 h-6 text-neon-cyan" />;
      default:
        return <Circle className="w-6 h-6 text-white/30" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'in progress':
        return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

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
            <Target className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Roadmap
            </h1>
            <p className="font-paragraph text-lg sm:text-xl text-white/80">
              Track our journey of deliberate development and architectural excellence. Every milestone represents thoughtful planning and collaborative execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full bg-charcoal py-8 border-b border-neon-cyan/10">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-lg font-paragraph font-medium transition-colors capitalize ${
                  filter === category
                    ? 'bg-neon-cyan text-charcoal'
                    : 'bg-transparent text-white border border-neon-cyan/30 hover:bg-neon-cyan/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full py-16 flex-1">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMilestones.length > 0 ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neon-cyan/20 hidden md:block"></div>

              <div className="space-y-8">
                {filteredMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone._id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex gap-6 md:gap-8">
                      {/* Icon */}
                      <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-gray-800 border-2 border-neon-cyan/30 items-center justify-center relative z-10">
                        {getStatusIcon(milestone.status)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-800/50 rounded-xl p-6 border border-neon-cyan/10 hover:border-neon-cyan/30 transition-colors">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              {milestone.status && (
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-paragraph font-semibold border ${getStatusColor(
                                    milestone.status
                                  )}`}
                                >
                                  {milestone.status}
                                </span>
                              )}
                              {milestone.category && (
                                <span className="px-3 py-1 rounded-full text-xs font-paragraph font-semibold bg-white/5 text-white/60 capitalize">
                                  {milestone.category}
                                </span>
                              )}
                            </div>
                            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                              {milestone.title}
                            </h3>
                          </div>

                          <div className="text-right">
                            {milestone.targetDate && (
                              <div className="mb-1">
                                <p className="font-paragraph text-xs text-white/60">Target</p>
                                <p className="font-paragraph text-sm text-white">
                                  {new Date(milestone.targetDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </p>
                              </div>
                            )}
                            {milestone.completionDate && (
                              <div>
                                <p className="font-paragraph text-xs text-white/60">Completed</p>
                                <p className="font-paragraph text-sm text-green-500">
                                  {new Date(milestone.completionDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {milestone.description && (
                          <p className="font-paragraph text-white/70 leading-relaxed">
                            {milestone.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Target className="w-16 h-16 text-neon-cyan/30 mx-auto mb-4" />
              <p className="font-paragraph text-lg text-white/60">
                No {filter !== 'all' ? filter : ''} milestones found.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Career Timeline Section */}
      <CareerTimeline />

      <Footer />
    </div>
  );
}
