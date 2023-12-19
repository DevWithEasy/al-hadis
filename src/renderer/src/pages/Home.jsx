import axios from 'axios';
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import GoToModal from '../component/GoToModal';
import { Book, Head } from "../component/Index";
import useHadithStore from "../store/hadithStore";
import apiUrl from "../utils/apiUrl";

const Home = () => {
    const [open,setOpen] = useState(false)
    const {books,addBooks} = useHadithStore()
    const getData = async ()=>{
        try {
            const res = await axios.get(`${apiUrl}/books`)
            console.log(res.data)
            if(res.data.status === 200){
                addBooks(res.data.data)
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
                title : 'আল হাদিস'
            }}/>

            <Book {...{
                books,open,setOpen
            }}/>
            {open &&
                <GoToModal {...{
                    books,open,setOpen
                }}/>
            }
        </div>
    );
};

export default Home;