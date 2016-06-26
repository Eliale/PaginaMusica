<!DOCTYPE html>
<html>
<head>
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
        <input type="button" id="buscar" value="buscar" onclick= "main()">

    </form>     

    <div>
        <div id="topten">
            <h2>Top 10</h2>
        </div>
        <div id="top">
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


    <div id="map">

    </div>
</body>

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
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDH5603UZ1k1ARBwKxyVhlqhuhDB16UJwM"></script>
</html>