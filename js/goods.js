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

var RATINGS = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

var PRODUCTS_COUNT = 26;
var CART_MESSAGE = 'В корзине ничего нет';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomIntRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBool = function () {
  return Math.random() >= 0.5;
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

    products.push(product);
  }

  return products;
};

var getProductCard = function (product, catalogCardTemplate, index) {
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
  var productRating = catalogCard.querySelector('.stars__rating');

  if (product.rating.value < 5) {
    productRating.classList.remove('stars__rating--five');
    productRating.classList.add('stars__rating--' + RATINGS[product.rating.value]);

    productRating.textContent = product.rating.value > 1 ? 'Рейтинг: ' + product.rating.value + ' звёзды' : 'Рейтинг: ' + product.rating.value + ' звёзда';
  }

  catalogCard.querySelector('.star__count').textContent = product.rating.number;

  var cardCharacteristic = product.nutritionFacts.sugar ? 'Содержит сахар. ' : 'Без сахара. ';

  cardCharacteristic += product.nutritionFacts.energy + ' ккал';
  catalogCard.querySelector('.card__characteristic').textContent = cardCharacteristic;
  catalogCard.querySelector('.card__composition-list').textContent = product.nutritionFacts.contents;

  catalogCard.querySelector('.card__btn').dataset.index = index;

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
    fragment.appendChild(getProductCard(products[i], catalogCardTemplate, i));
  }

  catalogCards.appendChild(fragment);
};

var products = getProducts(PRODUCTS_COUNT);
var cartProducts = [];

var getCartItem = function (product, cartItemTemplate) {
  var cartItem = cartItemTemplate.cloneNode(true);
  cartItem.querySelector('.card-order__title').textContent = product.name;

  var cartItemImage = cartItem.querySelector('.card-order__img');
  cartItemImage.src = product.picture;
  cartItemImage.alt = product.name;

  cartItem.querySelector('.card-order__price').textContent = product.price + ' ₽';

  cartItem.querySelector('.card-order__count').value = product.amount;

  return cartItem;
};

var goodsCards = document.querySelector('.goods__cards');
var goodsCardEmpty = document.querySelector('.goods__card-empty');
var cartItemTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
var mainHeaderBasket = document.querySelector('.main-header__basket');
var isFirstCartRender = true;

var renderCart = function (cartItemList) {
  var cartCounter = 0;

  if (isFirstCartRender && cartItemList.length !== 0) {
    goodsCards.classList.remove('goods__cards--empty');
    goodsCardEmpty.classList.add('visually-hidden');
    enableBuyForm();
    isFirstCartRender = false;
  } else {
    goodsCards.innerHTML = '';
  }

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cartItemList.length; i++) {
    cartCounter += cartItemList[i].amount;
    fragment.appendChild(getCartItem(cartItemList[i], cartItemTemplate));
  }

  if (cartCounter > 0) {
    mainHeaderBasket.textContent = cartCounter;
  } else {
    mainHeaderBasket.textContent = CART_MESSAGE;
    disableBuyForm();
  }

  goodsCards.appendChild(fragment);

  var cartOrderCloseElements = goodsCards.querySelectorAll('.card-order__close');
  var cartOrderCount = goodsCards.querySelectorAll('.card-order__count');
  var cartOrderDecreaseButtons = goodsCards.querySelectorAll('.card-order__btn--decrease');
  var cartOrderIncreaseButtons = goodsCards.querySelectorAll('.card-order__btn--increase');

  for (var j = 0; j < cartOrderCloseElements.length; j++) {
    (function (index) {
      cartOrderCloseElements[index].addEventListener('click', function (evt) {
        evt.preventDefault();
        removeCartItem(index);
      });
    })(j);
  }

  for (var k = 0; k < cartOrderDecreaseButtons.length; k++) {
    (function (index) {
      cartOrderDecreaseButtons[index].addEventListener('click', function () {
        cartProducts[index].amount--;

        if (cartProducts[index].amount === 0) {
          removeCartItem(index);
        } else {
          cartOrderCount[index].value = cartProducts[index].amount;
        }
      });
    })(k);
  }

  for (var l = 0; l < cartOrderDecreaseButtons.length; l++) {
    (function (index) {
      cartOrderIncreaseButtons[index].addEventListener('click', function () {
        cartProducts[index].amount++;
        cartOrderCount[index].value = cartProducts[index].amount;
      });
    })(l);
  }

  for (var m = 0; m < cartOrderDecreaseButtons.length; m++) {
    (function (index) {
      cartOrderCount[index].addEventListener('change', function () {
        cartProducts[index].amount = +cartOrderCount[index].value;

        if (cartProducts[index].amount === 0) {
          removeCartItem(index);
        }
      });
    })(m);
  }
};

var removeCartItem = function (index) {
  cartProducts.splice(index, 1);
  renderCart(cartProducts);

  if (!cartProducts.length) {
    goodsCards.classList.add('goods__cards--empty');
    goodsCardEmpty.classList.remove('visually-hidden');
    isFirstCartRender = true;
    goodsCards.appendChild(goodsCardEmpty);
  }
};

var addToFavorite = function (evt) {
  evt.target.classList.toggle('card__btn-favorite--selected');
};

var addToCart = function (evt) {
  var productIndex = evt.target.dataset.index;
  var productItem = products[productIndex];
  var isItemInCart = false;

  for (var i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].index === productIndex) {
      isItemInCart = true;
      cartProducts[i].amount++;
    }
  }

  if (!isItemInCart) {
    var cartItem = {
      name: productItem.name,
      price: productItem.price,
      picture: productItem.picture,
      amount: 1,
      index: productIndex
    };

    cartProducts.push(cartItem);
  }

  renderCart(cartProducts);
};

var catalogCards = document.querySelector('.catalog__cards');

catalogCards.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('card__btn-favorite')) {
    addToFavorite(evt);
  } else if (evt.target.classList.contains('card__btn')) {
    addToCart(evt);
  }
});

var paymentInner = document.querySelector('.payment__inner ');
var paymentToggle = paymentInner.querySelector('.payment__method');
var activePaymentMethod = paymentToggle.querySelector('input:checked').id;
var activePaymentTab = paymentInner.querySelector('.' + activePaymentMethod + '-wrap');

var onPaymentToggleChange = function (evt) {
  activePaymentTab.classList.add('visually-hidden');
  activePaymentTab = paymentInner.querySelector('.' + evt.target.id + '-wrap');
  activePaymentTab.classList.remove('visually-hidden');
};

paymentToggle.addEventListener('change', onPaymentToggleChange);

var deliver = document.querySelector('.deliver');
var deliverToggle = deliver.querySelector('.deliver__toggle');
var activeDeliverToggle = deliverToggle.querySelector('input:checked').id;
var activeDeliverTab = deliver.querySelector('.' + activeDeliverToggle);

var onDeliverToggleChange = function (evt) {
  activeDeliverTab.classList.add('visually-hidden');
  activeDeliverTab = deliver.querySelector('.' + evt.target.id);
  activeDeliverTab.classList.remove('visually-hidden');
};

deliverToggle.addEventListener('change', onDeliverToggleChange);

var buySection = document.querySelector('.buy');
var buySectionTextInputs = buySection.querySelectorAll('input[type="text"]');
var deliverStoresFieldset = buySection.querySelector('.deliver__stores');
var buySubmitButton = buySection.querySelector('.buy__submit-btn');

var disableBuyForm = function () {
  for (var i = 0; i < buySectionTextInputs.length; i++) {
    buySectionTextInputs[i].disabled = true;
  }

  deliverStoresFieldset.disabled = true;
  buySubmitButton.disabled = true;
};

var enableBuyForm = function () {
  for (var i = 0; i < buySectionTextInputs.length; i++) {
    buySectionTextInputs[i].disabled = false;
  }

  deliverStoresFieldset.disabled = false;
  buySubmitButton.disabled = false;
};

var catalogFilter = document.querySelector('.catalog__filter + .range');
var rangeFilter = catalogFilter.querySelector('.range__filter');
var rangeButtonLeft = rangeFilter.querySelector('.range__btn--left');
var rangeButtonRight = rangeFilter.querySelector('.range__btn--right');
var rangePriceMin = catalogFilter.querySelector('.range__price--min');
var rangePriceMax = catalogFilter.querySelector('.range__price--max');

rangeButtonLeft.addEventListener('mouseup', function () {
  rangePriceMin.textContent = Math.round(rangeButtonLeft.offsetLeft * 100 / rangeFilter.offsetWidth);
});

rangeButtonRight.addEventListener('mouseup', function () {
  rangePriceMax.textContent = Math.round(rangeButtonRight.offsetLeft * 100 / rangeFilter.offsetWidth);
});

renderProductCards(products);
disableBuyForm();
