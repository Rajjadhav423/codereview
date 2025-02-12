const app=require('./src/app')
require('dotenv').config()
const http=require('http')

const server=http.createServer(app);


const port=process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`the server is running at ${port}`);
})


module.exports = app;