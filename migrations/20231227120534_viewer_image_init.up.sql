CREATE TABLE "viewer_image"
(
    id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data      BYTEA,
    format    VARCHAR(50),
    viewer_id UUID UNIQUE REFERENCES "viewer" (id)
);
