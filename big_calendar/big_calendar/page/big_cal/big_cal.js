function get_events()
{
	var data = [];
	frappe.call({
		method: "big_calendar.big_calendar.doctype.big_events.big_events.get_events",
		async: false,
		callback: function(r) {
			data = r.message;
		}
	});
	return data;
}



frappe.pages['big_cal'].on_page_load = function(wrapper) {
  var page = frappe.ui.make_app_page({
  	parent: wrapper,
  	title: 'Big Calendar',
  	single_column: true
  });
  $(".layout-main-section").append(
    "<div id='calendar'> </div>"
		// + '<div id='mydraggable'> drag me please </div>'
  );
}


frappe.pages['big_cal'].refresh = function(wrapper) {
  let draggableEl = document.getElementById('mydraggable');
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ "dayGrid", "interactionPlugin" ],
    events: get_events(),
    droppable: true
  });

  calendar.render();

  // new FullCalendarInteraction.Draggable(draggableEl, {
  //   eventData: {
  //     title: 'my event',
  //     duration: '{ days: 4 }'
  //   }
  // });

}


function create_event(){
  doc = frappe.get_doc({
  	"doctype": "Survey",
  	"title": "Hello",
  	"status": "Open"
  })
  doc.insert()
}
