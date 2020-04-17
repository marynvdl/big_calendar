# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Big Calendar",
			"color": "green",
			"icon": "octicon octicon-file-directory",
			"type": "module",
			"label": _("Big Calendar")
		},
		{
			"module_name": 'Big Calendar',
			"category": "Places",
			"label": _('Big Calendar'),
			"icon": "fa fa-calendar-check-o",
			"type": 'link',
			"link": '#big_cal',
			"color": '#5d8c37',
			'standard': 1,
			"description": "Big Calendar"
		}
	]
