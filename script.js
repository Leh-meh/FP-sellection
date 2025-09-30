// script.js (versão robusta: aceita "active" ou "item-active")
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const container = document.querySelector('.container');
if (!container) throw new Error('Container .container não encontrado no HTML');
const list = container.querySelector('.list');
if (!list) throw new Error('Lista .list não encontrada dentro do container');

const items = Array.from(list.querySelectorAll('.item, .item-active'));
const indicators = document.querySelector('.indicators');
const dots = indicators ? Array.from(indicators.querySelectorAll('ul li')) : [];

let active = 0;
const firstPosition = 0;
const lastPosition = items.length - 1;

// Helpers seguros (removem/adicionam ambas classes, caso você use uma ou outra)
function safeRemoveActive(node) {
  if (!node) return;
  node.classList.remove('active');
  node.classList.remove('item-active');
}
function safeAddActive(node) {
  if (!node) return;
  node.classList.add('active');
  node.classList.add('item-active');
}

function updateIndicators() {
  if (!indicators) return;
  const lis = Array.from(indicators.querySelectorAll('ul li'));
  lis.forEach(li => li.classList.remove('active'));
  if (dots[active]) dots[active].classList.add('active');
  const num = indicators.querySelector('.number');
  if (num) num.textContent = '0' + (active + 1);
}

function setSlider() {
  // remove o "ativo" antigo (tanto .active quanto .item-active)
  const itemOld = list.querySelector('.item.active, .item.item-active');
  safeRemoveActive(itemOld);
  // atualiza indicadores e número
  updateIndicators();
}

// Inicialização: se já existir um slide ativo no HTML, usa ele; se não, marca o primeiro
(function init() {
  const existing = list.querySelector('.item.active, .item.item-active');
  if (existing) {
    const idx = items.indexOf(existing);
    active = idx >= 0 ? idx : 0;
  } else {
    safeAddActive(items[0]);
    active = 0;
  }
  updateIndicators();
})();

// Eventos
if (nextButton) {
  nextButton.addEventListener('click', () => {
    // controla a direção da animação via variável CSS
    list.style.setProperty('--calculation', -1);
    active = active + 1 > lastPosition ? 0 : active + 1;
    setSlider();
    safeAddActive(items[active]);
  });
} else {
  console.warn('#next não encontrado');
}

if (prevButton) {
  prevButton.addEventListener('click', () => {
    list.style.setProperty('--calculation', 1);
    active = active - 1 < firstPosition ? lastPosition : active - 1;
    setSlider();
    safeAddActive(items[active]);
  });
} else {
  console.warn('#prev não encontrado');
}
