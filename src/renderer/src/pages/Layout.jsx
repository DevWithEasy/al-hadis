import { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsBookmark, BsSend } from 'react-icons/bs'
import { FiBookOpen } from 'react-icons/fi'
import { PiBooksLight, PiDotsNineBold } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import GoToModal from '../component/GoToModal'
import MenuPopup from '../component/MenuPopup'
import useHadithStore from '../store/useStore'
// import {PiBooksFill} from 'react-icons/li'


// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    const { books } = useHadithStore()
    const [open, setOpen] = useState(false)
    const [menu, setMenu] = useState(false)
    return (
        <div
            className="h-screen flex "
        >
            <div
                className="w-24 p-4 pb-32 flex flex-col items-center shadow-xl"
            >
                <NavLink
                    to='/'
                    className='p-4 hover:bg-[#2b9e76] hover:text-white rounded-xl transition-all duration-500'
                >
                    <AiOutlineHome
                        size={24}
                    />
                </NavLink>
                <NavLink
                    to='/allhadiths'
                    className='p-4 hover:bg-[#2b9e76] hover:text-white rounded-xl transition-all duration-500'
                >
                    <FiBookOpen
                        size={24}
                    />
                </NavLink>
                <NavLink
                    to='/allsubjects'
                    className='p-4 hover:bg-[#2b9e76] hover:text-white rounded-xl transition-all duration-500'
                >
                    <PiBooksLight
                        size={24}
                    />
                </NavLink>
                <NavLink
                    to='/bookmark'
                    className='p-4 hover:bg-[#2b9e76] hover:text-white rounded-xl transition-all duration-500'
                >
                    <BsBookmark
                        size={24}
                    />
                </NavLink>
                <button
                    onClick={() => setMenu(!menu)}
                    className='p-4 hover:bg-[#2b9e76] hover:text-white rounded-xl transition-all duration-500'
                >
                    <PiDotsNineBold
                        size={24}
                    />

                </button>
                <button
                    onClick={() => setOpen(!open)}
                    className='p-4 hover:bg-[#2b9e76] hover:text-white rounded-xl transition-all duration-500'
                >
                    <BsSend
                        size={24}
                    />
                </button>
            </div>
            <div
                className="relative w-full p-2"
            >
                {children}

                {menu &&
                    <MenuPopup {...{ menu, setMenu }} />
                }
            </div>
            {open &&
                <GoToModal {...{ open, setOpen, books }} />
            }
        </div>
    );
};

export default Layout;