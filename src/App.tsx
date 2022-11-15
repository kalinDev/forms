import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { Home } from './pages/Home'
import { DownloadExcel } from './pages/DownloadExcel'


function App(){

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/baixar-excel' element={<DownloadExcel/>} />
      </Routes>
    </Router>
  )

}

export default App