"use scrict";

let assert = require("assert");
let regNumFactory = require('../public/js/registrationPlates');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL || "postgresql://coder:pg123@localhost:5432/reg_numb";

const pool = new Pool({
  connectionString
});

describe("The Registration Numbers WebApp Database Unit Tests", async function() {
  beforeEach(async function() {
    await pool.query("delete from reg_numbers;");
  });

  it("It should return the town ID of the town entered (i.e Cape Town).", async function()
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CA 1485", "CA")
    assert.equal(await reg.validateInput("CA"),1);
  });


  it("It should return the town ID of the town entered (i.e George).", async function()
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CAW 1364", "CAW")
    assert.equal(await reg.validateInput("CAW"),4);
  });

  it("It should return the town ID of the town entered (i.e Paarl).", async function()
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CJ 6958", "CJ")
    assert.equal(await reg.validateInput("CJ"),10);
  });

  it("It should return the registration number of the town entered formated i.e(CJ 5246).", async function() 
  {
    let reg = await regNumFactory(pool);

    assert.equal(await reg.enterRegPlate("CJ 5246", "CJ"),"CJ 5246");
  });


  it("It should return all the registration numbers in the database.", async function() 
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CJ 5246", "CJ");
    await reg.enterRegPlate("CW 5246", "CW");

    let getAll = await reg.getPlate();

    getAll.forEach(reg => {
      delete reg.id;
    });
  
    assert.deepEqual( getAll, [ {reg_number: 'CJ 5246', town_id: 10 },
    {reg_number: 'CW 5246', town_id: 7 }]);
  });


  it("It should return all the registration numbers as per the selected town.", async function() 
  {
    let reg = await regNumFactory(pool);
    await reg.enterRegPlate("CJ 5246", "CJ");
    await reg.enterRegPlate("CJ 0146", "CJ");
  
    await reg.dropDown("CJ");
    assert.deepEqual(await reg.filterTown("CJ"),[ { reg_number: 'CJ 5246' }, { reg_number: 'CJ 0146' } ]);
  });



});