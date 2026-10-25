document.addEventListener('DOMContentLoaded', () => {
  const lessonNav = document.getElementById('lessonNav');
  const lessonContent = document.getElementById('lessonContent');
  const interactiveArea = document.getElementById('interactiveArea');
  const glossaryContent = document.getElementById('glossaryContent');
  const brightnessRange = document.getElementById('brightnessRange');
  const personalNotes = document.getElementById('personalNotes');
  const burgerBtn = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');

  const readerCard = document.querySelector('.reader-card');
  const pseudoFsBtn = document.getElementById('fullscreenToggleBtn');
  const trueFsBtn = document.getElementById('trueFullscreenBtn');

  const lessonsData = window.lessonsData || [];

  /* ================= SIDEBAR BURGER MENU ================= */
  if (burgerBtn && sidebar) {
    burgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !burgerBtn.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });
  }

  /* ================= FULLSCREEN CONTROLLER ================= */
  // 1. Fullscreen Semu (Sangat Mudah Di-debug di DevTools)
  if (pseudoFsBtn) {
    pseudoFsBtn.addEventListener('click', () => {
      document.body.classList.toggle('is-simulated-fullscreen');
      const isPseudo = document.body.classList.contains('is-simulated-fullscreen');
      
      pseudoFsBtn.title = isPseudo ? "Keluar Fullscreen Semu" : "Fullscreen Semu (Easy Debug)";
      pseudoFsBtn.classList.toggle('active-fs', isPseudo);
    });
  }

  // 2. True Native Fullscreen (Menutupi Seluruh Monitor & Membawa Background Warna-Warni)
  if (trueFsBtn) {
    trueFsBtn.addEventListener('click', async () => {
      try {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          // PENTING: Panggil pada document.documentElement agar latar belakang body tidak terpotong
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            await document.documentElement.webkitRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            await document.webkitExitFullscreen();
          }
        }
      } catch (err) {
        console.warn("Fullscreen API Error:", err);
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const isTrueFS = !!document.fullscreenElement;
      trueFsBtn.title = isTrueFS ? "Keluar Fullscreen Layar" : "True Fullscreen (Layar Penuh)";
      trueFsBtn.classList.toggle('active-fs', isTrueFS);
    });
  }

  /* ================= NAVIGASI LESSON ================= */
  document.documentElement.style.setProperty('--total-lessons', lessonsData.length);

  lessonsData.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = 'lesson-btn';
    btn.textContent = item.title;
    btn.onclick = () => activateLesson(index);
    lessonNav.appendChild(btn);
  });

  if (lessonsData.length > 0) activateLesson(0);

  async function activateLesson(index) {
    const lesson = lessonsData[index];
    if (!lesson) return;

    if (sidebar) sidebar.classList.remove('active');

    document.querySelectorAll('.lesson-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    await MarkdownLoader.loadAndRender(lesson.id, lessonContent);
    glossaryContent.innerHTML = lesson.glossary || '-';

    interactiveArea.innerHTML = '';
    if (lesson.widget && typeof WidgetRegistry[lesson.widget] === 'function') {
      WidgetRegistry[lesson.widget](interactiveArea);

      if (window.renderMathInElement) {
        renderMathInElement(interactiveArea, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    }
  }

  /* ================= KECERAHAN & CATATAN ================= */
  if (brightnessRange) {
    brightnessRange.addEventListener('input', (e) => {
      readerCard.style.filter = `brightness(${e.target.value}%)`;
    });
  }

  if (personalNotes) {
    personalNotes.value = localStorage.getItem('pythagoras_notes') || '';
    personalNotes.addEventListener('input', (e) => {
      localStorage.setItem('pythagoras_notes', e.target.value);
    });
  }
});