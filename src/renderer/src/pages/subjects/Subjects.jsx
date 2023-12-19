import { BiSearch } from "react-icons/bi";
import useHadithStore from "../../store/hadithStore";
import { Link } from "react-router-dom";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";
import { useEffect } from "react";

const Subjects = () => {
    const {categories,addCategories} = useHadithStore()
    const getData = async ()=>{
        try {
            const res = await axios.get(`${apiUrl}/categories`)
            if(res.data.status === 200){
                addCategories(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    console.log(categories)
    return (
        <div
            className="px-2 h-full mx-auto overflow-y-auto"
        >
            <div
                className="p-4 flex justify-between items-center bg-white rounded-xl"
            >
                <h2
                    className="text-2xl font-medium"
                >
                বিষয়ভিত্তিক হাদিস
                </h2>
                <div
                        className='flex justify-between items-center space-x-2 p-3 border-2 rounded-lg'
                    >
                        <BiSearch
                            className='text-gray-500'
                        />
                        <input
                            type='text'
                            placeholder='Search for filter'
                            className='font-light text-sm focus:outline-none'
                        />
                    </div>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5"
            >
                {categories &&
                    // eslint-disable-next-line react/prop-types
                    categories.map((category,i) =>
                        <Link
                            to={``}
                            key={i}
                            className="w-full p-4 group cursor-pointer bg-white flex justify-between items-center md:space-x-4 rounded-2xl transition-all duration-500"
                        >
                            <div
                                className="w-2/10 md:w-3/12"
                            >
                                <div
                                    className="flex justify-center items-center bg-gray-200 group-hover:bg-[#2b9e76] group-hover:text-white text-gray-400 w-12 h-12 rounded-full"
                                >
                                    {category?.id}
                                </div>
                            </div>
                            <div
                                className="w-10/12 md:w-9/12"
                            >
                                <p
                                    className="group-hover:text-[#2b9e76] font-medium"
                                >
                                    {category?.bn}
                                </p>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Subjects;