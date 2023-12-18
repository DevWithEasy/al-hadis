import axios from 'axios';
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Book, Head } from "../component/Index";
import useHadithStore from "../store/useStore";
import apiUrl from "../utils/apiUrl";
import GoToModal from '../component/GoToModal';

const Home = () => {
    const [open,setOpen] = useState(false)
    const {books,addBookSub} = useHadithStore()
    const getData = async ()=>{
        try {
            const res = await axios.get(`${apiUrl}/books`)
            console.log(res.data)
            if(res.data.status === 200){
                addBookSub(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    
    return (
        <div
            className=""
        >
            <Head {...{
                title : 'iHadith - Read Hadith Online'
            }}/>

            <Book {...{
                books,open,setOpen
            }}/>
            <GoToModal {...{
                books,open,setOpen
            }}/>
        </div>
    );
};

export default Home;