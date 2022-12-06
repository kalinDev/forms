import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DownloadExcel } from './pages/DownloadExcel';
import { Acknowledgment } from './pages/Acknowledgment';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/baixar-excel' element={<DownloadExcel />} />
          <Route path='agradecimentos' element={<Acknowledgment />} />
        </Routes>
      </Router>
    </div >
  )

}

export default App