-- USER  table

CREATE TYPE usr_role AS ENUM ('citizen', 'police');

CREATE TABLE users(
  id               uuid NOT NULL DEFAULT uuid_generate_v4(),
  first_name       character varying(255) NOT NULL,
  last_name        character varying(255) NOT NULL,
  email            character varying(255) NOT NULL,
  username         character varying(50) NOT NULL,
  password         character varying(200) NOT NULL,
  role             usr_role NOT NULL,
  address          character varying(255) NOT NULL,
  area             character varying(100),
  zip_code         character varying(10),
  is_active        BOOLEAN DEFAULT true,

  -- Keys
  -- Primary Key
  CONSTRAINT user_pkey PRIMARY KEY (id),

  -- Unique
  CONSTRAINT user_umail_key UNIQUE (email),
  CONSTRAINT user_uname_key UNIQUE (username)
);