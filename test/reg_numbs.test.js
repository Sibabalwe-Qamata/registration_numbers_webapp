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
    await pool.query("delete from towns;");
  });

  it("It should Return the  Registration Number Plate that was added to the Database.", async function() {
    let reg = await regNumFactory(pool);

  ;
    assert.equal(await reg.enterRegPlate("CA 1485"), "CA 1485");
  });

});