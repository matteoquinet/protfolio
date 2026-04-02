// Theme toggle (persist in localStorage)
  const body = document.body;
  const btnDark = document.getElementById('btn-dark');
  const btnLight = document.getElementById('btn-light');
  const initTheme = localStorage.getItem('mq_theme') || 'dark';
  setTheme(initTheme);

  btnDark.addEventListener('click', ()=> setTheme('dark'));
  btnLight.addEventListener('click', ()=> setTheme('light'));

  function setTheme(mode){
    if(mode === 'light'){
      body.classList.remove('theme-dark'); body.classList.add('theme-light');
      btnLight.classList.add('active'); btnDark.classList.remove('active');
      localStorage.setItem('mq_theme','light');
    } else {
      body.classList.remove('theme-light'); body.classList.add('theme-dark');
      btnDark.classList.add('active'); btnLight.classList.remove('active');
      localStorage.setItem('mq_theme','dark');
    }
  }

  // Smooth scrolling helper
  function scrollToSection(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.scrollIntoView({behavior:'smooth',block:'start'});
  };

  // Update active nav based on scroll
  const sections = Array.from(document.querySelectorAll('section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  function updateActive(){
    const scrollPos = window.scrollY + 160;
    let current = sections[0];
    for(const s of sections){ if(s.offsetTop <= scrollPos) current = s; }
    const id = current.getAttribute('id');
    navLinks.forEach(a=>{ a.classList.toggle('active', a.dataset.target === id); });
  }
  window.addEventListener('scroll', updateActive, {passive:true}); updateActive();

  // Project data
  const projects = {
    1: {title:'Site d\'information écologique', tech:'PHP, MySQL, HTML/CSS', body:"Développement complet d'un site d'information sur l'impact écologique de l'informatique", competences:['patrimoine','projet','serviceIT']},
    2: {title:'Site E‑commerce', tech:'PHP, MySQL, HTML/CSS', body:"Développement complet d'un site e‑commerce : catalogue, panier, back‑office et optimisation des performances. Optimisation SEO, cache et tests unitaires.", competences:['patrimoine','projet','serviceIT']},
    3: {title:'Application Portfolio', tech:'HTML, CSS, JavaScript', body:"Portfolio interactif et responsive.", competences:['presenceWeb','support','developpementPro']},
    4: {title:'Simulation de Gestion', tech:'Python, Tkinter', body:"Jeu‑simulation pour s'initier à la gestion d'une organisation, interface simple et sauvegarde locale.", competences:['projet','serviceIT','support']},
    5: {title:'Site de partage de recettes', tech:'PHP, MySQL', body:"Plateforme CRUD pour recettes — ajout, modification, suppression (projet local).", competences:['patrimoine','presenceWeb','projet']}
  };// patrimoine / support / presenceWeb / projet / serviceIT / developpementPro

  function openProject(id){
    const p = projects[id];
    document.getElementById('modal-body').innerHTML = `
      <h2 style=\"color:var(--secondary)\">${p.title}</h2>
      <p class=\"muted\"><strong>Technos :</strong> ${p.tech}</p>
      <div style=\"margin-top:12px\">${p.body}</div>
      <div style=\"margin-top:14px;display:flex;gap:8px\">
        <button class=\"btn btn-outline mono\" onclick=\"closeModal()\">Fermer</button>
      </div>
    `;
    document.getElementById('modal').classList.add('show'); document.getElementById('modal').setAttribute('aria-hidden','false');
  }
  function closeModal(){ document.getElementById('modal').classList.remove('show'); document.getElementById('modal').setAttribute('aria-hidden','true'); }
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

  // See more behaviour (example: expand/clamp removal)
  function seeMore(section){
    if(section === 'projets'){
      document.querySelectorAll('.desc').forEach(d=>{ d.style.webkitLineClamp = 'unset'; d.style.display = 'block'; });
      document.querySelector('.see-more[onclick*="projets"]').textContent = 'Afficher moins';
      // toggle behaviour
      document.querySelector('.see-more[onclick*="projets"]').onclick = ()=>{ document.querySelectorAll('.desc').forEach(d=>{ d.style.webkitLineClamp = '2'; d.style.display = '-webkit-box'; }); document.querySelector('.see-more[onclick*="projets"]').textContent = 'Voir plus'; document.querySelector('.see-more[onclick*="projets"]').onclick = ()=>seeMore('projets'); };
    }
    if(section === 'veille'){
      document.querySelectorAll('.note .summary').forEach(d=>{ d.style.webkitLineClamp = 'unset'; d.style.display = 'block'; });
      document.querySelector('.see-more[onclick*="veille"]').textContent = 'Afficher moins';
      document.querySelector('.see-more[onclick*="veille"]').onclick = ()=>{ document.querySelectorAll('.note .summary').forEach(d=>{ d.style.webkitLineClamp = '3'; d.style.display = '-webkit-box'; }); document.querySelector('.see-more[onclick*="veille"]').textContent = 'Voir plus'; document.querySelector('.see-more[onclick*="veille"]').onclick = ()=>seeMore('veille'); };
    }
  }

  // staggered animations
  document.addEventListener('DOMContentLoaded', ()=>{ document.querySelectorAll('.fade-up').forEach((el,i)=>{ el.style.animation = `fadeUp .6s ${i*60}ms both`; }); });

  // Ajout dynamique des boutons projets dans #competencetech
  function addProjectButtonsToCompetences() {
    const articles = document.querySelectorAll('#competencetech article');
    articles.forEach(article => {
      // On récupère l'id de compétence directement sur l'article
      const compKey = article.id;
      if (!compKey) return;
      // Chercher les projets qui ont cette compétence
      Object.entries(projects).forEach(([id, proj]) => {
        if (proj.competences && proj.competences.includes(compKey)) {
          const btn = document.createElement('button');
          btn.className = 'btn btn-outline mono';
          btn.textContent = proj.title;
          btn.onclick = () => openProject(id);
          btn.style.marginLeft = '8px';
          article.appendChild(btn);
        }
      });
    });
  }
  document.addEventListener('DOMContentLoaded', addProjectButtonsToCompetences);

