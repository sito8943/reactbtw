import PropTypes from "prop-types";

// sito components
import SitoModal from "sito-modal";

const ActionModal = (props) => {
  const { children, visible, onClose, id } = props;

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
      id={id}
    >
      {children}
    </SitoModal>
  );
};

ActionModal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
};

export default ActionModal;
