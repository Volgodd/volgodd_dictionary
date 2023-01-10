import { GlobalContext } from 'providers/GlobalContext';
import { useContext } from 'react';

// вшитая ф реакта useContext, кот вытяскивает дату из GlobalContext
// если бы мы не создавали хук useData, в  компоненте мы должны были бы импортировать и useContext и GlobalContext

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;