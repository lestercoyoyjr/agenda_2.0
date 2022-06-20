// This modal is to click on a date
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

let frm = document.getElementById('formulario');

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      headerToolbar:{
          left:'prev, next, today',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek,listWeek'
      },
      dateClick: function (info){
        // console.log(info);
        document.getElementById('start').value= info.dateStr;
        document.getElementById('titulo').textContent= 'Registro de Evento';
        myModal.show();
      }
    });
    calendar.render();

    frm.addEventListener('submit', function(e){
      e.preventDefault();
      const title = document.getElementById('title').value;
      const fecha = document.getElementById('start').value;
      const color = document.getElementById('color').value;
      if(title == '' || start == '' || color == ''){
        Swal.fire(
          'Aviso',
          'Todos los campos son requeridos',
          'warning'
        )
      } else {
          const url = base_url + 'Home/registrar';
          const http = new XMLHttpRequest();
          http.open('POST', url, true);
          http.send(new FormData(frm));
          http.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
              // console.log(this.responseText);
              const respuesta = JSON.parse(this.responseText);
              console.log(respuesta);
              if (respuesta.estado) {
                
              } 
              myModal.hide();
              Swal.fire(
                'Aviso',
                respuesta.msg,
                respuesta.tipo
              )
            }
          }
      }
    })
  });