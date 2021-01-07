function get_events(park)
{
	var data = [];
	frappe.call({
		method: "big_calendar.big_calendar.doctype.big_events.big_events.get_events",
		args: {
			park: park,
			type: 'Survey'
		},
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

	let park_field = page.add_field({
	    label: 'Park',
	    fieldtype: 'Link',
	    fieldname: 'park',
	    options: 'Company',
	    change() {
	        if (view_field.get_value() == 'Month'){
						view_month(park_field.get_value())
						$('*[data-fieldname="year"]').hide();
					} else {
						view_year(park_field.get_value(), year_field.get_value())
						$('*[data-fieldname="year"]').show();
					}
	    }
	});
	let view_field = page.add_field({
	    label: 'View',
	    fieldtype: 'Select',
	    fieldname: 'view',
	    options: ['Month', 'Year'],
			reqd: 1,
	    change() {
				if (view_field.get_value() == 'Month'){
					view_month(park_field.get_value())
					$('*[data-fieldname="year"]').hide();
				} else {
					view_year(park_field.get_value(), year_field.get_value())
					$('*[data-fieldname="year"]').show();
				}
			}
	});

	var today = new Date()
	var years = Array(10).fill().map((element, index) => today.getFullYear()+1-index)
	let year_field = page.add_field({
	    label: 'Year',
	    fieldtype: 'Select',
	    fieldname: 'year',
	    options: years,
			default: today.getFullYear(),
	    change() {
				view_year(park_field.get_value(), year_field.get_value())
			}
	});
}


frappe.pages['big_cal'].refresh = function(wrapper) {
	if (view_field.get_value() == 'Month'){
		view_month('')
		$('*[data-fieldname="year"]').hide();
	} else {
		view_year(park_field.get_value(), year_field.get_value())
		$('*[data-fieldname="year"]').show();
	}

}


function view_month(park){
	$('#calendar').remove()
	$('#year_list').remove()
	$('div[id="page-big_cal"] .layout-main-section').append(
		"<div id='calendar'> </div>"
	);
	var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ "dayGrid", "interactionPlugin" ],
    events: get_events(park),
    droppable: true
  });

  calendar.render();
}

function view_year(park, year){
	$('#calendar').remove()
	$('#year_list').remove()
	var events = get_events(park)
	event_html = '<div id="year_list"><ul>'

	var today = new Date()

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	for (var m = 0; m < months.length; m++){
		event_html += '<h4>' + months[m] + '</h4>'
		for (var i = 0; i < events.length; i++){
			var event_date = new Date(events[i].start)
			if (event_date.getFullYear() == year && event_date.getMonth() == m){
				event_html += '<li style="color:#cfdbba;"><a style="font-size:12px; color:#4a4e42;" href="'+ events[i].url + '"> <b>'+ events[i].start + ': </b>' + events[i].title + '</a> '+'</li>'
			}
	}
	}

	event_html += '</ul></div>'
	$('div[id="page-big_cal"] .layout-main-section').append(
		event_html
  );
}
