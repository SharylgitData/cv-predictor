import React from "react";

const PersonaPredictor = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "2rem",
    backgroundColor: "#fff", // White background
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#CCA041", // Gold color
    margin: 0,
    textAlign: "center",
  };

  const subtitleStyle = {
    fontSize: "1.25rem",
    color: "#555",
    marginTop: "1rem",
    textAlign: "center",
    maxWidth: "700px", // optional max width for nice text wrapping
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Persona Predictor</h1>
      <p style={subtitleStyle}>
        It’s time to assess your Resume to ensure it aligns perfectly with your
        desired job role
      </p>
    </div>
  );
};

export default PersonaPredictor;
