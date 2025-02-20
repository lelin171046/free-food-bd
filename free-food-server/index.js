import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

// CORS options
const corsOption = {
  origin: [
    'http://localhost:5173',
    'https://builder-bd.web.app',
  ],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token
  console.log(token);
  if (!token) return res.status(401).send({ message: 'UNauthorized access' })
  if (token) {
    jwt.verify(token, process.env.S_Key, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).send({ message: 'UNauthorized access' })

      }
      console.log(decoded);
      req.user = decoded
      next()

    })
  }

}

const uri = `mongodb://localhost:27017/`;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {

    const foodCollection = client.db('freeFoodBD').collection('foods');
    const foodRequestCollection = client.db('freeFoodBD').collection('foods-request');

    //Generating jwt web tokens
    app.post('/jwt', async (req, res) => {
      const email = req.body;
      console.log(email);
      const token = jwt.sign(email, process.env.S_Key, { expiresIn: '365d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === "production" ? "none" : 'strict'
      }).send({ success: true });
    });

    // Add a job
    app.post('/add-food', async (req, res) => {
      const postFood = req.body;
      console.log(postFood, 'is here');
      const result = await foodCollection.insertOne(postFood);
      res.send(result);
    });
    //my foods
    app.get('/foods', async (req, res) => {
      const result = await foodCollection.find().toArray();
      res.send(result);
    });

    // My posted jobs list verifyToken,
    app.get('/foods/:email', async (req, res) => {
      const tokenEmail = req.user?.email;
      const email = req.params.email;

      // if (tokenEmail !== email) {
      //   return res.status(403).send({ message: 'Forbidden access' });
      // }

      const query = { 'donar.email': email };
      const result = await foodCollection.find(query).toArray();
      res.send(result);
    });



    // All available foods

    app.get('/all-foods', async (req, res) => {
      try {
        const latest = req.query;
        
        if(latest){
          try {
            // Fetch the latest 6 items sorted by creation date (assuming you have a timestamp field like createdAt)
            const result = await foodCollection.find()
            .sort({ _id: -1 })
              .limit(6) // Get only the latest 6
              .toArray();
        
           console.log(result,'fgdhg');   
            res.status(200).send(result);
          } catch (err) {
            console.error("Error fetching latest foods:", err);
            res.status(500).send({ error: 'An error occurred while fetching latest foods.' });
          }
        }

       else{
        const size = parseInt(req.query.size) || 10; // Default size if not provided
        const page = parseInt(req.query.page) - 1 || 0; // Default page to 0 if not provided
        // const filter = req.query.filter;
        const sort = req.query.sort;
        const search = req.query.search;

        let query = {
          foodName: { $regex: search, $options: 'i' },
          booked: { $ne: true }  // Exclude booked items
        };
        // if (filter) query.category = filter;

        let option = {};
        if (sort) option = {
          sort: {
            expiredDateTime: sort === "asc" ? 1 : -1
          }
        };
        console.log('home',req.query);

        // Make sure jobCollection is available and connected
        const result = await foodCollection.find(query, option).skip(page * size).limit(size).toArray();
        // const filteredData = data.filter(item => item.booked !== true)

        console.log('here', result);
        res.status(200).send(result);
       }


       
      } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).send({ error: 'An error occurred while fetching jobs.' });
      }
    });
//home page foods
app.get('/latest-food', async (req,res)=>{


})

    //Count all job
    app.get('/foods-count', async (req, res) => {
      // const filter = req.query.filter;

      const search = req.query.search;

      let query = {
        foodName: { $regex: search, $options: 'i' },
        booked: { $ne: true }
      }

      // if (filter) query.category = filter

      const count = await foodCollection.countDocuments(
        query
      );

      res.send({ count });
    });

    // Delete a food post
    app.delete('/foods/:id', async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.deleteOne(query);
      res.send(result);
    });

    // Update job
    app.put('/update-food/:id', async (req, res) => {
      const id = req.params.id;
      const foodData = req.body;
      console.log(foodData, 'updated');
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: foodData
      };
      const result = await foodCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // food by ID
    app.get('/food/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.findOne(query);
      res.send(result);
    });



    app.post('/food-request', async (req, res) => {
      try {
        const foodData = req.body;
        const options = { upsert: true };

        const query = {
          email: foodData.email,
          foodId: foodData.foodId
        };

        const alreadyApplied = await foodRequestCollection.findOne(query);

        if (alreadyApplied) {
          return res.status(400).send('You already placed a request on this post');
        }

        const result = await foodRequestCollection.insertOne(foodData);

        if (result.acknowledged) {
          const queryId = { _id: new ObjectId(foodData?.foodId) }
          console.log("acknowledged ===>", queryId);
          await foodCollection.updateOne(
            queryId, // Ensure foodId is valid
            { $set: { booked: true } }, options
          );
        }

        res.send(result);
      } catch (error) {
        console.error('Error processing food request:', error);
        res.status(500).send('Internal Server Error');
      }
    });



    //my food request
    app.get('/my-food-requests/:email', async (req, res) => {
      const email = req.params.email
      const query = { email };
      const result = await foodRequestCollection.find(query).toArray();
      res.send(result);

    })

    // delete food request
    app.delete('/food-request/delete/:id', async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await foodRequestCollection.deleteOne(query);
      res.send(result);
    });


    // Send a ping to confirm successful connection
    // await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}



// Start the run function
run();

// Middleware and routes
app.get('/', (req, res) => res.send('Server is running'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
