import { Outlet } from 'react-router-dom';
import styles from './styles.module.sass';
import { Navbar } from '../components/NavBar';

export function LayoutWithNavbar() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Outlet />
    </div>
  );
}