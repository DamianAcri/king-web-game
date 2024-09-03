class Player extends Sprite {
    // Constructor para inicializar un Player
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
      super({ imageSrc, frameRate, animations, loop });
      
      this.position = {
        x: 200,   // Posición inicial en el eje X
        y: 200,   // Posición inicial en el eje Y
      };
  
      this.velocity = {
        x: 0,     // Velocidad inicial en el eje X
        y: 0,     // Velocidad inicial en el eje Y
      };
  
      this.sides = {
        bottom: this.position.y + this.height, // Calcula la posición inferior del sprite
      };
  
      this.gravity = 1; // Valor de la gravedad aplicada al jugador
  
      this.collisionBlocks = collisionBlocks; // Bloques de colisión con los que el jugador interactuará
    }
  
    // Método para actualizar el estado del jugador
    update() {
      // Código comentado para depuración visual
      // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
      // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  
      // Actualiza la posición del jugador basándose en la velocidad
      this.position.x += this.velocity.x;
  
      // Actualiza el hitbox del jugador
      this.updateHitbox();
  
      // Verifica y maneja las colisiones horizontales
      this.checkForHorizontalCollisions();
  
      // Aplica la gravedad al jugador
      this.applyGravity();
  
      // Actualiza el hitbox después de aplicar la gravedad
      this.updateHitbox();
  
      // Verifica y maneja las colisiones verticales
      this.checkForVerticalCollisions();
    }
  
    // Método para manejar la entrada del usuario
    handleInput(keys) {
      if (this.preventInput) return; // No procesar entrada si el input está bloqueado
  
      this.velocity.x = 0; // Restablecer la velocidad en el eje X
  
      if (keys.d.pressed) {
        this.switchSprite('runRight'); // Cambiar a la animación de correr a la derecha
        this.velocity.x = 5;           // Establecer velocidad positiva en el eje X
        this.lastDirection = 'right';  // Recordar la última dirección
      } else if (keys.a.pressed) {
        this.switchSprite('runLeft');  // Cambiar a la animación de correr a la izquierda
        this.velocity.x = -5;          // Establecer velocidad negativa en el eje X
        this.lastDirection = 'left';   // Recordar la última dirección
      } else {
        // Cambiar a la animación de inactividad basada en la última dirección
        if (this.lastDirection === 'left') this.switchSprite('idleLeft');
        else this.switchSprite('idleRight');
      }
    }
  
    // Método para cambiar la animación actual del sprite
    switchSprite(name) {
      if (this.image === this.animations[name].image) return; // No cambiar si la animación ya está activa
  
      // Configurar los parámetros de la nueva animación
      this.currentFrame = 0;
      this.image = this.animations[name].image;
      this.frameRate = this.animations[name].frameRate;
      this.frameBuffer = this.animations[name].frameBuffer;
      this.loop = this.animations[name].loop;
      this.currentAnimation = this.animations[name];
    }
  
    // Método para actualizar el hitbox del jugador
    updateHitbox() {
      this.hitbox = {
        position: {
          x: this.position.x + 58, // Posición X ajustada para el hitbox
          y: this.position.y + 34, // Posición Y ajustada para el hitbox
        },
        width: 50,   // Ancho del hitbox
        height: 53,  // Altura del hitbox
      };
    }
  
    // Método para verificar y manejar colisiones horizontales
    checkForHorizontalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];
  
        // Verificar si hay una colisión en el eje X
        if (
          this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
          this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          // Colisión en el eje X y movimiento hacia la izquierda
          if (this.velocity.x < -0) {
            const offset = this.hitbox.position.x - this.position.x;
            this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
            break;
          }
  
          // Colisión en el eje X y movimiento hacia la derecha
          if (this.velocity.x > 0) {
            const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
            this.position.x = collisionBlock.position.x - offset - 0.01;
            break;
          }
        }
      }
    }
  
    // Método para aplicar la gravedad al jugador
    applyGravity() {
      this.velocity.y += this.gravity; // Incrementar la velocidad en el eje Y
      this.position.y += this.velocity.y; // Actualizar la posición en el eje Y
    }
  
    // Método para verificar y manejar colisiones verticales
    checkForVerticalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];
  
        // Verificar si hay una colisión en el eje Y
        if (
          this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
          this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          // Colisión en el eje Y y movimiento hacia arriba
          if (this.velocity.y < 0) {
            this.velocity.y = 0;
            const offset = this.hitbox.position.y - this.position.y;
            this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
            break;
          }
  
          // Colisión en el eje Y y movimiento hacia abajo
          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
            this.position.y = collisionBlock.position.y - offset - 0.01;
            break;
          }
        }
      }
    }
  }
  