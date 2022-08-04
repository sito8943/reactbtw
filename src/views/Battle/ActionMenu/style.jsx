import { css } from "@emotion/css";

// styles
export const actionTitle = css({
  margin: 0,
});

export const actionSelected = css({
  border: "none",
  cursor: "pointer",
  background: "#333",
  padding: "5px 9px",
  paddingBottom: 0,
  borderRadius: "100%",
  color: "aliceblue",
  fontSize: "25px",
  marginRight: "10px",
});

export const actions = css({
  border: "none",
  cursor: "pointer",
  background: "none",
  padding: "5px 9px",
  paddingBottom: 0,
  borderRadius: "100%",
  transition: "all 500ms ease",
  color: "aliceblue",
  fontSize: "25px",
  marginRight: "10px",
  "&:hover": {
    transform: "translateY(-5px)",
    backgroundColor: "#333",
  },
});

export const disabledActions = css({
  border: "none",
  padding: "5px 9px",
  paddingBottom: 0,
  borderRadius: "1rem",
  transition: "all 500ms ease",
  color: "#828785",
  fontSize: "25px",
  backgroundColor: "#222",
  marginRight: "10px",
});
