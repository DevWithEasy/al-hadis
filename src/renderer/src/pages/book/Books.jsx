import { toBengaliNumber } from "bengali-number";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import useHadithStore from "../../store/hadithStore";

const Books = () => {
    const { books } = useHadithStore()
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
                    সকল বই
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
                {books &&
                    // eslint-disable-next-line react/prop-types
                    books.map(book =>
                        <Link to={`/${book?.book_name}`}
                            // onClick={() => navigate()}
                            key={book._id}
                            className="w-full p-5 group cursor-pointer bg-white flex justify-between items-center md:space-x-5 rounded-2xl transition-all duration-500"
                        >
                            <div
                                className="w-2/12"
                            >
                                <div
                                    className="flex justify-center items-center bg-gray-200 group-hover:bg-[#2b9e76] group-hover:text-white text-gray-400 w-12 h-12 rounded-full"
                                >
                                    {book?.abvr_code}
                                </div>
                            </div>
                            <div
                                className="w-10/12"
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
        </div>
    );
};

export default Books;