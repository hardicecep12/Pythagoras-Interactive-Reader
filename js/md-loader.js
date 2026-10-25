const MarkdownLoader = {
  async loadAndRender(lessonId, targetContainer) {
    try {
      const markdownText = (window.lessonContents && window.lessonContents[lessonId]) || "Materi tidak ditemukan.";
      let htmlContent = marked.parse(markdownText);

      targetContainer.className = 'lesson-article';
      targetContainer.innerHTML = htmlContent;

      if (window.renderMathInElement) {
        renderMathInElement(targetContainer, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      }
    } catch (error) {
      console.error("[MarkdownLoader Error]:", error);
      targetContainer.innerHTML = `<div style="color:#EF4444; padding:16px;">⚠️ Gagal memuat materi.</div>`;
    }
  }
};