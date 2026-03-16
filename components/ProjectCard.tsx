'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  delay?: number;
  link?: string;
  github?: string;
  type?: 'web' | 'android';
}

const TYPE_CONFIG = {
  web: {
    badge: 'موقع ويب',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    icon: (
      <svg className="w-16 h-16 text-violet-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    gradient: 'from-violet-900/40 to-fuchsia-900/20',
  },
  android: {
    badge: 'تطبيق أندرويد',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    icon: (
      <svg className="w-16 h-16 text-green-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-green-900/40 to-emerald-900/20',
  },
};

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  delay = 0,
  link,
  github,
  type,
}: ProjectCardProps) {
  const cfg = type ? TYPE_CONFIG[type] : null;
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6 }}
        className="group relative glass rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Image */}
        <div
          className={`relative h-56 w-full overflow-hidden cursor-zoom-in ${cfg ? `bg-gradient-to-br ${cfg.gradient}` : 'bg-gray-900/60'}`}
          onClick={() => setLightbox(true)}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          {cfg && (
            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
              {cfg.icon}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* Type badge */}
          {cfg && (
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs rounded-full border ${cfg.badgeColor} backdrop-blur-sm`}>
                {cfg.badge}
              </span>
            </div>
          )}

          {/* Zoom hint */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              تكبير
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-violet-900/25 backdrop-blur-[2px] flex items-center justify-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/20 transition-all hover:scale-105"
              >
                معاينة حية ↗
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/20 transition-all hover:scale-105"
              >
                GitHub ↗
              </a>
            )}
            {/* zoom button always visible in overlay */}
            <button
              onClick={() => setLightbox(true)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/20 transition-all hover:scale-105"
            >
              تكبير الصورة 🔍
            </button>
          </motion.div>
        </div>

        {/* Body */}
        <div className="relative p-6 flex flex-col flex-1">
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-transparent rounded-br-3xl pointer-events-none" />
          <h3 className="text-xl font-bold text-white mb-2 group-hover:neon-text transition-all duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20 hover:border-violet-500/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20 border border-violet-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[85vh]"
              />
              {/* Close button */}
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-4 left-4 w-9 h-9 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Title */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                <p className="text-white font-semibold">{title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}