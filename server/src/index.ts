import express, {Request, Response} from 'express'
import path from 'path'
import cors from 'cors'

const app = express()

app.use(cors({
    credentials:true
}))

app.use(express.json())


app.get('/api',(req:Request,res:Response)=>{
    return res.send({
        status:'successf' })
})

app.use(express.static(path.join(__dirname, '../../client/dist')));


/*app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')
    )
);*/

app.listen(1337,()=>console.log('listening on port 1337'))