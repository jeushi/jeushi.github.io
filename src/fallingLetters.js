const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

const letters = 'abcdefghijklmnopqrstuvwxyz0123456789'; // Characters to use
const particles = []; // Array to hold particle objects

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x; // Initial x position
        this.y = y; // Initial y position
        this.size = Math.random() * 20 + 10; // Random size
        this.speedY = Math.random() * 3 + 2; // Falling speed
        this.text = letters[Math.floor(Math.random() * letters.length)]; // Random letter
        this.opacity = 1; // Opacity for fading effect
    }

    update() {
        this.y += this.speedY; // Update position
        if (this.y > canvas.height) {
            this.y = 0; // Reset to top when it falls off the bottom
            this.x = Math.random() * canvas.width; // Random horizontal position
            this.opacity = 1; // Reset opacity
        }
        this.opacity -= 0.005; // Fade out effect
    }

    draw() {
        // Add green glow using shadow properties
        ctx.shadowColor = 'rgba(0, 255, 0, 0.7)'; // Green glow
        ctx.shadowBlur = 15; // Set the amount of blur for the glow

        // Set the fill color with opacity for the text
        ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`; 
        ctx.font = `${this.size}px JetBrains Mono`; // Set font size and family
        ctx.fillText(this.text, this.x, this.y); // Draw letter on canvas

        // Reset shadow properties after drawing to prevent affecting other drawings
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }
}

// Create particles
function createParticles() {
    const particleCount = 150; // Number of particles
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width; // Random x position
        const y = Math.random() * canvas.height; // Random y position
        particles.push(new Particle(x, y)); // Add new particle
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    particles.forEach(particle => {
        particle.update(); // Update particle position
        particle.draw(); // Draw particle
    });
    requestAnimationFrame(animate); // Loop the animation
}

createParticles(); // Create initial particles
animate(); // Start animation
