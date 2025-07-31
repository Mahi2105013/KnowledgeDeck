import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
    transition={{ duration: 0.8, ease: 'easeInOut' }}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      color: 'white',
      fontSize: '40px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <motion.span
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, yoyo: Infinity, ease: 'easeInOut' }}
      style={{
        display: 'inline-block',
      }}
    >
      LOADING ...
    </motion.span>
    <motion.div
      style={{
        position: 'absolute',
        bottom: '-50px',
        left: '-50px',
        width: '200px',
        height: '200px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
      }}
      animate={{ x: [0, 300], y: [0, -300] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
    />
    <motion.div
      style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '100px',
        height: '100px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
      }}
      animate={{ x: [0, -150], y: [0, 150] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
    />
  </motion.div>
);

export default Loading;
