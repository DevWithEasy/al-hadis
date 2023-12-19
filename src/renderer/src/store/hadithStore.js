import {create} from 'zustand'
import {persist,devtools} from 'zustand/middleware'

const hadithStore = (set)=>({
    books : [],
    categories : [],
    chapters : [],
    addBooks : (data)=>{
        set(()=>({
            books : data
        }))
    },
    addCategories : (data)=>{   
        set(()=>({
            categories : data
        }))
    },
    addChapters : (data)=>{
        set(()=>({
            chapters : data,
        }))
    }
})

const useHadithStore = create(
    devtools(
        persist(
            hadithStore,
            {
                name : 'hadithStore'
            }
        )
    )
)

export default useHadithStore