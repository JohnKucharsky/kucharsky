import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [value,setValue] = useState('')
    const [error,setError] = useState<string|null>(null)

    useEffect(()=>{
        const f=async ()=>{
        let res = await fetch('http://localhost:1337/api')
        if(!res.ok){
           return res
        }    else{
            let data =await res.json()
            setValue(data.status)
        }
        }
f().catch((e:any)=>setError(JSON.stringify(e.message)))
    },[])

  return (
    <div className="App">
        {value}
        {error}
       voluptatem voluptates? https://kucharsky.site/
    </div>
  )
}

export default App
