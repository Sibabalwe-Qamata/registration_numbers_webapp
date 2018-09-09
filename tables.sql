drop table if exists towns CASCADE;
create table towns(
	id serial not null primary key,
	town text not null,
	location_indicator text not null
);

drop table if exists reg_numbers;
create table reg_numbers(
	id serial not null primary key,
    reg_number text not null,
	town_id int not null,
    foreign key (town_id) references towns(id)
	
);


-- Add the locations as well as towns
INSERT INTO towns (town, location_indicator) VALUES ('Cape Town', 'CA');
INSERT INTO towns (town, location_indicator) VALUES ('Caledon & Kleinmond', 'CAM');
INSERT INTO towns (town, location_indicator) VALUES ('Clanwilliam & Lamberts Bay', 'CAR');
INSERT INTO towns (town, location_indicator) VALUES ('George', 'CAW');

INSERT INTO towns (town, location_indicator) VALUES ('Ladismith', 'CBL');
INSERT INTO towns (town, location_indicator) VALUES ('Laingsburg', 'CBM');
INSERT INTO towns (town, location_indicator) VALUES ('Montagu', 'CBR');
INSERT INTO towns (town, location_indicator) VALUES ('Mossel Bay & Hartenbos', 'CBS');
INSERT INTO towns (town, location_indicator) VALUES ('Murraysburg', 'CBT');
INSERT INTO towns (town, location_indicator) VALUES ('Piketberg', 'CBY');

INSERT INTO towns (town, location_indicator) VALUES ('Prince Albert', 'CCA');
INSERT INTO towns (town, location_indicator) VALUES ('Riversdale & Still Bay', 'CCC');
INSERT INTO towns (town, location_indicator) VALUES ('Robertson & McGregor', 'CCD');
INSERT INTO towns (town, location_indicator) VALUES ('Swellendam & Barrydale', 'CCK');
INSERT INTO towns (town, location_indicator) VALUES ('Tulbagh', 'CCM');
INSERT INTO towns (town, location_indicator) VALUES ('Uniondale', 'CCO');
INSERT INTO towns (town, location_indicator) VALUES ('Vanrhynsdorp & Klawer', 'CCP');

INSERT INTO towns (town, location_indicator) VALUES ('Moorreesburg', 'CEA');
INSERT INTO towns (town, location_indicator) VALUES ('Heidelberg', 'CEG');
INSERT INTO towns (town, location_indicator) VALUES ('Hermanus, Gans Bay, Onrus River & Stanfor', 'CEM');
INSERT INTO towns (town, location_indicator) VALUES ('Grabouw', 'CEO');
INSERT INTO towns (town, location_indicator) VALUES ('Kuilsrivier & Brackenfell', 'CER');
INSERT INTO towns (town, location_indicator) VALUES ('Albertinia', 'CES');
INSERT INTO towns (town, location_indicator) VALUES ('Porterville', 'CEX');
INSERT INTO towns (town, location_indicator) VALUES ('Strand & Gordons Bay', 'CEY');

INSERT INTO towns (town, location_indicator) VALUES ('Wolseley', 'CFA');
INSERT INTO towns (town, location_indicator) VALUES ('Vredenburg & St Helena Bay', 'CFG');
INSERT INTO towns (town, location_indicator) VALUES ('Somerset West', 'CFM');
INSERT INTO towns (town, location_indicator) VALUES ('Velddrif', 'CFP');
INSERT INTO towns (town, location_indicator) VALUES ('Kuilsrivier & Brackenfell', 'CFR');
INSERT INTO towns (town, location_indicator) VALUES ('Oudtshoorn', 'CG');
INSERT INTO towns (town, location_indicator) VALUES ('Paarl & Franschhoek', 'CJ');
INSERT INTO towns (town, location_indicator) VALUES ('Paarl', 'CJ');
INSERT INTO towns (town, location_indicator) VALUES ('Malmesbury & Darling', 'CK');

INSERT INTO towns (town, location_indicator) VALUES ('Stellenbosch', 'CL');
INSERT INTO towns (town, location_indicator) VALUES ('Wellington', 'CN');
INSERT INTO towns (town, location_indicator) VALUES ('Calitzdorp', 'CO');
INSERT INTO towns (town, location_indicator) VALUES ('Hopefield & Langebaan', 'CR');
INSERT INTO towns (town, location_indicator) VALUES ('Bredasdorp & Napier', 'CS');
INSERT INTO towns (town, location_indicator) VALUES ('Ceres', 'CT');
INSERT INTO towns (town, location_indicator) VALUES ('Vredendal', 'CV');
INSERT INTO towns (town, location_indicator) VALUES ('Worcester', 'CW');

INSERT INTO towns (town, location_indicator) VALUES ('Knysna, Sedgefield & Plettenberg Bay', 'CX');
INSERT INTO towns (town, location_indicator) VALUES ('Bellville, Durbanville & Kraaifontein', 'CY');
INSERT INTO towns (town, location_indicator) VALUES ('Beaufort West', 'CZ');



