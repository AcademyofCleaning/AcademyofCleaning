-- Table: public.attachment

-- DROP TABLE public.attachment;

CREATE TABLE public.attachment
(
    attach_id integer NOT NULL DEFAULT nextval('attachment_attach_id_seq'::regclass),
    attach_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    doc_location text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT attachment_pkey PRIMARY KEY (attach_id)
)

TABLESPACE pg_default;

ALTER TABLE public.attachment
    OWNER to master;

COMMENT ON TABLE public.attachment
    IS 'This table contains the attachments for cleaner profiles uploaded into AoC';