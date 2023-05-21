// Waiting for the HTML page to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Create new Splide (a slick slider component) instance
    new Splide('.splide', {
      type: 'loop', // Slide type set to loop for continuous cycling
      perPage: 3, // Number of slides displayed per page
      perMove: 1, // Number of slides to move when the arrow or pagination is clicked
      focus: 'center', // The location of the slider to be focused ("center" in this case)
      pagination: false, // Hide the pagination
      fixedWidth: '30%', // Set a fixed width to the slides
  
      // Configuring responsive options
      breakpoints: {
        1600: { // For viewport width 1600px and below
            perPage: 1, // Display only one slide per page
            fixedWidth: '60%', // Set a fixed width to the slides
        },
        600: { // For viewport width 600px and below
          perPage: 1, // Display only one slide per page
          fixedWidth: '80%', // Set a fixed width to the slides
        },
      },
    }).mount(); // Apply the splide to the element
  });
  