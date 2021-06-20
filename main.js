//Array con el listado de canciones a mostrar en el reprodutor
const canciones = [
  "acoustic-breeze.mp3",
  "a-new-beginning.mp3",
  "better-days.mp3",
  "creative-minds.mp3",
  "going-higher.mp3",
  "memories.mp3",
  "once-again.mp3",
  "sunny.mp3",
  "sweet.mp3",
  "tenderness.mp3",
  "the-lounge.mp3",
  
  ]
  var indiceActual = new Array(1)
  //Funcion para crear mediante javascript el listado de canciones
  function crearPlayList(){
    const listado = document.createElement('ol')
    listado.setAttribute("id", 'listadoMusica')
    for (var i = 0; i<canciones.length; i++){
      const item = document.createElement('li')
      item.appendChild(document.createTextNode(canciones[i])) 
      item.setAttribute("id", canciones.indexOf(canciones[i]))
      listado.appendChild(item)
    }
    return listado
  }
  document.getElementById('playList').appendChild(crearPlayList())
   
  var listadoMusica= document.getElementById('listadoMusica')
  listadoMusica.onclick = (e) =>{
    const itemClick = e.target
    removeActive()
    itemClick.classList.add("active");
    reproduccionActual("Reproduciendo: "+ itemClick.innerText)
    loadMusic(itemClick.innerText)
    player.play()
    indiceActual[0]= e.target.id
    classIconPlay();
   
  }
  //Funcion para cambiar el icono del reprodutor
  function classIconPlay(){
    var element = document.getElementById("iconPlay")
    element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
  }
  //Funcion para control del volumen
  const volumen= document.getElementById("volumen")
  volumen.oninput= (e) =>{
    const vol = e.target.value
    player.volume =vol
  }
  
  //Funcion para actualizar la barra de progreso del reprodutor
  const updateProgress = () =>{
    if (player.currentTime >0){
      const barra = document.getElementById('progress')
      barra.value = (player.currentTime / player.duration) * 100
      
      var duracionSegundos= player.duration.toFixed(0);
      dura=secondsToString(duracionSegundos);
      var actualSegundos = player.currentTime.toFixed(0)
      actual=secondsToString(actualSegundos);
      
      duracion= actual +' / '+ dura
      document.getElementById('timer').innerText=duracion 
    }
    if (player.ended){
      nextMusic();//Reproducir la siguiente pista
    } 
  }

  //Funcion para reproducir la proxima cancion
  function nextMusic(){  
    const source = document.getElementById('source');
    var musicaActual= Number(indiceActual[0]);
    if (canciones.length == (musicaActual+1)){
      var siguiente = 0
    } else {
      var siguiente = musicaActual + 1
    }
    removeActive()
    var item=document.getElementById(siguiente)
    item.classList.add("active");
    loadMusic(canciones[siguiente]);
    player.play()
    indiceActual[0]= siguiente
    reproduccionActual("Reproduciendo: "+ canciones[siguiente])
    classIconPlay()
  }

  //Funcion para reproducir la cancion anterior
  function prevMusic(){  
    const source = document.getElementById('source');
    var musicaActual= Number(indiceActual[0]);
    if (musicaActual==0){
      var anterior= canciones.length - 1
    } else {
      var anterior = musicaActual - 1
    }
    removeActive()
    var item=document.getElementById(anterior)
    item.classList.add("active");
    loadMusic(canciones[anterior]);
    player.play()
    indiceActual[0]= anterior
    reproduccionActual("Reproduciendo: "+ canciones[anterior])
    classIconPlay()
  }

  //Funcion para remover todas las clases css activas
  function removeActive(){
    var elems = document.querySelectorAll(".active");
      [].forEach.call(elems, function(el) {
        el.classList.remove("active");
      });
      return elems
  }
  //Funcion para mostrar el nombre del arhivo actual en reproduccion
  function reproduccionActual(texto){
    document.getElementById('currentPlay').innerText=texto
  }
  //Funcion para cargar las canciones en el reproductor
  function loadMusic(ruta){
    var source = document.getElementById('source')
    var folder ="audio";//Carpeta donde tenemos almancenada la musica
    source.src= folder+"/"+ruta
    var index= indiceActual[0]= canciones.indexOf(ruta)
    removeActive()
    var item=document.getElementById(index)
    item.classList.add("active");
    reproduccionActual("Reproduciendo: "+ ruta)
    player.load()
  }
  //Funcion para pausar o darle play 
  function togglePlay() {
    if (player.paused){
      toggleIcon();
      return player.play();
    } else {
      toggleIcon();
      return player.pause();
    }
  }
  //Funcion para cambiar el icono play o pause
  function toggleIcon() {
     var element = document.getElementById("iconPlay");
     element.classList.toggle("fa-pause-circle");
     element.classList.toggle("fa-play-circle");
  }
  //Funcion para que al dar click sobre la barra de progreso se permita adelantar
  progress.addEventListener('click', adelantar);
  function adelantar(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
    player.currentTime = scrubTime;
    sonsole.log(e);
  }

  //Funcion para convertir segundos a minutos y horas
  function secondsToString(seconds) {
    var hour="";
    if (seconds>3600){
      hour = Math.floor(seconds / 3600);
      hour = (hour < 10)? '0' + hour : hour;
      hour+=":"
    }
     var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return hour  + minute + ':' + second;
  }
  loadMusic(canciones[0])