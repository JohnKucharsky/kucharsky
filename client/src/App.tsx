import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [value,setValue] = useState('')

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
f()
    },[])

  return (
    <div className="App">
        {value}
    </div>
  )
}

export default App
