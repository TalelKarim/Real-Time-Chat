import {createContext, useContext, useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
const chatContext = createContext()

export const ChatProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);


    useEffect(() => {
       const userInfo = JSON.parse(localStorage.getItem('userInfo')) 
       setUser(userInfo)
       if(!userInfo) {
             navigate('/')
       }
    }, [navigate]);

    return (
        <chatContext.Provider value={{
            selectedChat,
            setSelectedChat,
            user,
            setUser,
            notification,
            setNotification,
            chats,
            setChats,
        }}>
            {children}
        </chatContext.Provider>
    )
}


export const ChatState = () => {
    return useContext(chatContext)
}



export default { ChatProvider}