import express, {Request, Response} from 'express'
import path from 'path'


const app = express()

/*app.use(cors({
    credentials:true
}))*/

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/api',(req:Request,res:Response)=>{
    return res.status(200).json({
        status:'successf' })
})

app.use(express.static(path.join(__dirname, '../../client/dist')));


/*app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')
    )
);*/

app.listen(1337,()=>console.log('listening on port 1337'))