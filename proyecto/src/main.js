
const iconos = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥝', '🍍'];
const cartas = [...iconos, ...iconos]; // Duplicar

//  aleatoriO
cartas.sort(() => Math.random() - 0.5);

const tablero = document.getElementById('tablero-juego');


let cartasVolteadas = []; // Cartas que están temporalmente descubiertas
let cantidadEmparejadas = 0; // Número de pares encontrados

// Crear las cartas y agregarlas al tablero
cartas.forEach((icono) => {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.icono = icono;
  carta.textContent = ''; // Oculta el contenido al inicio
  tablero.appendChild(carta);

  // Evento al hacer clic en una carta
  carta.addEventListener('click', () => {
    // Si ya está volteada o emparejada, no hacer nada
    if (carta.classList.contains('volteada') || carta.classList.contains('emparejada')) return;

    // Voltear la carta y mostrar el icono
    carta.classList.add('volteada');
    carta.textContent = carta.dataset.icono;
    cartasVolteadas.push(carta);

    // Si hay dos cartas volteadas, comparar
    if (cartasVolteadas.length === 2) {
      const [primera, segunda] = cartasVolteadas;

      if (primera.dataset.icono === segunda.dataset.icono) {
        // Si coinciden, marcar como emparejadas
        primera.classList.add('emparejada');
        segunda.classList.add('emparejada');
        cantidadEmparejadas++;

        // Si se encontraron todos los pares
        if (cantidadEmparejadas === iconos.length) {
          setTimeout(() => alert('¡Has ganado! 🎉'), 300);
        }

        cartasVolteadas = []; // Reiniciar selección
      } else {
        // Si no coinciden, voltearlas de nuevo después de un momento
        setTimeout(() => {
          primera.classList.remove('volteada');
          segunda.classList.remove('volteada');
          primera.textContent = '';
          segunda.textContent = '';
          cartasVolteadas = [];
        }, 800);
      }
    }
  });
});
