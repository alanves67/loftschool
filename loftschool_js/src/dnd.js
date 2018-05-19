/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  var newDiv = document.createElement('div');
  newDiv.className = "draggable-div";
  newDiv.style.color = randomColor();
  newDiv.style.backgroundColor = randomColor();
  newDiv.style.top =  Math.floor(Math.random() * 600) + "px";
  newDiv.style.left =  Math.floor(Math.random() * 1200) + "px";
  newDiv.style.width =  Math.floor(Math.random() * 1200) + "px";
  newDiv.style.height =  Math.floor(Math.random() * 600) + "px";
  newDiv.style.position = 'absolute';
  newDiv.draggable = true;
  homeworkContainer.appendChild(newDiv);
  return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
  var bMouseDownFlag = false;
  target.addEventListener('dragstart', e => {
    bMouseDownFlag = true;
    var shiftX = e.pageX - (target.getBoundingClientRect().left + pageXOffset);
    var shiftY = e.pageY - (target.getBoundingClientRect().top + pageYOffset);

    function moveAt(e) {
      target.style.left = e.pageX - shiftX + 'px';
      target.style.top = e.pageY - shiftY + 'px';
    }

    document.addEventListener( 'drop', e => {
        if (bMouseDownFlag) {
            e.preventDefault();
            moveAt(e);
        }
    })
    document.addEventListener( 'dragover', e => {
        if (bMouseDownFlag) {
            e.preventDefault();
        }
    });
  });  
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
