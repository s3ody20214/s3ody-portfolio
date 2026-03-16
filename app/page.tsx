'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import TypingText from '@/components/TypingText';
import ProjectCard from '@/components/ProjectCard';
import SectionTitle from '@/components/SectionTitle';

/* ─── helpers ──────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const NAV_LINKS = [
  { label: 'من أنا',    href: '#about'    },
  { label: 'خدماتي',   href: '#services'  },
  { label: 'أعمالي',   href: '#projects'  },
  { label: 'مهاراتي',  href: '#skills'    },
  { label: 'تواصل',    href: '#contact'   },
];

const SKILLS = [
  { label: 'Next.js / React',  pct: 92 },
  { label: 'TypeScript',        pct: 85 },
  { label: 'Tailwind CSS',      pct: 90 },
  { label: 'Kotlin / Android',  pct: 78 },
  { label: 'Node.js',           pct: 72 },
  { label: 'AI Integration',    pct: 80 },
];

const WA_NUMBER = '201098758230';
const WA_LINK   = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('مرحباً، رأيت بورتفوليوك وأريد التواصل معك 👋')}`;


/* ─── Skill bar ─────────────────────────────────────────── */
function SkillBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-gray-300 text-sm font-medium">{label}</span>
        <span className="text-violet-400 text-sm font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
        />
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Home() {
  const [mouse, setMouse]     = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '15%']);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll',    onScroll);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll',    onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden">

      {/* ── Navbar ───────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-black/80 backdrop-blur-xl border-b border-violet-500/10' : 'py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-2xl font-black neon-text neon-glow tracking-wider">
            S3oDy
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-gray-400 hover:text-white text-sm transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-1 right-0 w-0 h-px bg-gradient-to-l from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm hover:bg-violet-600/30 hover:border-violet-400/50 transition-all"
          >
            تواصل معي
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="القائمة"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/95 border-t border-violet-500/10 px-6 py-4 flex flex-col gap-4"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-violet-400 transition-colors py-1"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* ── Animated background ──────────────────────────── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.13),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.08),transparent_55%)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Orbs */}
        <motion.div
          className="absolute top-24 left-16 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl"
          animate={{ x: mouse.x * 0.018, y: mouse.y * 0.018 }}
          transition={{ type: 'spring', damping: 12, stiffness: 30 }}
        />
        <motion.div
          className="absolute bottom-24 right-16 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl"
          animate={{ x: mouse.x * -0.018, y: mouse.y * -0.018 }}
          transition={{ type: 'spring', damping: 12, stiffness: 30 }}
        />
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        id="about"
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-6 py-20 text-center"
        >
          <motion.div {...fadeUp(0)} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm tracking-wider">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              متاح للعمل الآن
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="text-7xl md:text-[9rem] font-black mb-6 leading-none select-none"
          >
            <span className="relative inline-block neon-text neon-glow">S3oDy</span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.3)}
            className="text-2xl md:text-4xl mb-8 flex flex-wrap justify-center items-center gap-3 text-gray-300"
          >
            <span>أنا</span>
            <TypingText />
          </motion.div>

          <motion.p
            {...fadeUp(0.45)}
            className="text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            أحول الأفكار إلى تجارب رقمية استثنائية باستخدام أحدث تقنيات الذكاء الاصطناعي.
            متخصص في مواقع الويب وتطبيقات الأندرويد.
          </motion.p>

          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30 group"
            >
              <span className="relative z-10">استعرض مشاريعي</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full border-2 border-violet-500/40 text-violet-300 font-semibold text-lg hover:border-violet-400 hover:text-white hover:bg-violet-500/10 transition-all"
            >
              تواصل معي
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-5 h-9 rounded-full border border-violet-500/40 flex justify-center pt-1.5">
              <div className="w-0.5 h-2 bg-violet-400 rounded-full animate-pulse" />
            </div>
            <span className="text-xs text-gray-500">تمرير</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="section-divider mx-auto max-w-4xl" />

      {/* ── Services ─────────────────────────────────────── */}
      <section id="services" className="py-28 relative">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="أقدم حلولاً متكاملة تجمع بين الإبداع التقني والذكاء الاصطناعي">
            خدماتي
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'تصميم وتطوير مواقع',
                desc:  'مواقع عصرية باستخدام Next.js وReact مع تجربة مستخدم سلسة وأداء عالي',
                icon:  'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
                color: 'from-violet-600/20 to-violet-600/5',
              },
              {
                title: 'تطبيقات أندرويد',
                desc:  'تطبيقات أصلية بـ Kotlin تدعم الذكاء الاصطناعي وتقدم تجربة Material You',
                icon:  'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
                color: 'from-fuchsia-600/20 to-fuchsia-600/5',
              },
              {
                title: 'حلول بالذكاء الاصطناعي',
                desc:  'دمج تقنيات AI في مشاريعك لجعلها أكثر ذكاءً وتفاعلية مع المستخدم',
                icon:  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                color: 'from-pink-600/20 to-pink-600/5',
              },
            ].map((svc, i) => (
              <motion.div
                key={svc.title}
                {...fadeUp(i * 0.15)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-2xl p-8 group cursor-default"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <svg className="w-7 h-7 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* ── Projects ─────────────────────────────────────── */}
      <section id="projects" className="py-28 relative">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="مشاريع حديثة تعكس خبرتي في الجمع بين التصميم والتقنيات المتطورة">
            أعمالي المميزة
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ProjectCard
              title="موقع شركة مقاولات"
              description="موقع احترافي لشركة مقاولات يعرض خدماتها ومشاريعها المنجزة مع واجهة أنيقة وسهلة الاستخدام، يدعم طلبات التواصل والعروض مباشرةً."
              image="/projects/web.jpg"
              tags={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive']}
              delay={0.1}
              link="https://elsabbagh-site.vercel.app/"
              type="web"
            />
            <ProjectCard
              title="تطبيق أمانة"
              description="تطبيق أندرويد متكامل لإدارة الديون والمديونيات بشكل ذكي — تتبع ما لك وما عليك، مع إشعارات تذكيرية وتقارير مالية واضحة."
              image="/projects/android.png"
              tags={['Kotlin', 'Jetpack Compose', 'Room DB', 'Material You', 'Notifications']}
              delay={0.25}
              type="android"
            />
          </div>

          <motion.div
            {...fadeUp(0.5)}
            className="text-center mt-14"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400">المزيد من المشاريع قيد الإنجاز...</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* ── Skills ───────────────────────────────────────── */}
      <section id="skills" className="py-28 relative">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="المهارات التقنية التي أستخدمها لبناء منتجات عالية الجودة">
            مهاراتي
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 max-w-3xl mx-auto">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mt-14 max-w-2xl mx-auto"
          >
            {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Kotlin', 'Node.js', 'PostgreSQL', 'Docker', 'Git', 'Figma', 'OpenAI API'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 text-sm glass rounded-full text-gray-300 hover:text-violet-300 hover:border-violet-500/30 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl" />

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="py-28 relative">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="أنا متاح للعمل على مشاريع مميزة تتطلب الإبداع والتقنية">
            هل لديك فكرة؟
          </SectionTitle>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              دعنا نحول فكرتك إلى واقع ملموس. أرسل لي رسالة وسأرد في أقرب وقت.
            </p>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-full text-white font-bold text-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
            >
              <svg className="relative z-10 w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="relative z-10">تواصل معي على واتساب</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>

            {/* Contact details */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
              <span>📧 s3ody@example.com</span>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
                <span>📱</span>
                <span>+20 109 875 8230</span>
              </a>
              <span>📍 مصر</span>
              <span>🕐 يرد خلال 24 ساعة</span>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-4 mt-12"
            >
              {[
                {
                  name: 'WhatsApp',
                  href: WA_LINK,
                  color: 'hover:text-green-400',
                  path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
                },
                {
                  name: 'GitHub',
                  path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z',
                },
                {
                  name: 'LinkedIn',
                  path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                },
                {
                  name: 'Twitter / X',
                  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={(s as any).href ?? '#'}
                  aria-label={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 glass rounded-full flex items-center justify-center text-gray-400 transition-all hover:scale-110 ${(s as any).color ?? 'hover:text-violet-400'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="py-8 border-t border-violet-500/10 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} S3oDy — جميع الحقوق محفوظة
        </p>
        <p className="text-gray-700 text-xs mt-1">
          صُنع بـ ♥ باستخدام Next.js · Tailwind CSS · Framer Motion
        </p>
      </footer>

      {/* ── Floating WhatsApp button ─────────────────────── */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-7 left-7 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 transition-colors"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse-ring opacity-60" />
        <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </main>
  );
}