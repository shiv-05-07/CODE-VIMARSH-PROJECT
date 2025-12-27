import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Crown, Target, BookOpen, Users } from 'lucide-react';

interface TimelineStage {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const TIMELINE_STAGES: TimelineStage[] = [
  {
    id: 'student',
    title: 'Student',
    description: 'Beginning your journey',
    icon: <BookOpen className="w-6 h-6" />,
    details: [
      'Learn fundamentals',
      'Join community',
      'Participate in discussions',
      'Build first projects',
    ],
    color: 'from-blue-500 to-cyan-500',
    status: 'completed',
  },
  {
    id: 'contributor',
    title: 'Contributor',
    description: 'Making meaningful impact',
    icon: <Code2 className="w-6 h-6" />,
    details: [
      'Submit pull requests',
      'Review code',
      'Mentor others',
      'Lead discussions',
    ],
    color: 'from-purple-500 to-pink-500',
    status: 'completed',
  },
  {
    id: 'architect',
    title: 'Architect',
    description: 'Designing solutions',
    icon: <Zap className="w-6 h-6" />,
    details: [
      'Design systems',
      'Lead projects',
      'Shape roadmap',
      'Influence direction',
    ],
    color: 'from-orange-500 to-red-500',
    status: 'in-progress',
  },
  {
    id: 'core-developer',
    title: 'Core Developer',
    description: 'Shaping the future',
    icon: <Crown className="w-6 h-6" />,
    details: [
      'Strategic decisions',
      'Community leadership',
      'Vision setting',
      'Legacy building',
    ],
    color: 'from-green-500 to-emerald-500',
    status: 'planned',
  },
];

interface TooltipState {
  [key: string]: boolean;
}

export default function CareerTimeline() {
  const [hoveredStage, setHoveredStage] = useState<TooltipState>({});

  const toggleTooltip = (stageId: string) => {
    setHoveredStage((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  return (
    <section className="w-full py-32 bg-charcoal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Your <span className="text-neon-cyan">Career Journey</span>
          </h2>
          <p className="font-paragraph text-white/60 max-w-2xl mx-auto">
            From Student to Core Developer: A path of continuous growth, learning, and architectural excellence.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-cyan/50 to-transparent -translate-x-1/2 hidden lg:block" />

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-0">
            {TIMELINE_STAGES.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 lg:gap-12`}
              >
                {/* Content Card */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="relative group"
                  >
                    {/* Card Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl`}
                    />

                    {/* Card */}
                    <div className="relative bg-white/5 border border-white/10 group-hover:border-neon-cyan/30 rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm">
                      {/* Status Badge */}
                      <div className="mb-4 inline-block">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                            stage.status === 'completed'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : stage.status === 'in-progress'
                              ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                              : 'bg-white/10 text-white/60 border border-white/20'
                          }`}
                        >
                          {stage.status === 'completed'
                            ? 'COMPLETED'
                            : stage.status === 'in-progress'
                            ? 'IN PROGRESS'
                            : 'PLANNED'}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-heading text-2xl font-bold text-white mb-2">
                        {stage.title}
                      </h3>
                      <p className="font-paragraph text-white/70 mb-6">
                        {stage.description}
                      </p>

                      {/* Details List */}
                      <div className="space-y-2 mb-6">
                        {stage.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stage.color}`} />
                            <span className="font-paragraph text-sm text-white/60">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Hover Tooltip Trigger */}
                      <button
                        onClick={() => toggleTooltip(stage.id)}
                        className="text-neon-cyan font-mono text-sm hover:underline underline-offset-2"
                      >
                        {hoveredStage[stage.id] ? 'Hide details' : 'View details'}
                      </button>
                    </div>
                  </motion.div>

                  {/* Expanded Details */}
                  {hoveredStage[stage.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-white/5 border border-neon-cyan/20 rounded-xl p-6 backdrop-blur-sm"
                    >
                      <p className="font-paragraph text-white/70 text-sm leading-relaxed">
                        {stage.id === 'student' &&
                          'Start your journey by learning the fundamentals of software development and joining our vibrant community. Engage in discussions, ask questions, and build your first projects with guidance from experienced members.'}
                        {stage.id === 'contributor' &&
                          'Grow your skills by contributing to projects, submitting pull requests, and reviewing code from peers. Begin mentoring newer members and actively participate in technical discussions that shape our direction.'}
                        {stage.id === 'architect' &&
                          'Take on leadership roles by designing systems, leading major projects, and influencing our technical roadmap. Your architectural decisions will impact the entire community and guide our strategic direction.'}
                        {stage.id === 'core-developer' &&
                          'Reach the pinnacle of your journey as a Core Developer. Shape the future of Code Vimarsh through strategic decisions, community leadership, and vision setting. Build a lasting legacy in our ecosystem.'}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-lg cursor-pointer hover:shadow-2xl transition-shadow`}
                    onClick={() => toggleTooltip(stage.id)}
                  >
                    {stage.icon}
                  </motion.div>

                  {/* Connecting Line (Mobile) */}
                  {index < TIMELINE_STAGES.length - 1 && (
                    <div className="w-1 h-12 bg-gradient-to-b from-neon-cyan/50 to-transparent lg:hidden mt-4" />
                  )}
                </div>

                {/* Spacer for Layout */}
                <div className="w-full lg:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="font-paragraph text-white/60 mb-6">
            Ready to start your journey? Join Code Vimarsh today and grow with us.
          </p>
          <div className="inline-block px-8 py-3 rounded-lg bg-neon-cyan text-charcoal font-heading font-bold hover:bg-white transition-colors duration-300">
            Begin Your Journey
          </div>
        </motion.div>
      </div>
    </section>
  );
}
