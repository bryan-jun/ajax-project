var data = {
  view: 'all',
  entries: [],
  nextEntryId: 1,
  favorites: []
};

function renderChars(entry) {

  var newSquare = document.createElement('div');
  newSquare.setAttribute('class', 'square');
  newSquare.setAttribute('id', entry.nextEntryId);
  newSquare.setAttribute('houseId', entry.houseId);
  newSquare.setAttribute('name', entry.name);
  newSquare.setAttribute('actor', entry.actor);
  newSquare.setAttribute('species', entry.species);
  newSquare.setAttribute('year', entry.year);
  newSquare.setAttribute('wiz', entry.wiz);
  newSquare.setAttribute('favorited', false);

  var newImage = document.createElement('img');
  newImage.setAttribute('class', 'image');
  newImage.setAttribute('src', entry.img);

  newSquare.appendChild(newImage);

  var newName = document.createElement('div');
  newName.setAttribute('class', 'name');
  newName.textContent = entry.name;

  newSquare.appendChild(newName);

  var newHeart = document.createElement('i');
  newHeart.setAttribute('class', 'allUHeart fa fa-heart-o');

  newSquare.appendChild(newHeart);

  return newSquare;

}

var userList = document.querySelector('#char-list');

addEventListener('DOMContentLoaded', addEntries, false);

function addEntries() {
  var xml = new XMLHttpRequest();
  xml.open('GET', 'http://hp-api.herokuapp.com/api/characters');
  xml.responseType = 'json';

  xml.addEventListener('load', function () {
    for (let x = 0; x <= xml.response.length - 1; x++) {
      if (xml.response[x].image !== '') {
        var entry = {
          houseId: xml.response[x].house,
          name: xml.response[x].name,
          actor: xml.response[x].actor,
          species: xml.response[x].species,
          year: xml.response[x].yearOfBirth,
          wiz: xml.response[x].wizard,
          img: xml.response[x].image
        };

        entry.nextEntryId = data.nextEntryId;
        data.nextEntryId += 1;
        data.entries.push(entry);

        var newSq = renderChars(entry);
        userList.append(newSq);
      }
    }

  });
  xml.send();
}

var dropD = document.getElementById('dropDown');

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
    for (var i = 0; i < userList.children.length; i++) {
      userList.children[i].setAttribute('class', 'square');
    }
    for (var x = 0; x < userList.children.length - 1; x++) {
      if (data.favorites.includes(userList.children[x].getAttribute('id'))) {
        userList.children[x].lastChild.setAttribute('class', 'allFHeart fa fa-heart');
      } else {
        userList.children[x].lastChild.setAttribute('class', 'allUHeart fa fa-heart-o');
      }

    }

  }

}

button.addEventListener('click', changeTab, false);

function changeTab(event) {
  if (event.target && event.target.matches('.main-nav')) {
    if (button.textContent === 'ALL') {
      allTab.className = '';
      detailTab.className = 'hidden';
      button.textContent = 'FAVORITES';
      for (var x = 0; x < userList.children.length - 1; x++) {
        userList.children[x].setAttribute('class', 'square');
        if (data.favorites.includes(userList.children[x].getAttribute('id'))) {
          userList.children[x].lastChild.setAttribute('class', 'allFHeart fa fa-heart');
        } else {
          userList.children[x].lastChild.setAttribute('class', 'allUHeart fa fa-heart-o');
        }

      }
    } else if (button.textContent === 'FAVORITES') {
      for (var i = 0; i < userList.children.length; i++) {
        if (data.favorites.includes(userList.children[i].getAttribute('id'))) {
          userList.children[i].setAttribute('class', 'square');
        } else {
          userList.children[i].setAttribute('class', 'hidden');
        }

      }
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
    button.textContent = 'ALL';

    detailN.textContent = 'Name: ' + event.target.parentElement.getAttribute('name');
    detailA.textContent = 'Actor: ' + event.target.parentElement.getAttribute('actor');
    detailS.textContent = 'Species: ' + event.target.parentElement.getAttribute('species').charAt(0).toUpperCase() + event.target.parentElement.getAttribute('species').slice(1);
    detailY.textContent = 'Year of Birth: ' + event.target.parentElement.getAttribute('year');
    detailW.textContent = 'Wizard: ' + event.target.parentElement.getAttribute('wiz').charAt(0).toUpperCase() + event.target.parentElement.getAttribute('wiz').slice(1);
    detailH.textContent = 'House: ' + event.target.parentElement.getAttribute('houseId');
    detailTab.setAttribute('id', event.target.parentElement.getAttribute('id'));

    detImg.setAttribute('src', event.target.parentElement.firstChild.getAttribute('src'));

    if (data.favorites.includes(event.target.parentElement.getAttribute('id')) === true) {
      heart.setAttribute('class', 'heart detailFHeart fa fa-heart');
    } else {
      heart.setAttribute('class', 'heart detailUHeart fa fa-heart-o');
    }
  }

  if (event.target && event.target.matches('.allUHeart')) {
    event.target.setAttribute('class', 'allFHeart fa fa-heart');
    data.favorites.push(event.target.parentElement.getAttribute('id'));

  } else if (event.target && event.target.matches('.allFHeart')) {
    event.target.setAttribute('class', 'allUHeart fa fa-heart-o');
    var index = data.favorites.indexOf(event.target.parentElement.getAttribute('id'));
    data.favorites.splice(index, 1);
  }
}

detailTab.addEventListener('click', favorite, false);

function favorite(event) {
  if (event.target && event.target.matches('.detailUHeart')) {
    event.target.setAttribute('class', 'heart detailFHeart fa fa-heart');
    data.favorites.push(detailTab.getAttribute('id'));
  } else if (event.target && event.target.matches('.detailFHeart')) {
    event.target.setAttribute('class', 'heart detailUHeart fa fa-heart-o');
    var index = data.favorites.indexOf(detailTab.getAttribute('id'));
    data.favorites.splice(index, 1);
  }
}
