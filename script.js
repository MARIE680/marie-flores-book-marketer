(function(){
"use strict";
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

var menuToggle = document.getElementById('menuToggle');
var mobilePanel = document.getElementById('mobilePanel');
if(menuToggle && mobilePanel){
  menuToggle.addEventListener('click', function(){
    var open = mobilePanel.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true':'false');
  });
  mobilePanel.addEventListener('click', function(e){
    if(e.target.matches('a')){ mobilePanel.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }
  });
}

var auditForm = document.getElementById('auditForm');
if(auditForm){
  auditForm.addEventListener('submit', function(){
    setTimeout(function(){
      var wrap = document.getElementById('auditFormWrap');
      if(wrap){ wrap.innerHTML = '<div class="thankyou"><h2>Thank you.</h2><p>Your request has been received. Marie will review your information and get in touch shortly.</p></div>'; }
    }, 300);
  });
}

var contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', function(){
    setTimeout(function(){
      var grid = contactForm.closest('.about-grid');
      if(grid){ grid.innerHTML = '<div class="thankyou"><h2>Thank you.</h2><p>Your message has been received. Marie will get back to you shortly.</p></div>'; }
    }, 300);
  });
}

var applyForm = document.getElementById('applyForm');
if(applyForm){
  var steps = Array.prototype.slice.call(applyForm.querySelectorAll('.step-fieldset'));
  var current = 0;
  var indicator = document.getElementById('stepIndicator');
  indicator.innerHTML = steps.map(function(){return '<span></span>';}).join('');
  var dots = Array.prototype.slice.call(indicator.children);

  function paint(){
    steps.forEach(function(s,i){ s.classList.toggle('active', i===current); });
    dots.forEach(function(d,i){
      d.classList.toggle('done', i<current);
      d.classList.toggle('current', i===current);
    });
    document.getElementById('apBack').style.visibility = current===0 ? 'hidden' : 'visible';
    document.getElementById('apNext').style.display = current===steps.length-1 ? 'none' : 'inline-block';
    document.getElementById('apSubmit').style.display = current===steps.length-1 ? 'inline-block' : 'none';
  }
  paint();

  document.getElementById('apNext').addEventListener('click', function(){
    var reqs = steps[current].querySelectorAll('[required]');
    for(var i=0;i<reqs.length;i++){
      if(!reqs[i].checkValidity()){ reqs[i].reportValidity(); return; }
    }
    if(current < steps.length-1){ current++; paint(); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  document.getElementById('apBack').addEventListener('click', function(){
    if(current>0){ current--; paint(); window.scrollTo({top:0,behavior:'smooth'}); }
  });
  applyForm.addEventListener('submit', function(){
    setTimeout(function(){
      var wrap = document.getElementById('applyFormWrap');
      if(wrap){ wrap.innerHTML = '<div class="thankyou"><h2>Thank you.</h2><p>Your application will be reviewed and Marie will get in touch shortly.</p></div>'; }
    }, 300);
  });
}
})();
