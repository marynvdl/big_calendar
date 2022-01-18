// Copyright (c) 2020, Maryn van der Laarse and contributors
// For license information, please see license.txt

frappe.ui.form.on('Big Events', {
  refresh: function(frm) {
    cur_frm.set_query('doc', function () {
        return {
            filters: {
                'istable': 0
            }
        }
    });
  },

  doc: function(frm) {
    let doctype = frm.doc.doc;
    const title_fields = []
    const date_fields = []
    if (doctype !== undefined) {
      frappe.model.with_doctype(doctype, () => {
  			frappe.get_meta(doctype).fields.forEach(d => {
          const no_title_list = ["Attach Image", "Column Break", "Attach", "Section Break", "Table"]
          if (!no_title_list.includes(d.fieldtype)){
            title_fields.push(d.fieldname);
            if (d.fieldtype=="Date"){
              date_fields.push(d.fieldname);
            }
          }
  			});
        frm.set_df_property("title", "options", title_fields)
        frm.set_df_property("start", "options", date_fields)
        frm.set_df_property("end", "options", date_fields)
        frm.set_df_property("park_field", "options", title_fields)
        frm.set_df_property("type_field", "options", title_fields)
  		});
    }
  }
});
