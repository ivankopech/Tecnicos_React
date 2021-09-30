import Tecnico from "./Tecnico";
const Tecnicos = ({tecnicos, onDelete, onToggle}) => {
    return (
        <>
            {tecnicos.map((tecnico, index) => (
            <Tecnico key={index} 
            tecnico={tecnico} 
                  onDelete={onDelete}  
                  onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Tecnicos;