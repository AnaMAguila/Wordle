let numeroAleatorio = parseInt(Math.random() * (palabra.length - 0) + 0);
let palabraGenerada = palabra[numeroAleatorio];
let arrayGenerada = palabraGenerada.split(''); //convertimos la palabra en un array
let arrayEscrita = [];
let bloqueaCasillas = 0;
let intentos = 0;

// ESTO NO LO PUEDE VER EL JUGADOR!! PARA ELIMINAR!!!
console.log(palabra[numeroAleatorio]);

function partidaGanada(){
    document.getElementById("solucion").innerHTML = "HAS ADIVINADO LA PALABRA!! ENHORABUENA!!!"
    bloqueaCasillas = 1;   
}

function partidaPerdida(){
    document.getElementById("solucion").innerHTML = "HAS AGOTADO TODOS TUS INTENTOS. LA PALABRA ERA: " + palabraGenerada; 
    bloqueaCasillas = 1;   
}

function pintaCasilla(fila, columna){
    let acertadas = 0;
    let encontrada;
    let duplicada;
    let idInput = ""; 
   
    //recorremos el array de la palabra introducida    
    for(let i=0; i<5; i++ ){        
        //si da -1 no la ha encontrado en el array generado
        encontrada = arrayGenerada.indexOf(arrayEscrita[i]);

        //si una letra se repite, se para en el primer puesto aunque esté en el lugar correcto
        //aquí busco el siguiente lugar
        duplicada = arrayGenerada.indexOf(arrayEscrita[i], arrayGenerada.indexOf(arrayEscrita[i]) + 1);

        idInput = "Fil" + fila + "Col" + i;         

        if(encontrada==i){ //si la letra es acertada y está en la misma posición
            acertadas++;            
            document.getElementById(idInput).style.backgroundColor = '#A8EB12';

        }else if(encontrada>=0){ //si la ha encontrado pero no está en la posición correcta
            if(duplicada==i){ //si es una letra que se repite y está en el lugar correcto
                acertadas++;
                document.getElementById(idInput).style.backgroundColor = '#A8EB12';
            }else{ //si la letra no está en el lugar correcto
                document.getElementById(idInput).style.backgroundColor = '#EFDD32';
            }
        }else{ // si la letra no se encuentra en el array generado
                document.getElementById(idInput).style.backgroundColor = '#bbb';
       
    } 

    intentos++;

    if(intentos==6){
        partidaPerdida();
    }

    if(acertadas==5){
        partidaGanada();
    }
}


function saltaSiguiente(fila, columna){
    let idInput = "Fil" + fila + "Col" + columna;
    let tecla;
    let teclaAscii;
    
    tecla = document.getElementById(idInput).value.toUpperCase();
    teclaAscii = tecla.charCodeAt();

    //si el usuario ha escrito una letra
    if(teclaAscii>=65 && teclaAscii<=90){
        //guardamos la letra escrita en un array
        arrayEscrita.push(tecla); 

        //deshabilitamos la casilla escrita
        document.getElementById(idInput).disabled = true;
        
        if(columna==4){ //si es la última casilla...
            pintaCasilla(fila,columna);    
            idInput = "Fil" + (fila+1) + "Col0";
            
            //vaciamos el array de escritas
            arrayEscrita.splice(0, arrayEscrita.length);
        }else{
            idInput = "Fil" + fila + "Col" + (columna+1);         
        } 
        
        //habilitamos la siguiente casilla y le damos el foco si no ha acertado la palabra
        if(bloqueaCasillas==0){
            document.getElementById(idInput).disabled = false;
            document.getElementById(idInput).focus();
        }  
    }else{ //si el usuario ha escrito un número o un símbolo
        //borramos el input
        document.getElementById(idInput).value = '';
    }    
}