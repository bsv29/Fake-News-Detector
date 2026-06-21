import React from "react";
import { Box, Button } from "@mui/material";
import ButtonLoader from "../button-loader/ButtonLoader";
import { Styles } from "./Styles";

const CustomButton = ({
  title,
  icon,
  endIcon,
  onclick,
  fontSize,
  fontWeight,
  backgroundColor,
  background,
  color,
  width,
  border,
  height = "30px",
  borderRadius,
  loading,
  disabled,
  padding,
  cursor,
  opacity,
  pointerEvents,
  display = "flex",
  margin,
  mr = 1,
  mt = "4px",
  variant = "contained",
  animateButton = false,
  // NEW PROP
  animateBorder = false,
  type = 'button',
}) => {
  const isOutline = variant === "outline";

  const buttonStyle = {
    ...Styles.button,
    position: "relative",
    overflow: "hidden",

    backgroundColor: isOutline ? "transparent" : backgroundColor,
    background: isOutline ? "transparent" : background,
    color: isOutline ? backgroundColor : color || "#fff",

    width: width,
    border: isOutline
      ? `1.5px solid ${backgroundColor}`
      : border || "none",

    height: height,
    borderRadius: borderRadius,
    fontWeight: fontWeight,
    fontSize: fontSize,
    padding: padding,
    cursor: cursor,
    opacity: opacity,
    pointerEvents: pointerEvents,
    display: display,
    margin: margin,
    minWidth: width ? width : "64px",

    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    ":hover": {
      transform: "scale(1.05)",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    },
  ...(animateButton && {
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-75%",
      width: "50%",
      height: "100%",
      background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
      // animation: "budgetShiny 2s ease-in-out infinite",
      animation: "budgetShiny 6s linear infinite",
      pointerEvents: "none",
    },
    "@keyframes budgetShiny": {
      "0%":   { left: "-75%", opacity: 0 },
      "10%":  { left: "-75%", opacity: 0 },
      "11%":  { opacity: 1 },
      "28%":  { left: "125%", opacity: 1 },
      "29%":  { opacity: 0 },
      "100%": { left: "125%", opacity: 0 }, 
    },
  }),

    // CONDITIONAL BORDER ANIMATION
    ...(animateBorder && {
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "inherit",
    padding: "1.5px",

    background:
      "linear-gradient(90deg, #148ec3, #ffffff, #148ec3, #ffffff, #148ec3)",

    backgroundSize: "300% 100%",

    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",

    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",

    WebkitMaskComposite: "xor",

    animation: "borderRun 1.5s linear infinite",

    opacity: 1, // always visible

    pointerEvents: "none",
  },

  "@keyframes borderRun": {
    "0%": {
      backgroundPosition: "0% 0%",
    },
    "100%": {
      backgroundPosition: "100% 0%",
    },
  },
}),

  };

  return (
    <Button
      variant="contained"
      sx={buttonStyle}
      onClick={onclick}
      disabled={loading || disabled}
      type={type}
    >
      {loading ? (
        <ButtonLoader />
      ) : title ? (
        <>
          {icon && <Box sx={{ mr: mr, mt: mt }}>{icon}</Box>}
          {title}
          {endIcon && <Box>{endIcon}</Box>}
        </>
      ) : (
        icon || endIcon
      )}
    </Button>
  );
};

export default CustomButton;
