-- Table: public.cleaner_profile

-- DROP TABLE public.cleaner_profile;

CREATE TABLE public.cleaner_profile
(
    profile_id integer NOT NULL DEFAULT nextval('cleaner_profile_profile_id_seq'::regclass),
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    contact_num character varying(50) COLLATE pg_catalog."default",
    contact_ext character varying(10) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    app_status "Application Status" NOT NULL DEFAULT 'Began Application'::"Application Status",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    city character varying(255) COLLATE pg_catalog."default",
    middle_name character varying(255) COLLATE pg_catalog."default",
    postal_code character(6) COLLATE pg_catalog."default",
    address character varying(255) COLLATE pg_catalog."default",
    gov_id boolean DEFAULT false,
    sin character(9) COLLATE pg_catalog."default",
    hin boolean DEFAULT false,
    dob character(10) COLLATE pg_catalog."default",
    current_occup character varying(100) COLLATE pg_catalog."default",
    province character(2) COLLATE pg_catalog."default",
    CONSTRAINT cleaner_profile_pkey PRIMARY KEY (profile_id)
)

TABLESPACE pg_default;

ALTER TABLE public.cleaner_profile
    OWNER to master;

COMMENT ON TABLE public.cleaner_profile
    IS 'This table contains all cleaner application profiles on AoC.';

COMMENT ON COLUMN public.cleaner_profile.dob
    IS 'MM/DD/YYYY';