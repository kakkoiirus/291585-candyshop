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

var deliver = document.querySelector('.deliver');
var deliverToggle = deliver.querySelector('.deliver__toggle');
var deliverStoresFieldset = deliver.querySelector('.deliver__stores');
var deliverCourierFieldset = deliver.querySelector('.deliver__entry-fields-wrap');

var deliverTabs = {
  'deliver__store': {
    'element': deliver.querySelector('.deliver__store'),
    'fieldset': deliverStoresFieldset
  },
  'deliver__courier': {
    'element': deliver.querySelector('.deliver__courier'),
    'fieldset': deliverCourierFieldset
  },
  'active': deliverToggle.querySelector('input:checked').id
};

var onDeliverToggleChange = function (evt) {
  deliverTabs[deliverTabs.active].element.classList.add('visually-hidden');
  deliverTabs[deliverTabs.active].fieldset.disabled = true;
  deliverTabs.active = evt.target.id;
  deliverTabs[deliverTabs.active].element.classList.remove('visually-hidden');
  if (cartProducts.length) {
    deliverTabs[deliverTabs.active].fieldset.disabled = false;
  }
};

deliverToggle.addEventListener('change', onDeliverToggleChange);

var buySection = document.querySelector('.buy');
var orderSection = buySection.querySelector('.order');
var buySubmitButton = buySection.querySelector('.buy__submit-btn');
var contactDataInputs = orderSection.querySelectorAll('.contact-data__inputs input');
var paymentCardInputs = orderSection.querySelectorAll('.payment__inputs input');

var toggleContactInputs = function (status) {
  for (var i = 0; i < contactDataInputs.length; i++) {
    contactDataInputs[i].disabled = status;
  }
};

var togglePaymentCardInputs = function (status) {
  for (var i = 0; i < paymentCardInputs.length; i++) {
    paymentCardInputs[i].disabled = status;
  }
};

var disableBuyForm = function () {
  toggleContactInputs(true);
  togglePaymentCardInputs(true);

  deliverStoresFieldset.disabled = true;
  deliverCourierFieldset.disabled = true;
  buySubmitButton.disabled = true;
};

var enableBuyForm = function () {
  toggleContactInputs(false);
  togglePaymentCardInputs(false);

  deliverTabs[deliverTabs.active].fieldset.disabled = false;
  buySubmitButton.disabled = false;
};

var deliverStoreList = buySection.querySelector('.deliver__store-list');
var deliverStoreMapImage = buySection.querySelector('.deliver__store-map-img');

deliverStoreList.addEventListener('change', function (evt) {
  deliverStoreMapImage.src = 'img/map/' + evt.target.value + '.jpg';
});

var paymentSection = orderSection.querySelector('.payment');
var paymentMethodCardInput = paymentSection.querySelector('#payment__card');
var paymentMethodCardWrap = paymentSection.querySelector('.payment__card-wrap');
var paymentMethodCashInput = paymentSection.querySelector('#payment__cash');
var paymentMethodCashWrap = paymentSection.querySelector('.payment__cash-wrap');
var paymentInputsWrapper = paymentSection.querySelector('.payment__inputs');
var paymentInputs = paymentSection.querySelectorAll('.payment__inputs input');
var paymentCardNumber = orderSection.querySelector('#payment__card-number');
var paymentCardStatus = orderSection.querySelector('.payment__card-status');

var checkLuhn = function (cardNumber) {
  var cardNumbers = cardNumber.split('');
  var sumOfNumbers = 0;

  for (var i = 0; i < cardNumbers.length; i++) {
    if (i % 2 !== 0) {
      sumOfNumbers += Number(cardNumbers[i]);
    } else {
      var tempNumber = Number(cardNumbers[i]) * 2;

      if (tempNumber > 9) {
        tempNumber = tempNumber - 9;
      }

      sumOfNumbers += tempNumber;
    }
  }

  return sumOfNumbers % 10 === 0;
};

var checkPaymentCard = function () {
  var isValid = true;
  paymentCardNumber.setCustomValidity('');

  for (var i = 0; i < paymentInputs.length; i++) {
    if (!paymentInputs[i].checkValidity()) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    isValid = checkLuhn(paymentCardNumber.value);

    if (!isValid) {
      paymentCardNumber.setCustomValidity('Неправильный номер банковской карты');
    }
  }

  paymentCardStatus.textContent = isValid ? 'Одобрен' : 'Неизвестен';
};

paymentMethodCardInput.addEventListener('change', function () {
  paymentMethodCardWrap.classList.toggle('visually-hidden');
  paymentMethodCashWrap.classList.toggle('visually-hidden');

  if (cartProducts.length) {
    togglePaymentCardInputs(false);
  }
});

paymentMethodCashInput.addEventListener('change', function () {
  paymentMethodCardWrap.classList.toggle('visually-hidden');
  paymentMethodCashWrap.classList.toggle('visually-hidden');
  togglePaymentCardInputs(true);
});

paymentInputsWrapper.addEventListener('input', checkPaymentCard);

renderProductCards(products);
disableBuyForm();
paymentCardStatus.textContent = 'Неизвестен';
