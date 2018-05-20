/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise( (resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
    req.addEventListener('load', () => {
      if (req.status < 400){
        resolve( JSON.parse(req.responseText).sort(function(obj1, obj2) {
            if (obj1.name < obj2.name) return -1;
            if (obj1.name > obj2.name) return 1;
            return 0;
          })
        );
      } else{
        reject();
      }
      req.addEventListener('error', reject);
      req.addEventListener('abort', reject);
    });
    req.send();
  });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  if (full.toUpperCase().indexOf(chunk.toUpperCase()) > -1){
    return true;
  } 
  else {
    return false;
  }
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function() {
  // это обработчик нажатия кливиш в текстовом поле
  filterResult.innerHTML = '';
  p.then( towns => {
    if (filterInput.value){
      for(var town of towns){
          if (isMatching(town.name, filterInput.value)) {
              var townDiv = createTownDiv(town);
              filterResult.appendChild(townDiv);
          }
      }
    }
    return towns;
  })
});
function createTownDiv(town){
  var div = document.createElement('div');
  div.textContent = town.name;
  return div;
}
var p = loadTowns();
p.then( towns => {
    loadingBlock.style="display: none;"
    filterBlock.style="display: true;"
    return towns;
})

export {
    loadTowns,
    isMatching
};
