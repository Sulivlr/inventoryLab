create schema inventory collate utf8mb4_general_ci;
use inventory;

create table category
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table places
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int                                not null,
    places_id   int                                not null,
    title       varchar(255)                       not null,
    description text                               null,
    image       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP null,
    constraint items_category_id_fk
        foreign key (category_id) references category (id),
    constraint items_places_id_fk
        foreign key (places_id) references places (id)
);

insert into category (id, title, description)
values  (1, 'Hello World!', 'World!');

insert into items (id, category_id, places_id, title, description, image, created_at)
values  (1, 1, 2, 'Computers', 'Gamer PC''s', 'images/fffa9ff8-0f61-4179-b0c2-99355d129338.png', '2024-12-20 19:08:58'),
        (4, 1, 2, 'Cars', 'formula 1 cars', 'images/ec0634ff-9282-49f3-addc-9eac4249c7f6.webp', '2024-12-20 19:13:30'),
        (10, 1, 1, 'Cars', 'formula 1 cars', 'images/1d505c70-e3b6-4284-bd3d-5c420b1c1b7c.webp', '2024-12-20 19:14:17');

insert into places (id, title, description)
values  (1, 'Donckaya and Carla Marksa', '17th school!'),
        (2, 'mkr kok-jar', 'we are from!');