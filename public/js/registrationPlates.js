"use strict";
module.exports = function (pool) {

    let numberPlateDisplay;
    let town = '';
    let RegItem;

    let townsList = [];

    // var plateStored = NumberPlateDatabase || {};

    async function verifyInput(getRegNum) {
        let town_locator = getRegNum.slice(0, 3).toUpperCase().trim();
        let checkReg = await pool.query('SELECT id FROM towns WHERE location_indicator=$1', [town_locator]);
        return checkReg.rows[0].id;
    }


    async function setRegPlate(numPlate, town_id) {
        let formatedPlate = numPlate.toUpperCase();
        let location_id = await verifyInput(town_id);
        //Need to add validation checks!!!
        await pool.query('INSERT into reg_numbers  (reg_number, town_id) values ($1, $2)', [formatedPlate, location_id]);
        return formatedPlate;
    }
    async function getRegPlates() {
       
        let allRegs = await pool.query('SELECT * from reg_numbers');
        return allRegs.rows;
    }

    async function resetDB() {
        let clearDB = await pool.query("DELETE from reg_numbers");
        return clearDB;
    }

    async function filterRegPlate(TownChoice) {
        if(TownChoice !== "All")
        {
            let locationTagFound = await pool.query('SELECT id FROM towns where location_indicator  = $1', [TownChoice]);
            //First get the Registration number and the location_indicator from the reg_numbers table.
            let Filter = await pool.query('SELECT reg_number FROM reg_numbers WHERE town_id=$1',[locationTagFound.rows[0].id]);
           return Filter.rows;
               // return newArray.filter(reg = >) ;
        }
        else{
            return await getRegPlates();
        }
    
    }

    async function dropMenu(TownChoice) 
    {    

        let townPicked = await pool.query('SELECT * FROM towns');
       if(TownChoice != undefined || TownChoice !=''){
        for(var k=0; k < townPicked.rows.length ; k++)
        {
            
            if(townPicked.rows[k].location_indicator === TownChoice){
                townPicked.rows[k].checked = true;

            }
            
        }
       } 
       console.log(townPicked.rows);
       
        return townPicked.rows;


    }

    return {
        enterRegPlate: setRegPlate,
        validateInput: verifyInput,
        getPlate: getRegPlates,

        resetDataBase: resetDB,

        filterTown: filterRegPlate,
        dropDown : dropMenu

    }

}