import React, { useState } from 'react'
import { SearchContext } from './SearchContext'

const SearchProvider = ({ children }) => {
    const [search1, setSearch1] = useState([])
    return (
        <SearchContext.Provider value={{search1,setSearch1}}>{children}</SearchContext.Provider>
    )
}

export default SearchProvider