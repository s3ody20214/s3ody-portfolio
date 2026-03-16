'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export default function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-4 neon-text neon-glow">
        {children}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mt-3">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className="flex justify-center mt-6">
        <div className="h-px w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
      </div>
    </motion.div>
  );
}