function get_events(park)
{
	var data = [];
	frappe.call({
		method: "big_calendar.big_calendar.doctype.big_events.big_events.get_events",
		args: {
			park: park,
		},
		async: false,
		callback: function(r) {
			data = r.message;
		}
	});
	return data;
}



frappe.pages['big_cal'].on_page_load = function(wrapper) {

	var event_types = get_events('').map(item => item.type).filter((value, index, self) => self.indexOf(value) === index)

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
						view_month(park_field.get_value(), type_field.get_value())
						$('*[data-fieldname="year"]').hide();
					} else {
						view_year(park_field.get_value(), year_field.get_value(), type_field.get_value())
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
					view_month(park_field.get_value(), type_field.get_value())
					$('*[data-fieldname="year"]').hide();
				} else {
					view_year(park_field.get_value(), year_field.get_value(), type_field.get_value())
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
				view_year(park_field.get_value(), year_field.get_value(), type_field.get_value())
			}
	});


	let type_field = page.add_field({
	    label: 'View',
	    fieldtype: 'Select',
	    fieldname: 'type',
		default: 'All',
	    options: ['All'].concat(event_types),
			reqd: 1,
	    change() {
				if (view_field.get_value() == 'Month'){
					view_month(park_field.get_value(), type_field.get_value())
					$('*[data-fieldname="year"]').hide();
				} else {
					view_year(park_field.get_value(), year_field.get_value(), type_field.get_value())
					$('*[data-fieldname="year"]').show();
				}
			}
	});



	// Add events buttons
	var add_events_html = '<div class="page-form row"> <div class="module-category h6 uppercase" style="padding:8px 20px 5px 10px;">Create new</div> <p>'
	add_events_html += '<button id="new_translocation" class="btn btn-xs btn-conservation" style="margin:4px 2px;"> Translocation + </button>'
	add_events_html += '<button id="new_survey" class="btn btn-xs btn-conservation" style="margin:4px 2px;"> Survey + </button>'
	add_events_html += '<button id="new_collaring" class="btn btn-xs btn-conservation" style="margin:4px 2px;"> Collaring + </button>'
	add_events_html += '<button id="new_event" class="btn btn-xs btn-conservation" style="margin:4px 2px;"> <b> Other Event </b>+ </button>'
	add_events_html += '</p> </div>'

	$('div[id="page-big_cal"] .layout-main-section').append(
		add_events_html
	);

	$("#new_translocation").click(function(){
		frappe.model.with_doctype("Translocation", function() {
			var tlb = frappe.model.get_new_doc("Translocation");

			var detail = frappe.model.get_new_doc("Translocation Park", tlb, "parks");
			$.extend(detail, {
				"park": park_field.get_value()
			});
		frappe.set_route("Form", "Translocation", tlb.name);
		})
	});


	$("#new_survey").click(function(){
		frappe.model.with_doctype("Survey", function() {
			var tlb = frappe.model.get_new_doc("Survey");
			$.extend(tlb, {
				"park": park_field.get_value(),
			});

		frappe.set_route("Form", "Survey", tlb.name);
		})
	});


	$("#new_collaring").click(function(){
		frappe.model.with_doctype("Collaring", function() {
			var tlb = frappe.model.get_new_doc("Collaring");
			$.extend(tlb, {
				"park": park_field.get_value(),
			});
		frappe.set_route("Form", "Collaring", tlb.name);
		})
	});

	$("#new_event").click(function(){
		frappe.model.with_doctype("Conservation Event", function() {
			var tlb = frappe.model.get_new_doc("Conservation Event");
			$.extend(tlb, {
				"company": park_field.get_value(),
			});
		frappe.set_route("Form", "Conservation Event", tlb.name);
		})
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


function view_month(park, type){
	$('#calendar').remove()
	$('#year_list').remove()
	$('div[id="page-big_cal"] .layout-main-section').append(
		"<div id='calendar'> </div>"
	);
	var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ "dayGrid", "interactionPlugin" ],
    events: filter_month_events(park, type),
    droppable: true
  });

  calendar.render();
}

function filter_month_events(park, type){
	var month_events = get_events(park)
	if (type == 'All'){
		filtered_events = month_events
	} else {
		var filtered_events = month_events.filter(function(event) {
			return event.type == type
		})
	}
	return filtered_events
}


function view_year(park, year, type){


	$('#calendar').remove()
	$('#year_list').remove()
	var events = get_events(park)
	event_html = '<div id="year_list"><ul>'

	var today = new Date()

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	for (var m = 0; m < months.length; m++){
		event_html += '<h4 class="ellipsis title-text" style="padding-top: 18px;">' + months[m] + '</h4>'
		for (var i = 0; i < events.length; i++){
			var event_date = new Date(events[i].start)
			if (park==''){
				if (event_date.getFullYear() == year && event_date.getMonth() == m){
					if (type == 'All'){
						event_html += '<li style="color:#cfdbba;"><a style="font-size:12px; color:#4a4e42;" href="'+ events[i].url + '"> <b>'+ events[i].start + ': </b>' + events[i].title + '</a> '+'</li>'
					} else {
						if(events[i].type == type){
							event_html += '<li style="color:#cfdbba;"><a style="font-size:12px; color:#4a4e42;" href="'+ events[i].url + '"> <b>'+ events[i].start + ': </b>' + events[i].title + '</a> '+'</li>'
						}
					}
				}
			} else {
				if (event_date.getFullYear() == year && event_date.getMonth() == m) {
					if (type == 'All') {
						event_html += '<li style="color:#cfdbba;"><a style="font-size:12px; color:#4a4e42;" href="' + events[i].url + '"> <b>' + events[i].start + ': </b>' + events[i].title + '</a> ' + '</li>'
					} else {
						if (events[i].type == type) {
							event_html += '<li style="color:#cfdbba;"><a style="font-size:12px; color:#4a4e42;" href="' + events[i].url + '"> <b>' + events[i].start + ': </b>' + events[i].title + '</a> ' + '</li>'
						}
					}
				}
			}
		}
	}

	event_html += '</ul></div>'
	$('div[id="page-big_cal"] .layout-main-section').append(
		event_html
  );
}
