const express=require("express");
const app=express();

app.use(express.json());

//in memory
const user = [{
    name: "raj",
    kindneys:[{
        healthy: false
    }]
}];

//get
app.get('/',function(req,res){
    const johnkidneys= user[0].kindneys; //the array of kidneys
    const numberofKidneys= johnkidneys.length;
    var healthynumber=0;
    for(let i=0;i<johnkidneys.length;i++){
        if(johnkidneys[i].healthy){
            healthynumber=healthynumber+1;
        }
    }
    const unhealthynumber=numberofKidneys-healthynumber;
    res.json({
        numberofKidneys,
        healthynumber,
        unhealthynumber
    })
})


//post---you can add a new kidney
app.post('/',function(req,res){
    const ishealthy=req.body.ishealthy;
    user[0].kindneys.push({
        healthy: ishealthy
    })
    res.json({
        msg:"Done!!!!"
    })
})

//put-- update the kidneys
app.put("/",function(req,res){
    for(let i=0;i<user[0].kindneys.length;i++){
        user[0].kindneys[i].healthy= true;
    }
    res.json({});
})

//delete--- removing al the unhealthy kidneys
app.delete("/",function(req,res){
    //only if atleast one unhealthy kidney is there do this , else return 411
    let atleastoneunhealthy=0;
    for(let i=0;i<user[0].kindneys.length;i++){
        if(!user[0].kindneys.healthy){
            atleastoneunhealthy=true
        }
    }

    if(atleastoneunhealthy){
        const newkidney=[];
        for(let i=0;i<user[0].kindneys.length;i++){
            if(user[0].kindneys[i].healthy){
                newkidney.push({
                    healthy: true
                })
            }
        }
        user[0].kindneys=newkidney;
        res.json({msg:"done"});
    }
    else{
        res.status(401).json({
            msg:"you have no bad kedneys"
        })
    }

    
})

app.listen(3000);