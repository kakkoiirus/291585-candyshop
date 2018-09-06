'use strict';

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
  'gum-cedar.jpg',
  'ice-cucumber.jpg',
  'marmalade-beer.jpg',
  'marshmallow-beer.jpg',
  'soda-cob.jpg',
  'gum-chile.jpg',
  'ice-eggplant.jpg',
  'marmalade-caviar.jpg',
  'marshmallow-shrimp.jpg',
  'soda-garlic.jpg',
  'gum-eggplant.jpg',
  'ice-garlic.jpg',
  'marmalade-corn.jpg',
  'marshmallow-spicy.jpg',
  'soda-peanut-grapes.jpg',
  'gum-mustard.jpg',
  'ice-italian.jpg',
  'marmalade-new-year.jpg',
  'marshmallow-wine.jpg',
  'soda-russian.jpg',
  'gum-portwine.jpg',
  'ice-mushroom.jpg',
  'marmalade-sour.jpg',
  'soda-bacon.jpg',
  'gum-wasabi.jpg',
  'ice-pig.jpg',
  'marshmallow-bacon.jpg',
  'soda-celery.jpg'
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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


