/* global game */

var Technotip = {};

Technotip.Menu = function (game) {
	let numeroAle;
	let numeroAle2;
	let estrella;
	let sustraerLetraInicial;
	let palabra;
	var lienzo2;
	let letraPrecionada;
	let contadorImagenes;
};

Technotip.Menu.prototype = {
	init: function (datosLink) {
		this.puntos = 0;
		contador = 0;

		/*Usado para selecciona la vocal*/
		arreAbecedario = [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
		];

		posx = 0;
		posy = 650;
		posx2 = 342;

		this.estrella;
		numeroSeleccionado = [];
		contadoBuenas = 0;
		contadorVueltas = 0;
		activarWhile = true;
		activarFinal = false;

		palabrasSeleccionadas = [];
		arregloZona = [];

		contadorImagenes = -1;
	},
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		/*Cargar sonidos de muy bien*/

		game.load.audio('instruccion', 'audio/instrucciones.mp3');
		// game.load.audio('sonMalo','audio/intenta_otra_vez.mp3')
		game.load.audio('muybien', 'audio/muy bien.mp3');

		/*Cargar las imagenes de bueno*/
		game.load.image('bocina', 'img/bocina.png');
		game.load.image('comenzar', 'img/cartas-31.png');
		game.load.image('zona', 'img/recursos.png');
		game.load.atlasJSONHash('images', 'img/imagenes.png', 'img/imagenes.json');
		game.load.atlasJSONHash('caritas', 'img/caritas.png', 'img/caritas.json');
	},
	create: function () {
		this.instruccionesFx = this.add.audio('instruccion', 1, false);
		this.muybienFX = this.add.audio('muybien', 1, false);
		this.sonMaloFX = this.add.audio('sonMalo', 1, false);
		/*Color del fondo*/
		this.game.stage.backgroundColor = '#ffffff';
		/*Codigo para el fondo*/
		fondo = game.add.sprite(0, 0, 'images', 'fondo');
		this.generaFondo(fondo);

		/*Se colocan las instrucciones y el icono de la bocina*/
		intrucciones = game.add.text(
			275,
			-95,
			'Arrastra las letras con el ratón de acuerdo con el orden alfabético.',
			{
				fontSize: '26px',
				fill: '#404040',
			}
		);
		iconoBocina = game.add.image(200, 25, 'bocina');
		iconoBocina.inputEnabled = true;
		iconoBocina.input.useHandCursor = true;
		iconoBocina.events.onInputOver.add(over, this);
		iconoBocina.events.onInputOut.add(out, this);
		iconoBocina.scale.setTo(0.8);
		iconoBocina.events.onInputDown.add(this.clickIconoBocina, this);
		game.add.tween(intrucciones).to({ y: 35 }, 2000, Phaser.Easing.Bounce.Out, true);

		function over(imagen) {
			imagen.scale.setTo(0.75, 0.75);
			//console.log(imagen.frameName+' | valor: '+imagen.valor);
			this.estoySobre = imagen;
		}
		function out(imagen) {
			//console.log(imagen.frameName);
			imagen.scale.setTo(0.7, 0.7);
			// this.estoySobre=null;
		}

		grupoZonas = game.add.group();
		grupo = game.add.group();
		activadorCronometro = false;
		this.colocarImagen();
	},
	colocarImagen: function () {
		contadorVueltas += 1;

		tren = game.add.sprite(1960, 425, 'images', 'tren');
		tren.anchor.setTo(0.5);
		tren.scale.setTo(1, 1);
		var miTween = game.add.tween(tren).to({ x: 650 }, 2000, Phaser.Easing.Bounce.in, true);

		grupoZonas = game.add.group();

		numeroAle = this.numeroAleatorio(2, 4);
		numRandom = this.numeroAleatorio(0, arreAbecedario.length - 6);
		elementosSustraidos = arreAbecedario.slice(numRandom, numRandom + 6);
		console.log(elementosSustraidos);

		if (numeroAle == 2) {
			arrePosicion = ['zona', 'zona', 'fija', 'fija', 'fija'];
			var i, j, k;
			for (i = arrePosicion.length; i; i--) {
				j = Math.floor(Math.random() * i);
				k = arrePosicion[i - 1];
				arrePosicion[i - 1] = arrePosicion[j];
				arrePosicion[j] = k;
			}
			console.log(arrePosicion);
		} else if (numeroAle == 3) {
			arrePosicion = ['zona', 'zona', 'zona', 'fija', 'fija'];
			var i, j, k;
			for (i = arrePosicion.length; i; i--) {
				j = Math.floor(Math.random() * i);
				k = arrePosicion[i - 1];
				arrePosicion[i - 1] = arrePosicion[j];
				arrePosicion[j] = k;
			}
			console.log(arrePosicion);
		} else if (numeroAle == 4) {
			arrePosicion = ['zona', 'zona', 'zona', 'zona', 'fija'];
			var i, j, k;
			for (i = arrePosicion.length; i; i--) {
				j = Math.floor(Math.random() * i);
				k = arrePosicion[i - 1];
				arrePosicion[i - 1] = arrePosicion[j];
				arrePosicion[j] = k;
			}
			console.log(arrePosicion);
		}

		if (arrePosicion[0] == 'zona') {
			zona1 = game.add.sprite(444, 456, 'zona');
			zona1.key = 0;
			zona1.anchor.setTo(0.5);
			zona1.scale.setTo(0.2, 0.2);
			zona1.alpha = 0;
			arregloZona.push(zona1);
			grupoZonas.add(zona1);
		} else {
			imagen = game.add.sprite(444, 456, 'images', elementosSustraidos[0]);
			imagen.anchor.setTo(0.5);
			imagen.scale.setTo(0.2, 0.2);
			grupoZonas.add(imagen);
		}

		if (arrePosicion[1] == 'zona') {
			zona2 = game.add.sprite(558, 450, 'zona');
			zona2.key = 1;
			zona2.anchor.setTo(0.5);
			zona2.scale.setTo(0.2, 0.2);
			zona2.alpha = 0;
			arregloZona.push(zona2);
			grupoZonas.add(zona2);
		} else {
			imagen = game.add.sprite(558, 450, 'images', elementosSustraidos[1]);
			imagen.anchor.setTo(0.5);
			imagen.scale.setTo(0.2, 0.2);
			grupoZonas.add(imagen);
		}

		if (arrePosicion[2] == 'zona') {
			zona3 = game.add.sprite(670, 446, 'zona');
			zona3.key = 2;
			zona3.anchor.setTo(0.5);
			zona3.scale.setTo(0.2, 0.2);
			zona3.alpha = 0;
			arregloZona.push(zona3);
			grupoZonas.add(zona3);
		} else {
			imagen = game.add.sprite(670, 446, 'images', elementosSustraidos[2]);
			imagen.anchor.setTo(0.5);
			imagen.scale.setTo(0.2, 0.2);
			grupoZonas.add(imagen);
		}

		if (arrePosicion[3] == 'zona') {
			zona4 = game.add.sprite(785, 450, 'zona');
			zona4.key = 3;
			zona4.anchor.setTo(0.5);
			zona4.scale.setTo(0.2, 0.2);
			zona4.alpha = 0;
			arregloZona.push(zona4);
			grupoZonas.add(zona4);
		} else {
			imagen = game.add.sprite(785, 450, 'images', elementosSustraidos[3]);
			imagen.anchor.setTo(0.5);
			imagen.scale.setTo(0.2, 0.2);
			grupoZonas.add(imagen);
		}

		if (arrePosicion[4] == 'zona') {
			zona5 = game.add.sprite(897, 456, 'zona');
			zona5.key = 4;
			zona5.anchor.setTo(0.5);
			zona5.scale.setTo(0.2, 0.2);
			zona5.alpha = 0;
			arregloZona.push(zona5);
			grupoZonas.add(zona5);
		} else {
			imagen = game.add.sprite(897, 456, 'images', elementosSustraidos[4]);
			imagen.anchor.setTo(0.5);
			imagen.scale.setTo(0.2, 0.2);
			grupoZonas.add(imagen);
		}

		if (arrePosicion[5] == 'zona') {
			zona6 = game.add.sprite(1011, 458, 'zona');
			zona6.key = 5;
			zona6.anchor.setTo(0.5);
			zona6.scale.setTo(0.2, 0.2);
			zona6.alpha = 0;
			arregloZona.push(zona6);
			grupoZonas.add(zona6);
		} else {
			imagen = game.add.sprite(1011, 458, 'images', elementosSustraidos[5]);
			imagen.anchor.setTo(0.5);
			imagen.scale.setTo(0.2, 0.2);
			grupoZonas.add(imagen);
		}
		grupoZonas.x = 1300;
		var miTween = game.add.tween(grupoZonas).to({ x: 0 }, 2000, Phaser.Easing.Bounce.in, true);

		grupo = game.add.group();
		for (var i = 0; i < arreAbecedario.length; i++) {
			if (i == 13) {
				posx = 0;
				posy = 750;
			}
			posx += 90;
			letra = game.add.sprite(posx, posy, 'images', arreAbecedario[i]);
			letra.key = arreAbecedario[i];
			letra.inputEnabled = true;
			letra.input.useHandCursor = true;
			letra.events.onInputOver.add(over2, this);
			letra.events.onInputOut.add(out2, this);
			letra.anchor.setTo(0.5);
			letra.scale.setTo(0.2, 0.2);
			primera = this.makeDragObj(letra, arregloZona, true, 20, true, false);
			grupo.add(letra);
		}
		function over2(imagen) {
			imagen.scale.setTo(0.25, 0.25);
			this.estoySobre = imagen;
		}
		function out2(imagen) {
			imagen.scale.setTo(0.2, 0.2);
		}
	},
	/*Funcion para que cuando se le de clic a ala bocina suene las instrucciones*/
	clickIconoBocina: function () {
		this.instruccionesFx.play();
	},
	/*Metodo update*/
	update: function () {
		if (activadorCronometro) {
			contador += 1;
			if (contador == 80) {
				if (contadorVueltas == 10) {
					contador = 0;
					tren.kill();
					grupoZonas.kill();
					grupo.kill();
					activadorCronometro = false;
					arrayZonas = [];
					posx = 0;
					posy = 650;
					this.notedesanimes();
				} else {
					contador = 0;
					tren.kill();
					grupoZonas.kill();
					grupo.kill();
					activadorCronometro = false;
					arrayZonas = [];
					posx = 0;
					posy = 650;
					this.colocarImagen();
				}
			}
		}

		// if(activarFinal){
		//     contador+=1
		//     if(contador==80){
		//       this.notedesanimes()
		//     }
		// }
	},
	render: function () {},
	/*Funciones adicionales*/
	numeroAleatorio: function (min, max) {
		return Math.round(Math.random() * (max - min) + min);
	},

	generaFondo: function (imagen) {
		//imagen = game.add.sprite(0,0,'fondo');
		imagen.height = game.height;
		imagen.width = game.width;
		imagen.anchor.x = 0.5;
		imagen.anchor.y = 0.5;
		imagen.x = game.width * 0.5;
		imagen.y = game.height * 0.5;
	},
	numeroAleatorio3: function (de) {
		return Math.floor(Math.random() * de);
	},

	notedesanimes: function () {
		var delay = 200;
		let arreglo = [
			'CS_correcta_1',
			'CS_correcta_2',
			'CS_correcta_3',
			'CS_correcta_4',
			'CS_correcta_5',
			'CS_correcta_6',
		];

		estrella = game.add.sprite(
			game.width * 0.5,
			game.height * 0.5,
			'caritas',
			arreglo[this.numeroAleatorio3(5)]
		);
		this.ajustaImagen2(estrella);
		estrella.scale.setTo(0, 0);
		estrella.x = game.width * 0.5;
		estrella.y = game.height * 0.5;

		var miTween = game.add
			.tween(estrella.scale)
			.to({ x: 2, y: 2 }, 1000, Phaser.Easing.Bounce.Out, true, delay);
		miTween.onStart.add(borraIcono, this);
		// miTween.onComplete.add(borraIcono, this);
		function borraIcono() {
			this.muybienFX.play();
		}

		setTimeout(this.termianr, 5000);
	},
	makeDragObj: function (
		objeto,
		zonaDestino,
		muestraRetro,
		sensibilidad,
		textFont,
		multiObjecInZone
	) {
		if (zonaDestino.constructor === Array) {
		} else {
			zonaDestino.anchor.setTo(0.5, 0.5);
		}

		objeto.inputEnabled = true;
		//objeto.input.useHandCursor = true;
		if (!textFont) {
			objeto.input.enableDrag(false, true, true); //<---el segundo parametro indica si quieres mover al frente el
		} else {
			objeto.input.enableDrag();
		}
		objeto.events.onDragStart.add(onDragStart, this);
		objeto.events.onDragStop.add(onDragStop, this);
		function onDragStart(sprite, pointer) {}

		function onDragStop(sprite, pointer) {
			if (zonaDestino.constructor === Array) {
				var resultadoTestHit = [];
				resultadoTestHit = objDraggable.compruebaHitenZonas(zonaDestino);

				if (resultadoTestHit[0] == true) {
					objDraggable.colocaObjeto(resultadoTestHit[1]);
					contadoBuenas += 1;
					if (numeroAle == contadoBuenas) {
						contadoBuenas = 0;
						activadorCronometro = true;
					}
				} else {
					objDraggable.regresaAlOrigen();
				}
			} else {
				//------------
				if (objDraggable.proximidadCentros() < numProximidad) {
					var punto = objDraggable.colocaObjeto();
					console.log(this.puntosXimagen);
					console.log(this.puntosAcumulados);
					this.puntosAcumulados = this.puntosAcumulados + punto;
					//console.log(this.puntosAcumulados);

					if (this.puntosXimagen == this.puntosAcumulados) {
						//  this.lanzaEstrella();
					}
				} else {
					objDraggable.regresaAlOrigen();
				}

				//-------------
			}
		}

		var objeto;
		var zonaDestino;
		var muestraRetro;
		var origenx = objeto.x;
		var origeny = objeto.y;
		var cancelaRevision = false;
		var numProximidad = sensibilidad; //a mayor el numero permite mayor margen de error
		var imagenColocada = false;
		var objDraggable = {
			objeto: objeto,
			zonaDestino: zonaDestino,
			muestraRetro: muestraRetro,
			origenx: origenx,
			origeny: origeny,
			cancelaRevision: cancelaRevision,
			imagenColocada: imagenColocada,

			regresaAlOrigen: function () {
				//console.log('estoy regresandoo al origen');
				if (muestraRetro) {
					this.califica('mal');
				}

				var tween = game.add.tween(objeto).to({ x: origenx, y: origeny }, 200, 'Linear', true);
			},

			setPosition: function (valX, valY) {
				origenx = valX;
				origeny = valY;
			},

			proximidadCentros: function () {
				var distancia = Phaser.Math.distance(objeto.x, objeto.y, zonaDestino.x, zonaDestino.y);
				//console.log(distancia);
				return distancia;
			},
			compruebaHitenZonas: function (arrayZonas) {
				for (var a = 0; a < arrayZonas.length; a++) {
					if (
						this.checkOverlap(objeto, arrayZonas[a]) &&
						objeto.key == elementosSustraidos[arrayZonas[a].key]
					) {
						objeto.x = arrayZonas[a].x;
						objeto.y = arrayZonas[a].y;
						return [true, arrayZonas[a]];
					}
				}
				return [false, null];
			},
			checkOverlap: function (spriteA, spriteB) {
				var boundsA = spriteA.getBounds();
				var boundsB = spriteB.getBounds();

				return Phaser.Rectangle.intersects(boundsA, boundsB);
			},

			colocaObjeto: function (zona = null) {
				var punto = 0;
				if (zona != null) {
					if (multiObjecInZone) {
						// console.log('aquiiii');
						objeto.x = game.input.x - grupo.x;
						objeto.y = game.input.y - grupo.y; //zona.y-20;
						//console.log(objeto.frameName+'<-- soy');
						if (
							objeto.frameName == 'chicharron' ||
							objeto.frameName == 'paletas' ||
							objeto.frameName == 'pastel' ||
							objeto.frameName == 'refresco' ||
							objeto.frameName == 'rufles'
						) {
							punto = -1;
						} else {
							punto = 1;
						}
					} else {
						objeto.x = zona.x;
						objeto.y = zona.y;
						//zona.y=-4000;// ese desplaza la zona para que solo puedan poner un elemento en ella
						//zona.destroy();// si se elimina la zona pmanda mensaje de error
					}
				} else {
					if (multiObjecInZone) {
						objeto.x = game.input.x;
						objeto.y = zonaDestino.y - objeto.height * 0.5;
					} else {
						objeto.x = zonaDestino.x;
						objeto.y = zonaDestino.y;
					}
				}

				cancelaRevision = true;
				objeto.inputEnabled = false;
				objeto.input.useHandCursor = false;
				if (muestraRetro) {
					this.califica('bien');
					puntos = 1;
				}
				return puntos;
			},
			actualiza: function () {},
			califica: function (tipo) {
				var icono;
				switch (tipo) {
					case 'bien':
						arregloCaritas = [
							'CS_correcta_1',
							'CS_correcta_2',
							'CS_correcta_3',
							'CS_correcta_4',
							'CS_correcta_5',
							'CS_correcta_6',
						];
						icono = game.add.sprite(
							0,
							0,
							'caritas',
							arregloCaritas[Math.floor(Math.random() * arregloCaritas.length)]
						);

						break;
					case 'mal':
						arregloCaritas = [
							'CS_incorrecta_1',
							'CS_incorrecta_2',
							'CS_incorrecta_3',
							'CS_incorrecta_4',
							'CS_incorrecta_5',
							'CS_incorrecta_6',
						];
						icono = game.add.sprite(
							0,
							0,
							'caritas',
							arregloCaritas[Math.floor(Math.random() * arregloCaritas.length)]
						);
						break;
				}
				icono.anchor.setTo(0.5, 0.5);
				icono.scale.setTo(1);
				icono.x = objeto.x;
				icono.y = objeto.y;
				// el tween recibe el parametro del tiempo en milisegundos
				var tween = game.add
					.tween(icono)
					.to({ alpha: 0, y: objeto.y - 120 }, 800, 'Linear', true);
				tween.onComplete.add(borraIcono, this);
				function borraIcono() {
					icono.destroy();
				}
			},
		};

		return objDraggable;
	},

	onStart: function () {
		this.muybienFX.play();
	},
	onStart2: function () {
		this.sonMaloFX.play();
	},
	termianr: function () {
		game.state.start('Menu');
	},
	ajustaImagen: function (imagen) {
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	ajustaImagen2: function (imagen) {
		imagen.width = imagen.width * 3;
		imagen.heiht = imagen.height * 3;
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	ajustaImagen3: function (imagen) {
		imagen.width = imagen.width;
		imagen.heiht = imagen.height;
		imagen.scale.setTo(1, 1);
		imagen.anchor.setTo(0.5, 0.5); // anchor x y;
	},
	onClickRepetir: function () {
		this.cancelaUpdate = false;
		game.bloque = 0;
		window.location = 'index.html';
	},
	onClickRegresar: function () {
		//game.bloque=1;
		//this.state.start('Menu');
		this.cancelaUpdate = false;
		this.state.start('Blue', true, false, this.datosSeccionAnterior);
	},
	onClicReiniciar: function () {
		this.cancelaUpdate = false;
		this.state.start('b1l5a2', true, false, this.datosSeccionAnterior);
	},
	onClickInicio: function () {
		this.cancelaUpdate = false;
		game.bloque = 0;
		this.state.start('Menu');
	},
};
