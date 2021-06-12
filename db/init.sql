USE dev;

CREATE TABLE IF NOT EXISTS User (
    uid VARCHAR(32),
    Username VARCHAR(24),
    Email VARCHAR(255),
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Password VARCHAR(500),
    UNIQUE (Username),
    UNIQUE (Email),
    PRIMARY KEY (uid)
);

CREATE TABLE IF NOT EXISTS BeerProvider (
    uid VARCHAR(32),
    Name VARCHAR(255),
    PRIMARY KEY (uid)
);

CREATE TABLE IF NOT EXISTS Beer (
    uid VARCHAR(32),
    Category VARCHAR(255),
    Name VARCHAR(255),
    Price FLOAT,
    Url VARCHAR(255),
    ImageData VARCHAR(64000),
    Alcool FLOAT,
    Type VARCHAR(255),
    Provider VARCHAR(32),
    PRIMARY KEY (uid)
);
