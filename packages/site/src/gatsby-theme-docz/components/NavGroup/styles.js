export const wrapper = {
  my: 3,
  marginBottom: "1em"
};

export const sublinkWrapper = {
  ml: 2
};

export const title = {
  mb: 1,
  fontSize: 2,
  fontWeight: 500,
  color: "sidebar.navGroup",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1em"
};

export const chevron = ({ active }) => ({
  ml: 1,
  flexShrink: 0,
  alignSelf: "baseline",
  transform: `rotateX(${active ? 180 : 0}deg)`,
  transformOrigin: "center",
  transition: "transform .3s ease-in-out"
});
