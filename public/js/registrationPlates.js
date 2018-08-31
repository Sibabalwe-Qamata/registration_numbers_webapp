"use strict";
module.exports =  function(pool) 
{

    let numberPlateDisplay;
    let town = '';
    let RegItem;

    let townsList = [];

   // var plateStored = NumberPlateDatabase || {};

    async function verifyInput(getRegNum)
    {
        if((getRegNum.length > 11))
        {
        return false;
        }
        else if((getRegNum.length <= 11))
        {
        return true;
        }
    }
   
     async function setRegPlate(numPlate) 
        {
            if((numPlate.length > 11))
            {
            return false;
            }
            let town_locator = numPlate.slice(0,3).toUpperCase();
            let formatedPlate = numPlate.toUpperCase();
            let checkReg =  await pool.query('SELECT id FROM reg_numbers WHERE reg_number=$1', [formatedPlate])
    
            if(checkReg.rowCount < 1){
                await pool.query('INSERT into towns  (town_reg,location_indicator) values ($1,$2)', ['Cape Town',town_locator]);
                await pool.query('INSERT into reg_numbers  (reg_number) values ($1)', [formatedPlate]);
                return formatedPlate;
            }

        }
    async function getRegPlates()
    {
        let allRegs = await pool.query('SELECT * from reg_numbers');
        return  allRegs.rows;
    }

    async function resetDB(){
        let clearDB = await pool.query("DELETE from reg_numbers");
        return clearDB;
    }

    async function filterRegPlate(TownChoice) 
        {
                var townSelected = [];
            
                var newArray = Object.keys(plateStored);

            if(TownChoice === "All"){
                    return newArray ;
            }
            for(var i = 0; i <newArray.length; i++)
            {
                    if(newArray[i].startsWith(TownChoice))
                    {
                        townSelected.push(newArray[i]);

                    } 
            }
            return townSelected;
        }
    
  
    return {
        enterRegPlate: setRegPlate,
        validateInput: verifyInput,
        getPlate: getRegPlates,
        resetDataBase: resetDB,
    
        filterTown:filterRegPlate
      
     }

}