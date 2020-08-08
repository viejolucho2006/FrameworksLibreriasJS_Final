//Punto1 animación que cambia el color de match game.
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


//Punto2 dulces aleatorios y caida con sensacion de gravedad
function Randomica(min, max) {
	min = Math.ceil(min); // devuelve entero mayor o igual
	max = Math.floor(max); // devuelve el maximo entero igual o menor al numero
	return Math.floor(Math.random() * (max - min)) + min;
}

//guardar información de filas o columnas
function arregloDulces(arrayType, index) {
	var col1 = $('.col-1').children();
	var col2 = $('.col-2').children();
	var col3 = $('.col-3').children();
	var col4 = $('.col-4').children();
	var col5 = $('.col-5').children();
	var col6 = $('.col-6').children();
	var col7 = $('.col-7').children();

	var agrupaCol =$([
		col1,
		col2,
		col3,
		col4,
		col5,
		col6,
		col7
	]);
	
	if (typeof index== 'number') {
		var agrupaFil = $([
			col1.eq(index),
			col2.eq(index),
			col3.eq(index),
			col4.eq(index),
			col5.eq(index),
			col6.eq(index),
			col7.eq(index),
		]);
	} else{
		index = '';
	}

	if (arrayType == 'columnas'){
		return agrupaCol;
	}else if (arrayType == 'filas' && index !== '') {
		return agrupaFil;
	}
} 


// organizar las filas y columnas
function Filas(index) {
	var fila = arregloDulces('filas', index);
	return fila;
}

function Columnas(index) {
	var columna = arregloDulces('columnas');
	return columna[index];
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

	
	

