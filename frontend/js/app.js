document.addEventListener('DOMContentLoaded', () => {
  const state = {
    isAuthenticated: true,
    currentScreen: 'patient_translation',
    viewMode: 'device',
    patientLang: window.Hear2HealData.languages[0],
    doctorLang: window.Hear2HealData.languages[1],
    selectedSymptoms: ['chest_pain', 'breathing'],
    selectedBodyPoint: 'chest',
    bodyView: 'front',
    transcripts: window.Hear2HealData.initialTranscripts,
    currentInputText: window.Hear2HealData.emergencyPresets[0].patientText
  };

  const menuItems = [
    { id: 'splash', label: 'Overview Dashboard', icon: '📊' },
    { id: 'patient_translation', label: 'Patient Auto-Translate', icon: '🎙️', badge: 'AI' },
    { id: 'doctor_reply', label: 'Doctor Reply Suite', icon: '👨‍⚕️' },
    { id: 'symptoms', label: 'Quick Symptom Grid', icon: '⚡' },
    { id: 'body_map', label: '2D Anatomical Map', icon: '🩻' },
    { id: 'emergency', label: 'Emergency SOS Protocols', icon: '🚨' },
    { id: 'medicine', label: 'Prescriptions & Dosage', icon: '💊' },
    { id: 'history', label: 'Consultation History', icon: '📋' }
  ];

  const viewportContainer = document.getElementById('viewportContainer');
  const navMenu = document.getElementById('navMenu');
  const screenTitleHeader = document.getElementById('screenTitleHeader');
  const sidebar = document.getElementById('sidebar');
  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const btnDeviceView = document.getElementById('btnDeviceView');
  const btnGalleryView = document.getElementById('btnGalleryView');
  const headerSosBtn = document.getElementById('headerSosBtn');

  if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
  if (btnDeviceView) btnDeviceView.addEventListener('click', () => setViewMode('device'));
  if (btnGalleryView) btnGalleryView.addEventListener('click', () => setViewMode('gallery'));
  if (headerSosBtn) headerSosBtn.addEventListener('click', () => navigateTo('emergency'));

  function setViewMode(mode) {
    state.viewMode = mode;
    if (btnDeviceView) btnDeviceView.classList.toggle('active', mode === 'device');
    if (btnGalleryView) btnGalleryView.classList.toggle('active', mode === 'gallery');
    render();
  }

  function navigateTo(screenId) {
    state.currentScreen = screenId;
    render();
  }

  function renderSidebarNav() {
    navMenu.innerHTML = '';
    menuItems.forEach(item => {
      const btn = document.createElement('a');
      btn.className = `nav-item ${state.currentScreen === item.id ? 'active' : ''}`;
      btn.href = '#';
      btn.innerHTML = `
        <span style="font-size: 1.1rem;">${item.icon}</span>
        <span class="sidebar-text">${item.label}</span>
      `;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(item.id);
      });
      navMenu.appendChild(btn);
    });
  }

  function render() {
    renderSidebarNav();
    const currentMenuItem = menuItems.find(m => m.id === state.currentScreen);
    if (screenTitleHeader) screenTitleHeader.innerText = currentMenuItem ? currentMenuItem.label : 'Hear2Heal';

    if (state.viewMode === 'gallery') {
      viewportContainer.innerHTML = renderGalleryView();
      bindGalleryEvents();
    } else {
      viewportContainer.innerHTML = `
        <div class="device-frame">
          <div style="background: rgba(0,0,0,0.4); padding: 0.5rem 1rem; display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); border-bottom: 1px solid var(--border-subtle);">
            <span>9:41 AM</span>
            <span>📶 5G  🔋 98%</span>
          </div>
          <div style="flex: 1; overflow-y: auto; padding: 1.25rem;">
            ${renderCurrentScreenContent()}
          </div>
        </div>
      `;
      bindCurrentScreenEvents();
    }
  }

  function renderCurrentScreenContent() {
    switch (state.currentScreen) {
      case 'splash': return renderSplashScreen();
      case 'patient_translation': return renderPatientTranslationScreen();
      case 'doctor_reply': return renderDoctorReplyScreen();
      case 'symptoms': return renderQuickSymptomScreen();
      case 'body_map': return renderBodyMapScreen();
      case 'emergency': return renderEmergencyScreen();
      case 'medicine': return renderMedicineScreen();
      case 'history': return renderHistoryScreen();
      default: return renderPatientTranslationScreen();
    }
  }

  function renderSplashScreen() {
    return `
      <div>
        <div style="background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(6,182,212,0.15)); padding: 1.25rem; border-radius: 1rem; border: 1px solid rgba(59,130,246,0.3); margin-bottom: 1.25rem;">
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: #FFF;">Welcome, Dr. Sharma</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">ER Trauma Bay 1 | Zero-Click AI Detection Active</p>
        </div>
        <button class="btn-primary" onclick="window.navigateToScreen('patient_translation')" style="width: 100%; padding: 1rem;">
          🎙️ Start Zero-Click Patient Translation
        </button>
      </div>
    `;
  }

  function renderPatientTranslationScreen() {
    const analysis = window.Hear2HealSpeech.processPatientSpeech(state.currentInputText, state.doctorLang.id);
    return `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 0.6rem 0.85rem; border-radius: 0.75rem; border: 1px solid var(--border-subtle); margin-bottom: 1rem;">
          <span style="font-size: 0.8rem; font-weight: 700; color: #60A5FA;">✨ Zero-Click Auto Detect</span>
          <span style="font-size: 0.75rem; background: rgba(52,211,153,0.15); color: #34D399; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 700;">
            ${analysis.detectedLanguage.flag} ${analysis.detectedLanguage.name} (${analysis.confidence}%)
          </span>
        </div>

        <div class="glass-card" style="margin-bottom: 1rem;">
          <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.35rem;">PATIENT INPUT:</label>
          <textarea id="patientInputTextarea" style="width: 100%; height: 80px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 0.5rem; padding: 0.75rem; color: #FFF; font-size: 0.95rem; resize: none;">${state.currentInputText}</textarea>
        </div>

        <div class="glass-card" style="border-left: 4px solid ${analysis.triageLevel === 'red' ? '#EF4444' : '#F59E0B'};">
          <div style="font-size: 0.8rem; font-weight: 700; color: #F87171; margin-bottom: 0.4rem;">TRIAGE ${analysis.triageLevel.toUpperCase()}</div>
          <div style="font-size: 1.05rem; font-weight: 700; color: #FFF; margin-bottom: 0.5rem;">"${analysis.doctorTranslation}"</div>
          <button id="playAudioBtn" class="btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">🔊 Listen Audio</button>
        </div>
      </div>
    `;
  }

  function renderDoctorReplyScreen() {
    return `
      <div>
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Doctor Reply Suite</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${window.Hear2HealData.doctorReplies.map(cat => `
            <div class="glass-card">
              <div style="font-weight: 700; color: #60A5FA; font-size: 0.85rem; margin-bottom: 0.5rem;">${cat.icon} ${cat.category}</div>
              ${cat.phrases.map(p => `
                <button class="btn-doctor-phrase" data-hi="${p.hi}" style="width: 100%; text-align: left; padding: 0.6rem; margin-top: 0.35rem; border-radius: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); color: #FFF; font-size: 0.8rem; cursor: pointer;">
                  <div>${p.en}</div>
                  <div style="font-size: 0.75rem; color: #34D399;">${p.hi}</div>
                </button>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderQuickSymptomScreen() {
    return `
      <div>
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Quick Symptom Triage</h4>
        <div class="symptom-grid">
          ${window.Hear2HealData.quickSymptoms.map(s => `
            <div class="symptom-card">
              <div style="font-size: 1.5rem;">${s.icon}</div>
              <div style="font-weight: 700; font-size: 0.85rem; color: #FFF;">${s.name}</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">${s.hindiName}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderBodyMapScreen() {
    return `
      <div>
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">2D Anatomical Pain Map</h4>
        <div class="body-map-container">
          <div class="body-point-dot" style="left: 50%; top: 33%;" title="Chest"></div>
        </div>
      </div>
    `;
  }

  function renderEmergencyScreen() {
    return `
      <div>
        <div style="background: rgba(239,68,68,0.15); border: 2px solid #EF4444; padding: 1.25rem; border-radius: 1rem; text-align: center;">
          <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: #F87171;">🚨 EMERGENCY SOS</h3>
          <button class="btn-danger pulse-sos-btn" style="margin-top: 0.75rem; width: 100%; padding: 0.85rem;">TRIGGER SOS BROADCAST</button>
        </div>
      </div>
    `;
  }

  function renderMedicineScreen() {
    return `
      <div>
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Prescriptions & Dosage</h4>
        <div class="glass-card">
          <div style="font-weight: 700; color: #FFF;">💊 Tab. Aspirin 300mg</div>
          <div style="font-size: 0.8rem; color: #34D399; margin-top: 0.25rem;">इसे तुरंत पानी में घोलकर पिएं।</div>
        </div>
      </div>
    `;
  }

  function renderHistoryScreen() {
    return `
      <div>
        <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">Consultation History</h4>
        ${state.transcripts.map(t => `
          <div class="glass-card" style="margin-bottom: 0.5rem;">
            <div style="font-size: 0.85rem; color: #FFF;">"${t.text}"</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary);">➜ "${t.translatedText}"</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderGalleryView() {
    return `
      <div class="gallery-grid">
        ${menuItems.map(item => `
          <div class="screen-card-preview" data-id="${item.id}">
            <div style="font-weight: 700; color: #FFF;">${item.icon} ${item.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function bindCurrentScreenEvents() {
    const playAudioBtn = document.getElementById('playAudioBtn');
    if (playAudioBtn) {
      playAudioBtn.addEventListener('click', () => {
        const analysis = window.Hear2HealSpeech.processPatientSpeech(state.currentInputText, 'en');
        window.Hear2HealSpeech.speakText(analysis.doctorTranslation, 'en-US');
      });
    }

    document.querySelectorAll('.btn-doctor-phrase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const textHi = e.currentTarget.getAttribute('data-hi');
        window.Hear2HealSpeech.speakText(textHi, 'hi-IN');
      });
    });

    const patientInputTextarea = document.getElementById('patientInputTextarea');
    if (patientInputTextarea) {
      patientInputTextarea.addEventListener('input', (e) => {
        state.currentInputText = e.target.value;
      });
    }
  }

  function bindGalleryEvents() {
    document.querySelectorAll('.screen-card-preview').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        setViewMode('device');
        navigateTo(id);
      });
    });
  }

  window.navigateToScreen = (screenId) => {
    setViewMode('device');
    navigateTo(screenId);
  };

  render();
});
