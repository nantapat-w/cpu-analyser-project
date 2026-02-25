import { useState } from 'react'
import './App.css'

function App() {
  const [lang, setLang] = useState('TH');
  const [theme, setTheme] = useState('dark');
  const [mode, setMode] = useState(1);

  const t = {
    TH: {
      title: "เครื่องมือวิเคราะห์ประสิทธิภาพ CPU",
      m1: "1. วิเคราะห์เครื่องเดียว",
      m2: "2. เปรียบเทียบ CPU",
      m3: "3. กฎของ Amdahl",
      instr: "จำนวนคำสั่ง (I)",
      cpi: "ค่า CPI",
      clock: "ความถี่ (GHz)",
      btn: "คำนวณ",
      totalCycles: "จำนวนไซเคิลรวม (Total Cycles)",
      resTime: "เวลาประมวลผล (CPU Time)",
      resPerf: "ประสิทธิภาพ (Performance)",
      portion: "ส่วนที่ปรับปรุง (%)",
      speedup: "ความเร็วที่เพิ่มขึ้น (เท่า)",
      compareBtn: "เปรียบเทียบ",
      winner: "เครื่องที่เร็วกว่าคือ",
      times: "เท่า",
      equal: "ประสิทธิภาพของทั้งสองเครื่องเท่ากัน",
      loading: "กำลังประมวลผล...",
      cpu1: "เวลา CPU 1 (วินาที)",
      cpu2: "เวลา CPU 2 (วินาที)"
    },
    EN: {
      title: "CPU Performance Analyzer",
      m1: "1. Analyze Single",
      m2: "2. Compare CPUs",
      m3: "3. Amdahl's Law",
      instr: "Instruction Count",
      cpi: "CPI",
      clock: "Clock Rate (GHz)",
      btn: "Calculate",
      totalCycles: "Total Cycles",
      resTime: "CPU Time",
      resPerf: "Performance",
      portion: "Portion Optimized (%)",
      speedup: "Speedup Factor",
      compareBtn: "Compare",
      winner: "Faster CPU is",
      times: "times",
      equal: "Both CPUs have identical performance.",
      loading: "Processing...",
      cpu1: "CPU 1 Time (s)",
      cpu2: "CPU 2 Time (s)"
    }
  }[lang];

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="top-settings">
          <button className="settings-btn" onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')}>{lang === 'TH' ? 'EN' : 'TH'}</button>
          <button className="settings-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
      </div>

      <div className="container">
        <h1>{t.title}</h1>
        
        <div className="menu-buttons">
          <button className={mode === 1 ? 'active' : ''} onClick={() => setMode(1)}>{t.m1}</button>
          <button className={mode === 2 ? 'active' : ''} onClick={() => setMode(2)}>{t.m2}</button>
          <button className={mode === 3 ? 'active' : ''} onClick={() => setMode(3)}>{t.m3}</button>
        </div>

        <div className="card">
          {mode === 1 && <SingleCPU t={t} />}
          {mode === 2 && <CompareCPU t={t} />}
          {mode === 3 && <AmdahlLaw t={t} />}
        </div>
      </div>
    </div>
  )
}

function SingleCPU({ t }) {
  const [vals, setVals] = useState({ i: '', cpi: '', ghz: '' });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const calc = () => {
    const i = parseFloat(vals.i);
    const cpi = parseFloat(vals.cpi);
    const ghz = parseFloat(vals.ghz) * 1e9;

    if (i > 0 && cpi > 0 && ghz > 0) {
      setLoading(true); setRes(null);
      setTimeout(() => {
       
        const cycles = i * cpi;
        const time = cycles / ghz;
        const perf = 1 / time;

        setRes({ 
          cycles: cycles.toFixed(6), 
          time: time.toFixed(6), 
          perf: perf.toFixed(6) 
        });
        setLoading(false);
      }, 800);
    } else {
      alert("กรุณากรอกตัวเลขให้ครบก่อนนะครับ!");
    }
  };

  return (
    <div className="form-content">
      <input type="number" placeholder={t.instr} onChange={e => setVals({...vals, i: e.target.value})} />
      <input type="number" placeholder={t.cpi} onChange={e => setVals({...vals, cpi: e.target.value})} />
      <input type="number" placeholder={t.clock} onChange={e => setVals({...vals, ghz: e.target.value})} />
      <button className="calc-button" onClick={calc} disabled={loading}>{loading ? t.loading : t.btn}</button>
      
      {res && (
        <div className="result-card fade-in">
          <p>{t.totalCycles}: <strong>{res.cycles}</strong></p>
          <p>{t.resTime}: <strong>{res.time} s</strong></p>
          <p>{t.resPerf}: <strong>{res.perf}</strong></p>
        </div>
      )}
    </div>
  );
}

function CompareCPU({ t }) {
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const compare = () => {
    setLoading(true); setRes(null);
    setTimeout(() => {
      const v1 = parseFloat(t1); 
      const v2 = parseFloat(t2);
      
      if (v1 > 0 && v2 > 0) {
        if (v1 === v2) {
          setRes({ equal: true });
        } else {
          const ratio = v1 > v2 ? (v1/v2) : (v2/v1);
          setRes({ equal: false, win: v1 < v2 ? "CPU 1" : "CPU 2", ratio: ratio.toFixed(2) });
        }
      } else {
        alert("กรุณากรอกเวลาให้ครบทั้ง 2 เครื่องนะครับ!");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="form-content">
      <input type="number" placeholder={t.cpu1} onChange={e => setT1(e.target.value)} />
      <input type="number" placeholder={t.cpu2} onChange={e => setT2(e.target.value)} />
      <button className="calc-button" onClick={compare} disabled={loading}>
        {loading ? t.loading : t.compareBtn}
      </button>
      {res && (
        <div className="result-card fade-in">
          {res.equal 
            ? <strong style={{color: '#3b82f6'}}>{t.equal}</strong>
            : <span>{t.winner} <strong>{res.win}</strong> ({res.ratio} {t.times})</span>
          }
        </div>
      )}
    </div>
  );
}

function AmdahlLaw({ t }) {
  const [vals, setVals] = useState({ f: '', s: '' });
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const calc = () => {
    setLoading(true); setRes(null);
    setTimeout(() => {
      const f = parseFloat(vals.f)/100; const s = parseFloat(vals.s);
      if (f && s) setRes((1 / ((1 - f) + (f / s))).toFixed(2));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="form-content">
      <input type="number" placeholder={t.portion} onChange={e => setVals({...vals, f: e.target.value})} />
      <input type="number" placeholder={t.speedup} onChange={e => setVals({...vals, s: e.target.value})} />
      <button className="calc-button" onClick={calc} disabled={loading}>{loading ? t.loading : t.btn}</button>
      {res && <div className="result-card fade-in">{t.speedup}: <strong>{res} {t.times}</strong></div>}
    </div>
  );
}

export default App