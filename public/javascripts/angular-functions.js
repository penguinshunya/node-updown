const defineDirectives = function(app) {
  app.directive('ngDragover', function($parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.bind('dragover', function(event) {
          let fn = $parse(attrs.ngDragover);
          $scope.$apply(function() {
            // I think that it is better to cancel the default behavior
            event.stopPropagation();
            event.preventDefault();
            fn($scope, { $event: event });
          });
        });
      }
    };
  });

  app.directive('ngFilesDrop', function($parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.bind('drop', function(event) {
          let fn = $parse(attrs.ngFilesDrop);
          $scope.$apply(function() {
            event.stopPropagation();
            event.preventDefault();
            fn($scope, { $files: event.originalEvent.dataTransfer.files });
          });
        });
      }
    };
  });

  app.directive('ngShowBsModal', function($parse) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.bind('show.bs.modal', function(event) {
          let fn = $parse(attrs.ngShowBsModal);
          $scope.$apply(function() {
            fn($scope, { $event: event, $data: event.relatedTarget.dataset });
          });
        });
      }
    };
  });
};
