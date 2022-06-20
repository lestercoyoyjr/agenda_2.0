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

      events: base_url + 'Home/listar',
      // Create event
      dateClick: function (info){
        // console.log(info);
        frm.reset();
        document.getElementById('id').value = '';
        document.getElementById('btnEliminar').classList.add('d-none');
        document.getElementById('start').value= info.dateStr;
        document.getElementById('titulo').textContent= 'Registro de Evento';
        document.getElementById('btnAccion').textContent= 'Registrar';
        myModal.show();
      },
      // Modifies event
      eventClick: function (info){
        console.log(info);

        document.getElementById('titulo').textContent= 'Modificar Evento';
        document.getElementById('btnAccion').textContent= 'Modificar';
        document.getElementById('btnEliminar').classList.remove('d-none');

        document.getElementById('id').value = info.event.id;
        document.getElementById('title').value = info.event.title;
        document.getElementById('start').value = info.event.startStr;
        myModal.show();
        document.getElementById('color').value = info.event.backgroundColor;
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
                // refresh page wihtout press f5
                calendar.refetchEvents();
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