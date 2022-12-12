import { createContext } from 'react';

//этот файл - кастомная утилитная функция, это можно в принципе написать в App.jsx

const GlobalContext = createContext();
// createContext возвращает контекстный объектБ в котором есть в тч Provider. Обращаться к нему:
// [Названиe переменной].Provider
//проп value перезаписывает значение createContext (в скобках)

const GlobalContextProvider = ({ children, data }) => (
  <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
);

export { GlobalContext, GlobalContextProvider };