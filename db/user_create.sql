-- Table: public.user

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    user_id integer NOT NULL DEFAULT nextval('user_user_id_seq'::regclass),
    oauth_token character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    is_verified boolean NOT NULL DEFAULT false,
    email character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to master;

COMMENT ON TABLE public."user"
    IS 'Table of all unique users of AoC who has created a login.';