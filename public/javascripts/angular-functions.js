const defineDirectives = function(app) {
  app.directive('ngDragover', function($parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.bind('dragover', function(event) {
          let fn = $parse(attrs.ngDragover);
          $scope.$apply(function() {
            fn($scope, { $event: event });
          });
        });
      }
    };
  });

  app.directive('ngDrop', function($parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.bind('drop', function(event) {
          let fn = $parse(attrs.ngDrop);
          $scope.$apply(function() {
            fn($scope, { $event: event });
          });
        });
      }
    };
  });

  app.directive('ngShowBsModal', function($parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        $(element).on('show.bs.modal', function(event) {
          let fn = $parse(attrs.ngShowBsModal);
          $scope.$apply(function() {
            fn($scope, { $event: event, $data: event.relatedTarget.dataset });
          });
        });
      }
    };
  });
};
