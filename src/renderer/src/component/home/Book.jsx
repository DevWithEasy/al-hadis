import { BsArrowRight } from 'react-icons/bs';
import { Link } from "react-router-dom";
import book from '../../assets/images/book.svg';
import { toBengaliNumber } from 'bengali-number';

// eslint-disable-next-line react/prop-types
const Book = ({ books,open,setOpen }) => {
    return (
        <div
            className="p-4 space-y-2"
        >
            <h2
                className="text-7xl text-center font-bold text-[#2b9e76]"
            >
                আল হাদিস
            </h2>
            <div
                className="w-full flex flex-col justify-center items-center space-y-2"
            >
                <p className="text-gray-500 text-center">
                    হাদিসের কিতাবগুলো মুসলিমদের জন্য হেদায়েত এবং অনুপ্রেরণার একটি গুরুত্বপূর্ণ উৎস। এই কিতাবগুলো মহানবী মুহাম্মদ (সাল্লাল্লাহু আলাইহি ওয়া সালাম)-এর সীরাত(জীবনী) ও দিক-নির্দেশনার প্রতি অন্তর্দৃষ্টি প্রদান করে।
                </p>
                <button
                    onClick={()=>setOpen(!open)}
                    className=' px-6 py-2 bg-[#38a780] text-white rounded-md'
                >
                    হাদিস খুঁজুন
                </button>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-5"
            >
                {books &&
                    // eslint-disable-next-line react/prop-types
                    books.slice(0, 9).map(book =>
                        <Link
                            to={`/${book?.book_name}`}
                            key={book._id}
                            className="w-full p-5 group cursor-pointer  drop-shadow-[0_2px_20px_rgba(0,0,0,0.05)] bg-white flex justify-between space-x-3 items-center rounded-2xl transition-all duration-500"
                        >
                            <div
                                className="w-12"
                            >
                                <div
                                    className="flex justify-center items-center bg-gray-200 group-hover:bg-[#2b9e76] group-hover:text-white text-gray-400 w-12 h-12 rounded-full"
                                >
                                    {book?.abvr_code}
                                </div>
                            </div>
                            <div
                                className="w-full space-y-1"
                            >
                                <p
                                    className="group-hover:text-[#2b9e76] font-medium"
                                >
                                    {book?.title}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    হাদিসের রেঞ্জ: {toBengaliNumber(book?.number_of_hadis)}
                                </p>
                            </div>
                        </Link>
                    )
                }
            </div>
            <div
                className="flex justify-center"
            >
                <Link
                    to='/allhadiths'
                    className="flex items-center space-x-2 bg-[#2b9e76] px-4 py-3 text-white rounded-xl"
                >
                    <img
                        src={book}
                        className=""
                    />
                    <span>
                        সকল হাদিস গ্রন্থসমূহ
                    </span>
                    <BsArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default Book;