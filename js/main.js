var userList = document.querySelector('#char-list');
var dropD = document.getElementById('dropDown');

function getCharList() {
  var xml = new XMLHttpRequest();
  xml.open('GET', 'http://hp-api.herokuapp.com/api/characters');
  xml.responseType = 'json';

  xml.addEventListener('load', function () {

    for (let x = 0; x <= xml.response.length - 1; x++) {
      if (xml.response[x].image !== '') {
        var newSquare = document.createElement('div');
        newSquare.setAttribute('class', 'square');
        newSquare.setAttribute('houseId', xml.response[x].house);
        newSquare.setAttribute('name', xml.response[x].name);
        newSquare.setAttribute('actor', xml.response[x].actor);
        newSquare.setAttribute('species', xml.response[x].species);
        newSquare.setAttribute('year', xml.response[x].yearOfBirth);
        newSquare.setAttribute('wiz', xml.response[x].wizard);
        newSquare.setAttribute('favorited', false);

        var newImage = document.createElement('img');
        newImage.setAttribute('src', xml.response[x].image);
        newImage.setAttribute('class', 'image');

        newSquare.appendChild(newImage);

        var newName = document.createElement('div');
        newName.setAttribute('class', 'name');
        newName.textContent = xml.response[x].name;

        newSquare.appendChild(newName);

        var newHeart = document.createElement('i');
        newHeart.setAttribute('class', 'uHeart fa fa-heart-o');

        newSquare.appendChild(newHeart);

        userList.append(newSquare);

      }

    }

  });
  xml.send();
}
getCharList();

dropD.addEventListener('change', filter, false);

function filter() {
  for (var i = 0; i < userList.children.length; i++) {
    if (dropD.value === 'All') {
      userList.children[i].setAttribute('class', 'square');
    } else {

      if (userList.children[i].getAttribute('houseId') === dropD.value) {
        userList.children[i].setAttribute('class', 'square');
      } else {
        userList.children[i].setAttribute('class', 'hidden');
      }

    }
  }

}

var button = document.querySelector('.main-nav');
var allTab = document.getElementById('frontview');
var detailTab = document.querySelector('#detailId');
var header = document.querySelector('.head');

header.addEventListener('click', home, false);

function home(event) {
  if (event.target && event.target.matches('.head')) {
    allTab.className = '';
    detailTab.className = 'hidden';
    button.textContent = 'FAVORITES';
  }
}

button.addEventListener('click', changeTab, false);

function changeTab(event) {
  if (event.target && event.target.matches('.main-nav')) {
    if (button.textContent === 'ALL') {
      allTab.className = '';
      detailTab.className = 'hidden';
      button.textContent = 'FAVORITES';
    } else {
      allTab.className = 'hidden';
      // ADD CODE FOR FAVORITES TAB HERE//
      button.textContent = 'ALL';
    }

  }
}

var squareC = document.querySelector('ul');
var detailN = document.getElementById('dName');
var detailA = document.getElementById('dActor');
var detailY = document.getElementById('dYear');
var detailW = document.getElementById('dWiz');
var detailH = document.getElementById('dHouse');
var detailS = document.getElementById('dSpecies');
var detImg = document.querySelector('.detail-img');
var heart = document.querySelector('.heart');

squareC.addEventListener('click', navigation, false);

function navigation(event) {
  if ((event.target && event.target.matches('.image')) || (event.target && event.target.matches('.name'))) {
    allTab.className = 'hidden';
    detailTab.className = 'details';

    detailN.textContent = 'Name: ' + event.target.parentElement.getAttribute('name');
    detailA.textContent = 'Actor: ' + event.target.parentElement.getAttribute('actor');
    detailS.textContent = 'Species: ' + event.target.parentElement.getAttribute('species').charAt(0).toUpperCase() + event.target.parentElement.getAttribute('species').slice(1);
    detailY.textContent = 'Year of Birth: ' + event.target.parentElement.getAttribute('year');
    detailW.textContent = 'Wizard: ' + event.target.parentElement.getAttribute('wiz').charAt(0).toUpperCase() + event.target.parentElement.getAttribute('wiz').slice(1);
    detailH.textContent = 'House: ' + event.target.parentElement.getAttribute('houseId');

    detImg.setAttribute('src', event.target.parentElement.firstChild.getAttribute('src'));

    if (event.target.getAttribute('favorited') === true) {
      heart.setAttribute('class', 'heart fa fa-heart');
    } else if (event.target.getAttribute('favorited') === false) {
      heart.setAttribute('class', 'heart fa fa-heart-o');
    }

    button.textContent = 'ALL';

  } else if (event.target && event.target.matches('.uHeart')) {
    event.target.setAttribute('class', 'fHeart fa fa-heart');
    event.target.setAttribute('favorited', true);
  } else if (event.target && event.target.matches('.fHeart')) {
    event.target.setAttribute('class', 'uHeart fa fa-heart-o');
    event.target.setAttribute('favorited', false);
  }
}

heart.addEventListener('click', favorite, false);

function favorite(event) {
  if ((event.target && event.target.matches('.heart'))) {
    if (event.target.getAttribute('class') === 'heart fa fa-heart-o') {
      event.target.setAttribute('class', 'heart fa fa-heart');
    } else {
      event.target.setAttribute('class', 'heart fa fa-heart-o');
    }
  }
}
