-- Table: public.certification

-- DROP TABLE public.certification;

CREATE TABLE public.certification
(
    cert_id integer NOT NULL DEFAULT nextval('certification_cert_id_seq'::regclass),
    cert_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT certification_pkey PRIMARY KEY (cert_id)
)

TABLESPACE pg_default;

ALTER TABLE public.certification
    OWNER to master;