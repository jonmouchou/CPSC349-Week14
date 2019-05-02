(function (window) {
  'use strict';

  // eslint-disable-next-line no-undef
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'NJA8L3GU3RPAVBAN6HOY',
    secretAccessKey: 'aj97GK+rAhiRW5lyJaav+kgd7gW8l4uD9FT5RUuV',
    sslEnabled: false
  });

  // eslint-disable-next-line no-undef
  var s3 = new AWS.S3({
    endpoint: 'http://localhost:9000/images',
    params: {
      Bucket: 'images',
      s3ForcePathStyle: false,
      s3BucketEndpoint: true
    }
  });

  class UploadForm extends HTMLElement {
    connectedCallback () {
      this.innerHTML =
        `Caption:<br>
        <input id="upload-caption" type="text" name="caption">
        <br>
        Image File:<br>
        <input id="upload-image" type="file" name="image">
        <br><br>
        <input id="upload-submit" type="submit" value="Upload">
        <br>`;
    }
  }
  customElements.define('upload-form', UploadForm);

  $('#upload-submit').click((e) => {
    e.preventDefault();
    var image = document.getElementById('upload-image').files[0];
    var caption = $('#upload-caption')[0].value;

    s3.upload({
      Key: image.name,
      Body: image,
      ACL: 'public-read'
    }, (_, data) => {
      var uploadData = {
        'id': data.ETag,
        'src': `http://localhost:9000/images/${image.name}`,
        'caption': caption
      };
      fetch('http://localhost:3000/images', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(uploadData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    });
  });
})(window);
