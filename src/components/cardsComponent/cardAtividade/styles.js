const styles = (theme) => ({
  boxIcon: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    margin: "2px 0",
  },
  containerComponent: {
    width: "100%",
    padding: 2,
    backgroundColor: "transparent",
  },
  containerActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleCard: {
    maxWidth: "210px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  containerBody: { display: "flex", justifyContent: "space-between" },
  nameParams: { fontSize: "12px", fontWeight: "bold" },
});

export default styles;
