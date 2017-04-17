var __jquery = jQuery.noConflict();
__jquery(document).ready(function() {
    onReadyPortal(__jquery)
});

function onReadyPortal(__jquery) {
	 if (__jquery("#logiando").length) {
        var user = localStorage.getItem("usuario");
        var correo = localStorage.getItem("correo");
        if(localStorage.getItem("correo")==null){
            __jquery("#myModal").modal();
            escape();
        }else{
            __jquery("#bodyLogin").css("display","none");
         } 
        }
        if (__jquery("#detalles").length) {
            var x = obtenerIdUrl("id");
            lugar(x);
        }

}

function listarLugares(){
    __jquery( ".listaLugares div" ).remove();
    __jquery.ajax({
        type: "GET",
        url: "https://cultural-api.herokuapp.com/api/Lugares",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
           for(var i = 0; i < data.length;i++){
                    var ht = "<div class=\"lugar\"><input type=\"button\" id=\"iconLugar\" class=\"iconLugar\" onclick=\"eliminar(\'"+data[i]._id+"\')\"/><div onclick=\"mirar(\'"+data[i]._id+"\')\">"+data[i].title+"</div><div onclick=\"mirar(\'"+data[i]._id+"\')\">"+data[i].description+"</div></div>"
                    __jquery( ".listaLugares" ).append(ht);
                }
        }
    });
}

function escape(){
    __jquery('.inputLogin').on('keyup keypress keydown', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 27) {
            e.preventDefault();
            return false;
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
    document.getElementById("titulo").value= "";
    document.getElementById("descripcion").value= "";
    document.getElementById("imagen").value= "";
    document.getElementById("direccion").value= "";
    document.getElementById("lat").value= "";
    document.getElementById("lon").value= "";
}

var verificarDatos = function() {
    var nombre = __jquery("#usrname").val();
    var pass = __jquery("#psw").val();
    if((nombre=='admin')&&(pass=='admin')){
        localStorage.setItem("correo","admin");
        localStorage.setItem("usuario","admin");
        __jquery("#myModal").modal('toggle');
    }else{
        __jquery("#verifiDatos").css("display","block");
    }         
}

function logout(){
    localStorage.clear();
    location.reload();
}

function eliminar(x){
    var base='https://cultural-api.herokuapp.com/api/Lugares/'+x;
    __jquery.ajax({
        type: "delete",
        url : base,
        success:  function () {
            location.reload();
        }
    });
}

function eliminar1(x){
    var base='https://cultural-api.herokuapp.com/api/Lugares/'+x;
    __jquery.ajax({
        type: "delete",
        url : base,
        success:  function () {
            window.location.href = "index.html";
        }
    });
}

function mirar(x){
    window.location.href = "detalle.html?id=" + x;
}

function obtenerIdUrl(name) {
    try {
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);   
        var results = regex.exec(window.location.href);    
        if (results == null) {
            return "";
        } else {
            return results[1];
        }
    } catch (excepcion) {
        dispararExcepcion(excepcion, "interna.min.js", "obtenerIdUrl()");
    }
}

function lugar(x){
    __jquery.ajax({
        type: "GET",
        url: "https://cultural-api.herokuapp.com/api/Lugares/"+x,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            __jquery( "#tituloLg" ).text(data.title);
            __jquery( "#descripcionLg" ).text(data.description);
            __jquery( "#imagenLg" ).append("<img id=\"imgLg\" src=\""+data.image+"\" />");
             __jquery( "#botonLg" ).append("<input type=\"button\" value=\"Eliminar\" onclick=\"eliminar1(\'"+data._id+"\')\"/>");
        }
    });
}