/* ================================================
   SCRIPT.JS — Portfólio João Pedro
   ================================================ */

/* ------------------------------------------------
   1. ANO DINÂMICO NO FOOTER
   ------------------------------------------------ */
document.getElementById('anoAtual').textContent = new Date().getFullYear();

/* ------------------------------------------------
   2. NAVBAR — scroll + link ativo
   ------------------------------------------------ */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  let currentSection = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) currentSection = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ------------------------------------------------
   3. MENU HAMBÚRGUER (mobile)
   ------------------------------------------------ */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
  const isOpen = navLinksEl.classList.contains('open');
  hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* ------------------------------------------------
   4. PARTÍCULAS DO HERO
   ------------------------------------------------ */
(function criarParticulas() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 22; i++) {
    const span = document.createElement('span');
    const size  = Math.random() * 5 + 3;
    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const dur   = (Math.random() * 5 + 4).toFixed(1);
    const delay = (Math.random() * 4).toFixed(1);

    span.style.cssText = `
      width:${size}px;height:${size}px;
      left:${left}%;top:${top}%;
      opacity:${(Math.random() * 0.5 + 0.15).toFixed(2)};
      --dur:${dur}s;--delay:${delay}s;
    `;
    container.appendChild(span);
  }
})();

/* ------------------------------------------------
   5. SCROLL SUAVE COM OFFSET DA NAVBAR
   ------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const alvo = document.querySelector(this.getAttribute('href'));
    if (!alvo) return;
    e.preventDefault();
    const offsetTop = alvo.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

/* ------------------------------------------------
   6. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ------------------------------------------------ */
const form        = document.getElementById('contatoForm');
const btnEnviar   = document.getElementById('btnEnviar');
const btnSpinner  = document.getElementById('btnSpinner');
const formSuccess = document.getElementById('formSuccess');

function mostrarErro(input, errEl, msg) {
  input.classList.add('invalid');
  errEl.textContent = msg;
}

function limparErro(input, errEl) {
  input.classList.remove('invalid');
  errEl.textContent = '';
}

function emailValido(email) {
  const partes = email.split('@');
  return partes.length === 2 && partes[1].includes('.');
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nomeInput    = document.getElementById('nome');
  const emailInput   = document.getElementById('email');
  const msgInput     = document.getElementById('mensagem');
  const erroNome     = document.getElementById('erroNome');
  const erroEmail    = document.getElementById('erroEmail');
  const erroMensagem = document.getElementById('erroMensagem');

  limparErro(nomeInput,  erroNome);
  limparErro(emailInput, erroEmail);
  limparErro(msgInput,   erroMensagem);
  formSuccess.style.display = 'none';

  const nome     = nomeInput.value.trim();
  const email    = emailInput.value.trim();
  const mensagem = msgInput.value.trim();
  let valido = true;

  if (!nome) {
    mostrarErro(nomeInput, erroNome, 'Por favor, informe seu nome.');
    valido = false;
  }

  if (!email) {
    mostrarErro(emailInput, erroEmail, 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!emailValido(email)) {
    mostrarErro(emailInput, erroEmail, 'Informe um e-mail válido (ex: nome@dominio.com).');
    valido = false;
  }

  if (!mensagem) {
    mostrarErro(msgInput, erroMensagem, 'Por favor, escreva sua mensagem.');
    valido = false;
  } else if (mensagem.length < 10) {
    mostrarErro(msgInput, erroMensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
    valido = false;
  }

  if (!valido) return;

  // Simulação de envio
  btnEnviar.disabled = true;
  btnSpinner.style.display = 'block';
  btnEnviar.querySelector('.btn-text').textContent = 'Enviando...';

  setTimeout(() => {
    btnEnviar.disabled = false;
    btnSpinner.style.display = 'none';
    btnEnviar.querySelector('.btn-text').textContent = 'Enviar Mensagem';
    form.reset();
    formSuccess.style.display = 'block';

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 6000);
  }, 1800);
});

// Limpa erros em tempo real ao digitar
['nome', 'email', 'mensagem'].forEach(id => {
  const input = document.getElementById(id);
  const key   = 'erro' + id.charAt(0).toUpperCase() + id.slice(1);
  const erro  = document.getElementById(key);
  input.addEventListener('input', () => {
    if (input.value.trim()) limparErro(input, erro);
  });
});