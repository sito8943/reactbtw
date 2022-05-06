// prop types
import PropTypes from "prop-types";

// own components
import Container from "../../../../components/Container/Container";

const Badge = (props) => {
  const { count } = props;
  return (
    <>
      {count > 0 && (
        <Container
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
        </Container>
      )}
    </>
  );
};

Badge.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Badge;
