// prop types
import PropTypes from "prop-types";

// own components
import SitoContainer from "sito-container";

const Badge = (props) => {
  const { count } = props;
  return (
    <>
      {count > 0 && (
        <SitoContainer
          sx={{
            borderRadius: "100%",
            background: "red",
            color: "aliceblue",
            padding: "2px 4px",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            fontSize: 10,
            margin: "-5px 0 0 20px",
          }}
        >
          {count}
        </SitoContainer>
      )}
    </>
  );
};

Badge.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Badge;
