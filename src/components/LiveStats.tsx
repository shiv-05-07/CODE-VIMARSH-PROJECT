import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Users } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const AnimatedCounter = ({ target, duration = 2 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      setCount(Math.floor(target * progress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <span>{count}</span>;
};

export default function LiveStats() {
  const stats: StatItem[] = [
    {
      icon: <Code2 className="w-6 h-6" />,
      label: 'Commits',
      value: 500,
      suffix: '+',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      label: 'Projects',
      value: 12,
      suffix: '',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Members',
      value: 50,
      suffix: '+',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="w-full py-20 bg-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Live <span className="text-neon-cyan">Statistics</span>
          </h2>
          <p className="font-paragraph text-white/60 max-w-2xl mx-auto">
            Real-time metrics showcasing the growth and impact of Code Vimarsh community.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 group-hover:border-neon-cyan/30 transition-all duration-300" />

              {/* Glow Effect on Hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${stat.color} blur-xl`} />

              {/* Content */}
              <div className="relative p-8 flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                >
                  {stat.icon}
                </motion.div>

                {/* Counter */}
                <div className="mb-4">
                  <div className="text-5xl sm:text-6xl font-bold text-neon-cyan font-heading">
                    <AnimatedCounter target={stat.value} />
                    <span className="text-4xl sm:text-5xl">{stat.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <p className="font-paragraph text-white/80 font-semibold text-lg">
                  {stat.label}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  className="h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent mt-6 w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="font-paragraph text-white/60 mb-6">
            These numbers represent our collective commitment to excellence and growth.
          </p>
          <div className="inline-block px-6 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan font-mono text-sm">
            Updated in real-time
          </div>
        </motion.div>
      </div>
    </section>
  );
}
