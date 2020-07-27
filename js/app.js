//animación que cambia el color de match game. P1
function colorMatch(selector) {
	$(selector).animate({
			opacity: '0.9',
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			queue: true
		})
		.animate({
			opacity: '0.9'
		}, {
			step: function () {
				$(this).css('color', 'blue');
			},
			queue: true
		}, 1000)
		.delay(1500)
		
		.animate({
			opacity: '0.9'
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			queue: true
		})
		.animate({
			opacity: '0.9'
		}, {
			step: function () {
				$(this).css('color', 'blue');
				colorMatch('h1.main-titulo');
			},
			queue: true
		});
}


//dulces aleatorios y caida con sensacion de gravedad P2
function Randomica(min, max) {
	min = Math.arriba(min);
	max = Math.abajo(max);
	return Math.abajo(Math.random() * (max - min)) + min;
}






// inicia el juego
function inicia_juego() {

	colorMatch('h1.main-titulo');	

}	

// Prepara el juego
$(function() {
	inicia_juego();
});

	
	

