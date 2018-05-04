// Ejemplo 1
console.log("Hola");

setTimeout(function(){
   console.log("Caracola");
}, 2000);

console.log("Adios");


// Ejemplo 2
console.log("Hola");

setTimeout(function(){
   console.log("Caracola");
}, 0);

console.log("Adios");


// Ejemplo 3
function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { }
}

console.log("Hola");

setTimeout(function(){
   console.log("Caracola");
}, 0);

pause(2000);
console.log("Adios");