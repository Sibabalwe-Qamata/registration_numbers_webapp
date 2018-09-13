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
       let town_locator = getRegNum.slice(0,3).toUpperCase().trim();
       let checkReg =  await pool.query('SELECT id FROM towns WHERE location_indicator=$1', [town_locator]);
       return checkReg.rows[0].id;
   }
  
    
     async function setRegPlate(numPlate) 
        {

            let formatedPlate = numPlate.toUpperCase();
                console.log( await getLocation());
                console.log(formatedPlate);
               //let  keep = await pool.query('INSERT into reg_numbers  (reg_number, town_id)', [formatedPlate, ]);

            //    let  keep2 = await pool.query('INSERT INTO reg_numbers (reg_number)
            //    VALUES (SELECT(id FROM user WHERE name='John Smith'), 83, 185);', [formatedPlate]);
            
            return formatedPlate;

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