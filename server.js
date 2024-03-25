const express = require('express')
const mongoose = require('mongoose')

const productRoutes = require('./routes/products'); 

const categoriesRoutes = require('./routes/categories'); 
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/carts');



const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(productRoutes);
app.use(categoriesRoutes);
app.use(userRoutes);
app.use(cartRoutes);
//routes

app.get('/api/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/api/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

// this is the backend of my ecommat app, yuou got that......

// app.get('/api/products', async(req, res) => {
//     try {
//         const products = await Product.find({}).select('-createdAt -updatedAt -_id -__v');
//         res.status(200).json(products.map(product => ({ id: product.id, ...product._doc })));
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://Amir:Adeoye24434@cluster0.tgrxtm3.mongodb.net/furniture?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})