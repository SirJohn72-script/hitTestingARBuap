import './App.css'
import Cards from './components/cards/Cards'
import { Routes, Route } from 'react-router-dom'
import AREscene from './components/ar/AREscene'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/:model" element={<AREscene />} />
      </Routes>
    </div>
  )
}

export default App
