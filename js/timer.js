var seconds = 120; //número de segundos a contar

window.onload = function(){
	document.getElementById("boton1").onclick=inicio;
	conteo=document.getElementById("timer");
}

function inicio(){ 
	function conteo() {
	  var minutes = Math.round((seconds - 30)/60); //calcula el número de minutos
	  var remainingSeconds = seconds % 60; //calcula los segundos
	  //si los segundos usan sólo un dígito, añadimos un cero a la izq
	  if (remainingSeconds < 10) { 
		remainingSeconds = "0" + remainingSeconds; 
	  } 
	  document.getElementById('timer').innerHTML = "0"+minutes + ":" +     remainingSeconds;  // formato de tiempo
	  if (seconds == 0) { 
		clearInterval(countdownTimer); 
		$('div.panel-tablero, div.time').hide();
		$('h1.main-titulo').addClass('title-over').text('Gracias por jugar!');
		$('div.score, div.moves, div.panel-score').width('100%');
	  } else { 
		seconds--; 
	  } 
	} 

	var countdownTimer = setInterval(conteo, 1000); //actualizar la vista de la cuenta regresiva
}
