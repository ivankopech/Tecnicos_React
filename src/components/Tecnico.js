import Tecnicos from "./Tecnicos"
import {FaTimes} from 'react-icons/fa';

 const Tecnico = ({tecnico, onDelete, onToggle}) => {
    return (
        <div className={`tecnico ${tecnico.reminder ? 'reminder': ''}`} onDoubleClick={() => onToggle(tecnico.id)}>
            <h3>{tecnico.nombre} <FaTimes style= {{color: 'red', cursor: 'pointer'}} onClick= {() => onDelete(tecnico.id)} /></h3>
            <h3>{tecnico.caldera}</h3>
        </div>
    )
}

export default Tecnico