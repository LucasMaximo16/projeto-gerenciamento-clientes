import { Link } from 'react-router-dom';
import styles from './styles.module.sass';
import imageLogo from '../../assets/logo.svg'

export function Navbar() {
  return (
    <div className={styles.navbar}>
        <img src={imageLogo} alt="" ></img>
        <div>
            <p><Link to={'/'}>Home</Link></p>
            <p><Link to={'/buscarClientes'}>Clientes</Link></p>
        </div>
    </div>
  );
}