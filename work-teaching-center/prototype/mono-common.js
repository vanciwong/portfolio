/* 教学中心 · 单色高保真原型  公共脚本
   页面在 <body data-page="..."> 声明当前页，左轨自动高亮 */

const NAV = [
  { id:"lesson",  label:"课节安排",   href:"hi-fi-lesson-plan.html", icon:'<rect x="2.5" y="3.5" width="13" height="11" rx="1.5"/><path d="M2.5 7h13M6.5 10h5"/>' },
  { id:"task",    label:"预习&任务",  href:"mono-pre-task.html",    icon:'<path d="M4 3.5h10v11H4z" stroke-linejoin="round"/><path d="M7 6.5h4M7 9h4M7 11.5h2"/>' },
  { id:"classes", label:"教学班",     href:"mono-classes.html",     icon:'<circle cx="6.5" cy="6" r="2.2"/><path d="M3 14.5c0-2 1.6-3.6 3.5-3.6s3.5 1.6 3.5 3.6"/><path d="M11.5 5a2.2 2.2 0 0 1 0 4.4"/>' },
  { id:"records", label:"开课记录",   href:"mono-records.html",     icon:'<circle cx="9" cy="9" r="6"/><path d="M9 5.5V9l2.3 1.4"/>' },
  { id:"stats",   label:"学情统计",   href:"mono-analytics.html",   icon:'<path d="M3 13.5V9M7 13.5V6M11 13.5V8M15 13.5V4"/>' },
  { id:"scores",  label:"平时分管理", href:"mono-scores.html",      icon:'<path d="M9 2.5 15 5.5v7L9 15.5 3 12.5v-7z" stroke-linejoin="round"/><path d="M9 8.5v3.5"/>' },
  { id:"course",  label:"课程管理",   href:"mono-course-info.html", icon:'<circle cx="9" cy="9" r="2.2"/><path d="M9 2.5v1.8M9 13.7v1.8M2.5 9h1.8M13.7 9h1.8M4.4 4.4l1.3 1.3M12.3 12.3l1.3 1.3M13.6 4.4l-1.3 1.3M5.7 12.3l-1.3 1.3"/>' }
];

(function initRail(){
  const rail = document.getElementById('railNav');
  if(!rail) return;
  const cur = document.body.dataset.page || '';
  rail.innerHTML = NAV.map(n=>`
    <a href="${n.href}" class="${n.id===cur?'active':''}">
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5">${n.icon}</svg>
      ${n.label}
    </a>`).join('');
})();

/* 分段切换 */
document.querySelectorAll('.seg span').forEach(s=>s.addEventListener('click',()=>{
  document.querySelectorAll('.seg span').forEach(x=>x.classList.remove('on'));
  s.classList.add('on');
}));

/* 列表项高亮（可选） */
document.querySelectorAll('.item-row').forEach(el=>el.addEventListener('click',e=>{
  if(e.target.closest('.more')||e.target.closest('.act-menu')) return;
  document.querySelectorAll('.item-row').forEach(x=>x.classList.remove('hl'));
  el.classList.add('hl');
}));

/* 更多菜单切换 */
document.querySelectorAll('.more').forEach(m=>m.addEventListener('click',e=>{
  e.stopPropagation();
  const open = m.parentElement.querySelector('.act-menu');
  document.querySelectorAll('.act-menu').forEach(x=>{ if(x!==open) x.remove(); });
  if(open){ open.remove(); return; }
  const box = document.createElement('div');
  box.className = 'act-menu';
  box.innerHTML = `<div><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="10" height="10" rx="1.5"/><path d="M5.5 6.5h5M5.5 9h5"/></svg>编辑</div>
                   <div><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 4.5h8M6 4.5V3h4v1.5M5 4.5l.5 8h5l.5-8"/></svg>删除</div>`;
  m.parentElement.appendChild(box);
}));
document.addEventListener('click',()=>document.querySelectorAll('.act-menu').forEach(x=>x.remove()));

/* 画布缩放 */
let fit = true;
const canvas = document.getElementById('canvas');
function applyScale(){
  const s = fit ? Math.min(1, document.getElementById('viewport').clientWidth/1920) : 1;
  canvas.style.transform = `scale(${s})`;
  canvas.style.marginBottom = fit ? `-${canvas.offsetHeight*(1-s)}px` : '0';
  document.getElementById('zoomBtn').textContent = fit ? '1:1' : '适应窗口';
}
document.getElementById('zoomBtn').addEventListener('click',()=>{fit=!fit;applyScale();});
window.addEventListener('resize',applyScale);
applyScale();
if(location.hash.indexOf('shot')>=0) document.body.classList.add('shot');
