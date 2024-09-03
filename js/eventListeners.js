// Evento para cuando se presiona una tecla
window.addEventListener('keydown', (event) => {
    // Si el jugador no puede recibir entradas, salimos de la función
    if (player.preventInput) return;
  
    // Comprobamos qué tecla ha sido presionada
    switch (event.key) {
      case 'w':
        // Verificamos si el jugador está en contacto con una puerta
        for (let i = 0; i < doors.length; i++) {
          const door = doors[i];
  
          // Comprobamos la colisión entre el jugador y la puerta
          if (
            player.hitbox.position.x + player.hitbox.width <=
              door.position.x + door.width &&
            player.hitbox.position.x >= door.position.x &&
            player.hitbox.position.y + player.hitbox.height >= door.position.y &&
            player.hitbox.position.y <= door.position.y + door.height
          ) {
            // Detenemos el movimiento del jugador y activamos la animación de entrar por la puerta
            player.velocity.x = 0;
            player.velocity.y = 0;
            player.preventInput = true; // Prevenir más entradas mientras se realiza la animación
            player.switchSprite('enterDoor'); // Cambiar a la animación de entrada a la puerta
            door.play(); // Reproducir la animación de la puerta
            return; // Salimos de la función después de procesar la puerta
          }
        }
  
        // Si no se ha interactuado con una puerta y el jugador está en el suelo, iniciamos el salto
        if (player.velocity.y === 0) player.velocity.y = -25;
  
        break;
  
      case 'a':
        // Mover el jugador hacia la izquierda
        keys.a.pressed = true;
        break;
  
      case 'd':
        // Mover el jugador hacia la derecha
        keys.d.pressed = true;
        break;
    }
  });
  
  // Evento para cuando se suelta una tecla
  window.addEventListener('keyup', (event) => {
    // Comprobamos qué tecla ha sido soltada
    switch (event.key) {
      case 'a':
        // Detener el movimiento hacia la izquierda
        keys.a.pressed = false;
        break;
  
      case 'd':
        // Detener el movimiento hacia la derecha
        keys.d.pressed = false;
        break;
    }
  });
  