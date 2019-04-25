(window => {
  'use strict';

  fetch('http://localhost:3000/images')
    .then(response => response.json())
    .then(json => {
      json.forEach(element => {
        $('#images').append(
          `
          <figure id='image-${element.id}'>
            <img src='${element.src}' alt='${element.caption}' />
            <figcaption>${element.caption}</figcaption>
          </figure>
        `
        );
      });
    });
})(window);
