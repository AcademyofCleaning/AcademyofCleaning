-- Table: public.has_ref

-- DROP TABLE public.has_ref;

CREATE TABLE public.has_ref
(
    row_id integer NOT NULL DEFAULT nextval('has_ref_row_id_seq'::regclass),
    profile_id bigint NOT NULL,
    ref_id bigint NOT NULL,
    CONSTRAINT has_ref_pkey PRIMARY KEY (row_id),
    CONSTRAINT profile_id FOREIGN KEY (profile_id)
        REFERENCES public.cleaner_profile (profile_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ref_id FOREIGN KEY (ref_id)
        REFERENCES public.reference (ref_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.has_ref
    OWNER to master;

COMMENT ON TABLE public.has_ref
    IS 'This table contains the relationships between cleaner profiles and references provided in each profile.';