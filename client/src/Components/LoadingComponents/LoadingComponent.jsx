import logoIcon from '../../assets/bti-logo.png';
import './styles.scss';

function LoadingComponent() {
  return (
    <div className='loading-component-container'>
      <img src={logoIcon} alt="Logo" className='logo-icon' />
      <p>Loading.....</p>
    </div>
  )
}

export default LoadingComponent