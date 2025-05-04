import { FlashcardArray } from "react-quizlet-flashcard";
import { useRef, useState } from "react";
import { Box } from "@mui/system";
import {
  RestartAltOutlined,
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { Icon, IconButton } from "@mui/material";
export default function FlashCardComponent(params) {
  const { flashCards = [] } = params;
  // const cards = [
  //   {
  //     id: 1,
  //     frontHTML: (
  //       <div>
  //         What is the capital of <u>Alaska</u>?
  //       </div>
  //     ),
  //     backHTML: <>Juneau</>,
  //   },
  //   {
  //     id: 2,
  //     frontHTML: <>What is the capital of California?</>,
  //     backHTML: <>Sacramento</>,
  //   },
  //   {
  //     id: 3,
  //     frontHTML: <>What is the capital of New York?</>,
  //     backHTML: <>Albany</>,
  //   },
  //   {
  //     id: 4,
  //     frontHTML: <>What is the capital of Florida?</>,
  //     backHTML: <>Tallahassee</>,
  //   },
  //   {
  //     id: 5,
  //     frontHTML: <>What is the capital of Texas?</>,
  //     backHTML: <>Austin</>,
  //   },
  //   {
  //     id: 6,
  //     frontHTML: <>What is the capital of New Mexico?</>,
  //     backHTML: <>Santa Fe</>,
  //   },
  //   {
  //     id: 7,
  //     frontHTML: <>What is the capital of Arizona?</>,
  //     backHTML: <>Phoenix</>,
  //   },
  // ];

  const cards = flashCards?.map((card) => {
    return {
      id: card.id,
      frontHTML: <div>{card.front}</div>,
      backHTML: <div>{card.back}</div>,
    };
  });
  console.log(flashCards);

  const controlRef = useRef({}); // {} should definitely be passed to useRef for it to work
  const currentCardFlipRef = useRef(); // nothing should be passed to useRef for it to work
  const [currentCard, setCurrentCard] = useState(1);
  return (
    <Box
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
