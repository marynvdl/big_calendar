# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "big_calendar"
app_title = "Big Calendar"
app_publisher = "Maryn van der Laarse"
app_description = "A calendar showing any doctype with a date"
app_icon = "octicon octicon-file-directory"
app_color = "green"
app_email = "marynvdl@africanparks.org"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = ["/assets/big_calendar/packages/fullcalendar/core/main.css",
                   "/assets/big_calendar/packages/fullcalendar/daygrid/main.css"]
app_include_js = ["/assets/big_calendar/packages/fullcalendar/core/main.js",
                  "/assets/big_calendar/packages/fullcalendar/daygrid/main.js",
                  "/assets/big_calendar/packages/fullcalendar/interaction/main.js"]

# include js, css files in header of web template
# web_include_css = "/assets/big_calendar/css/big_calendar.css"
# web_include_js = "/assets/big_calendar/js/big_calendar.js"

# include js in page
page_js = {"calendar" : "public/fullcalendar/packages/fullcalendar/core/main.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "big_calendar.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "big_calendar.install.before_install"
# after_install = "big_calendar.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "big_calendar.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"big_calendar.tasks.all"
# 	],
# 	"daily": [
# 		"big_calendar.tasks.daily"
# 	],
# 	"hourly": [
# 		"big_calendar.tasks.hourly"
# 	],
# 	"weekly": [
# 		"big_calendar.tasks.weekly"
# 	]
# 	"monthly": [
# 		"big_calendar.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "big_calendar.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "big_calendar.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "big_calendar.task.get_dashboard_data"
# }
