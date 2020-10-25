-- Table: public.uploaded_attach

-- DROP TABLE public.uploaded_attach;

CREATE TABLE public.uploaded_attach
(
    row_id integer NOT NULL DEFAULT nextval('uploaded_attach_row_id_seq'::regclass),
    profile_id bigint NOT NULL,
    attach_id bigint NOT NULL,
    CONSTRAINT uploaded_attach_pkey PRIMARY KEY (row_id),
    CONSTRAINT attach_id FOREIGN KEY (attach_id)
        REFERENCES public.attachment (attach_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT profile_id FOREIGN KEY (profile_id)
        REFERENCES public.cleaner_profile (profile_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.uploaded_attach
    OWNER to master;

COMMENT ON TABLE public.uploaded_attach
    IS 'This table contains the relationships between profiles and the attachments uploaded to each profile.';