const Input = ({className, id, type, value, onChange, placeholder, isReadOnly}) => {
    return (
        <input type={type} value={value} id={id} className={className} onChange={onChange} readOnly={isReadOnly} placeholder={placeholder}/>
    )
}

export default Input;