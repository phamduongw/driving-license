import {createContext, useRef} from 'react';
const RefContext = createContext({});

const RefProvider = ({children}) => {
  const questionsRef = useRef();
  const navigatorRef = useRef();
  return (
    <RefContext.Provider value={{questionsRef, navigatorRef}}>
      {children}
    </RefContext.Provider>
  );
};

export {RefContext, RefProvider};
