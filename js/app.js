//animación que cambia el color de match game
function colorMatch(selector) {
	$(selector).animate({
			opacity: '0.5',
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'blue');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'red');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'blue');
				colorMatch('h1.main-titulo');
			},
			queue: true
		});
}


// inicia el juego
function inicia_juego() {

	colorMatch('h1.main-titulo');	

}	

// Prepara el juego
$(function() {
	inicia_juego();
});

	
	

