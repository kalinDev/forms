import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Toaster } from 'react-hot-toast';

import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CheckAge } from './pages/CheckAge';
import { DownloadExcel } from './pages/DownloadExcel';
import { Acknowledgment } from './pages/Acknowledgment';
import { Sociodemographic } from './pages/Sociodemographic';

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
          <Route path='/' element={<CheckAge />} />
          <Route path='/sociodemografico' element={<Sociodemographic />}/>
          <Route path='/questoes' element={<Home />} />
          <Route path='/agradecimentos' element={<Acknowledgment />} />
          <Route path='/baixar-excel' element={<DownloadExcel />} />
        </Routes>
      </Router>
      <Footer />
    </div >
  )

}

export default App