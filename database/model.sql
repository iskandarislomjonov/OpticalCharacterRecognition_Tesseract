create database ocr_app;

create table users(
   id serial primary key not null,
   email varchar(64) unique not null,
   first_name text not null, 
   last_name text not null,
   password varchar(64) not null,
   created_at timestamp with time zone default CURRENT_TIMESTAMP
);

create table messages(
   message_id serial primary key not null,
   your_name text not null,
   email varchar(64) not null ,
   message_list text not null,
   created_at timestamp with time zone default CURRENT_TIMESTAMP
);