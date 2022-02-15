var userList = document.querySelector('#char-list');

function getCharList() {
  var xml = new XMLHttpRequest();
  xml.open('GET', 'http://hp-api.herokuapp.com/api/characters');
  xml.responseType = 'json';

  xml.addEventListener('load', function () {
    console.log(xml.status);
    console.log(xml.response);

    for (let x = 0; x <= xml.response.length - 1; x++) {
      if (xml.response[x].image !== ''){
      var newSquare = document.createElement('div');
      newSquare.setAttribute('class', 'square');

      var newImage = document.createElement('img');
      newImage.setAttribute('src',xml.response[x].image);
      newImage.setAttribute('class', 'image');

      newSquare.appendChild(newImage);

      var newName = document.createElement('div');
      newName.setAttribute('class', 'name');
      newName.textContent = xml.response[x].name;

      newSquare.appendChild(newName);

      userList.append(newSquare);
      }

    }

  });
  xml.send();
}

getCharList();
