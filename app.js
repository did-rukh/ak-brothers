const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');}
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
nav?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
window.matchMedia('(min-width: 1001px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const currentPath=location.pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';
nav?.querySelectorAll('a').forEach(link=>{const linkPath=new URL(link.href).pathname.replace(/index\.html$/,'').replace(/\/$/,'')||'/';if(currentPath===linkPath||(linkPath!=='/'&&currentPath.startsWith(linkPath+'/')))link.setAttribute('aria-current','page');});
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');toggle.focus();}});
const search=document.querySelector('#product-search');
let category='all';
function filterProducts(){let count=0;document.querySelectorAll('.catalog-grid .product-card').forEach(card=>{const show=(category==='all'||card.dataset.category===category)&&card.dataset.search.toLowerCase().includes((search?.value||'').toLowerCase().trim());card.hidden=!show;if(show)count++;});const status=document.querySelector('#result-count');if(status)status.textContent=`${count} product categories shown`;const empty=document.querySelector('#no-results');if(empty)empty.hidden=count>0;}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterProducts();}));
search?.addEventListener('input',filterProducts);
if(search)filterProducts();
const branchSelect=document.querySelector('#branch-city');
branchSelect?.addEventListener('change',()=>document.querySelectorAll('[data-city]').forEach(card=>{card.hidden=branchSelect.value!=='all'&&card.dataset.city!==branchSelect.value;}));
const form=document.querySelector('#enquiry-form');
if(form){const params=new URLSearchParams(location.search);const product=params.get('product');const select=form.querySelector('[name="product"]');if(product&&[...select.options].some(o=>o.value===product))select.value=product;if(params.has('branch'))form.elements.location.value=params.get('branch');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const f=new FormData(form);const message=['Hello A K Brothers, I would like help with my requirement.',f.get('name')?.trim()?`Name: ${f.get('name').trim()}`:'',`Location: ${f.get('location').trim()}`,`Requirement: ${f.get('product')}`,`Application: ${f.get('application')}`,f.get('details')?.trim()?`Details: ${f.get('details').trim()}`:'','Please help me with suitable options, availability and a quotation.'].filter(Boolean).join('\n');document.querySelector('#prepared-message').value=message;document.querySelector('#whatsapp-send').href='https://wa.me/919072633733?text='+encodeURIComponent(message);const preview=document.querySelector('#message-preview');preview.hidden=false;preview.focus();});}

// The product highlights change only when a visitor selects one.
const highlights={
  pumps:{title:'Water pumps',kicker:'EVERYDAY WATER. EXTRAORDINARY POSSIBILITIES.',href:'/products/monoblock-pumps/index.html'},
  borewell:{title:'Borewell solutions',kicker:'FROM A DEEPER SOURCE TO YOUR NEXT CHAPTER.',href:'/borewell-services/index.html'},
  motors:{title:'Electric & industrial motors',kicker:'THE POWER BEHIND YOUR NEXT PROJECT.',href:'/products/industrial-motors/index.html'}
};
const highlightButtons=[...document.querySelectorAll('[data-showcase]')];
function showHighlight(key){const data=highlights[key];if(!data)return;document.querySelectorAll('[data-panel]').forEach(panel=>{panel.hidden=panel.dataset.panel!==key;});highlightButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.showcase===key)));document.querySelector('#showcase-title').textContent=data.title;document.querySelector('#showcase-kicker').textContent=data.kicker;document.querySelector('#showcase-link').href=data.href;}
highlightButtons.forEach((button,index)=>{button.addEventListener('click',()=>showHighlight(button.dataset.showcase));button.addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft'].includes(event.key))return;event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:-1)+highlightButtons.length)%highlightButtons.length;highlightButtons[next].focus();showHighlight(highlightButtons[next].dataset.showcase);});});

const motionButton=document.querySelector('.motion-toggle');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused=false;
function updateMotion(){const paused=manuallyPaused||reducedMotion.matches;document.documentElement.classList.toggle('motion-paused',paused);if(motionButton){motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Resume website animations':'Pause website animations');motionButton.title=reducedMotion.matches?'Reduced motion is enabled in your device preferences':(paused?'Resume website animations':'Pause website animations');motionButton.querySelector('[aria-hidden]').textContent=paused?'▶':'Ⅱ';motionButton.querySelector('.motion-label').textContent=paused?'Resume motion':'Pause motion';motionButton.disabled=reducedMotion.matches;}}
motionButton?.addEventListener('click',()=>{manuallyPaused=!manuallyPaused;updateMotion();});
reducedMotion.addEventListener('change',updateMotion);updateMotion();
if('IntersectionObserver' in window&&!reducedMotion.matches){const entranceObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-revealed');entranceObserver.unobserve(entry.target);}}},{threshold:.12});document.querySelectorAll('.section-heading,.path-card,.product-card,.branch-card,.blue-service-copy,.service-art,.flow-statement>h2,.page-intro,.detail-info,.steps-grid article').forEach(node=>entranceObserver.observe(node));}
const progress=document.querySelector('.reading-progress');
let scrollPending=false;
function updateProgress(){const total=document.documentElement.scrollHeight-innerHeight;const ratio=total>0?Math.min(1,Math.max(0,scrollY/total)):0;if(progress)progress.style.transform=`scaleX(${ratio})`;scrollPending=false;}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);updateProgress();
