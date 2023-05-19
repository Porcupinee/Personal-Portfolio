document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      focus: 'center',
      pagination: false,
      fixedWidth: '30%',  
      breakpoints: {
        1600: {
            perPage: 1,
            fixedWidth: '60%',
        },
        600: {
          perPage: 1,
          fixedWidth: '80%',
        },
      },
    }).mount();
  });
  