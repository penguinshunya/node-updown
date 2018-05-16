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
        data.append('date', 'test');

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
          assign(obj, data.data);
          obj.showprogress = false;
        });
      });
    });

    $('#files').on('click', '.download', function(e) {
      const filename = $(e.target).data('filename');
      window.location.href = `/download/${filename}`;
    });

    $('#fileModal').on('show.bs.modal', function (e) {
      const button = $(e.relatedTarget);
      const modal = $(this);
      // TODO AngularJSを使うことで綺麗に書ける気がする部分
      modal.find('.modal-file-name').text(button.data('originalname'));
      modal.find('.modal-file-type').text(button.data('mimetype'));
      modal.find('.modal-file-size').text(button.data('size') + ' Byte');
      modal.find('.modal-file-date').text(button.data('date'));
    });

    $('#files').on('click', '.delete', function(e) {
      const filename = $(e.target).data('filename');
      $http.delete(`/files/${filename}`).then(function() {
        $scope.files = $scope.files.filter(file => file.filename != filename);
      });
    });
  }]);
