document.addEventListener("DOMContentLoaded", function () {
    let angle = 0;
  
    function _updateBackgroundAngle() {
      angle += 0.001;
    }
  
    function updateGradient() {
      _updateBackgroundAngle();
  
      const centerX = 50 + 45 * Math.cos(angle);
      const centerY = 50 + 45 * Math.sin(angle);
  
      const gradient = `radial-gradient(110% 110% at ${centerX}% ${centerY}%, #545454 0%, #000000 100%)`;
      document.documentElement.style.background = gradient;
    }
  
    setInterval(updateGradient, 3);
  
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function createParticles() {
      particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 5 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          speedY: Math.random() * 2 + 1,
        });
      }
    }
  
    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      particles.forEach((particle) => {
        particle.y += particle.speedY;
        if (particle.y > canvas.height) {
          particle.y = 0 - particle.length;
        }
        ctx.globalAlpha = particle.opacity;
        ctx.fillRect(particle.x, particle.y, 1, particle.length);
      });
    }
  
    function animateParticles() {
      updateParticles();
      requestAnimationFrame(animateParticles);
    }
  
    window.addEventListener("load", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
  
    resizeCanvas();
    createParticles();
    animateParticles();

    function scrollToAbout(event) {
      event.preventDefault(); // Add this line to prevent the default behavior of the link
      const aboutSection = document.getElementById("about-section");
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    
    const aboutButton = document.querySelector(".button-about");
    aboutButton.addEventListener("click", scrollToAbout);
    
});


  