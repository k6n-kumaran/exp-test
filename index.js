import express from 'express'
import env from 'dotenv'


env.config();
const app = express();
const port = process.env.PORT;

app.use(express.json())

let teaData = [];
let nextId = 1;

app.get("/teas"  ,(req,res) => {
    res.status(200).send(teaData)
}); 

app.post("/teas", (req,res) => {
     const {name,price } = req.body;
     let newItem = {id : nextId++ , name, price}
     teaData.push(newItem)
     res.status(201).send(newItem)
})

app.get("/teas/:id" , (req,res) => {
 const tea = teaData.find(t => t.id  === parseInt(req.params.id))
 if(!tea) {
    res.status(404)
 } 
    res.status(200).send(tea)
 
})

app.put("/teas/:id" ,  (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if(!tea) {
        res.status(404).send("Tea not found")
    }

    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;

    res.status(201).send(tea)
})


app.delete("/teas/:id", (req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));

    if(index === -1) {
        return res.status(404).send("NOT FOUND")

    }
    teaData.splice(index,1)
    return res.status(201).send("DELETED")
})

app.listen(port, () => {
    console.log(`Server listening on localhost ${port}`);
})