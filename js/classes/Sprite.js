class Sprite {
    // Constructor para inicializar un Sprite
    constructor({
      position,          // Posición inicial del sprite en el canvas
      imageSrc,          // Fuente de la imagen del sprite
      frameRate = 1,     // Número de fotogramas en la animación (por defecto 1)
      animations,        // Animaciones del sprite
      frameBuffer = 2,   // Número de fotogramas entre cada actualización (por defecto 2)
      loop = true,       // Indica si la animación debe repetirse en bucle (por defecto true)
      autoplay = true,   // Indica si la animación debe comenzar automáticamente (por defecto true)
    }) {
      this.position = position;            // Posición del sprite
      this.image = new Image();            // Crea un nuevo objeto Image para el sprite
      this.image.onload = () => {          // Función a ejecutar cuando la imagen se carga
        this.loaded = true;                // Marca el sprite como cargado
        this.width = this.image.width / this.frameRate; // Calcula el ancho de cada fotograma
        this.height = this.image.height;   // Establece la altura del sprite
      }
      this.image.src = imageSrc;           // Establece la fuente de la imagen
      this.loaded = false;                 // Marca el sprite como no cargado inicialmente
      this.frameRate = frameRate;          // Número de fotogramas en la animación
      this.currentFrame = 0;               // Fotograma actual de la animación
      this.elapsedFrames = 0;              // Número de fotogramas transcurridos
      this.frameBuffer = frameBuffer;      // Número de fotogramas entre cada actualización
      this.animations = animations;        // Animaciones del sprite
      this.loop = loop;                    // Indica si la animación debe ser en bucle
      this.autoplay = autoplay;            // Indica si la animación debe comenzar automáticamente
      this.currentAnimation;               // Animación actualmente activa
    
      // Cargar imágenes para cada animación
      if (this.animations) {
        for (let key in this.animations) {
          const image = new Image();       // Crear una nueva imagen para cada animación
          image.src = this.animations[key].imageSrc; // Establecer la fuente de la imagen
          this.animations[key].image = image;  // Asignar la imagen a la animación
        }
      }
    }
  
    // Método para dibujar el sprite en el canvas
    draw() {
      if (!this.loaded) return;           // No dibujar si la imagen no está cargada
  
      const cropbox = {
        position: {
          x: this.width * this.currentFrame, // Calcula la posición del fotograma en la imagen
          y: 0,
        },
        width: this.width,                // Ancho del fotograma
        height: this.height,              // Altura del fotograma
      }
  
      // Dibujar el sprite en el canvas
      c.drawImage(
        this.image,                      // Imagen del sprite
        cropbox.position.x,              // Posición del fotograma en la imagen
        cropbox.position.y,
        cropbox.width,
        cropbox.height,
        this.position.x,                 // Posición del sprite en el canvas
        this.position.y,
        this.width,
        this.height
      );
  
      this.updateFrames();               // Actualizar los fotogramas de la animación
    }
  
    // Método para activar la reproducción de la animación
    play() {
      this.autoplay = true;              // Hacer que la animación comience automáticamente
    }
  
    // Método para actualizar el estado de los fotogramas de la animación
    updateFrames() {
      if (!this.autoplay) return;        // No actualizar si la animación no está en reproducción
  
      this.elapsedFrames++;              // Incrementar el número de fotogramas transcurridos
  
      // Actualizar el fotograma actual si es el momento adecuado
      if (this.elapsedFrames % this.frameBuffer === 0) {
        if (this.currentFrame < this.frameRate - 1) this.currentFrame++; // Pasar al siguiente fotograma
        else if (this.loop) this.currentFrame = 0; // Reiniciar al primer fotograma si la animación está en bucle
      }
  
      // Ejecutar la función onComplete si se ha completado la animación
      if (this.currentAnimation?.onComplete) {
        if (
          this.currentFrame === this.frameRate - 1 &&  // Verificar si es el último fotograma
          !this.currentAnimation.isActive          // Verificar si la animación no está activa
        ) {
          this.currentAnimation.onComplete();     // Ejecutar la función onComplete
          this.currentAnimation.isActive = true; // Marcar la animación como activa
        }
      }
    }
  }
  