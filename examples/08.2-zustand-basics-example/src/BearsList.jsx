import React from 'react'
import { useStore } from './bears-store'

export default function BearsList(){
    const bears = useStore(state => state.bears)
    return(
     <div>
        {
            [...Array(bears)].map((x, i) => <span key={i}>🐻</span> )
        }
     </div>
    )
}