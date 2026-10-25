const WidgetRegistry = {
  attachWidgetToolbar(container, widgetTitle) {
    const header = document.createElement('div');
    header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;';
    
    const titleEl = document.createElement('h4');
    titleEl.style.cssText = 'font-size:14px; color:#334155; margin:0; font-weight:500;';
    titleEl.textContent = widgetTitle;

    const expandBtn = document.createElement('button');
    expandBtn.style.cssText = 'background:none; border:none; cursor:pointer; font-size:12px; color:var(--btn-gray); font-weight:500; display:flex; align-items:center; gap:4px; padding:0;';
    expandBtn.innerHTML = `🔍 <span>Perbesar Widget</span>`;
    
    expandBtn.onclick = () => {
      container.classList.toggle('widget-expanded');
      const isExp = container.classList.contains('widget-expanded');
      expandBtn.querySelector('span').textContent = isExp ? 'Kecilkan Widget' : 'Perbesar Widget';
    };

    header.appendChild(titleEl);
    header.appendChild(expandBtn);
    return header;
  },

  dashboardOverview(container) {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px 20px; border-radius: 8px;">
        <div>
          <div style="font-size: 13px; color: #334155; font-weight: 500;">Siap Memulai Pembelajaran?</div>
          <div style="font-size: 12px; color: #64748B;">Mulai dari pembelajaran pertama untuk mempelajari konsep dasar.</div>
        </div>
        <button id="btnStartModule" class="widget-btn">
          Buka Lesson 01 →
        </button>
      </div>
    `;

    document.getElementById('btnStartModule').onclick = () => {
      const lessonBtns = document.querySelectorAll('.lesson-btn');
      if (lessonBtns[1]) lessonBtns[1].click();
    };
  },

  kalkulatorHypotenuse(container) {
    container.innerHTML = '';
    const toolbar = this.attachWidgetToolbar(container, 'Kalkulator Hipotenusa (c = √(a² + b²))');
    container.appendChild(toolbar);

    const body = document.createElement('div');
    body.innerHTML = `
      <img src="content/svg/segitiga-siku.svg" alt="Segitiga Siku-Siku" class="svg-widget-img">

      <div style="display:flex; gap:10px; margin: 16px 0; align-items:center;">
        <input type="number" id="inputA" value="3" placeholder="Sisi a" style="width:80px;">
        <input type="number" id="inputB" value="4" placeholder="Sisi b" style="width:80px;">
        <button id="btnHitung" class="widget-btn">Hitung</button>
      </div>
      <div id="resCalc" style="color:#334155; font-size:13px; font-weight:500;"></div>
    `;
    container.appendChild(body);

    document.getElementById('btnHitung').onclick = () => {
      const a = parseFloat(document.getElementById('inputA').value);
      const b = parseFloat(document.getElementById('inputB').value);
      if (a > 0 && b > 0) {
        const c = Math.sqrt(a * a + b * b);
        document.getElementById('resCalc').textContent = `Hasil Hipotenusa (c) = ${c.toFixed(2)}`;
      }
    };
  },

  checkTripel(container) {
    container.innerHTML = '';
    const toolbar = this.attachWidgetToolbar(container, 'Uji Validitas Tripel Pythagoras');
    container.appendChild(toolbar);

    const body = document.createElement('div');
    body.innerHTML = `
      <div style="display:flex; gap:8px; margin: 16px 0; align-items:center;">
        <input type="number" id="t1" value="5" style="width:65px;">
        <input type="number" id="t2" value="12" style="width:65px;">
        <input type="number" id="t3" value="13" style="width:65px;">
        <button id="btnCek" class="widget-btn">Uji</button>
      </div>
      <div id="resTripel" style="font-size:13px;"></div>
    `;
    container.appendChild(body);

    document.getElementById('btnCek').onclick = () => {
      const nums = [
        parseInt(document.getElementById('t1').value),
        parseInt(document.getElementById('t2').value),
        parseInt(document.getElementById('t3').value)
      ].sort((x, y) => x - y);

      const isTriple = (nums[0] ** 2 + nums[1] ** 2 === nums[2] ** 2);
      document.getElementById('resTripel').innerHTML = isTriple
        ? `<span style="color:#334155; font-weight:500;">✔ ${nums.join(', ')} Valid Tripel Pythagoras!</span>`
        : `<span style="color:#94A3B8;">✘ Bukan Tripel Pythagoras.</span>`;
    };
  },

  segitigaIstimewa(container) {
    container.innerHTML = '';
    const toolbar = this.attachWidgetToolbar(container, 'Kalkulator Segitiga 45° – 45° – 90°');
    container.appendChild(toolbar);

    const body = document.createElement('div');
    body.innerHTML = `
      <div style="display:flex; gap:10px; margin: 16px 0; align-items:center;">
        <input type="number" id="sX" value="5" placeholder="Sisi x" style="width:80px;">
        <button id="btnSpec" class="widget-btn">Hitung Sisi Miring</button>
      </div>
      <div id="resSpec" style="color:#334155; font-size:13px; font-weight:500;"></div>
    `;
    container.appendChild(body);

    document.getElementById('btnSpec').onclick = () => {
      const x = parseFloat(document.getElementById('sX').value);
      if (x > 0) {
        document.getElementById('resSpec').textContent = `Hipotenusa = ${x}√2 ≈ ${(x * Math.SQRT2).toFixed(2)}`;
      }
    };
  },

  kuisLatihan(container) {
    container.innerHTML = '';
    const toolbar = this.attachWidgetToolbar(container, 'Latihan Kuis Ringkas');
    container.appendChild(toolbar);

    const body = document.createElement('div');
    body.innerHTML = `
      <p style="font-size:13px; color:#475569; margin-bottom:12px;">Tangga sepanjang 5m disandarkan ke dinding. Jarak kaki tangga ke dinding 3m. Berapa tinggi dinding?</p>
      <div style="display:flex; gap:8px;">
        <input type="number" id="ans" placeholder="Jawaban (m)" style="width:120px;">
        <button id="btnKuis" class="widget-btn">Jawab</button>
      </div>
      <div id="resKuis" style="margin-top:8px; font-size:13px;"></div>
    `;
    container.appendChild(body);

    document.getElementById('btnKuis').onclick = () => {
      const val = parseFloat(document.getElementById('ans').value);
      document.getElementById('resKuis').innerHTML = (val === 4)
        ? `<span style="color:#334155; font-weight:500;">✔ Benar! h = √(5² - 3²) = √16 = 4 meter.</span>`
        : `<span style="color:#94A3B8;">✘ Kurang tepat. Gunakan rumus h = √(c² - a²).</span>`;
    };
  }
};