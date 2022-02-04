import React,{useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () =>{
    return(
        <div className = "chats-page">
            <div className = "nav-bar">
                <div className="logo-tab">
                    Unisenger
                </div>
                <div onClick={handleLogeout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
                height="90vh"
                projectID="ed59991c-084d-49de-829d-a8b694cb5b19"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;