-- Table: public.has_profile

-- DROP TABLE public.has_profile;

CREATE TABLE public.has_profile
(
    row_id integer NOT NULL DEFAULT nextval('has_profile_row_id_seq'::regclass),
    user_id bigint NOT NULL,
    profile_id bigint NOT NULL,
    CONSTRAINT has_profile_pkey PRIMARY KEY (row_id),
    CONSTRAINT profile_id FOREIGN KEY (profile_id)
        REFERENCES public.cleaner_profile (profile_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public."user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.has_profile
    OWNER to master;

COMMENT ON TABLE public.has_profile
    IS 'This table contains the relationships between users identified as cleaners and their cleaner profiles.';