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


//Revisar los dulces que se eliminaran en la columna
function revisaCol() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var posicionCar = [];
		var posicion2 = [];
		var columna = Columnas(j);
		var compara = columna.eq(0);
		var espacio = false;
		for (var i = 1; i < columna.length; i++) {
			var origenComp = compara.attr('src');
			var origenC = columna.eq(i).attr('src');

			if (origenComp != origenC) {
				if (posicionCar.length >= 3) {
					espacio = true;
				} else {
					posicionCar = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!espacio) {
						posicionCar.push(i - 1);
					} else {
						posicion2.push(i - 1);
					}
				}
				if (!espacio) {
					posicionCar.push(i);
				} else {
					posicion2.push(i);
				}
				counter += 1;
			}
			compara = columna.eq(i);
		}
		if (posicion2.length > 2) {
			posicionCar = $.merge(posicionCar, posicion2);
		}
		if (posicionCar.length <= 2) {
			posicionCar = [];
		}
		contar = posicionCar.length;
		if (contar >= 3) {
			borraCol(posicionCar, columna);
			puntuacion(contar);
		}
		
	}
}
function borraCol(posicionCar, columna) {
	for (var i = 0; i < posicionCar.length; i++) {
		columna.eq(posicionCar[i]).addClass('delete');
	}
}



//Revisar los dulces que se eliminaran en la fila
function revisaFil() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var posicionCar = [];
		var posicion2 = [];
		var fila = Filas(j);
		var compara = fila[0];
		var espacio = false;
		for (var i = 1; i < fila.length; i++) {
			var origenComp = compara.attr('src');
			var origenC = fila[i].attr('src');

			if (origenComp != origenC) {
				if (posicionCar.length >= 3) {
					espacio = true;
				} else {
					posicionCar = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!espacio) {
						posicionCar.push(i - 1);
					} else {
						posicion2.push(i - 1);
					}
				}
				if (!espacio) {
					posicionCar.push(i);
				} else {
					posicion2.push(i);
				}
				counter += 1;
			}
			compara = fila[i];
		}
		if (posicion2.length > 2) {
			posicionCar = $.merge(posicionCar, posicion2);
		}
		if (posicionCar.length <= 2) {
			posicionCar = [];
		}
		contar = posicionCar.length;
		if (contar >= 3) {
			borraFil(posicionCar, fila);
			puntuacion(contar);
		}
	}
}
function borraFil(posicionCar, fila) {
	for (var i = 0; i < posicionCar.length; i++) {
		fila[posicionCar[i]].addClass('delete');
	}
}



//Puntuacion del juego
function puntuacion(contar) {
	var puntos = Number($('#puntos-text').text());
	switch (contar) {
		case 3:
			puntos += 25;
			break;
		case 4:
			puntos += 50;
			break;
		case 5:
			puntos += 75;
			break;
		case 6:
			puntos += 100;
			break;
		case 7:
			puntos += 200;
	}
	$('#score-text').text(puntos);
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
	moverDulce();
	validarIguales();
}

// verifica los caramelos que se pueden borrar
function validarIguales() {
	revisaCol();
	revisaFil();
	//Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		borradoAutomatico();
	}
	
}


// Efectos de movimiento.
function moverDulce(){
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		grid: [75, 75],
		zIndex: 15,
	});
	
	$('img').droppable({  //llamar  a la funcion de intercambio
		drop: intecambioC
	});
	
	activarMover();
}

function desactivarMover() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}


function activarMover() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//Cuando arrastramos el caramelo reemplaza en la posicion para intercambio
function intecambioC(event, arrastre) {
	var arrastre = $(arrastre.draggable);
	var arrastreO = arrastre.attr('src');
	var soltar = $(this);
	var soltarO = soltar.attr('src');
	arrastre.attr('src', arrastreO );
	soltar.attr('src', soltarO);
	
	setTimeout(function () {
		tablero();
		if ($('img.delete').length === 0) {
			arrastre.attr('src', arrastreO);
			soltar.attr('src', soltarO);
		} else {
			updateMoves();
		}
	}, 500);
	
}


//Si los elementos se juntan desaparecen automaticamente
function comprobar(result) {
	if (result) {
		tablero();
	}
}


function borradoAutomatico() {
	desactivarMover();
	$('img.delete').effect('pulsate', 200);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 150
		})
		.animate({
			opacity: '0'
		}, {
			duration: 200,
			complete: function () {
				borrarCaramelo()
					.then(comprobar)
					.catch(mostrarError);
			},
			queue: true
		});
}

function mostrarError(error) {
	console.log(error);
}

function borrarCaramelo() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar...');
		}
	})
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

	
	

