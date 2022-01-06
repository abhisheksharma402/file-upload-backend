const csvtojson = require("csvtojson");
// columns = ["Sno", "X", "Y", "Z"]
columns = ["id", "name", "marks"]

function check(data){
    let c=1
    data.forEach( (item)=>{
        let i=0
        for(let field in item){
            debugger;
            if((field.toLowerCase() != columns[i].toLowerCase())){
                c=0
                break;
                // if((field == "id" || field == "marks" && parseInt(item[field]) == NaN)){
                //     c=0
                //     break;
                // }
            }
            // else{
            //     c=0
            //     break;
            // }
            i++;
        }
    } )
    if(c==0)
        return false;
    return true;
    
}


async function toJSON(filePath){
    const data = await csvtojson().fromFile(filePath);
    return data;
};

module.exports = {toJSON, check}