import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from "../../utils/AppContext";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function Modal({ children }: any, {open} : any) {

     const { isModalOpen, closeModal } = useAppContext();

      if (!isModalOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', overflowY: 'auto' }}>
      <div style={{
        background: 'white',
        padding: '20px',
        margin: ' 20px auto',
        width: '60%',
        maxHeight: '80%', // Define uma altura máxima para a modal
        overflowY: 'auto', // Adiciona rolagem vertical se o conteúdo exceder a altura da modal
        borderRadius:'4px'
      }}>
        <div>
            <span style={{cursor:'pointer', fontSize:"20px"}} className="close-icon" onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </div>
        {children}
      </div>
    </div>
  );
}
