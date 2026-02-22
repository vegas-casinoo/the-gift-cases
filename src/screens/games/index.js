export function renderGames() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <div class="card">
      <h3>Dice</h3>
      <button class="button">Открыть</button>
    </div>

    <div class="card">
      <h3>Рулетка</h3>
      <button class="button">Открыть</button>
    </div>

    <div class="card">
      <h3>Камень ножницы бумага</h3>
      <button class="button">Открыть</button>
    </div>

    <div class="card">
      <h3>Орёл или решка</h3>
      <button class="button">Открыть</button>
    </div>

    <div class="card">
      <h3>Мины</h3>
      <button class="button">Открыть</button>
    </div>

    <div class="card">
      <h3>Краш</h3>
      <button class="button">Открыть</button>
    </div>
  `;
}