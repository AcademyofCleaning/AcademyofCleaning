-- Table: public.reference

-- DROP TABLE public.reference;

CREATE TABLE public.reference
(
    ref_id integer NOT NULL DEFAULT nextval('reference_ref_id_seq'::regclass),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    contact_num character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact_ext character varying(10) COLLATE pg_catalog."default",
    relationship character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT reference_pkey PRIMARY KEY (ref_id)
)

TABLESPACE pg_default;

ALTER TABLE public.reference
    OWNER to master;

COMMENT ON TABLE public.reference
    IS 'This table stores all the reference information for profiles on AoC.';