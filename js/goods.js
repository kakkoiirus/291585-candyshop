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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomIntRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBool = function () {
  return Boolean(Math.floor(Math.random() * 2));
};

var getRandomString = function (data) {
  var randomString = '';
  var count = getRandomInt(1, data.length);

  for (var i = 1; i <= count; i++) {
    randomString += (i < count ? data[i] + ', ' : data[i]);
  }

  return randomString;
};

var getProducts = function (counts) {
  var products = [];

  for (var i = 0; i < counts; i++) {
    var product = {
      name: NAMES[getRandomInt(0, NAMES.length)],
      picture: PICTURES[getRandomInt(0, PICTURES.length)],
      amount: getRandomIntRange(0, 20),
      price: getRandomIntRange(100, 1500),
      weight: getRandomIntRange(30, 300),
      rating: {
        value: getRandomIntRange(1, 5),
        number: getRandomIntRange(10, 900)
      },
      nutritionFacts: {
        sugar: getRandomBool(),
        energy: getRandomIntRange(70, 500),
        contents: getRandomString(CONTENTS),
      }
    };

    products[i] = product;
  }

  return products;
};

var getProductCard = function (product, catalogCardTemplate) {
  var catalogCard = catalogCardTemplate.cloneNode(true);

  if (product.amount > 5) {
    catalogCard.classList.add('card--in-stock');
  } else if (product.amount <= 5 && product.amount >= 1) {
    catalogCard.classList.add('card--little');
  } else if (product.amount === 0) {
    catalogCard.classList.add('card--soon');
  }

  catalogCard.querySelector('.card__title').textContent = product.name;
  catalogCard.querySelector('.card__price').innerHTML = product.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + product.weight + ' Г</span>';

  var productImage = catalogCard.querySelector('.card__img');
  productImage.src = product.picture;
  productImage.alt = product.name;

  var ratings = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five'
  };
  var productRating = catalogCard.querySelector('.stars__rating');

  if (product.rating.value < 5) {
    productRating.classList.remove('stars__rating--five');
    productRating.classList.add('stars__rating--' + ratings[product.rating.value]);

    productRating.textContent = product.rating.value > 1 ? 'Рейтинг: ' + product.rating.value + ' звёзды' : 'Рейтинг: ' + product.rating.value + ' звёзда';
  }

  catalogCard.querySelector('.star__count').textContent = product.rating.number;

  var cardCharacteristic = product.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';

  cardCharacteristic += product.nutritionFacts.energy + ' ккал';
  catalogCard.querySelector('.card__characteristic').textContent = cardCharacteristic;
  catalogCard.querySelector('.card__composition-list').textContent = product.nutritionFacts.contents;

  return catalogCard;
};

var renderProductCards = function (products) {
  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');

  var catalogLoad = document.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');

  var catalogCardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < products.length; i++) {
    fragment.appendChild(getProductCard(products[i], catalogCardTemplate));
  }

  catalogCards.appendChild(fragment);
};

var getGoodsCard = function (product, goodsСardTemplate) {
  var goodsСard = goodsСardTemplate.cloneNode(true);
  goodsСard.querySelector('.card-order__title').textContent = product.name;

  var goodsСardImage = goodsСard.querySelector('.card-order__img');
  goodsСardImage.src = product.picture;
  goodsСardImage.alt = product.name;

  goodsСard.querySelector('.card-order__price').textContent = product.price + ' ₽';

  return goodsСard;
};

var renderCart = function (products) {
  var goodsCards = document.querySelector('.goods__cards');
  goodsCards.classList.remove('goods__cards--empty');

  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  goodsCardEmpty.classList.add('visually-hidden');

  var goodsСardTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < products.length; i++) {
    fragment.appendChild(getGoodsCard(products[i], goodsСardTemplate));
  }

  goodsCards.appendChild(fragment);
};

renderProductCards(getProducts(26));

renderCart(getProducts(3));
