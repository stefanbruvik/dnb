import React from "react";

export const EditModeContext = React.createContext<boolean>(false);
const useEditMode = () => React.useContext(EditModeContext);

export default useEditMode;
