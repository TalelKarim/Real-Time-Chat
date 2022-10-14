import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Pages/Homepage'
import ChatPage from './Pages/ChatPage'
import SingleChat from './components/SingleChat'
import './App.css'
import {ChatProvider} from './context/ChatProvider'

export default function App() {
  return (
    <div className='App'>

         <BrowserRouter>
            <ChatProvider>
                <Routes>
                    <Route path='/' element={<Homepage />}/>
                    <Route path='/Chats' element={<ChatPage />}/>
                 </Routes>     
            </ChatProvider>
       
          </BrowserRouter>

    </div>
  )
}
