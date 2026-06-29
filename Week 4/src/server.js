//Simple Product Catalog

const express = require('express');

const app = express();

app.use(express.json());

const items = [{{ id:1 , name : 'Apple' , price : 30}];
let nextID = 2;

app.get('/health', (req,res)=>{
    res.json({status:'ok', uptime:process.uptime()});
});

app.get('/items', (req,res)=>{
    res.json({data : items});
});
app.get('/items/:id' , (req,res)=>{
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).json({error : 'not found'});
    res.json({data:item});
});

app.post('/items',(req,res)=>{
    const {name,price} = req.body;
    if(!name || !price) return res.status(400).json({error : 'name and price required'});
    const newItem = {id : nextID++ , name , price };
    items.push(newItem);
    res.status(201).json({data:newItem});
});

const PORT = process.env.PORT || 3000;
if(require.main == module)
{
    app.listen(PORT,()=>console.log(`Running on ${PORT}`));
}

module.exports = app;