-- Table: public.user

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    user_id integer NOT NULL DEFAULT nextval('user_user_id_seq'::regclass),
    oauth_token character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_type "User Type" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to master;

COMMENT ON TABLE public."user"
    IS 'Table of all unique users of AoC who has created a login.';