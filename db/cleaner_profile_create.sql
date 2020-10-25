-- Table: public.cleaner_profile

-- DROP TABLE public.cleaner_profile;

CREATE TABLE public.cleaner_profile
(
    profile_id integer NOT NULL DEFAULT nextval('cleaner_profile_profile_id_seq'::regclass),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    contact_num character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact_ext character varying(10) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    CONSTRAINT cleaner_profile_pkey PRIMARY KEY (profile_id)
)

TABLESPACE pg_default;

ALTER TABLE public.cleaner_profile
    OWNER to master;

COMMENT ON TABLE public.cleaner_profile
    IS 'This table contains all cleaner application profiles on AoC.';