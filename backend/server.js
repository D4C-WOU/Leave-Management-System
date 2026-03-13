const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const leaveRoutes = require('./routes/leaveRequestRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/health', require('./routes/healthRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/leave-types',require('./routes/leaveTypeRoutes'))
app.use('/api/leaves',leaveRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`) 
})