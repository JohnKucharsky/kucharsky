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

       amet, consectetur adipisicing elit. Asperiores deleniti dicta officia optio quae totam? Delectus, maxime, repellat? Debitis error numquam reiciendis sequi tempora? At atque error impedit in, ipsam non odio quaerat repellat, repudiandae, saepe sequi sint vero. Adipisci asperiores consectetur culpa cumque esse, ex magnam minus nihil non obcaecati provident reiciendis repellendus sed totam unde veniam vero? A ab animi atque aut beatae delectus dignissimos doloribus eos eveniet fugit illo in libero, nam nemo neque nulla, numquam obcaecati odit officia perspiciatis placeat porro possimus provident quae quaerat quam quasi quisquam quos similique sunt suscipit tempora, ut voluptatem voluptates?
    </div>
  )
}

export default App
