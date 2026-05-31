import express from 'express'
import 'dotenv/config'
import * as sat from 'satellite.js'

const PORT = 8000
const app = express() 
app.use(express.json())
app.use((req, res, next) => {
    res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE ,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  })
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200)
  }

  next()
})

app.get('/getsatellite', async(req, res) => {
    const responce = await fetch(`https://api.n2yo.com/rest/v1/satellite/above/0/0/400/180/20/&apiKey=${process.env.N2YO_API_KEY}`)
    const satelliteData = await responce.json()

    res.status(200).json({message : satelliteData.above})
}) 


app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`))