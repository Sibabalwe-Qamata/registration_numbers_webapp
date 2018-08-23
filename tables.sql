drop table;

create table registration_numbers(
	id serial not null primary key,
    reg_number char(100) not null,
	location_indicator text
);

create table towns(
	id serial not null primary key,
	town char(100) not null,
    foreign key (location_indicator) references (registration_numbers id)
);