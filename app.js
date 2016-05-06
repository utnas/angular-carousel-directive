var app = angular.module('plunker', ['ngAnimate'])

.controller('MainCtrl', function($scope) {

  $scope.images = [];       // images array
  
  for(var i = 0; i < 20; i++) {
    $scope.images.push(i);
  }
  
  $scope.imagesPerPage = 3; // images per page
})

// Carousel directive
.directive('carousel', function(){
  
  var sliderCtrl = function($interval) {
    var self           = this;
    self.images        = this.images || [];
    self.imagesperpage = this.imagesperpage;
    
    self.translation   = "translateX("+ 0 +"px)";
    self.sliderwidth  = (100 * self.images.length)+"%";
    
    var
    step = (100/self.images.length)/self.imagesperpage,
    value = 0;
    self.imageWidth = step+"%",
    counter = 0,
    limit = self.images.length - self.imagesperpage,
    direction = 'right';  
    
    self.next = function(){
      if(counter >= limit){
         direction = 'left';
         return;
      }
      value -= step;
      self.translation = "translateX("+value+"%)";
      counter++;
    }
    
    self.prev = function(){
      if(counter <= 0){
        direction = 'right';
        return;
      }
      value += step;
      self.translation = "translateX("+value+"%)";
      counter--;
    }
   
    $interval(function(){
      if(direction === 'left'){
        self.prev();
      }
      if(direction === 'right'){
        self.next();
      }
    }, 5000);
  };
  
  return {
    replace: 'true',
    restrict: 'AE',
    controllerAs: 'ctrl',
    controller: sliderCtrl,
    bindToController: true,
    scope: {
      images: '=',
      imagesperpage: '='
    },
    templateUrl:'carousel.html'
  }
});
