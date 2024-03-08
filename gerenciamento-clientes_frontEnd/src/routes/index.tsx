import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { LayoutWithNavbar } from './navBar';
import { BuscarClientes } from '../pages/Busca';

export function AppRoutes() {
  return (
    <Routes>
        <Route element={<LayoutWithNavbar />}>
            <Route path="/" element={<Home />}></Route>
            <Route path='/buscarClientes' element={<BuscarClientes />}></Route>
        </Route>
    </Routes>
  );
}