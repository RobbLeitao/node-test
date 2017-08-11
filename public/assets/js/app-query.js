$(".close").on('click', function(){
    $("#div-error").hide();
});

$("#forgetPass").on('click', function(){
	alert('Jodete!');
});

function eliminarElemento(id){
    BootstrapDialog.show({
    title: '¿Está seguro?',
    message: '¿Desea eliminar este registro?',
    type: BootstrapDialog.TYPE_SUCCESS,
    closable: false,
    draggable: true,
    buttons: [
       {
         label: 'Sí',
         cssClass: 'btn-success',
         action: function(dialog){
            dialog.close();
			$.ajax({
		        method: "POST",
		        url: '/app/imagenes/' + id + "?_method=DELETE",
            }).done(function(response){
            	location.reload();
            });
           }
       },
       {
         label: 'No',
         action: function(dialog){
             dialog.close();
         }
       }
     ]
  });
}