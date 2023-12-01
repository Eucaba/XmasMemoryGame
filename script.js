//variables:
let uncoveredCards = 0;
let card1 = null;
let card2 = null;
let card1Content = null;
let card2Content = null;
let hits = 0;
let scoreboard = document.getElementById('hits');
let movements = 0;
let movementsMeter = document.getElementById('movements');
let timer = false;
let timeLeft = 60;
let clock = document.getElementById('time');
let regressiveTime = null;
let inicialTime = 60;

/*generamos el arreglo de números necesarios para poder emparejar las "cartas" del juego*/
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]
/* "barajamos" los números con el algoritmo de Fisher-Yates:
--> Math.random() - 0.5 produce orden aleatorio con números positivos y negativos de -0.5 a 0.5
(sino por defecto los produce entre 0 y 1 y son todos positivos)
--> .sort() ordena arrays por orden alfabético o el que le des tú
*/
numbers = numbers.sort(() => { return Math.random() - 0.5 });
console.log(numbers);

//funciones "auxuliares" (por decir algo)
function mesureTime(){
  regressiveTime = setInterval(()=>{ 
    timeLeft--;
    clock.innerHTML=`Tiempo restante: ${timeLeft} segundos`;
    if (timeLeft == 0){
      clearInterval(regressiveTime);
      uncoverAndBlock();
    }
  },1000);
} /* setInterval(()=>{}, n)
--> {} = función obviously
--> n = intervalo en milisegundos 
--> setInterval evuelve un identificadorpara referenciarlo, lo recogemos en regressiveTime*/

function uncoverAndBlock(){
  for (let i = 0; i < numbers.length; i++){
    let cosita = 100*i;
    setInterval(()=>{
      let blockedCard = document.getElementById(i)
      blockedCard.disabled = true;
      blockedCardContent = numbers[i];
      blockedCard.innerHTML = blockedCardContent;
    }, cosita);
  } 
}

//función principal
function uncover(id) {

  if (timer == false){
    mesureTime();
    timer = true;
  }

  uncoveredCards++;
  console.log(uncoveredCards);
  /*en ambos casos al recibir el id desde el botón lo usamos para inyectarle al botón de html el contenido
  que le corresponda teniendo en cuenta el arreglo de números barajados y "desactivamos" el botón por el momento*/

  if (uncoveredCards == 1) {
    card1 = document.getElementById(id);
    card1Content = numbers[id];
    card1.innerHTML = card1Content;
    card1.disabled = true;

  } else if (uncoveredCards == 2) {
    card2 = document.getElementById(id);
    card2Content = numbers[id];
    card2.innerHTML = card2Content;
    card2.disabled = true;
    movements++; //al levantar tarjeta sumamos un nuevo movimiento (el juego funciona por parejas de cartas)
    console.log(movements);
    movementsMeter.innerHTML = `Movimientos: ${movements}`;

    /* a continuación miramos si las dos cartas destapadas son iguales
    --> si son iguales: summamos el punto
    --> si no son iguales: después de un momento desbloqueamos buttons y "las ponemos bocabajo" de nuevo 
    --> en ambos casos: reseteamos contador de uncoveredCards para repetir todo el proceso con siguiente par de cartas*/
    if (card1Content == card2Content) {
      hits++;
      console.log(hits);
      scoreboard.innerHTML = `Aciertos: ${hits}`;
      uncoveredCards = 0;

      if (hits == 10) {
        clearInterval(regressiveTime);
        scoreboard.innerHTML = `Aciertos: ${hits} ¡GANASTE!`;
        movementsMeter.innerHTML = `Movimientos FINALES: ${movements}`;
        clock.innerHTML = `¡Lo has logrado en  ${inicialTime - timeLeft} segundos!`;
      }

    } else {
      setTimeout(() => { //setTimeout funciona = a setInterval
        card1.innerHTML = ' ';
        card2.innerHTML = ' ';
        card1.disabled = false;
        card2.disabled = false;
        uncoveredCards = 0;
      }, 700)
    }
  }

}