import ReactDom from 'react-dom'
import { ReactNode, useRef } from 'react'

type ModalProps = {
  children: ReactNode,
  open: boolean,
  onClose: () => void,
  style?: string,
  portalStyle?: string
}
  
const Modal = ({ children, open, onClose, style='center', portalStyle='' }:ModalProps) => {
  const overlayRef = useRef(null)
  if(!open) return null;
  return ReactDom.createPortal(
    <div className={`overflow-y-auto fixed top-0 left-0 bottom-0 right-0 z-10 ${portalStyle}`} ref={overlayRef} onClick={onClose}>
      <div 
        className={`absolute ${style}`} 
        onClick={e => e.stopPropagation()}
        >
        {children}
      </div>
    </div>
    , document.getElementById('portal') as HTMLElement
  )
}
export default Modal