
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "category"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (120) NOT NULL,
    "poster" VARCHAR(120) NOT NULL
);
DROP TABLE "category";


CREATE TABLE "videos"
(
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (200) NOT NULL,
    "category_id" INT NOT NULL REFERENCES "category"
);
DROP TABLE "videos";

CREATE TABLE "articles"
(
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR (200) NOT NULL,
    "category_id" INT NOT NULL REFERENCES "category"
);
DROP TABLE "articles";

CREATE TABLE "feedback"
(
    "id" serial PRIMARY KEY,
    "understanding" INT NOT NULL,
    "quality" INT NOT NULL,
    "interest" INT NOT NULL,
    "comments" text,
    "user_id" INT NOT NULL REFERENCES "user",
    "date" date NOT NULL DEFAULT CURRENT_DATE
);
DROP TABLE "feedback";

INSERT INTO "category"
    ("name","poster")
VALUES
    ('Forehand', 'https://media0.giphy.com/media/d91znKMfav9mre2TlC/200.gif'),
    ('Backhand', 'https://thumbs.gfycat.com/WillingDirtyDouglasfirbarkbeetle-size_restricted.gif'),
    ('Serve', 'https://thumbs.gfycat.com/EqualMintyKitfox-max-1mb.gif'),
    ('Topspin', 'https://i.makeagif.com/media/5-19-2015/G5k_Qd.gif'),
    ('Slice', 'https://i.makeagif.com/media/5-26-2014/HEXTv4.gif');

INSERT INTO "videos"
    (category_id, url)
VALUES
    (1, 'https://www.youtube.com/watch?v=aZj7DIEftPg');
INSERT INTO "videos"
    (category_id, url)
VALUES
    (1, 'https://www.youtube.com/watch?v=-sZ3madzfoA');

INSERT INTO "videos"
    (category_id, url)
VALUES
    (2, 'https://www.youtube.com/watch?v=hKSr14cUn9Q');
INSERT INTO "videos"
    (category_id, url)
VALUES
    (2, 'https://www.youtube.com/watch?v=PBguk3yRPgI');

INSERT INTO "videos"
    (category_id, url)
VALUES
    (3, 'https://www.youtube.com/watch?v=w03NVg7YtNo');
INSERT INTO "videos"
    (category_id, url)
VALUES
    (3, 'https://www.youtube.com/watch?v=ue0M7ki9G1w');

INSERT INTO "videos"
    (category_id, url)
VALUES
    (4, 'https://www.youtube.com/watch?v=Rm08-qbXeW8');
INSERT INTO "videos"
    (category_id, url)
VALUES
    (4, 'https://www.youtube.com/watch?v=AQvD_pMVL8E');


INSERT INTO "videos"
    (category_id, url)
VALUES
    (5, 'https://www.youtube.com/watch?v=t0s8V1G9dKs');
INSERT INTO "videos"
    (category_id, url)
VALUES
    (5, 'https://www.youtube.com/watch?v=_1Z9GfHCwmM');

INSERT INTO "videos"
    (category_id, url)
VALUES
    (5, 'https://www.youtube.com/watch?v=t0s8V1G9dKs');
INSERT INTO "videos"
    (category_id, url)
VALUES
    (5, 'https://www.youtube.com/watch?v=_1Z9GfHCwmM');

SELECT category.name, array_agg(url) as videos
FROM "videos"
    JOIN "category" ON videos.category_id = category.id
GROUP BY category.name;