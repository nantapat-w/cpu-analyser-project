import { useState } from 'react'
import './App.css'

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend
} from 'chart.js'

import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend
)

function App(){

const [lang,setLang]=useState("EN")
const [theme,setTheme]=useState("dark")
const [mode,setMode]=useState(1)

const t={

EN:{
title:"CPU Performance Analyzer",

m1:"Single CPU",
m2:"Compare CPUs",
m3:"Amdahl Law",
m4:"MIPS Calculator",
m5:"Instruction Mix",
m6:"CPU Ranking",
m7:"Performance Simulator",
m8:"Pipeline Simulator",

instr:"Instruction Count",
cpi:"CPI",
clock:"Clock Rate (GHz)",

cpu1:"CPU1 Time",
cpu2:"CPU2 Time",

portion:"Optimized Portion %",
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

m1:"วิเคราะห์ CPU",
m2:"เปรียบเทียบ CPU",
m3:"กฎของ Amdahl",
m4:"คำนวณ MIPS",
m5:"วิเคราะห์ CPI",
m6:"จัดอันดับ CPU",
m7:"จำลองประสิทธิภาพ",
m8:"จำลอง Pipeline",

instr:"จำนวนคำสั่ง",
cpi:"ค่า CPI",
clock:"ความถี่ (GHz)",

cpu1:"เวลา CPU1",
cpu2:"เวลา CPU2",

portion:"ส่วนที่ปรับปรุง %",
speed:"ความเร็วที่เพิ่ม",

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

<button onClick={()=>setMode(1)} className={mode===1?'active':''}>{t.m1}</button>
<button onClick={()=>setMode(2)} className={mode===2?'active':''}>{t.m2}</button>
<button onClick={()=>setMode(3)} className={mode===3?'active':''}>{t.m3}</button>
<button onClick={()=>setMode(4)} className={mode===4?'active':''}>{t.m4}</button>
<button onClick={()=>setMode(5)} className={mode===5?'active':''}>{t.m5}</button>
<button onClick={()=>setMode(6)} className={mode===6?'active':''}>{t.m6}</button>
<button onClick={()=>setMode(7)} className={mode===7?'active':''}>{t.m7}</button>
<button onClick={()=>setMode(8)} className={mode===8?'active':''}>{t.m8}</button>

</div>

<div className="card">

{mode===1 && <SingleCPU t={t}/>}
{mode===2 && <CompareCPU t={t}/>}
{mode===3 && <AmdahlLaw t={t}/>}
{mode===4 && <MIPSCalculator t={t}/>}
{mode===5 && <CPIAnalyzer t={t}/>}
{mode===6 && <CPURanking t={t}/>}
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

const chartData=res && {

labels:["Cycles","CPU Time"],

datasets:[{

data:[res.cycles,res.time],
backgroundColor:["#3b82f6","#22c55e"]

}]

}

return(

<div className="form-content">

<input placeholder={t.instr} type="number"
onChange={e=>setVals({...vals,i:e.target.value})}/>

<input placeholder={t.cpi} type="number"
onChange={e=>setVals({...vals,cpi:e.target.value})}/>

<input placeholder={t.clock} type="number"
onChange={e=>setVals({...vals,ghz:e.target.value})}/>

<button className="calc-button" onClick={calc}>
Calculate
</button>

{res &&

<div className="result-card">

<p>Cycles: {res.cycles.toFixed(2)}</p>
<p>CPU Time: {res.time.toFixed(6)}</p>

<Bar data={chartData}/>

</div>

}

</div>

)

}

function CompareCPU({t}){

const [t1,setT1]=useState('')
const [t2,setT2]=useState('')
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
Calculate
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

<input placeholder={t.portion}
onChange={e=>setVals({...vals,f:e.target.value})}/>

<input placeholder={t.speed}
onChange={e=>setVals({...vals,s:e.target.value})}/>

<button className="calc-button" onClick={calc}>
Calculate
</button>

{res && <div className="result-card">Speedup: {res}x</div>}

</div>

)

}

function MIPSCalculator({t}){

const [vals,setVals]=useState({cpi:'',ghz:''})
const [res,setRes]=useState(null)

const calc=()=>{

const cpi=parseFloat(vals.cpi)
const ghz=parseFloat(vals.ghz)

const mips=(ghz*1000)/cpi

setRes(mips.toFixed(2))

}

return(

<div className="form-content">

<input placeholder={t.cpi}
onChange={e=>setVals({...vals,cpi:e.target.value})}/>

<input placeholder={t.clock}
onChange={e=>setVals({...vals,ghz:e.target.value})}/>

<button className="calc-button" onClick={calc}>
Calculate
</button>

{res && <div className="result-card">MIPS: {res}</div>}

</div>

)

}

function CPIAnalyzer({t}){

const [vals,setVals]=useState({a:'',b:'',c:''})
const [res,setRes]=useState(null)

const calc=()=>{

const a=parseFloat(vals.a)
const b=parseFloat(vals.b)
const c=parseFloat(vals.c)

const data={
labels:["ALU","Memory","Branch"],
datasets:[{
data:[a,b,c],
backgroundColor:["#3b82f6","#22c55e","#f97316"]
}]
}

setRes(data)

}

return(

<div className="form-content">

<input placeholder={t.alu} onChange={e=>setVals({...vals,a:e.target.value})}/>
<input placeholder={t.mem} onChange={e=>setVals({...vals,b:e.target.value})}/>
<input placeholder={t.branch} onChange={e=>setVals({...vals,c:e.target.value})}/>

<button className="calc-button" onClick={calc}>
Calculate
</button>

{res &&
<div className="result-card">

<Pie data={res}/>

</div>
}

</div>

)

}

function CPURanking({t}){

const [cpus,setCpus]=useState([])
const [name,setName]=useState('')
const [time,setTime]=useState('')

const add=()=>{

setCpus([...cpus,{name,time:parseFloat(time)}])

}

const sorted=[...cpus].sort((a,b)=>a.time-b.time)

return(

<div className="form-content">

<input placeholder={t.name} onChange={e=>setName(e.target.value)}/>
<input placeholder={t.time} onChange={e=>setTime(e.target.value)}/>

<button className="calc-button" onClick={add}>
{t.add}
</button>

<div className="result-card">

{sorted.map((c,i)=>(
<p key={i}>{i+1}. {c.name} - {c.time}s</p>
))}

</div>

</div>

)

}

function PerformanceSimulator({t}){

const [oldTime,setOld]=useState('')
const [newTime,setNew]=useState('')
const [res,setRes]=useState(null)

const calc=()=>{

const speed=oldTime/newTime

setRes(speed.toFixed(2))

}

return(

<div className="form-content">

<input placeholder={t.old} onChange={e=>setOld(e.target.value)}/>
<input placeholder={t.new} onChange={e=>setNew(e.target.value)}/>

<button className="calc-button" onClick={calc}>
Calculate
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

const [instructions,setInstructions]=useState([
["ADD"],
["SUB"],
["LW"],
["SW"]
])

const [cycle,setCycle]=useState(0)

const nextCycle=()=>{
setCycle(cycle+1)
}

return(

<div>

<button className="calc-button" onClick={nextCycle}>
{t.next}
</button>

<div className="result-card">

<table style={{width:"100%",textAlign:"center"}}>

<thead>
<tr>
<th>Instruction</th>
{stages.map(s=><th key={s}>{s}</th>)}
</tr>
</thead>

<tbody>

{instructions.map((ins,i)=>{

return(

<tr key={i}>

<td>{ins}</td>

{stages.map((s,j)=>{

const active=cycle===i+j

return(
<td key={j} style={{background:active?"#3b82f6":""}}>
{active?"●":""}
</td>
)

})}

</tr>

)

})}

</tbody>

</table>

</div>

</div>

)

}

export default App