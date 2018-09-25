'use strict';

(function () {
  var NAMES = [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ];

  var PICTURES = [
    'img/cards/gum-cedar.jpg',
    'img/cards/ice-cucumber.jpg',
    'img/cards/marmalade-beer.jpg',
    'img/cards/marshmallow-beer.jpg',
    'img/cards/soda-cob.jpg',
    'img/cards/gum-chile.jpg',
    'img/cards/ice-eggplant.jpg',
    'img/cards/marmalade-caviar.jpg',
    'img/cards/marshmallow-shrimp.jpg',
    'img/cards/soda-garlic.jpg',
    'img/cards/gum-eggplant.jpg',
    'img/cards/ice-garlic.jpg',
    'img/cards/marmalade-corn.jpg',
    'img/cards/marshmallow-spicy.jpg',
    'img/cards/soda-peanut-grapes.jpg',
    'img/cards/gum-mustard.jpg',
    'img/cards/ice-italian.jpg',
    'img/cards/marmalade-new-year.jpg',
    'img/cards/marshmallow-wine.jpg',
    'img/cards/soda-russian.jpg',
    'img/cards/gum-portwine.jpg',
    'img/cards/ice-mushroom.jpg',
    'img/cards/marmalade-sour.jpg',
    'img/cards/soda-bacon.jpg',
    'img/cards/gum-wasabi.jpg',
    'img/cards/ice-pig.jpg',
    'img/cards/marshmallow-bacon.jpg',
    'img/cards/soda-celery.jpg'
  ];

  var CONTENTS = [
    'молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'
  ];

  var getProducts = function (counts) {
    var products = [];

    for (var i = 0; i < counts; i++) {
      var product = {
        name: NAMES[window.utils.getRandomInt(0, NAMES.length)],
        picture: PICTURES[window.utils.getRandomInt(0, PICTURES.length)],
        amount: window.utils.getRandomIntRange(0, 20),
        price: window.utils.getRandomIntRange(100, 1500),
        weight: window.utils.getRandomIntRange(30, 300),
        rating: {
          value: window.utils.getRandomIntRange(1, 5),
          number: window.utils.getRandomIntRange(10, 900)
        },
        nutritionFacts: {
          sugar: window.utils.getRandomBool(),
          energy: window.utils.getRandomIntRange(70, 500),
          contents: window.utils.getRandomString(CONTENTS),
        }
      };

      products.push(product);
    }

    return products;
  };

  window.data = {
    getProducts: getProducts
  };
})();
