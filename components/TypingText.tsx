'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = [
  'مصمم مواقع احترافية',
  'مطور Next.js & React',
  'مصمم UI/UX',
  'AI-Powered Builder',
];

const TYPING_SPEED  = 90;   // ms per char
const ERASE_SPEED   = 45;
const PAUSE_AFTER   = 2200; // pause when fully typed

export default function TypingText() {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase]         = useState<'typing' | 'pausing' | 'erasing'>('typing');
  const idxRef = useRef(0);

  useEffect(() => {
    const current = ROLES[idxRef.current];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          TYPING_SPEED
        );
      } else {
        timer = setTimeout(() => setPhase('pausing'), PAUSE_AFTER);
      }
    } else if (phase === 'pausing') {
      setPhase('erasing');
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          ERASE_SPEED
        );
      } else {
        idxRef.current = (idxRef.current + 1) % ROLES.length;
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase]);

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="neon-text font-bold text-3xl md:text-5xl min-w-[2ch]">
        {displayed}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
        className="inline-block w-[3px] h-9 md:h-12 bg-gradient-to-b from-violet-400 to-fuchsia-500 rounded-full"
      />
    </span>
  );
}