var exec = require('child_process').exec;
var _=require('lodash');
var fs = require('fs');


//The "zpool status" command is printed and sent to the poolSplit function
var command="zpool status"
    exec(command,function(err,stdout,stderr){
        if(err || stderr.length>0){
        	console.log(err)
        }
        else{
        	var arr=((stdout.split('pool')));
        	arr.splice(0,1)
        	arr.forEach(function(a){
        		poolSplit("pool"+a); //here we send the command output.
        	})

        }

});


//The "Zpool status" command separates the output from line breaks and sends it to the "status" function.
var poolSplit=function(data){
	var obj={};
	obj.pool=data.substring(data.indexOf("pool:")+5,data.indexOf("state:")).replace("\n","");//We cut the output of  between "pool:"+5 and "state:".
	obj.state=data.substring(data.indexOf("state:")+6,data.indexOf("scan:")).replace("\n","");//We cut the output of  between "state"+6 and "scan:".
	obj.scan=data.substring(data.indexOf("scan:")+5,data.indexOf("config:")).replace("\n","");//We cut the output of  between "scan"+5 and "config:".
	obj.config=data.substring(data.indexOf("config:")+7,data.indexOf("errors")).replace("\n","");//We cut the output of  between "config"+7 and "errors:".
	obj.errors=data.substring(data.indexOf("errors:")+7).replace("\n","");
	obj.config=state(obj.config);//and we sent the "config" part to the state function.
    //wrire JSON file
    console.log("Write JSON File")
	fs.writeFile("./jsonFile/zpool.json", JSON.stringify(obj, null, 4));
    console.log(obj);
   
    //sample for reading

   /*
	console.log(" Read JSON File")
	fs.readFile('./jsonFile/zpool.json', 'utf8', function (err, asd) {
    	if (err) throw err; // we'll not consider error handling for now
    	var rd = JSON.parse(asd);
    	console.log(rd)
	});*/
}


 
var state=function(data){
	var arr=(data.split('\n')) //we cut the contents of the incoming "config" from the end of the line.we are adding into the array.
	var newArray=[];
	arr.forEach(function(item){
		console.log(item);
		var newElement=(_.compact(item.replace('\t','').split("  ")))//Using the "lodash" library, we can easily get rid of the gaps in the elements of the array.
		if(newElement.length!=0){
			//we are adding the part we have edit into the object.
			var obj={};
			obj.name=newElement[0];
			obj.state=newElement[1];
			obj.read=newElement[2];
			obj.write=newElement[3];
			obj.cksum=newElement[4];

			newArray.push(obj); //we are adding the json state into the new array.
		}
	})
	delete newArray[0]
	return newArray;

}



