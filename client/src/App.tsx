import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [value,setValue] = useState('')
    const [error,setError] = useState<string|null>(null)

    useEffect(()=>{
        const f=async ()=>{
        let res = await fetch('http://localhost:1337/api')
        if(!res.ok){
           throw Error('failed')
        }    else{
            let data =await res.json()
            setValue(data.status)
        }
        }
f().catch((e:any)=>setError(JSON.stringify(e)))
    },[])

  return (
    <div className="App">
        {value}
        {error}
       voluptatem voluptates?
    </div>
  )
}

export default App
