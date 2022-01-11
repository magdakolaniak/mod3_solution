(function () {
  'use strict';

  angular
    .module('MenuApp', [])
    .controller('MenuAppController', MenuAppController)
    .service('MenuAppService', MenuAppService)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

  MenuAppController.$inject = ['MenuAppService'];
  function MenuAppController(MenuAppService) {
    var menu = this;
    menu.test = 'hello';
    // var promise = MenuAppService.getMenuItems();

    // promise
    //   .then(function (response) {
    //     console.log(response.data.menu_items);
    //     menu.categories = response.data.menu_items;
    //   })
    //   .catch(function (error) {
    //     console.log('Something went terribly wrong.');
    //   });

    menu.NarrowIt = function (query) {
      var promise = MenuAppService.narrowDown(query);

      promise
        .then(function (response) {
          let all = response.data.menu_items;
          let results = all.filter(
            (item) =>
              item.name.toLowerCase().indexOf(menu.test.toLowerCase()) != -1
          );
          console.log(results);
          menu.categories = results;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }

  MenuAppService.$inject = ['$http', 'ApiBasePath'];
  function MenuAppService($http, ApiBasePath) {
    var service = this;

    service.getMenuItems = function () {
      var response = $http({
        method: 'GET',
        url: ApiBasePath + '/menu_items.json',
      });

      return response;
    };

    service.narrowDown = function (query) {
      var response = $http({
        method: 'GET',
        url: ApiBasePath + '/menu_items.json',
      });

      return response;
    };
  }
})();
