create table towns(
	id serial not null primary key,
	town_reg text not null,
	location_indicator text not null
);

create table reg_numbers(
	id serial not null primary key,
    reg_number text not null,
	town_id int,
    foreign key (town_id) references towns(id)
	
);




-- Add the locations as well as towns

