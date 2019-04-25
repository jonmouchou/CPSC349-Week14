(function (window) {
  'use strict';

  var minioClient = new MinIO.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: true,
    accessKey: 'NJA8L3GU3RPAVBAN6HOY',
    secretKey: 'aj97GK+rAhiRW5lyJaav+kgd7gW8l4uD9FT5RUuV'
  });

  var endpoint = new AWS.Endpoint('http://localhost:9000/images');
  AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'NJA8L3GU3RPAVBAN6HOY',
    secretAccessKey: 'aj97GK+rAhiRW5lyJaav+kgd7gW8l4uD9FT5RUuV',
    sslEnabled: false
  });

  var s3 = new AWS.S3({
    endpoint: endpoint,
    params: {
      Bucket: 'images',
      s3ForcePathStyle: false,
      s3BucketEndpoint: true
    }
  });

  $('#submit').click((e) => {
    e.preventDefault();
    var image = document.getElementById('image').files[0];

    s3.upload({
      Key: image.name,
      Body: image,
      ACL: 'public-read'
    }, (_, data) => {
      var uploadData = {
        'id': data.ETag,
        'src': `http://localhost:9000/images/${image.name}`,
        'caption': ''
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
