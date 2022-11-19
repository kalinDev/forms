import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DownloadExcel } from './pages/DownloadExcel';


function App() {

  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/baixar-excel' element={<DownloadExcel />} />
        </Routes>
      </Router>
    </div >
  )

}

export default App