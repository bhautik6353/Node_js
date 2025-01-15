const http=require("http");
const port=1004;


const porthandle=(req,res)=>{
    res.write("<h1>server started</h1>");
    res.end();
}
const server=http.createServer(porthandle)

server.listen(port,(err)=>{
    err ? console.log(err) :console.log("server started port:" + port);
})