import { Button } from '@chakra-ui/react';
import Modal from 'react-modal'

const customStyles ={
    content:{
        top:'50%',
        left:'50%',
        right:'auto',
        left:'auto',
        transform:'translate(-50%, -50%)'

    }
}

const Modal = ({isOpen, onClose, content}) =>{
    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}>
            <h2>Modal content</h2>
            <p>{content}</p>
            <button onClick={onClose}>close</button>
        </Modal>
    )
}

export default Modal;