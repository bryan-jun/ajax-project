/* exported data */
var data = {
  view: 'all',
  favorites: [],
  nextId: 1
};

var previousDataJSON = localStorage.getItem('javascript-local-storage');

if(previousDataJSON !== null){
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', beforeunloadF, false);

function beforeunloadF(event){
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
