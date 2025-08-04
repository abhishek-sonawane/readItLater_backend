import '@/App.css'
import { BrowserRouter} from 'react-router'
import AppRouter from '@/navigation/AppRouter'

function App() {

  return (
   <BrowserRouter>
     <AppRouter/>
   </BrowserRouter>
  )
}

export default App
