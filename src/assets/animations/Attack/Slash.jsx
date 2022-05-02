import slash from "./slash1.gif";

const Slash = (props) => {
  const { x, y } = props;
  console.log(x, y);
  return (
    <div>
      <img
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: "100px",
          height: "100px",
        }}
        src={slash}
        alt="slash"
      />
    </div>
  );
};

export default Slash;
