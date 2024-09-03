class CollisionBlock {
    // Constructor para inicializar un CollisionBlock
    constructor({ position }) {
      this.position = position; 
      this.width = 64;         
      this.height = 64;        
    }
  
    // Método para dibujar el bloque de colisión en el canvas
    draw() {
      c.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Color y opacidad del bloque (rojo semitransparente)
      c.fillRect(this.position.x, this.position.y, this.width, this.height); // Dibuja el bloque en el canvas
    }
  }
  