import React, { useState } from "react";

const CommentContext = React.createContext();

export const CommentProvider = ({children}) => {
    const [comments, setComments] = useState([]);

    return (<CommentContext.Provider value={{comments, setComments}}>
        {children}
    </CommentContext.Provider>
    )
}

export default CommentContext