-- Add submitter_ip column for rate limiting public forms
alter table inquiries add column if not exists submitter_ip text;
alter table quotations add column if not exists submitter_ip text;
