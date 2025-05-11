import { FlashcardArray } from "react-quizlet-flashcard";
import { useRef, useState } from "react";
import { Box, fontSize, padding } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import {
  RestartAltOutlined,
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";
import { Icon, IconButton } from "@mui/material";
export default function FlashCardComponent(params) {
  const { flashCards = [] } = params;
  const theme = useTheme();
  const controlRef = useRef({}); // {} should definitely be passed to useRef for it to work
  const currentCardFlipRef = useRef(); // nothing should be passed to useRef for it to work
  const [currentCard, setCurrentCard] = useState(1);
  const cards = flashCards?.map((card) => {
    const [groupFront, keyFront] = card.colorFront.split(".");
    const [groupBack, keyBack] = card.colorBack.split(".");
    const colorFront = theme.palette?.[groupFront]?.[keyFront];
    const colorBack = theme.palette?.[groupBack]?.[keyBack];

    return {
      id: card.id,
      frontHTML: <Box sx={{}}>{card.front}</Box>,
      frontContentStyle: {
        backgroundColor: colorFront,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "35px",
        width: "100%",
        overflow: "auto",
        textAlign: "center",
        padding: "40px",
      },

      backHTML: <Box>{card.back}</Box>,
      backContentStyle: {
        backgroundColor: colorBack,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "35px",
        width: "100%",
        overflow: "auto",
        textAlign: "center",
        padding: "40px",
      },
    };
  });
  const handlers = useSwipeable({
    onSwipedLeft: () => controlRef.current.nextCard(),
    onSwipedRight: () => controlRef.current.prevCard(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // permite também usar mouse
  });

  return (
    <Box
      {...handlers} // Adiciona os eventos de swipe aqui
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlashcardArray
        cards={cards}
        controls={false}
        showCount={false}
        forwardRef={controlRef}
        // currentCardFlipRef={currentCardFlipRef} //Descartar flip
        onCardChange={(id, index) => {
          setCurrentCard(index);
        }}
      />
      <p>
        {currentCard} / {cards?.length}
      </p>
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton onClick={() => controlRef.current.prevCard()}>
          <ArrowBackIosOutlined />
        </IconButton>
        <IconButton
          onClick={() => {
            controlRef.current.resetArray();
            setCurrentCard(1);
          }}
        >
          <RestartAltOutlined />
        </IconButton>
        <IconButton onClick={() => controlRef.current.nextCard()}>
          <ArrowForwardIosOutlined />
        </IconButton>
      </Box>
    </Box>
  );
}
