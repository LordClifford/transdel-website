-- Wire up auto-generated invoice number as column default
alter table invoices alter column number set default generate_invoice_number();
