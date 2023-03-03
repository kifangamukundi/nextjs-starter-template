'use client';
import React, {useState} from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);
  return (
    <div>
        <p>This is the count: {count}</p>
        <button onClick={() => setCount(count+1)}>Click</button>
    </div>
  )
}
