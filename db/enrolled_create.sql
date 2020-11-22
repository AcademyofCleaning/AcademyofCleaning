-- Table: public.enrolled

-- DROP TABLE public.enrolled;

CREATE TABLE public.enrolled
(
    row_id bigint NOT NULL,
    profile_id bigint NOT NULL,
    cert_id bigint NOT NULL,
    is_complete boolean NOT NULL DEFAULT false,
    CONSTRAINT completed_cert_pkey PRIMARY KEY (row_id),
    CONSTRAINT cert_id FOREIGN KEY (cert_id)
        REFERENCES public.certification (cert_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT profile_id FOREIGN KEY (profile_id)
        REFERENCES public.cleaner_profile (profile_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.enrolled
    OWNER to master;

COMMENT ON TABLE public.enrolled
    IS 'This table contains the relationship between cleaner profiles and the initiated certifications associated with each profile.';