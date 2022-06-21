// This modal is to click on a date
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

let frm = document.getElementById('formulario');
let eliminar = document.getElementById('btnEliminar');

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
        eliminar.classList.add('d-none');
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
        eliminar.classList.remove('d-none');

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

    eliminar.addEventListener('click', function(){
      myModal.hide();
      Swal.fire({
        title: 'Advertencia',
        text: "Estas seguro de Eliminar? No podras deshacer este cambio!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          const id = document.getElementById('id').value;
          const url = base_url + 'Home/eliminar/' + id;
          const http = new XMLHttpRequest();
          http.open('GET', url, true);
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
              Swal.fire(
                'Aviso',
                respuesta.msg,
                respuesta.tipo
              )
            }
          }
        }
      })
    })
  });