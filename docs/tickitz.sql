-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS cinemas_id_seq;

-- Table Definition
CREATE TABLE "public"."cinemas" (
    "id" int4 NOT NULL DEFAULT nextval('cinemas_id_seq'::regclass),
    "movie_id" int8,
    "name" varchar,
    "city" varchar,
    "addres" varchar,
    "show_times" jsonb,
    "price" int8,
    "logo" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS months_id_seq;

-- Table Definition
CREATE TABLE "public"."months" (
    "id" int4 NOT NULL DEFAULT nextval('months_id_seq'::regclass),
    "january" varchar,
    "february" varchar,
    "march" varchar,
    "april" varchar,
    "may" varchar,
    "june" varchar,
    "july" varchar,
    "august" varchar,
    "september" varchar,
    "october" varchar,
    "november" varchar,
    "december" varchar
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS untitled_table_216_id_seq;

-- Table Definition
CREATE TABLE "public"."movies" (
    "id" int4 NOT NULL DEFAULT nextval('untitled_table_216_id_seq'::regclass),
    "name" varchar,
    "release_date" timestamp,
    "duration" varchar,
    "genres" jsonb,
    "directed_by" varchar,
    "casts" jsonb,
    "synopsis" text,
    "poster" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_history_id_seq;

-- Table Definition
CREATE TABLE "public"."order_history" (
    "id" int4 NOT NULL DEFAULT nextval('order_history_id_seq'::regclass),
    "movie_id" int8,
    "cinema_id" int8,
    "user_id" int8,
    "created_at" timestamp,
    "movie_started" timestamp,
    "seat" jsonb,
    "barcode_url" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS payment_id_seq;

-- Table Definition
CREATE TABLE "public"."payment" (
    "id" int4 NOT NULL DEFAULT nextval('payment_id_seq'::regclass),
    "name" varchar,
    "logo" text
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS seats_id_seq;

-- Table Definition
CREATE TABLE "public"."seats" (
    "id" int4 NOT NULL DEFAULT nextval('seats_id_seq'::regclass),
    "seat_a" jsonb,
    "seat_b" jsonb,
    "seat_c" jsonb,
    "seat_d" jsonb,
    "seat_e" jsonb,
    "seat_f" jsonb,
    "seat_g" jsonb
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "first_name" varchar,
    "last_name" varchar,
    "phone_number" varchar,
    "email" varchar,
    "password" varchar,
    "photo_profile" text
);

INSERT INTO "public"."cinemas" ("id", "movie_id", "name", "city", "addres", "show_times", "price", "logo") VALUES
(19, 1, 'CINEPOLIS LIPPO PLAZA JOGJAAAAAAAAA', 'Yogyakarta', 'Jl. LAKSDA ADSUCIPTO no 32-34, Demangan Gondokusuman, D.I.Yogyakarta.', '["11:05", "13:45", "16:25", "19:05", "21:40"]', 35000, 'https://delmarhighlandstowncenter.com/wp-content/uploads/2020/08/DMHTC_Listing_Gallery_Cinepolis-logo-1.jpg');
INSERT INTO "public"."cinemas" ("id", "movie_id", "name", "city", "addres", "show_times", "price", "logo") VALUES
(1, 1, 'EMPIRE XXI', 'Yogyakarta', 'Jl. Urip Sumoharjo, Yogyakarta.', '["13:00", "15:30", "18:00", "20:30"]', 45000, 'https://awards.brandingforum.org/wp-content/uploads/2017/11/PLogo-01-1.jpg');
INSERT INTO "public"."cinemas" ("id", "movie_id", "name", "city", "addres", "show_times", "price", "logo") VALUES
(2, 1, 'CGV HARTONO MALL', 'Yogyakarta', 'Jln Ring Road Utara, Yogyakarta', '["12:00", "14:15", "16:30", "18:45", "21:00"]', 45000, 'https://mediaasuransinews.co.id/wp-content/uploads/2022/12/CGV.jpg');
INSERT INTO "public"."cinemas" ("id", "movie_id", "name", "city", "addres", "show_times", "price", "logo") VALUES
(3, 2, 'EMPIRE XXI', 'Yogyakarta', 'Jl. Urip Sumoharjo, Yogyakarta.', '["12:00", "14:15", "16:30", "18:45", "21:00"]', 45000, 'https://awards.brandingforum.org/wp-content/uploads/2017/11/PLogo-01-1.jpg'),
(4, 2, 'CGV HARTONO MALL', 'Yogyakarta', 'Jln Ring Road Utara, Yogyakarta', '["13:00", "15:30", "18:00", "20:30"]', 45000, 'https://mediaasuransinews.co.id/wp-content/uploads/2022/12/CGV.jpg'),
(5, 3, 'EMPIRE XXI', 'Yogyakarta', 'Jl. Urip Sumoharjo, Yogyakarta.', '["13:00", "15:30", "18:00", "20:30"]', 45000, 'https://awards.brandingforum.org/wp-content/uploads/2017/11/PLogo-01-1.jpg'),
(6, 3, 'CGV HARTONO MALL', 'Yogyakarta', 'Jln Ring Road Utara, Yogyakarta', '["12:00", "14:15", "16:30", "18:45", "21:00"]', 45000, 'https://mediaasuransinews.co.id/wp-content/uploads/2022/12/CGV.jpg'),
(7, 4, 'EMPIRE XXI', 'Yogyakarta', 'Jl. Urip Sumoharjo, Yogyakarta.', '["13:00", "15:30", "18:00", "20:30"]', 45000, 'https://awards.brandingforum.org/wp-content/uploads/2017/11/PLogo-01-1.jpg'),
(8, 4, 'CGV HARTONO MALL', 'Yogyakarta', 'Jln Ring Road Utara, Yogyakarta', '["12:00", "14:15", "16:30", "18:45", "21:00"]', 45000, 'https://mediaasuransinews.co.id/wp-content/uploads/2022/12/CGV.jpg'),
(9, 5, 'EMPIRE XXI', 'Yogyakarta', 'Jl. Urip Sumoharjo, Yogyakarta.', '["13:00", "15:30", "18:00", "20:30"]', 45000, 'https://awards.brandingforum.org/wp-content/uploads/2017/11/PLogo-01-1.jpg'),
(10, 5, 'CGV HARTONO MALL', 'Yogyakarta', 'Jln Ring Road Utara, Yogyakarta', '["12:00", "14:15", "16:30", "18:45", "21:00"]', 45000, 'https://mediaasuransinews.co.id/wp-content/uploads/2022/12/CGV.jpg');



INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(2, 'The Lion King', '2019-07-19 00:00:00', '1h 58m', '["Adventure", "Drama", "Family"]', 'Jon Favreu', '["Donald Glover", "Beyoncé", "Seth Rogen"]', 'In Africa, the lion cub Simba is the pride and joy of his parents King Mufasa and Queen Sarabi. Mufasa prepares Simba to be the next king of the jungle. However, the naive Simba believes in his envious uncle Scar that wants to kill Mufasa and Simba to become the next king. He lures Simba and his friend Nala to go to a forbidden place and they are attacked by hyenas but they are rescued by Mufasa. Then Scar plots another scheme to kill Mufasa and Simba but the cub escapes alive and leaves the kingdom believing he was responsible for the death of his father. Now Scar becomes the king supported by the evil hyenas while Simba grows in a distant land. Sometime later, Nala meets Simba and tells that the kingdom has become a creepy wasteland. What will Simba do?', 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg');
INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(10, 'Howl''s Moving Castle', '2004-09-05 00:00:00', '1h 59m', '["Animation", "Adventure", "Family"]', 'Hayao Miyazaki', '["Chieko Baishô", "Takuya Kimura", "Tatsuya Gashûin"]', 'A love story between an 18-year-old girl named Sophie, cursed by a witch into an old woman''''s body, and a magician named Howl. Under the curse, Sophie sets out to seek her fortune, which takes her to Howl''''s strange moving castle. In the castle, Sophie meets Howl''''s fire demon, named Karishifâ. Seeing that she is under a curse, the demon makes a deal with Sophie--if she breaks the contract he is under with Howl, then Karushifâ will lift the curse that Sophie is under, and she will return to her 18-year-old shape.', 'https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg');
INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(1, 'Spider-Man: Homecoming', '2017-07-07 00:00:00', '2h 13m', '["Adventure", "Action", "Sci-Fi"]', 'Jon Watts', '["Tom Holland", "Michael Keaton", "Robert Downey Jr."]', 'A young Peter Parker/Spider-Man begins to navigate his newfound identity as web-slinging superhero Spider-Man. Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark. Peter tries to fall back into his normal daily routine--distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man--but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened.', 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_FMjpg_UX1000_.jpg');
INSERT INTO "public"."movies" ("id", "name", "release_date", "duration", "genres", "directed_by", "casts", "synopsis", "poster") VALUES
(3, 'John Wick: Chapter 3 - Parabellum', '2019-05-17 00:00:00', '2h 10m', '["Action", "Crime", "Thriller"]', 'Chad Stahelski', '["Keanu Reeves", "Halle BerryIan", "McShane"]', 'In this third installment of the adrenaline-fueled action franchise, skilled assassin John Wick (Keanu Reeves) returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin''''s guild, the High Table, John Wick is excommunicado, but the world''''s most ruthless hit men and women await his every turn.', 'https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg'''),
(5, 'Black Widow', '2021-07-09 00:00:00', '2h 14m', '["Action", "Adventure", "Sci-Fi"]', 'Cate Shortland', '["Scarlett Johansson", "Florence Pugh", "David Harbour"]', 'In Marvel Studios'''' action-packed spy thriller "Black Widow," Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake long before she became an Avenger.', 'https://m.media-amazon.com/images/M/MV5BZGRlNTY3NGYtM2YzZS00N2YyLTg0ZDYtNmY2ZDg2NDM3N2JlXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_FMjpg_UX1000_.jpg'),
(6, 'The Witches', '2020-10-22 00:00:00', '1h 46m', '["Adventure", "Comedy", "Family"]', 'Robert Zemeckis', '["Anne Hathaway", "Octavia Spencer", "Stanley Tucci"]', 'Reimagining Roald Dahl''''s beloved story for a modern audience, Robert Zemeckis''''s visually innovative film tells the darkly humorous and heartwarming tale of a young orphaned boy who, in late 1967, goes to live with his loving Grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world''''s Grand High Witch has gathered her fellow cronies from around the globe-undercover-to carry out her nefarious plans. Zemeckis is joined by a world-class team of filmmakers, including Alfonso Cuarón, Guillermo del Toro and Kenya Barris. The cast includes powerhouse performances from Anne Hathaway, Octavia Spencer, Stanley Tucci, Kristin Chenoweth and Chris Rock, with newcomer Jahzir Kadeen Bruno as the brave young hero.', 'https://m.media-amazon.com/images/I/91vQpwNEXGL._AC_UF1000,1000_QL80_.jpg'),
(8, 'Tenet', '2020-09-03 00:00:00', '2h 30m', '["Action", "Sci-Fi", "Thriller"]', 'Cristopher Nolan', '["John David Washington", "Robert Pattinson", "Elizabeth Debicki"]', 'In a twilight world of international espionage, an unnamed CIA operative, known as The Protagonist, is recruited by a mysterious organization called Tenet to participate in a global assignment that unfolds beyond real time. The mission: prevent Andrei Sator, a renegade Russian oligarch with precognitive abilities, from starting World War III. The Protagonist will soon master the art of "time inversion" as a way of countering the threat that is to come.', 'https://m.media-amazon.com/images/M/MV5BMzU3YWYwNTQtZTdiMC00NjY5LTlmMTMtZDFlYTEyODBjMTk5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg'),
(9, 'Kiki''s Delivery Service', '2018-01-12 00:00:00', '1h 43m', '["Animation", "Family", "Fantasy"]', 'Hayao Miyazaki', '["Kirsten Dunst", "Minami Takayama", "Rei Sakuma"]', 'This is the story of a young witch, named Kiki who is now 13 years old. But she is still a little green and plenty headstrong, but also resourceful, imaginative, and determined. With her trusty wisp of a talking cat named Jiji by her side she''''s ready to take on the world, or at least the quaintly European seaside village she''''s chosen as her new home.', 'https://m.media-amazon.com/images/M/MV5BYTQ1ZTM1ZTgtN2Q2Ny00YjFkLTliNjEtN2I1ZmY5ZTY1OTEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg'),
(7, 'Interstellar', '2014-11-07 00:00:00', '2h 49m', '["Adventure", "Drama", "Sci-Fi"]', 'Cristopher Nolan', '["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]', 'In a twilight world of international espionage, an unnamed CIA operative, known as The Protagonist, is recruited by a mysterious organization called Tenet to participate in a global assignment that unfolds beyond real time. The mission: prevent Andrei Sator, a renegade Russian oligarch with precognitive abilities, from starting World War III. The Protagonist will soon master the art of "time inversion" as a way of countering the threat that is to come.', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'),
(4, 'Spirited Away', '2001-07-20 00:00:00', '2h 5m', '["Animation", "Adventure", "Family"]', 'Hayao Miyazaki', '["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"]', 'Chihiro and her parents are moving to a small Japanese town in the countryside, much to Chihiro''''s dismay. On the way to their new home, Chihiro''''s father makes a wrong turn and drives down a lonely one-lane road which dead-ends in front of a tunnel. Her parents decide to stop the car and explore the area. They go through the tunnel and find an abandoned amusement park on the other side, with its own little town. When her parents see a restaurant with great-smelling food but no staff, they decide to eat and pay later. However, Chihiro refuses to eat and decides to explore the theme park a bit more. She meets a boy named Haku who tells her that Chihiro and her parents are in danger, and they must leave immediately. She runs to the restaurant and finds that her parents have turned into pigs. In addition, the theme park turns out to be a town inhabited by demons, spirits, and evil gods. At the center of the town is a bathhouse where these creatures go to relax. The owner of the bathhouse is the evil witch Yubaba, who is intent on keeping all trespassers as captive workers, including Chihiro. Chihiro must rely on Haku to save her parents in hopes of returning to their world.', 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg');







INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(1, 'Dominic', 'Toretto', '0123456789', 'dominictoretto@gmail.com', 'dominic123', 'https://assets.pikiran-rakyat.com/crop/0x92:1080x812/x/photo/2021/06/11/807839757.jpg');
INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(2, 'Brian', 'O''Conner', '0234567890', 'brianoconner@gmail.com', 'brian456', 'https://static.onecms.io/wp-content/uploads/sites/6/2013/12/paul-walker-fast-and-furious.jpg');
INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(4, 'Roman', 'Pearce', '0345678901', 'romanpearce@gmail.com', 'roman789', 'https://static.wikia.nocookie.net/p__/images/b/bf/Roman_Pearce.jpg/revision/latest/scale-to-width-down/350?cb=20210706093538&path-prefix=protagonist');
INSERT INTO "public"."users" ("id", "first_name", "last_name", "phone_number", "email", "password", "photo_profile") VALUES
(5, 'Leticia', 'Ortiz', '0456789012', 'leticiaortiz@gmail.com', 'leticia123', 'https://upload.wikimedia.org/wikipedia/it/7/79/Leticia_ortiz.jpg'),
(6, 'Mia', 'Toretto', '0567890123', 'miatoretto@gmail.com', 'mia456', 'https://bacaterus.com/wp-content/uploads/2021/02/pemain-fast-and-furious_Mia-Toretto-Jordana-Brewster.jpg'),
(3, 'Han', 'Ajah', '0678901234', 'hanajah@gmail.com', 'han789', 'https://bacaterus.com/wp-content/uploads/2021/02/pemain-fast-and-furious_Han-Sung-Kang.jpg'),
(7, 'Gisele', 'Yashar', '0678901234', 'giseleyashar@gmail.com', 'gisel789', 'https://bacaterus.com/wp-content/uploads/2021/02/pemain-fast-and-furious_Gisele-Yashar-Gal-Gadot.jpg'),
(9, 'Drift', 'King', '0789012345', 'driftking@gmail.com', 'drift123', 'https://static.wikia.nocookie.net/fastandfurious/images/9/9b/Takashiii.jpg/revision/latest?cb=20130629163337'),
(8, 'Luke', 'Hobbs', '0890123456', 'lukehobbs@gmail.com', 'luke456', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSEK2p95Op1ZM_ZNp5EymQAgj8rPkCUoIyMuY_SOH75nkdk7A7m'),
(10, 'Monica', 'Fuentes', '0901234567', 'monicafuentes@gmail.com', 'monica456', 'https://static.wikia.nocookie.net/fastandfurious/images/c/c8/Monica.png/revision/latest?cb=20120815202038'),
(30, 'Bayem', 'ajah', '08123456789', 'bayemsore@gmail.com', '$2b$10$dZQjRCcbEBzJShIRm8tCYO8x2A.WgUJp1oR8Y4NHvf2DKUEIN/BB.', 'https://postpangandaran.com/photo/plugin/article/2023/1693277962_1-org.jpeg');
