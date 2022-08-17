import ReactDOM from 'react-dom'
import PortalWrapper from './PortalWrapper'

const Portal = ({ children }) => {
    return ReactDOM.createPortal(
        PortalWrapper,
        document.body
    )
}

export default Portal