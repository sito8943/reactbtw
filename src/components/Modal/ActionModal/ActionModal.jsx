import PropTypes from "prop-types";

// sito components
import SitoModal from "sito-modal";

const ActionModal = (props) => {
  const { children, visible, onClose } = props;

  return (
    <SitoModal
      backdropBackground="#22222299"
      backdropFilter="blur(1px)"
      sx={{
        width: "250px",
        height: "80px",
      }}
      visible={visible}
      onClose={onClose}
    >
      {children}
    </SitoModal>
  );
};

ActionModal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ActionModal;
