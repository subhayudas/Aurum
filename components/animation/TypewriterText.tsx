'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorColor?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  loop?: boolean;
  loopDelay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  cursorColor = '#FCD043',
  showCursor = true,
  onComplete,
  loop = false,
  loopDelay = 2000,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: !loop,
    threshold: 0.1,
  });

  // Reset when text prop changes
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    
    const startTyping = () => {
      setIsTyping(true);
      
      const typeNextChar = () => {
        if (charIndex < text.length) {
          setDisplayText(text.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeNextChar, speed);
        } else {
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
          
          if (loop) {
            timeout = setTimeout(() => {
              setDisplayText('');
              charIndex = 0;
              startTyping();
            }, loopDelay);
          }
        }
      };
      
      timeout = setTimeout(typeNextChar, speed);
    };
    
    if (inView && !isTyping && !isComplete) {
      timeout = setTimeout(startTyping, delay);
    }
    
    return () => clearTimeout(timeout);
  }, [inView, isTyping, isComplete, text, speed, delay, loop, loopDelay, onComplete]);

  // Cursor animation
  const cursorVariants = {
    blinking: {
      opacity: [0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div ref={ref} className={`inline-flex items-center ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          variants={cursorVariants}
          animate="blinking"
          style={{ 
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: cursorColor,
            marginLeft: '2px',
          }}
        />
      )}
    </div>
  );
};

export default TypewriterText;