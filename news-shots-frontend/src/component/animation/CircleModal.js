import { Modal, ModalBody, Alert } from 'reactstrap';
import { motion } from "framer-motion/dist/framer-motion";

const containerStyle = {
    position: "relative",
    margin: "0 auto",
    width: "3rem",
    height: "3rem",
    boxSizing: "border-box"
};

const circleStyle = {
    display: "block",
    width: "3rem",
    height: "3rem",
    border: "0.5rem solid #e9e9e9",
    borderTop: "0.5rem solid #3498db",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0
};

const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1
};

const CircleLoader = () => {
    return (
        <div style={containerStyle}>
            <motion.span
            style={circleStyle}
            animate={{ rotate: 360 }}
            transition={spinTransition}
            />
        </div>
    );
}

const CircleModal = (props) => {
    return(
        <Modal style={{width: '5.5%'}} isOpen={props.saving}>
            <ModalBody> <CircleLoader /> </ModalBody>
        </Modal>
    )
}


export default CircleModal;
