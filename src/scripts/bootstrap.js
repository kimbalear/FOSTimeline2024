$(document).ready(function () {
  $(function () {
    $("#reportdate").datepicker();
    $("#dateadvactivity").datepicker();
  });
});



  // Detecta cambios en el select #advStage
  $('#advStage').change(function() {
      // Define el ID para el div que podría ser agregado
      var newDivId = 'addedDivForContribution';

      // Verifica si el valor seleccionado es "Contribution"
      if ($(this).val() === "Contribution") {
          // Comprueba si el div ya existe para evitar agregarlo múltiples veces
          if ($('#' + newDivId).length === 0) {
              // Crea un div con contenido, un ID único, y lo agrega al principio de .newAttContent
              var newDiv = $('<div id="' + newDivId + '" class="new-added-div">Contenido agregado cuando se selecciona Contribution</div>');
              $('.newAttContent').prepend(newDiv);
          }
      } else {
          // Si se selecciona otra opción, elimina el div si existe
          $('#' + newDivId).remove();
      }
  });

