'use strict';

class EventManager {
    constructor() {
        this.urlBase = "/events";
        this.obtenerDataInicial();
        this.inicializarFormulario();
        this.guardarEvento();
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all";
        $.get(url, (response) => {

            // if (typeof(response) == "string"){
            if (response == "noLogin"){

                window.location.href = 'index.html';
            }else
                this.inicializarCalendario(response);
                console.log(response);
        });
    }

    // actualizarEvento(evento) {
    //     $.post('/events/update/' + evento._id, {ini: evento.start.format(), fin: evento.end.format(), id: evento._id}, (response) => {
    //         console.log(response);
    //     });
    // }
    actualizarEvento(evento) {
    let id = evento._id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            form_data = new FormData(),
            start_date,
            end_date,
            start_hour,
            end_hour

        start_date = start.substr(0,10)
        end_date = end.substr(0,10)
        start_hour = start.substr(11,8)
        end_hour = end.substr(11,8)


        let ev = {
                    id: id,
                    start: start_date,
                    start_hour:start_hour,
                    end: end_date,
                    end_hour: end_hour


                }

        $.post('/events/update', ev, function(data) {
            alert(data);
        });
      }

    eliminarEvento(evento) {
        let eventId = evento._id;
        console.log(eventId);
        $.post('/events/delete/' + eventId, { id: eventId }, (response) => {
            //alert(parseInt(response.total) > 0 ? "Evento borrado...": "Error al grabar");
            alert(response)
        });
        this.obtenerDataInicial();
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault();
            let start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val();
                start_hour = $('#start_hour').val();
                end_hour = $('#end_hour').val();
                if (start_hour !== "")
                    start = start + 'T' + start_hour;
                if (end_hour !== "")
                    end = end + 'T' + end_hour  ;
            }
            let url = this.urlBase + "/new";
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                };
                $.post(url, ev, (response) => {
                    //console.log(response);
                    this.inicializarFormulario();
                    ev._id = response.id;
                    $('.calendario').fullCalendar('renderEvent', ev);
                    this.obtenerDataInicial();
                    // alert(parseInt(response.total) > 0 ? "Registro grabado correctamente...": "Error al grabar");
                    alert(response)
                });
            } else {
                alert("Complete los campos obligatorios para el evento");
            }
        });
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date, #start_hour, #end_hour').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function () {
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled");
            } else {
                $('.timepicker, #end_date').removeAttr("disabled");
            }
        });
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2018-11-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            events: eventos,
            eventDrop: (event) => {
                this.actualizarEvento(event);
            },

            eventDragStart: (event, jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19');
            },
            eventDragStop: (event, jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                    this.eliminarEvento(event);
                    $('.calendario').fullCalendar('removeEvents', event._id);
                }
            }
        });
    }
}

const Manager = new EventManager()
    $("#logout").click(function(event) {
        $.get("/events/logout" ,()=>{
            window.location.href= "index.html";
        } );
    });
