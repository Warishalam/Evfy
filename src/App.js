// import logo from './logo.svg';
import './App.css';
import Book_browsing from './components/Book_browsing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/book' element={<Book_browsing/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
