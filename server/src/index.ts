import express, {Request, Response} from 'express'
import path from 'path'
import cors from 'cors'

const app = express()

app.use(cors({
    origin:'https://kucharsky.site/',
    credentials:true
}))

app.get('/api/',(req:Request,res:Response)=>{
    return res.json({
        status:'success' })
})

app.use(express.static(path.join(__dirname, '../../client/dist')));


/*app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')
    )
);*/

app.listen(1337,()=>console.log('listening on port 1337'))