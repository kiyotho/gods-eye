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
    const responce = await fetch(`https://celestrak.org/NORAD/elements/gp.php?GROUP=gps-ops&FORMAT=json`)
    const satelliteData = await responce.json()

    res.status(200).json({message : satelliteData})
}) 


app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`))