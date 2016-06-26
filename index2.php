<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="Musica" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://musicforyou.ml/cliente.php" />
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>        
    <!-- Loading the Deezer SDK -->
    <script type="text/javascript" src="http://cdn-files.deezer.com/js/min/dz.js"></script>
    <link rel="stylesheet" type="text/css" href="css/estilo.css" media="screen" />

    <title>Tu Musica</title>
</head>
<body  onload= "topViral('Zoé');lastfm('Zoé');search('Zoé');top_ten('Zoé');youtube('Zoé');get_mp3('Zoé');">

    <form id="the-form">

        <input  type="text" id="texto" placeholder="busca tu artista">
        <input type="button" id="buscar" value="buscar" onclick= "main()" onmouseup="initMap()">

    </form>     

    <div>
        <div id="topten">
            <h2>Top 10</h2>
        </div>
        <div id="topa">
            <h2>Artistas relacionados</h2>
        </div> 
    </div> 


    <div id="busqueda">   
        <div class="col-sm-6" id="last"></div>
        <div id="deezer" ></div>


    </div>
    <div id="reproductor">
        <div id="dz-root"></div>
        <h2>Reproductor de musica</h2>
        <div id="player" align="center"></div>
    </div>

    <div id="youtube">

    </div>  

    <div id ="descargar">
        <h2>DESCARGAR</h2>

        <form>

            <input  type="text" id="cancion" placeholder="busca tu cancion">
            <input type="button" id="buscar_cancion" value="buscar_cancion" onclick= "main_2()">
            
        </form>  
        <div id="bajar">


        </div>
    </div> 


    <div id="map" style="width:700px;height:380px;"></div>
        </div>

<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>

<script>
$(document).ready(function () {
    $("#controlers input").attr('disabled', true);
    $("#slider_seek").click(function (evt, arg) {
        var left = evt.offsetX;
        DZ.player.seek((evt.offsetX / $(this).width()) * 100);
    });
});
function event_listener_append() {
    var pre = document.getElementById('event_listener');
    var line = [];
    for (var i = 0; i < arguments.length; i++) {
        line.push(arguments[i]);
    }
    pre.innerHTML += line.join(' ') + "\n";
}
function onPlayerLoaded() {
    $("#controlers input").attr('disabled', false);
    event_listener_append('player_loaded');
    DZ.Event.subscribe('current_track', function (arg) {
        event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
    });
    DZ.Event.subscribe('player_position', function (arg) {
        event_listener_append('position', arg[0], arg[1]);
        $("#slider_seek").find('.bar').css('width', (100 * arg[0] / arg[1]) + '%');
    });
}
DZ.init({
    appId: '8',
    channelUrl: 'http://developers.deezer.com/examples/channel.php',
    player: {
        container: 'player',
        cover: true,
        playlist: true,
        width: 650,
        height: 300,
        onload: onPlayerLoaded
    }
});


//


function initMap(){      
        var link= $('#the-form').serialize();
        var nueva = link.replace('q=','');
        var nueva2 = nueva.replace('+','%20');

        $.ajax({
            url: "http://api.bandsintown.com/artists/"+nueva2+"/events.json?api_version=2.0&app_id=MUSIC&date=upcoming",
            data: null,
            type: "GET",
            crossDomain: true,
            dataType: 'jsonp',

            success: function(result){
                $("#map").append("<h1>AHHHHH</h1>");
                $("#map").append("<p>");
                var myLatLng = {lat: result[0].venue.latitude, lng: result[0].venue.longitude};
                console.log("REsult"+result);
                var map = new google.maps.Map(document.getElementById('map'), { zoom: 5,
                    center: myLatLng,
                    RotateControlOptions:true,
                    mapTypeControl:true,
                    mapTypeControlOptions: {
                        style:google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    }
                });

                var tamano=result.length;

                for( i = 0; i < tamano; i++ ) {
                    var position = new google.maps.LatLng(result[i].venue.latitude,result[i].venue.longitude);
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        icon:'http://img.getjar.mobi/icon-50x50/ba/852391_thm.png',
                        animation:google.maps.Animation.BOUNCE,
                        title: result[i].title+" "+result[i].formatted_datetime
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: result[i].title+" "+result[i].formatted_datetime
                    });
                }
            }
        })
};

</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDH5603UZ1k1ARBwKxyVhlqhuhDB16UJwM"></script>
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" charset="utf8" src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>

</body>
</html>