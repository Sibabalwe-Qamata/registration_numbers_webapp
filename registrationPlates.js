"use strict";
module.exports = async function(pool) 
{

    let numberPlateDisplay;
    let town = '';
    let RegItem;

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
            if(checkReg.rowCount >0){
                await pool.query('INSERT into reg_numbers  (reg_number location_indicator) values ($1,$2)', [formatedPlate,town_locator]);
                
                return formatedPlate;
            }

        }
    async function getRegPlates()
    {
        let allRegs = await pool.query('SELECT id from reg_number');
        return allRegs.rows;
    }

    

   
    function getItem(listItem){
        
        for(let p= 0 ; p <listItem.length; p++){
           RegItem = listItem[p];
        }

        return RegItem;
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
        

        filterTown:filterRegPlate,

        item : getItem
      
     }

}