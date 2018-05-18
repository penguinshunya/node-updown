const app = angular.module('updownApp', []);

defineDirectives(app);

app.controller('UpdownController', ['$scope', '$http', function($scope, $http) {
  $http.get('/files/').then(function(data) {
    $scope.files = data.data;
  });

  $scope.filesDragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  $scope.filesDrop = function(e) {
    e.stopPropagation();
    e.preventDefault();

    const files = e.originalEvent.dataTransfer.files;
    $.each(files, function(_, file) { uploadFile(file); });
  };

  $scope.inputFileData = function(data) {
    $scope.modal = {
      filename: data.filename,
      name: data.originalname,
      type: data.mimetype,
      size: (+data.size).toLocaleString() + ' Byte',
      date: data.date
    };
  };

  $scope.deleteFile = function(filename) {
    $http.delete(`/files/${filename}`).then(function() {
      $scope.files = $scope.files.filter(file => file.filename != filename);
    });
  };

  const uploadFile = function(file) {
    const data = new FormData();
    data.append('file', file);

    const obj = {
      originalname: file.name,
      progress: 0
    };
    $scope.files.push(obj);

    $http.post('/upload', data, {
      headers: { 'Content-Type': undefined },
      uploadEventHandlers: {
        progress: function(e) {
          obj.progress = e.loaded / e.total * 100;
        }
      }
    }).then(function(data) {
      assign(obj, data.data);
    });
  };
}]);
