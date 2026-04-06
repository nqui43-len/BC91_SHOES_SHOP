import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const HomeTemplate = () => {
  return (
    <>
    <Header />
    <main>
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default HomeTemplate