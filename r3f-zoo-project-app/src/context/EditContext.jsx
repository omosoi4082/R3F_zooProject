import { createContext, useState } from 'react';

export const EditContext = createContext();

export const EditProvider = ({ children }) => {
  const [isEditMode, SetEditmode] = useState(false);
  const value = { isEditMode, SetEditmode };
  return (<EditContext.Provider value={value}>{children}</EditContext.Provider>)
}