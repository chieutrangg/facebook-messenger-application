import React,{useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const didMountRef = useRef(false);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogeout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async(url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data],"userPhoto.jpg",{ type: "image/jpeg"});
    }

    useEffect(()=>{
        if(!didMountRef.current){
            didMountRef.current = true;
        

        if(!user || user === null){
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me/',{
            headers: {
                "project-id": "ed59991c-084d-49de-829d-a8b694cb5b19" ,
                "user-name": user.email,
                "user-secret": user.uid
            } 
        })
        .then(() => {
            setLoading(false);
        })
        .catch((e)=> { 
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
               .then((avatar) => {
                   formdata.append('avatar', avatar, avatar.name)

                   axios.post('https://api.chatengine.io/users/',
                     formdata,
                     {headers:{ "private-key": "762f6392-1e2a-456d-8e7c-4327d44d181a"}})
                     .then(() => setLoading(false))
                     .catch((e)=> console.log('e',e.response))
            })
        })
    }
    },[user, history]);

    if(!user || loading) return 'loading...';

    return(
        <div className = "chats-page">
            <div className = "nav-bar">
                <div className="logo-tab">
                    Unisenger
                </div>
                <div onClick={handleLogeout} className="logout-tab">
                    Log Out
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
