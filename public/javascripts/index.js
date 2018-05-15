angular.module('updownApp', [])
  .controller('UpdownController', ['$scope', '$http', function($scope, $http) {
    $http.get('/files/').then(function(data) {
      $scope.files = data.data;
    });

    $('html').on('dragover', function(e) {
      e.stopPropagation();
      e.preventDefault();
    });

    $('html').on('drop', function(e) {
      e.stopPropagation();
      e.preventDefault();

      const files = e.originalEvent.dataTransfer.files;
      $.each(files, function(_, file) {
        const data = new FormData();
        data.append('file', file);

        $http.post('/upload', data, {
          headers: { 'Content-type': undefined }
        }).then(function(data) {
          $scope.files.push(data.data);
        });
      });
    });

    $('#files').on('click', '.delete', function(e) {
      const filename = $(e.target).data('filename');
      $http.delete(`/files/${filename}`).then(function() {
        $scope.files = $scope.files.filter(file => file.filename != filename);
      });
    });
  }]);
