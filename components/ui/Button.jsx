export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left'
}) {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-error text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-success text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'bg-transparent border border-accent text-accent hover:bg-accent hover:bg-opacity-10 focus:ring-accent',
    ghost: 'bg-transparent text-light-300 hover:bg-dark-200 focus:ring-dark-100'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
}
