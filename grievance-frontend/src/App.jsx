import { createHashRouter, Link, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Grievances from './pages/Grievances.jsx';
import './css/app.css'; 

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: '/' },
        { element: <Grievances />, path: '/grievances' }
      ],
      element: (
        <>
          <nav className="navbar">
            <div className="logo">Grievance Portal</div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/grievances">Grievances</Link>
            </div>
          </nav>
          <Outlet />
        </>
      )
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;