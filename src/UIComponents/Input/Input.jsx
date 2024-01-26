const Input = ({type, value, onChange, placeholder}, ref) => {
    return (
        <input ref={ref} type={type} value={value} onChange={onChange} placeholder={placeholder}/>
    )
}

export default Input;