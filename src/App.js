import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginRegisterSwitch from './containers/login-page/login-page';
import MainPage from './containers/main-page/main-page';
import RestPage from './containers/main-page/rest-page/rest-page';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/restaurant/:id" element={<RestPage />} />
          <Route path='/login' element={<LoginRegisterSwitch />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
