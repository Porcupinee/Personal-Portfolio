// Waiting for the HTML page to fully load
document.addEventListener("DOMContentLoaded", function () {
  let angle = 0; // variable to store angle for background gradient

  // Function to increase the angle by a small amount
  function _updateBackgroundAngle() {
    angle += 0.001;
  }

  // Function to update the background gradient with the new angle
  function updateGradient() {
    _updateBackgroundAngle(); // calling angle update function

    // Creating radial gradient using trig functions to give a sense of motion
    const centerX = 50 + 45 * Math.cos(angle);
    const centerY = 50 + 45 * Math.sin(angle);

    // Setting the actual gradient style
    const gradient = `radial-gradient(110% 110% at ${centerX}% ${centerY}%, #545454 0%, #000000 100%)`;
    document.documentElement.style.background = gradient;
  }

  // Update gradient every 3 milliseconds
  setInterval(updateGradient, 3);

  // Get canvas element and context for particle effects
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  // Function to resize canvas to match window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Function to create particles for particle effect
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

  // Function to animate particles
  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
    ctx.fillStyle = "#ffffff"; // Set particle color
    particles.forEach((particle) => {
      particle.y += particle.speedY; // Move particle
      if (particle.y > canvas.height) { // Particle off screen? Reset
        particle.y = 0 - particle.length;
      }
      ctx.globalAlpha = particle.opacity; // Set opacity
      ctx.fillRect(particle.x, particle.y, 1, particle.length); // Draw particle
    });
  }

  // Continuously animate particles using requestAnimationFrame for smoothness
  function animateParticles() {
    updateParticles();
    requestAnimationFrame(animateParticles);
  }

  // Resize canvas on window load or resize
  window.addEventListener("load", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);

  resizeCanvas(); // Run resize initially
  createParticles(); // Create particles initially
  animateParticles(); // Start animation

  // Getting elements for interaction and animation
  const aboutButton = document.querySelector(".button-about");
  const aboutSection = document.getElementById("about-section");
  const aboutTitle = document.querySelector(".text-content h2");
  const imageRow = document.querySelector(".image-row");
  const logoSection = document.querySelector(".logo-section h3");
  const logoButton = document.querySelector(".logo-section .button");

  // Event handler for click on aboutButton
  aboutButton.addEventListener("click", function(event) {
    event.preventDefault(); // Stop the default action of clicking
    aboutSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the about section
  });

  // Observer options for animations on scroll
  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px', // margin around the root
    threshold: 0.1 // trigger the callback when 10% of the target is visible
  };

  // Function to handle intersection observer callbacks
  function observerCallback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // target enters the viewport
        // Add animation classes
        aboutTitle.classList.add('slide-in-down');
        imageRow.classList.add('slide-in-up');
        logoSection.classList.add('slide-in-up');
        logoButton.classList.add('slide-in-up');
      } else { // target leaves the viewport
        // Remove animation classes
        aboutTitle.classList.remove('slide-in-down');
        imageRow.classList.remove('slide-in-up');
        logoSection.classList.remove('slide-in-up');
        logoButton.classList.remove('slide-in-up');
      }
    });
  }

  // Create observer with options and callback
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Start observing the about section
  observer.observe(aboutSection);

  let prevScrollPos = window.pageYOffset;

  // Event handler for scroll event to hide navbar when scrolling down
  window.addEventListener("scroll", function () {
    const currentScrollPos = window.pageYOffset;
  
    if (prevScrollPos > currentScrollPos) { // If scrolling up
      document.querySelector(".navbar").style.transition = "top 0.3s"; // Add transition
      document.querySelector(".navbar").style.top = "0"; // Show navbar
    } else { // If scrolling down
      document.querySelector(".navbar").style.transition = "top 0.3s"; // Add transition
      document.querySelector(".navbar").style.top = "-60px"; // Hide navbar
    }
  
    prevScrollPos = currentScrollPos; // Update previous scroll position
  });
});
