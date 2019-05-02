(window => {
  'use strict';

  const fragment = document.getElementById('image-template');

  fetch('http://localhost:3000/images')
    .then(response => response.json())
    .then(json => {
      json.forEach(element => {
        const instance = document.importNode(fragment.content, true);

        // Add content to the template
        instance.querySelector('.figure').setAttribute('id', `image-${element.id}`);
        instance.querySelector('.image').setAttribute('src', element.src);
        instance.querySelector('.caption').innerHTML = element.caption;

        // Append the instance ot the DOM
        document.getElementById('images').appendChild(instance);
      });
    });
})(window);
