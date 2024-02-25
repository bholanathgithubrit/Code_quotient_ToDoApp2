let http=require('http');
let fs=require('fs');
let url=require('url');
let path=require('path');

http.createServer((req,res)=>{

    let path=url.parse(req.url,true);
    if(req.url=='/delete.html'){
        let todo=fs.readFileSync('./delete.html');
        res.setHeader('Content-Type','text/html');
        res.end(todo);
    }
   else if(req.url=='/'){
    fs.readFileSync('./delete.json','utf-8',(err,data)=>{
        if(err){
            res.writeHead(500,{'Content-Type':'application/json'});
            res.end(JSON.stringify({error:'Internal Server Error'}));
            return;
        }
        const tasks=JSON.parse(data);
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify(tasks));
    });
   }
    else if(path.pathname=='/delete'){
        const queryObject=url.parse(req.url,true).query;
        const taskId=parseInt(queryObject.id);
        fs.readFile('./delete.json','utf-8',(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(JSON.stringify({error:'Internal Server Error'}));
                return;
            }
            let tasks=JSON.parse(data);
            tasks=tasks.filter(task=> parseInt(task.id)!==taskId);
            fs.writeFileSync('./delete.json',JSON.stringify(tasks),err=>{
                if(err){
                    res.writeHead(500,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({error:'Internal Server Error'}));
                    return;
                }
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify(tasks));            })

        })
    }

}).listen(3001,(err)=>{
    console.log("server was started");
    if(err) console.log("Unable to start server");
});