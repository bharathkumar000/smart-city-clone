'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ShieldAlert, User, Globe } from 'lucide-react';

export default function PortalPage() {
  const router = useRouter();

  return (
    <div className="portal-root">
      <div className="portal-content">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="portal-header"
        >
          <div className="icon-main" style={{ margin: '0 auto' }}>
            <Globe size={80} color="var(--accent)" />
          </div>
          <h1>BENGALURU NEXUS</h1>
          <p style={{ color: 'var(--text-secondary)', letterSpacing: '2px', fontWeight: 600 }}>INTEGRATED URBAN COMMAND CORE v4.0</p>
        </motion.div>

        <div className="portal-grid">
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="portal-card glass-panel"
            onClick={() => router.push('/login/user')}
          >
            <div className="card-icon">
              <User size={48} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>CITIZEN HUB</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Access public insights, maps, and local reporting telemetry.</p>
            <div style={{ marginTop: '2rem', color: 'var(--accent)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>ENTER PORTAL //</div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="portal-card glass-panel"
            onClick={() => router.push('/login/admin')}
          >
            <div className="card-icon" style={{ color: 'var(--danger)' }}>
              <ShieldAlert size={48} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>ADMIN TERMINAL</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Secured access for urban planners and strategic response units.</p>
            <div style={{ marginTop: '2rem', color: 'var(--danger)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>AUTHORIZE ACCESS //</div>
          </motion.div>
        </div>
      </div>
      
      <div className="portal-bg">
        <div className="grid-overlay" />
      </div>
    </div>
  );
}
