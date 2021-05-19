USE dev;

CREATE TABLE IF NOT EXISTS can (
    uid VARCHAR(32),
    category VARCHAR(255),
    name VARCHAR(255),
    price FLOAT,
    url VARCHAR(255),
    image_data VARCHAR(64000),
    alcool FLOAT,
    type VARCHAR(255),
    PRIMARY KEY (uid)
);
