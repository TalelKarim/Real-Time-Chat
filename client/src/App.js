import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Pages/Homepage'
import ChatPage from './Pages/ChatPage'
import './App.css'

export default function App() {
  return (
    <div className='App'>
          <BrowserRouter>
              <Routes>
                 <Route path='/' element={<Homepage />}/>
                 <Route path='/chats' element={<ChatPage />}/>
              </Routes>
          </BrowserRouter>
    </div>
  )
}
