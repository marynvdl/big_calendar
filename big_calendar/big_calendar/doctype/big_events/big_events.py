# -*- coding: utf-8 -*-
# Copyright (c) 2020, Maryn van der Laarse and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import (format_time, global_date_format, now, get_link_to_form, get_url_to_report)
import datetime

class BigEvents(Document):
	def validate(self):
		self.name = self.doc + " Calendar"


@frappe.whitelist()
def get_events(park):
	doc_list = frappe.get_list(
		"Big Events",
		fields = ['doc', 'start', 'end', 'title', 'color', 'park_list', 'park_field', 'type_field'],
	)

	clean_list = []

	for d in doc_list:

		if park == "":
			event_list = frappe.get_list(
				d['doc'],
				fields = ['name', d['title'], d['start'], d['end'], d['park_field'], d['type_field']],
			)
		else:
			if d.park_list == 1:
				event_list = frappe.db.sql("""
					SELECT
					    t.name,
					    t.{title},
					    t.{start},
					    t.{end},
					    tp.park
					FROM
					    tabTranslocation AS t
					        INNER JOIN
					    `tabTranslocation Park` AS tp ON t.name = tp.parent
					WHERE tp.park = '{park}';
				""".format(title=d['title'], start=d['start'], end=d['end'], park=park), as_dict = True)
			else:
				event_list = frappe.get_list(
					d['doc'],
					fields = ['name', d['title'], d['start'], d['end'], d['type_field']],
					filters = {d['park_field']: park}
				)

		for item in event_list:
			event = {}
			event['title'] = item[d.title]
			if item[d.start] is None:
				item[d.start] = datetime.datetime.strptime('1000-01-01', '%Y-%m-%d')
			if isinstance(item[d.start], datetime.datetime):
				item[d.start] = item[d.start].date()
			event['start'] = item[d.start]
			event['end'] = item[d.end]
			event['backgroundColor'] = d.color
			if d.type_field is not None:
				event['type'] = item[d.type_field]
			else:
				event['type'] = d.doc
			event['url'] = frappe.utils.get_url() + '/app/' + d.doc.lower().replace(' ', '-') + '/' + item.name
			clean_list.append(event)


		sorted_list = sorted(clean_list, key=lambda k: k['start'])

	return sorted_list


