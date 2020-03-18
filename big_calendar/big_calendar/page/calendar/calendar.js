
  // frappe.require('assets/big_calendar/packages/fullcalendar/core/main.js');
  // frappe.require('assets/big_calendar/packages/fullcalendar/core/main.css');
  // frappe.require('assets/big_calendar/packages/fullcalendar/daygrid/main.css');
  // frappe.require('assets/big_calendar/packages/fullcalendar/daygrid/main.js');

frappe.pages['calendar'].on_page_load = function(wrapper) {
     	new MyPage(wrapper);
}

MyPage = Class.extend({
	init: function(wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'MyPage',
			single_column: true
		});
		this.make();
	},
	make: function() {
		$(frappe.render_template("calendar", this)).appendTo(this.page.main);
	}

})

$(window).on("load", function(){
		var calendarEl = document.getElementById("calendar");

		console.log(calendarEl);


		var calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [ "dayGrid" ],
			// events: frappe.call({ method:"frappe.client.get_list",
			// 		args:{
			// 			doctype: "Survey",
			// 			fields: ['name', 'date_start', 'date_end', 'park', 'title'],
			// 			limit_page_length: 1000
			// 		},
			// 		callback: function(event_list){
			// 			var clean_list = []
			// 			for (i = 0; i < event_list.message.length; i++) {
			// 				event = {};
			// 				event['title'] = event_list.message[i].title;
			// 				event['start'] = event_list.message[i].date_start;
			// 				event['end'] = event_list.message[i].date_end;
			// 				clean_list.push(event);
			// 			}
			// 			console.log(clean_list)
			// 			return clean_list;
			// 		}
			// })
		});


		calendar.render();
});


// var myevents = frappe.call({ method:"frappe.client.get_list",
// 		args:{
// 			doctype: "Survey",
// 			fields: ['name', 'date_start', 'date_end', 'park', 'title'],
// 			limit_page_length: 1000
// 		},
// 		callback: function(event_list){
// 			var clean_list = []
// 			for (i = 0; i < event_list.message.length; i++) {
// 				event = {};
// 				event['title'] = event_list.message[i].title;
// 				event['start'] = event_list.message[i].date_start;
// 				event['end'] = event_list.message[i].date_end;
// 				clean_list.push(event);
// 			}
// 			console.log(clean_list)
// 			return clean_list;
// 		}
// });
//


// frappe.db.get_list('Survey', {
//   fields: ['name', 'date_start', 'date_end', 'park', 'title']
//   // filters: {
//   //     status: 'Open'
//   // }
// }).then(records => {
// 	var event_list = []
// 	for (i = 0; i < records.length; i++) {
// 		event = {};
// 		event['title'] = records[i].title;
// 		event['start'] = records[i].date_start;
// 		event['end'] = records[i].date_end;
// 		event_list.push(event);
// 	}
// 	console.log(event_list);
// })
