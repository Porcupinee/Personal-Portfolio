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

  const aboutButton = document.querySelector(".button-about");
  const aboutSection = document.getElementById("about-section");
  const aboutTitle = document.querySelector(".text-content h2");
  const imageRow = document.querySelector(".image-row");
  const logoSection = document.querySelector(".logo-section h3");
  const logoButton = document.querySelector(".logo-section .button");

  aboutButton.addEventListener("click", function(event) {
    event.preventDefault();
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: '0px', // margin around the root
    threshold: 0.1 // trigger the callback when 10% of the target is visible
  };

  function observerCallback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // target enters the viewport
        aboutTitle.classList.add('slide-in-down');
        imageRow.classList.add('slide-in-up');
        logoSection.classList.add('slide-in-up');
        logoButton.classList.add('slide-in-up'); // add animation to the button
      } else { // target leaves the viewport
        aboutTitle.classList.remove('slide-in-down');
        imageRow.classList.remove('slide-in-up');
        logoSection.classList.remove('slide-in-up');
        logoButton.classList.remove('slide-in-up'); // remove animation from the button
      }
    });
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // start observing
  observer.observe(aboutSection);

  let prevScrollPos = window.pageYOffset;

  window.addEventListener("scroll", function () {
    const currentScrollPos = window.pageYOffset;
  
    if (prevScrollPos > currentScrollPos) {
      document.querySelector(".navbar").style.transition = "top 0.3s";
      document.querySelector(".navbar").style.top = "0";
    } else {
      document.querySelector(".navbar").style.transition = "top 0.3s";
      document.querySelector(".navbar").style.top = "-60px";
    }
  
    prevScrollPos = currentScrollPos;
  });
});
