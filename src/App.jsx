import { useState } from "react";
import "./App.css";

function App() {

const [theme,setTheme]=useState("dark")
const [lang,setLang]=useState("EN")
const [mode,setMode]=useState(1)

const t={

EN:{
title:"CPU Performance Analyzer",

single:"Single CPU",
compare:"Compare CPUs",
amdahl:"Amdahl Law",
mips:"MIPS Calculator",
mix:"Instruction Mix",
rank:"CPU Ranking",
sim:"Performance Simulator",
pipe:"Pipeline Simulator",

instr:"Instruction Count",
cpi:"CPI",
clock:"Clock Rate (GHz)",

calc:"Calculate",

cpu1:"CPU 1 Time",
cpu2:"CPU 2 Time",

portion:"Optimized %",
speed:"Speedup",

alu:"ALU instructions",
mem:"Memory instructions",
branch:"Branch instructions",

name:"CPU Name",
time:"Execution Time",

add:"Add CPU",

old:"Old CPU Time",
new:"New CPU Time",

next:"Next Cycle",

lang:"TH"
},

TH:{
title:"เครื่องมือวิเคราะห์ประสิทธิภาพ CPU",

single:"วิเคราะห์ CPU",
compare:"เปรียบเทียบ CPU",
amdahl:"กฎของ Amdahl",
mips:"คำนวณ MIPS",
mix:"วิเคราะห์ CPI",
rank:"จัดอันดับ CPU",
sim:"จำลองประสิทธิภาพ",
pipe:"จำลอง Pipeline",

instr:"จำนวนคำสั่ง",
cpi:"ค่า CPI",
clock:"ความถี่ (GHz)",

calc:"คำนวณ",

cpu1:"เวลา CPU 1",
cpu2:"เวลา CPU 2",

portion:"ส่วนที่ปรับปรุง %",
speed:"ความเร็ว",

alu:"คำสั่ง ALU",
mem:"คำสั่ง Memory",
branch:"คำสั่ง Branch",

name:"ชื่อ CPU",
time:"เวลา",

add:"เพิ่ม CPU",

old:"เวลาเดิม",
new:"เวลาใหม่",

next:"รอบถัดไป",

lang:"EN"
}

}[lang]

return(

<div className={`app-wrapper ${theme}`}>

<div className="top-settings">

<button
className="settings-btn"
onClick={()=>setLang(lang==="EN"?"TH":"EN")}
>
{t.lang}
</button>

<button
className="settings-btn"
onClick={()=>setTheme(theme==="dark"?"light":"dark")}
>
{theme==="dark"?"☀️":"🌙"}
</button>

</div>

<div className="container">

<h1>{t.title}</h1>

<div className="menu-buttons">

<button onClick={()=>setMode(1)} className={mode===1?'active':''}>{t.single}</button>
<button onClick={()=>setMode(2)} className={mode===2?'active':''}>{t.compare}</button>
<button onClick={()=>setMode(3)} className={mode===3?'active':''}>{t.amdahl}</button>
<button onClick={()=>setMode(4)} className={mode===4?'active':''}>{t.mips}</button>
<button onClick={()=>setMode(5)} className={mode===5?'active':''}>{t.mix}</button>
<button onClick={()=>setMode(6)} className={mode===6?'active':''}>{t.rank}</button>
<button onClick={()=>setMode(7)} className={mode===7?'active':''}>{t.sim}</button>
<button onClick={()=>setMode(8)} className={mode===8?'active':''}>{t.pipe}</button>

</div>

<div className="card">

{mode===1 && <SingleCPU t={t}/>}
{mode===2 && <CompareCPU t={t}/>}
{mode===3 && <AmdahlLaw t={t}/>}
{mode===7 && <PerformanceSimulator t={t}/>}
{mode===8 && <PipelineSimulator t={t}/>}

</div>

</div>

</div>

)

}

function SingleCPU({t}){

const [vals,setVals]=useState({i:'',cpi:'',ghz:''})
const [res,setRes]=useState(null)

const calc=()=>{

const i=parseFloat(vals.i)
const cpi=parseFloat(vals.cpi)
const ghz=parseFloat(vals.ghz)*1e9

const cycles=i*cpi
const time=cycles/ghz

setRes({cycles,time})

}

return(

<div className="form-content">

<input placeholder={t.instr} onChange={e=>setVals({...vals,i:e.target.value})}/>
<input placeholder={t.cpi} onChange={e=>setVals({...vals,cpi:e.target.value})}/>
<input placeholder={t.clock} onChange={e=>setVals({...vals,ghz:e.target.value})}/>

<button className="calc-button" onClick={calc}>
{t.calc}
</button>

{res &&
<div className="result-card">

<p>Cycles: {res.cycles}</p>
<p>CPU Time: {res.time}</p>

</div>
}

</div>

)

}

function CompareCPU({t}){

const [t1,setT1]=useState("")
const [t2,setT2]=useState("")
const [res,setRes]=useState(null)

const calc=()=>{

const v1=parseFloat(t1)
const v2=parseFloat(t2)

const ratio=(v1>v2?v1/v2:v2/v1).toFixed(2)

setRes(`${v1<v2?"CPU1":"CPU2"} faster ${ratio}x`)

}

return(

<div className="form-content">

<input placeholder={t.cpu1} onChange={e=>setT1(e.target.value)}/>
<input placeholder={t.cpu2} onChange={e=>setT2(e.target.value)}/>

<button className="calc-button" onClick={calc}>
{t.calc}
</button>

{res && <div className="result-card">{res}</div>}

</div>

)

}

function AmdahlLaw({t}){

const [vals,setVals]=useState({f:'',s:''})
const [res,setRes]=useState(null)

const calc=()=>{

const f=parseFloat(vals.f)/100
const s=parseFloat(vals.s)

const speed=1/((1-f)+(f/s))

setRes(speed.toFixed(2))

}

return(

<div className="form-content">

<input placeholder={t.portion} onChange={e=>setVals({...vals,f:e.target.value})}/>
<input placeholder={t.speed} onChange={e=>setVals({...vals,s:e.target.value})}/>

<button className="calc-button" onClick={calc}>
{t.calc}
</button>

{res && <div className="result-card">Speedup: {res}x</div>}

</div>

)

}

function PerformanceSimulator({t}){

const [oldTime,setOld]=useState("")
const [newTime,setNew]=useState("")
const [res,setRes]=useState(null)

const calc=()=>{

const oldT=parseFloat(oldTime)
const newT=parseFloat(newTime)

if(!oldT||!newT)return

const speed=oldT/newT

setRes(speed.toFixed(2))

}

return(

<div className="form-content">

<input placeholder={t.old} onChange={e=>setOld(e.target.value)}/>
<input placeholder={t.new} onChange={e=>setNew(e.target.value)}/>

<button className="calc-button" onClick={calc}>
{t.calc}
</button>

{res &&
<div className="result-card">
Speedup: {res}x
</div>
}

</div>

)

}

function PipelineSimulator({t}){

const stages=["IF","ID","EX","MEM","WB"]

const instructions=["ADD","SUB","LW","SW"]

const [cycle,setCycle]=useState(0)

return(

<div>

<button className="calc-button" onClick={()=>setCycle(cycle+1)}>
{t.next}
</button>

<table>

<thead>
<tr>
<th>Instruction</th>
{stages.map(s=><th key={s}>{s}</th>)}
</tr>
</thead>

<tbody>

{instructions.map((ins,i)=>(

<tr key={i}>

<td>{ins}</td>

{stages.map((s,j)=>{

const active=cycle===i+j

return(
<td key={j} className={active?"pipeline-active":""}>
{active?"●":""}
</td>
)

})}

</tr>

))}

</tbody>

</table>

</div>

)

}

export default App