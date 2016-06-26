 /* global DZ */
 function main() {
    var valor = document.getElementById("texto").value;
    if (valor === "") {
        alert("no se puede hacer una busqueda vacia xD");
    } else {
        $("#deezer").empty();
        $("#last").empty();
        lastfm(valor);
        search(valor);
        topViral(valor);
       // top_ten(valor);
        youtube(valor);
        get_mp3(valor);
    }
}
;

 function main_2() {
    var valor = document.getElementById("cancion").value;
    if (valor === "") {
        alert("no se puede hacer una busqueda vacia xD");
    } else {
       get_mp3(valor);
    }
}
;


function lastfm(valor) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&lang=es&artist=" + valor + "&api_key=ae9dc375e16f12528b329b25a3cca3ee&format=json", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var bio = JSON.parse(xhttp.responseText);
            console.log(bio.artist.bio.summary.length);
            if (bio.artist.bio.summary.length < 90) {
                $("#last").append("<h2>no hay resultados en last fm para esa busqueda</h2>");
            } else {
                var imagenes = bio.artist.image;
                var imagen;
                for (var i = 0; i < imagenes.length; i++) {
                    if (imagenes[i].size === "mega") {
                        imagen = imagenes[i]["#text"];
                    }
                }
                var pagina = bio.artist.url;
                var subPagina = pagina.substring(pagina.length, 19);
               
                $("#last").append("<a title='abre la imagen tamaño mega' href='" + imagen + "' target='_blank'><img src='" + imagen + "' alt='Smiley face' height='250' width='250'\><\a>");
                $("#last").append("<h2>Biografia</h2>");
                $("#last").append("<a href= 'http://www.last.fm/es/" + subPagina + "' target='_blank'>Ir a last fm</a>");
                $("#last").append("<br>");
                $("#last").append("<p>" + bio.artist.bio.summary + "</p>");
                
            }
        }

    };
}
;
Array.prototype.unique = function () {
    var tmp = {}, out = [];
    for (var i = 0, n = this.length; i < n; ++i)
    {
        if (!tmp[this[i]]) {
            tmp[this[i]] = true;
            out.push(this[i]);
        }
    }
    return out;
};
function search(term) {
    DZ.api('/search?q=' + term, function (response) {
        var arr = response.data;
        var albumnes = new Array();
        for (var i = 0; i < arr.length; i++) {
            albumnes[i] = arr[i].album.title;
        }
        albumnes = albumnes.unique();
        $("#deezer").append("<h2>Albums</h2>");
        for (var i = 0; i < albumnes.length; i++) {
            var id = null;
            var img = null;

            for (var j = 0; j < arr.length; j++) {
                if (albumnes[i] === arr[j].album.title) {
                    var id = arr[j].album.id;
                    var img = arr[j].album.cover_big;
                }
            }
            $("#deezer").append("<div class='coleccion'>\n\
                <input id='albumimg' type='image' src='" + img + "' onclick='DZ.player.playAlbum(" + id + "); return false;'>\n\
                " + albumnes[i] + "</div>");
        }

    });
}

function topViral(valor) {
    $("#topa").empty();
    document.getElementById("topa").innerHTML = "<h2>Artistas Relacionados</h2>";
    var xhttp = new XMLHttpRequest();
    var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + valor + "&limit=10&api_key=ae9dc375e16f12528b329b25a3cca3ee&format=json";
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var resp = JSON.parse(xhttp.responseText);
            var similares = resp.similarartists.artist;
            for (var i = 0; i < similares.length; i++) {
                var nombre = similares[i].name;
                var pagina = similares[i].url;
                var subPagina = pagina.substring(pagina.length, 19);
                $("#topa").append("<input type='image' name='" + nombre + "' SRC='" + similares[i].image[4]["#text"] + "' ALT='" + similares[i].name + "' WIDTH=40 HEIGHT=40 onclick= 'busquedaTable(this)'>");
                $("#topa").append("<label>" + similares[i].name + "</label>");
                $("#topa").append("<a href='" + pagina + ">ir a last</a>");
                $("#topa").append("<br>");
            }

        }
    };
};


function busquedaTable(boton) {
    $("#deezer").empty();
    $("#last").empty();
    $("#napster").empty();
    $("#bajar").empty();
    $("#youtube").empty();

    lastfm(boton.name);
    search(boton.name);
    get_mp3(boton.name);
    youtube(boton.name);

}
;

function get_mp3(valor){
      $("#bajar").empty();
        console.log("Cancion buscada"+valor);
        var xhttp = new XMLHttpRequest();
        var url = 'https://www.googleapis.com/youtube/v3/search?q='+valor+'&part=snippet&maxResults=25&search_sort=video_avg_rating&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE';
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader ("Accept", "application/json");
        xhttp.send();
        var r=0;
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
             var datos = JSON.parse(xhttp.responseText);
             for (var i = 0; i < 25; i++) {
               if(datos.items[i].id.videoId !== undefined && _es_vevo(datos.items[i].snippet.channelTitle) === true){
                    var id_video=datos.items[i].id.videoId;
                   // var etiqueta ="<a href='//www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v="+id_video+"' style='text-decoration:none;color:#03a730;'><img src='//www.youtubeinmp3.com/icon/download.png' style='vertical-align:middle;'> <strong>Download MP3</strong></a>";
                   var codigo="<iframe style='width:230px;height:60px;border:0;overflow:hidden;' scrolling='no' src='//www.youtubeinmp3.com/widget/button/?video=https://www.youtube.com/watch?v="+id_video+"'&color=c91818>";
                   
                 //  $("#descargar").append(etiqueta);
                  // $("#descargar").append("<br>");
                   $("#bajar").append(codigo);
                   $("#bajar").append("<br>");
                //  break;
                r++;
              }
          }
          if(r===0){
             $("#bajar").append("<label> NO HAY RESULTADOS</label>");
          }               
      } 
      console.log("fierro");
}
};




function top_ten(valor){
    $("#topten").empty();
    var xhttpt = new XMLHttpRequest();
    var urlt = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + valor + "&limit=10&api_key=ae9dc375e16f12528b329b25a3cca3ee&format=json";
    xhttpt.open("GET", urlt, true);
    xhttpt.send();
    xhttpt.onreadystatechange = function () {
        if (xhttpt.readyState === 4 && xhttpt.status === 200) {
            var resp = JSON.parse(xhttpt.responseText);  
            var mejores_canciones = resp.toptracks.track;
            for (var i = 0; i < mejores_canciones.length; i++) {
                var nombre = mejores_canciones[i].name;
                var pagina = mejores_canciones[i].url;
                var num_rep = mejores_canciones[i].playcount;
                $("#topten").append("<label>" + mejores_canciones[i].name + "</label><label>Reproducciones: "+num_rep+"</label>");
                $("#topten").append("<a href='" + pagina + ">ir a last</a>");
                $("#topten").append("<br>");
            }
    }
};
};


function youtube(valor){
    var xhttp = new XMLHttpRequest();
    var url = 'https://www.googleapis.com/youtube/v3/search?q='+valor+'&part=snippet&maxResults=25&search_sort=video_avg_rating&regionCode=MX&key=AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE';
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader ("Accept", "application/json");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var datos = JSON.parse(xhttp.responseText);
            var v = [], id_video = [], id_vi = [];
            document.getElementById("youtube").innerHTML = "";
            var you_elem = document.getElementById('youtube');

                for(var i = 0; i < 15; i++) {
                var frames = document.createElement('iframe');
                
                // id_video = datos.items[0].id.playlistId; YouTube encuentra playlist y videos 
                id_video[i] = datos.items[i].id.videoId; // Agrega los ids al arreglo con riesgo de ser indefinido
                //alert(datos.items[i].id.videoId);
                //&& _es_vevo(datos.items[i].snippet.channelTitle) === false
                if (datos.items[i].id.videoId != undefined  && _es_vevo(datos.items[i].snippet.channelTitle) === false) {// Si no es undefined, lo asigna a a pagina
                    frames.setAttribute('id', 'v2' + (i + 1));
                    frames.setAttribute('frameborder', 0);
                    frames.setAttribute('allowfullscreen', "");
                    frames.setAttribute('mozallowfullscreen', "");
                    frames.setAttribute('webkitallowfullscreen', "");
                    frames.setAttribute('style', 'width: 350px; height: 250px; margin-top: 50px;margin-left: 30px');
                    you_elem.appendChild(frames);
                    v[i] = document.getElementById('v2' + (i + 1));
                    v[i].setAttribute('src', 'https://www.youtube.com/embed/' + id_video[i]);
                }
            }            

    }
};
};

var _es_vevo = function(titulo){
   return (/VEVO/.test(titulo));
};





