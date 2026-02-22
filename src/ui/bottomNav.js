export function renderBottomNav() {
  const nav = document.getElementById("bottomNav");

  nav.innerHTML = `
    <div style="display:flex; justify-content:space-around; padding:12px; background:#111;">
      <a href="#/home">🏠</a>
      <a href="#/games">🎮</a>
      <a href="#/rating">🏆</a>
      <a href="#/profile">👤</a>
    </div>
  `;
}