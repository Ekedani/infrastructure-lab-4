CREATE TYPE GenderEnum AS ENUM ('male', 'female');
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "viewer" (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          first_name VARCHAR(255),
                          last_name VARCHAR(255),
                          birth_date DATE,
                          gender GenderEnum
);

CREATE TABLE "order" (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         viewer_id UUID REFERENCES "viewer"(id)
);

CREATE TABLE "ticket" (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          order_id UUID REFERENCES "order"(id),
                          start_date DATE,
                          start_time TIME,
                          seat INT,
                          movie_title VARCHAR(255)
);
