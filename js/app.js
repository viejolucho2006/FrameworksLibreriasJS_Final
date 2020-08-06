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
	min = Math.ceil(min); // devuelve entero mayor o igual
	max = Math.floor(max); // devuelve el maximo entero igual o menor al numero
	return Math.floor(Math.random() * (max - min)) + min;
}



//Muestra caramelos en pantalla
function tablero() {
	llenado();
}


function llenado() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var caramelos = $(this).children().length;
		var agrega = top - caramelos;
		for (var i = 0; i < agrega; i++) {
			var caramelo = Randomica(1, 5);
			if (i === 0 && caramelos < 1) {
				$(this).append('<img src="image/' + caramelo + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + caramelo + '.png" class="element"></img>');
			}
		}
	});
}



// inicia el juego
function inicia_juego() {

	colorMatch('h1.main-titulo');	
	
	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		tablero();
		$(this).text('Reiniciar');
	});

}	

// Prepara el juego
$(function() {
	inicia_juego();
});

	
	

