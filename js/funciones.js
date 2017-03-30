var __jquery = jQuery.noConflict();
__jquery(document).ready(function() {
    onReadyPortal(__jquery)
});

function onReadyPortal(__jquery) {
	 if (__jquery("#principal").length) {
           
        }
}

function listarLugares(){
    __jquery.ajax({
        type: "GET",
        url: "https://cultural-api.herokuapp.com/api/Lugares",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data[1]);
           for(var i = 1; i < data.length;i++){
                    var ht = "<div class=\"lugar\" onclick=\"verLugar()\"><div>"+data[i].title+"</div><div>"+data[i].description+"</div></div>"
                    __jquery( ".listaLugares" ).append(ht);
                }
        }
    });
}

function agregarLugar(){
    var titulo = __jquery('#titulo').val();
    var descripcion = __jquery('#descripcion').val();
    var imagen = __jquery('#imagen').val();
    var direccion = __jquery('#direccion').val();
    var tipo = __jquery('#tipo').val();
    var lat=__jquery('#lat').val();
    var lon=__jquery('#lon').val();
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    __jquery.ajax({
        type: "post",
        method : 'post',
        url: "https://cultural-api.herokuapp.com/api/Lugares",
        data :{
            title:titulo,
            image:imagen,
            description:descripcion,
            latitud:lat,
            longitud:lon,
            qr:'hola',
            direccion:direccion,
            tipo:tipo
           }
    });
}