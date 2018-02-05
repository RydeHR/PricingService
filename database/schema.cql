CREATE KEYSPACE nick with replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1    
};

USE nick;

CREATE TABLE pricing2 (
    uid int,
    areacode int, 
    date_time timestamp,
    multiplier decimal,
    success varchar,
    PRIMARY KEY(areacode, date_time)
) WITH CLUSTERING ORDER BY (date_time DESC);


CREATE TABLE pricing3 (
    uid int,
    areacode int, 
    date_time timestamp,
    multiplier decimal,
    success varchar,
    PRIMARY KEY(areacode, date_time, uid)
) WITH CLUSTERING ORDER BY (date_time DESC);

CREATE TABLE pricing4 (
    uid int,
    areacode int, 
    date_time timestamp,
    multiplier decimal,
    success int,
    PRIMARY KEY(areacode, date_time)
) WITH CLUSTERING ORDER BY (date_time DESC);