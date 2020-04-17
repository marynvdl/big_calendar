# -*- coding: utf-8 -*-
# Copyright (c) 2020, Maryn van der Laarse and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import (format_time, global_date_format, now, get_link_to_form, get_url_to_report)


class BigEvents(Document):
	def validate(self):
		self.name = self.doc + " Calendar"


@frappe.whitelist()
def get_events():
	doc_list = frappe.get_list(
		"Big Events",
		fields = ['doc', 'start', 'end', 'title', 'color']
	)

	clean_list = []

	for d in doc_list:
		print(d)
		event_list = frappe.get_list(
			d['doc'],
			fields = ['name', d['title'], d['start'], d['end']]
		)

		for item in event_list:
			event = {}
			event['title'] = item[d.title]
			event['start'] = item[d.start]
			event['end'] = item[d.end]
			event['backgroundColor'] = d.color
			event['url'] = frappe.utils.get_url() + '/desk#Form/' + d.doc + '/' + item.name
			clean_list.append(event)


	return clean_list


	#Form/Survey/LWA-svy0102
