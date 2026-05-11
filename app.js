/**
 * app.js — Лаунчер игр с поддержкой нового дизайна
 * Полностью русифицирован и оптимизирован
 */

const GAS_API_URL = "https://script.google.com/macros/s/AKfycbx0o9HmRIF6vNuBUB2N4H3YuabJzYbRmAxvHCCwqnbMPn29Crv5W3FT1XGDF6VyFSn9/exec";
let currentGameScript = null;

async function initializeApp() {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.backgroundColor = "#f8f9ff";
    window.Telegram.WebApp.headerColor = "#f8f9ff";
  }

  const menu = document.getElementById("menu-container");
  const loader = document.getElementById("main-loader");

  try {
    // Симуляция или реальный запрос к API для синхронизации
    // Здесь мы просто открываем меню для демонстрации дизайна
    setTimeout(() => {
      if (loader) loader.classList.add("hidden");
      if (menu) menu.classList.remove("hidden");
      renderUserProfile();
    }, 800);
  } catch (e) {
    console.error("Ошибка инициализации:", e);
    if (loader) loader.remove();
    if (menu) menu.classList.remove("hidden");
  }
}

function renderUserProfile() {
  const profile = document.getElementById("user-profile");
  if (!profile) return;
  
  const user = getTelegramUser();
  profile.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px; background: white; padding: 8px 16px; border-radius: 100px; box-shadow: var(--shadow-app);">
      <div style="width: 32px; height: 32px; background: var(--accent-color); border-radius: 50%; display: grid; place-items: center; font-weight: 800; color: var(--accent-active);">
        ${user.username[0].toUpperCase()}
      </div>
      <span style="font-weight: 700; font-size: 0.9rem;">${user.username}</span>
    </div>
  `;
}

function getTelegramUser() {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return {
      id: window.Telegram.WebApp.initDataUnsafe.user.id,
      username: window.Telegram.WebApp.initDataUnsafe.user.username || "Игрок"
    };
  }
  return { id: "0", username: "Гость" };
}

function showGame(gameName) {
  const container = document.getElementById("game-container");
  const menu = document.getElementById("menu-container");

  if (menu) menu.classList.add("hidden");
  if (container) {
    container.innerHTML = `
      <div class="fade-in" style="text-align: center; padding: 4rem 0;">
        <div style="width: 40px; height: 40px; border: 3px solid var(--accent-color); border-top-color: var(--accent-active); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1.5rem;"></div>
        <p style="font-weight: 700; color: var(--accent-active);">Загрузка игровых модулей...</p>
      </div>
    `;
  }

  // Здесь логика загрузки скриптов игр
  console.log(`Запуск игры: ${gameName}`);
  
  // Кнопка возврата (для демонстрации)
  setTimeout(() => {
    container.innerHTML = `
      <div class="card fade-in">
        <h2 style="margin-bottom: 1rem; color: var(--accent-active);">Экран игры: ${gameName}</h2>
        <p style="margin-bottom: 2rem; color: #64748b;">Здесь будет интерфейс игры, переработанный в стиле Premium Soft Spiritual.</p>
        <button onclick="goToMainMenu()" class="start-button" style="padding: 12px 24px;">⬅️ Вернуться в меню</button>
      </div>
    `;
  }, 500);
}

function goToMainMenu() {
  const container = document.getElementById("game-container");
  const menu = document.getElementById("menu-container");
  if (container) container.innerHTML = "";
  if (menu) menu.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", initializeApp);
