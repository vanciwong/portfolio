/* 作品 / 理念 / 关于 三个页面共用的轻量脚本：等比缩放、筛选、入场动效 */
(function(){
  var root=document.documentElement;
  function setScale(){ root.style.setProperty('--k', String(Math.min(1, innerWidth/1920))); }
  setScale();
  addEventListener('resize', setScale, {passive:true});

  /* 作品页分类筛选：默认「全部 ALL」，点击后只显示对应 data-cat 的卡片 */
  var filters=[].slice.call(document.querySelectorAll('.filter'));
  if(filters.length){
    var cards=[].slice.call(document.querySelectorAll('.work-grid .card'));
    var count=document.getElementById('workCount');
    filters.forEach(function(btn){
      btn.addEventListener('click',function(){
        var cat=btn.dataset.cat||'all';
        filters.forEach(function(b){ b.classList.toggle('is-active', b===btn); });
        var shown=0;
        cards.forEach(function(card){
          var hit=(cat==='all'||card.dataset.cat===cat);
          card.classList.toggle('is-hidden', !hit);
          if(hit) shown++;
        });
        if(count) count.textContent=String(shown).padStart(2,'0');
      });
    });
  }

  /* 滚动入场：无 IntersectionObserver / 减少动效时直接显示 */
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items=[].slice.call(document.querySelectorAll('[data-reveal]'));
  if(reduce||!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-in'); });
  }else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:.06});
    items.forEach(function(el){ io.observe(el); });
  }
})();
