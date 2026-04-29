import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Activity, Bot, Hammer, Globe, MessageSquare, 
  History, Target, Send, Megaphone, Loader2, Terminal, X, Heart, MapPin, Trash2, Maximize2, Minimize2, FileText, UploadCloud, Paperclip
} from 'lucide-react';
import { ASSET_TEMPLATES } from '../utils/constants';

const AdminSidebar = ({ 
  activeCategory, 
  globalConfidence, 
  handleAiSuggest, 
  aiSuggestion, 
  timeHorizon, 
  setTimeHorizon, 
  activePriority, 
  setActivePriority,
  advisorLog,
  advisorQuery,
  setAdvisorQuery,
  handleAskAdvisor,
  policyForm,
  setPolicyForm,
  handleBroadcastPolicy,
  isBroadcasting,
  assetToPlace,
  setAssetToPlace,
  onDragStart,
  floodLevel,
  setFloodLevel,
  showHydrants,
  setShowHydrants,
  isEmergencyActive,
  setIsEmergencyActive,
  handleFetchSentiment,
  isSentimentLoading,
  publicRequests,
  setSelectedRequest,
  flyTo,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isDemolishMode,
  setIsDemolishMode,
  sentimentData,
  aiPolicyScore,
  isAnalyzingPolicy,
  handleAnalyzePolicy
}) => {
  const [isMaximized, setIsMaximized] = React.useState(false);

  const handleAction = (callback) => {
    if (callback) callback();
  };

  return (
    <div 
      className={`side-panel ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}
      style={isMaximized ? { 
        width: '100vw', 
        height: '100vh', 
        maxWidth: '100vw', 
        top: 0, 
        left: 0, 
        zIndex: 9999, 
        borderRadius: 0 
      } : {}}
    >
      <div className="widget" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldAlert size={24} color="var(--accent)" />
          <div className="header-text">
            <h2 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '1px' }}>ADMIN NEXUS</h2>
            <span style={{ fontSize: '0.5rem', color: 'var(--success)', fontWeight: 900 }}>CMD_ROOT_ACCESS_v4.0</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Restore" : "Expand Entirely"}
            style={{ 
              background: 'rgba(0,0,0,0.05)', 
              border: 'none', 
              borderRadius: '50%', 
              width: '28px', 
              height: '28px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37,99,235,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
          >
            {isMaximized ? <Minimize2 size={14} color="var(--text-secondary)" /> : <Maximize2 size={14} color="var(--text-secondary)" />}
          </button>
          <button 
            onClick={() => { setIsSidebarCollapsed(true); setIsMaximized(false); }}
            title="Close"
            style={{ 
              background: 'rgba(0,0,0,0.05)', 
              border: 'none', 
              borderRadius: '50%', 
              width: '28px', 
              height: '28px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
          >
            <X size={16} color="var(--text-secondary)" />
          </button>
        </div>
      </div>

      <div className="widget content-widget" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', borderLeft: '1px solid var(--accent-glass)' }}>
        <div className="scroll-area" style={{ flex: 1, padding: '1rem' }}>
          
          {!activeCategory && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5, textAlign: 'center' }}>
              <Terminal size={40} color="var(--accent)" style={{ marginBottom: '1rem' }} />
              <span className="section-label">SYSTEM_READY</span>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>SELECT CATEGORY FROM COMMAND DOCK</p>
            </div>
          )}

          {activeCategory === 'strategy' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="panel-section" style={{ marginBottom: '2rem' }}>
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}><Activity size={14} /> DECISION CONFIDENCE METER</span>
                <div className="widget" style={{ padding: '1.5rem', background: 'rgba(37,99,235,0.03)', border: '1px solid var(--accent-glass)', textAlign: 'center', marginTop: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: globalConfidence > 70 ? 'var(--success)' : globalConfidence > 40 ? 'var(--warning)' : 'var(--danger)' }}>{globalConfidence}%</div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', opacity: 0.8 }}>{globalConfidence > 70 ? '🟢 SAFE_STATUS' : globalConfidence > 40 ? '🟡 MODERATE_RISK' : '🔴 CRITICAL_RISK'}</span>
                  <button className="action-btn" onClick={() => handleAction(handleAiSuggest)} style={{ marginTop: '1.5rem', background: 'var(--accent)', color: '#fff' }}>AI: SUGGEST BEST PLAN</button>
                  {aiSuggestion && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(37,99,235,0.1)', borderRadius: '10px', fontSize: '0.7rem', fontStyle: 'italic', color: 'var(--accent)', borderLeft: '3px solid var(--accent)' }}>" {aiSuggestion.text} "</motion.div>
                  )}
                </div>
              </div>

              <div className="panel-section" style={{ marginBottom: '2rem' }}>
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}><History size={14} /> TIME TRAVEL HORIZON</span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  {['past', 'present', 'future'].map(t => (
                    <button key={t} onClick={() => handleAction(() => setTimeHorizon(t))} className={`tab-btn ${timeHorizon === t ? 'active' : ''}`} style={{ flex: 1, fontSize: '0.6rem' }}>{t.toUpperCase()}</button>
                  ))}
                </div>
              </div>

              <div className="panel-section">
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}><Target size={14} /> STRATEGIC PRIORITY</span>
                <select value={activePriority} onChange={e => setActivePriority(e.target.value)} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '0.7rem' }}>
                  <option value="balanced">BALANCED (CITY STABILITY)</option>
                  <option value="safety">MINIMIZE ACCIDENTS (EMS FOCUS)</option>
                  <option value="economy">MAXIMIZE GROWTH (TRAFFIC PRIORITY)</option>
                  <option value="green">NET ZERO (EMISSIONS FOCUS)</option>
                </select>
              </div>
            </motion.div>
          )}

          {activeCategory === 'directives' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              {/* 3. AI ADVISOR */}
              <div className="panel-section" style={{ marginBottom: '2rem' }}>
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <Bot size={14} /> NEXUS AI ADVISOR (GEMMA-4)
                </span>
                <div className="advisor-chat" style={{ height: '220px', overflowY: 'auto', marginBottom: '1rem', marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '0.7rem' }}>
                  {advisorLog.length === 0 && <p style={{ opacity: 0.5, fontStyle: 'italic' }}>Standing by for strategic queries...</p>}
                  {advisorLog.map((m, i) => (
                    <div key={i} style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '10px', background: m.role === 'ai' || m.role === 'assistant' ? 'rgba(37,99,235,0.05)' : 'rgba(0,0,0,0.03)', border: m.role === 'ai' || m.role === 'assistant' ? '1px solid var(--accent-glass)' : '1px solid var(--glass-border)' }}>
                      <strong style={{ color: m.role === 'ai' || m.role === 'assistant' ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '0.6rem', display: 'block', marginBottom: '0.25rem' }}>{m.role === 'ai' || m.role === 'assistant' ? 'NEXUS_OS' : 'COMMANDER'}:</strong>
                      <p style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>{m.content}</p>
                    </div>
                  ))}
                  {isBroadcasting && <div className="loading-indicator" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.6rem', color: 'var(--accent)' }}><Loader2 size={12} className="spin" /> ANALYZING GEOSPATIAL IMPACT...</div>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input className="chat-field" value={advisorQuery} onChange={e => setAdvisorQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAskAdvisor()} placeholder="QUERY SYSTEM..." style={{ flex: 1, padding: '0.75rem', background: 'rgba(0,0,0,0.03)', borderRadius: '10px', fontSize: '0.7rem', color: 'var(--text-primary)', border: '1px solid var(--glass-border)' }} />
                  <button className="action-btn" onClick={() => handleAction(handleAskAdvisor)} style={{ width: '45px', padding: 0, height: '40px' }}><Send size={16} /></button>
                </div>
              </div>

              {/* 6. STRATEGIC POLICY HUB */}
              <div className="panel-section">
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <FileText size={14} /> STRATEGIC_POLICY_HUB
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem', padding: '1rem', background: '#ffffff', borderRadius: '12px', border: '1px solid var(--glass-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  
                  {/* Title & Location */}
                  <input className="chat-mini" placeholder="Policy Title (e.g., Underground Metro Extension)" value={policyForm.title || ''} onChange={e => setPolicyForm({...policyForm, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#333' }} />
                  <input className="chat-mini" placeholder="Target Location" value={policyForm.location || ''} onChange={e => setPolicyForm({...policyForm, location: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#333' }} />
                  
                  {/* Budget & Timeline */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <input className="chat-mini" placeholder="Budget (₹)" value={policyForm.budget || ''} onChange={e => setPolicyForm({...policyForm, budget: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#333' }} />
                    <input className="chat-mini" placeholder="Timeline (Months)" value={policyForm.duration || ''} onChange={e => setPolicyForm({...policyForm, duration: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#333' }} />
                  </div>

                  {/* Impact Projections Box */}
                  <div style={{ padding: '1rem', background: 'rgba(37,99,235,0.03)', borderRadius: '12px', border: '1px solid rgba(37,99,235,0.2)', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent)', display: 'block', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>IMPACT_PROJECTIONS</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <input className="chat-mini" placeholder="Traffic Disruption Estimate" value={policyForm.impactTraffic || ''} onChange={e => setPolicyForm({...policyForm, impactTraffic: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: 'none', background: '#fff', fontSize: '0.7rem', color: '#333', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} />
                      <input className="chat-mini" placeholder="Underground Utilities Risk" value={policyForm.impactUnderground || ''} onChange={e => setPolicyForm({...policyForm, impactUnderground: e.target.value})} style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: 'none', background: '#fff', fontSize: '0.7rem', color: '#333', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} />
                    </div>
                  </div>

                  {/* Expected Outcome */}
                  <textarea className="chat-mini" placeholder="Expected Outcome & ROI..." value={policyForm.outcome || ''} onChange={e => setPolicyForm({...policyForm, outcome: e.target.value})} style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', color: '#333', resize: 'none', marginTop: '0.25rem' }} />

                  {/* File Upload Option */}
                  <div style={{ position: 'relative', marginTop: '0.25rem' }}>
                    <input type="file" id="policy-doc-upload" style={{ display: 'none' }} onChange={(e) => console.log('File selected:', e.target.files[0])} />
                    <label htmlFor="policy-doc-upload" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px dashed var(--accent)', background: 'rgba(37,99,235,0.02)', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(37,99,235,0.08)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(37,99,235,0.02)'}>
                      <UploadCloud size={16} /> ATTACH PROJECT DOSSIER / CAD FILES
                    </label>
                  </div>

                  <button className="action-btn" onClick={() => handleAction(handleBroadcastPolicy)} disabled={isBroadcasting} style={{ background: 'var(--accent)', marginTop: '0.5rem', height: '45px', fontSize: '0.75rem', borderRadius: '8px' }}>
                    {isBroadcasting ? <Loader2 className="spin" size={16} /> : 'ANALYZE & DEPLOY DIRECTIVE'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === 'builder' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '2rem',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ 
                    color: 'var(--text-primary)', 
                    fontSize: '0.9rem', 
                    fontWeight: 800, 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    letterSpacing: '1px'
                  }}>
                    <Hammer size={18} color="var(--accent)" /> INFRASTRUCTURE_INVENTORY
                  </div>
                  <button 
                    onClick={() => setIsDemolishMode(!isDemolishMode)}
                    style={{
                      background: isDemolishMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                      border: isDemolishMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--glass-border)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: isDemolishMode ? 'var(--danger)' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isDemolishMode) e.currentTarget.style.background = 'rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isDemolishMode) e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    <Trash2 size={12} /> {isDemolishMode ? 'DEMOLISH_ACTIVE' : 'DEMOLISH_OFF'}
                  </button>
                </div>
                
                {['Buildings', 'Transport', 'Energy'].map(groupName => {
                  const assets = Object.entries(ASSET_TEMPLATES).filter(([_, a]) => a.group === groupName);
                  if (assets.length === 0) return null;

                  return (
                    <div key={groupName} style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ 
                        fontSize: '0.65rem', 
                        color: 'var(--text-secondary)', 
                        marginBottom: '0.75rem',
                        fontWeight: 800,
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {groupName.toUpperCase()}
                        <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: '0.5rem'
                      }}>
                        {assets.map(([name, asset]) => {
                          const isActive = assetToPlace === name;
                          return (
                            <div 
                              key={name} 
                              draggable 
                              onDragStart={(e) => onDragStart(e, name)} 
                              onClick={() => handleAction(() => setAssetToPlace(name))} 
                              title={name.toUpperCase()}
                              style={{ 
                                aspectRatio: '1/1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'grab', 
                                background: isActive ? 'rgba(37, 99, 235, 0.1)' : '#ffffff',
                                border: isActive ? '1.5px solid var(--accent)' : '1px solid #e2e8f0',
                                borderRadius: '10px',
                                position: 'relative',
                                padding: '4px',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.15)' : '0 2px 4px rgba(0,0,0,0.02)',
                                transform: isActive ? 'translateY(-2px)' : 'none'
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                                  e.currentTarget.style.borderColor = 'var(--accent-glass)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.transform = 'none';
                                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                                  e.currentTarget.style.borderColor = '#e2e8f0';
                                }
                              }}
                            >
                              <div style={{ 
                                color: isActive ? 'var(--accent)' : 'var(--text-secondary)', 
                                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.2s ease',
                                marginBottom: '4px'
                              }}>
                                {asset.icon}
                              </div>
                              <span style={{ 
                                fontSize: '0.45rem', 
                                fontWeight: 800, 
                                color: isActive ? 'var(--accent)' : 'var(--text-primary)', 
                                textAlign: 'center',
                                lineClamp: 1,
                                overflow: 'hidden',
                                width: '100%',
                                pointerEvents: 'none',
                                letterSpacing: '0.5px'
                              }}>
                                {name.split('-')[0].toUpperCase()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeCategory === 'policy' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="panel-section">
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}><FileText size={14} /> STRATEGIC_POLICY_HUB</span>
                
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input className="search-field" placeholder="Policy Title (e.g., Underground Metro Extension)" value={policyForm.title} onChange={e => setPolicyForm({...policyForm, title: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)' }} />
                  <input className="search-field" placeholder="Target Location" value={policyForm.location} onChange={e => setPolicyForm({...policyForm, location: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)' }} />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input className="search-field" placeholder="Budget (₹)" value={policyForm.budget} onChange={e => setPolicyForm({...policyForm, budget: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)' }} />
                    <input className="search-field" placeholder="Timeline (Months)" value={policyForm.duration} onChange={e => setPolicyForm({...policyForm, duration: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)' }} />
                  </div>

                  <div className="widget" style={{ padding: '1rem', background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    <span className="section-label" style={{ fontSize: '0.55rem', color: 'var(--accent)', marginBottom: '0.5rem', display: 'block' }}>IMPACT_PROJECTIONS</span>
                    <input className="search-field" placeholder="Traffic Disruption Estimate" value={policyForm.impactTraffic} onChange={e => setPolicyForm({...policyForm, impactTraffic: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }} />
                    <input className="search-field" placeholder="Underground Utilities Risk" value={policyForm.impactUnderground} onChange={e => setPolicyForm({...policyForm, impactUnderground: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)' }} />
                  </div>

                  <textarea className="search-field" placeholder="Expected Outcome & ROI..." value={policyForm.outcome} onChange={e => setPolicyForm({...policyForm, outcome: e.target.value})} style={{ background: 'rgba(255,255,255,0.8)', minHeight: '80px', resize: 'vertical' }} />

                  <div style={{ marginTop: '0.5rem' }}>
                    <button className="action-btn" onClick={() => handleAction(handleAnalyzePolicy)} disabled={isAnalyzingPolicy} style={{ width: '100%' }}>
                      {isAnalyzingPolicy ? <Loader2 className="spin" size={16} /> : 'ANALYZE POLICY (GEMMA_AI)'}
                    </button>
                  </div>

                  {aiPolicyScore !== null && (
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(10,11,16,0.9)', borderRadius: '12px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>AI_VIABILITY_SCORE</span>
                      <div style={{ fontSize: '2rem', fontWeight: 900, color: aiPolicyScore >= 75 ? 'var(--success)' : 'var(--danger)', margin: '0.5rem 0' }}>
                        {aiPolicyScore}%
                      </div>
                      {aiPolicyScore >= 75 ? (
                        <button className="action-btn" onClick={() => handleAction(handleBroadcastPolicy)} style={{ width: '100%', background: 'var(--success)' }}>
                          DEPLOY APPROVED POLICY
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.6rem', color: 'var(--danger)' }}>THRESHOLD NOT MET (REQUIRES 75%+)</span>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === 'social' && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="panel-section" style={{ marginBottom: '2rem' }}>
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <Heart size={14} /> CITIZEN SENTIMENT PULSE
                </span>
                <div className="widget" style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(239,68,68,0.02)', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                  <Globe size={40} color="var(--accent)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>GLOBAL_SOCIAL_METRICS</h3>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Analyze real-time community feedback across Bengaluru wards.</p>
                  <button className="action-btn" onClick={() => handleAction(handleFetchSentiment)} disabled={isSentimentLoading}>
                    {isSentimentLoading ? <Loader2 className="spin" size={16} /> : 'INITIALIZE HEATMAP'}
                  </button>
                </div>

                {sentimentData && sentimentData.feed && (
                  <div className="social-feed" style={{ marginTop: '2rem' }}>
                    <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                      <MessageSquare size={14} /> LIVE_CITIZEN_FEED
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {sentimentData.feed.map(post => (
                        <div key={post.id} className="widget" style={{ padding: '1rem', background: 'rgba(255,255,255,0.6)', border: '1px solid var(--glass-border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'var(--accent)' }}>{post.user}</span>
                            <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>{post.ward.toUpperCase()}</span>
                          </div>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>{post.content}</p>
                          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              background: post.type === 'complaint' ? 'var(--danger)' : post.type === 'praise' ? 'var(--success)' : 'var(--warning)' 
                            }} />
                            <span style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--text-secondary)' }}>{post.type.toUpperCase()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="panel-section">
                <span className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)' }}>
                  <MessageSquare size={14} /> PUBLIC_REQUEST_INBOX
                </span>
                <p style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '1.25rem' }}>Management of incoming citizen grievances.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {publicRequests.map(req => (
                    <div 
                      key={req.id} 
                      className="report-card widget" 
                      style={{ padding: '1rem', background: 'rgba(255,255,255,0.6)', border: '1px solid var(--glass-border)', cursor: 'pointer', transition: '0.2s' }} 
                      onClick={() => handleAction(() => {
                        flyTo(req.lngLat);
                        setSelectedRequest(req);
                      })}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>{req.type.toUpperCase()}</span>
                        <span style={{ 
                          fontSize: '0.5rem', 
                          padding: '3px 8px', 
                          borderRadius: '20px', 
                          background: req.status === 'Resolved' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', 
                          color: req.status === 'Resolved' ? 'var(--success)' : 'var(--danger)',
                          fontWeight: 900
                        }}>{req.status.toUpperCase()}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                        <MapPin size={10} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}>{req.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
