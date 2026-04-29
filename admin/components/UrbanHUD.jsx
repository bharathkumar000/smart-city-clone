import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Heart, Users, Trophy, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

const UrbanHUD = ({ cityStats, lastActionImpact }) => {
  return (
    <div className="urban-hud-container" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000, padding: '2rem' }}>
      
      {/* TOP BAR STATS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          style={{ 
            background: 'rgba(10, 11, 16, 0.85)', 
            backdropFilter: 'blur(10px)', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <TrendingUp size={18} color="var(--accent)" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>PROSPERITY</span>
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>{cityStats.prosperity.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Heart size={18} color="#ec4899" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>HAPPINESS</span>
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>{cityStats.happiness}%</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={18} color="#10b981" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.55rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>POPULATION</span>
              <span style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>{cityStats.population.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE IMPACT POPUP */}
      <div style={{ position: 'absolute', top: '6rem', right: '2rem', width: '320px' }}>
        <AnimatePresence>
          {lastActionImpact && (
            <motion.div
              initial={{ x: 350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 350, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                padding: '1.5rem',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                pointerEvents: 'auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '10px', 
                  background: lastActionImpact.score > 0 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {lastActionImpact.score > 0 ? <CheckCircle2 color="#10b981" /> : <AlertCircle color="#ef4444" />}
                </div>
                <div>
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                    {lastActionImpact.type === 'DEMOLISH' ? 'TACTICAL_DEMOLITION' : 'INFRASTRUCTURE_UPGRADE'}
                  </h3>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', margin: 0 }}>{lastActionImpact.timestamp}</p>
                </div>
              </div>

              <p style={{ fontSize: '0.7rem', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '1.25rem', fontWeight: 500 }}>
                {lastActionImpact.text}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.5rem', fontWeight: 900, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>SCORE</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: lastActionImpact.score > 0 ? '#10b981' : '#ef4444' }}>
                    {lastActionImpact.score > 0 ? '+' : ''}{lastActionImpact.score}
                  </span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '0.75rem', borderRadius: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.5rem', fontWeight: 900, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.2rem' }}>HAPPINESS</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 900, color: lastActionImpact.happiness > 0 ? '#10b981' : '#ef4444' }}>
                    {lastActionImpact.happiness > 0 ? '+' : ''}{lastActionImpact.happiness}%
                  </span>
                </div>
              </div>

              {lastActionImpact.score > 0 && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.6rem', 
                  background: 'linear-gradient(90deg, var(--accent), #6366f1)', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 900,
                  letterSpacing: '1px'
                }}>
                  <Zap size={12} fill="#fff" /> STREAK BONUS ACTIVE
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UrbanHUD;
