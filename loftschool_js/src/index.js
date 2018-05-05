/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var o1 = [];
  for (var i = 0; i < array.length; i++) {
    o1.push(fn(array[i], i, array));
  }
  return o1;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {  
  var returnVal = initial, i = 0;
  if (returnVal === undefined){
    returnVal = array[0];
    i++;
  }
  for (i; i < array.length; i++) {
    returnVal = fn.call(null, returnVal, array[i], i, array);
  }
  return returnVal;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  var o1 = [];
  for (var name in obj){
    o1.push(name.toUpperCase());
  }
  return o1;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
  var a1 = [];
  if (to > array.length){
    to = array.length; 
  }
  if (from < 0){
    from = array.length + from; 
    if (from < 0){
      from = 0;
    }
  }
  if (to < 0){
    to = array.length + to; 
  }
  for (var i = from; i < to; i++) {
    a1.push(array[i]);
  }
  return a1;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  var proxy = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value * value;
      return true;
    }
  });
  return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
