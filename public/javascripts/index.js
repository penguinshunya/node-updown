angular.module('updownApp', [])
  .controller('UpdownController', ['$scope', '$http', function($scope, $http) {
    $http.get('/files/').then(function(data) {
      $scope.files = data.data.map(function(obj) {
        obj.showprogress = false;
        return obj;
      });
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

        const obj = {
          originalname: file.name,
          progress: 0,
          showprogress: true,
        };
        $scope.files.push(obj);

        $http.post('/upload', data, {
          headers: { 'Content-type': undefined },
          uploadEventHandlers: {
            progress: function(e) {
              obj.progress = e.loaded / e.total * 100;
            }
          }
        }).then(function(data) {
          obj.filename = data.data.filename;
          obj.showprogress = false;
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
