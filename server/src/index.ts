import express, {Request, Response} from 'express'
import path from 'path'

const app = express()

app.get('/api/',(req:Request,res:Response)=>{
    return res.json({
        status:'successdsfg' })
})

app.use(express.static(path.join(__dirname, '../../client/dist')));

/*app.get('*', (req, res) =>
    res.sendFile(
        path.resolve(__dirname, '../', '../', 'client', 'dist', 'index.html')
    )
);*/

app.listen(4000,()=>console.log('listening on port 4000'))