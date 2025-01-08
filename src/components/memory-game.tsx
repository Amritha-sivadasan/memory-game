"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const generateDeck = () => {
  const memoryCards = [
    "char-1.png",
    "char-2.png",
    "char-3.png",
    "char-4.png",
    "char-5.png",
    "char-6.png",
    "char-7.png",
    "char-8.png",
  ];

  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards,setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedItems, setMatchedItem] = useState<number[]>([]);
 

  useEffect(() => {
    const checkedForMatch = () => {
      const [first, second] = flipped;
      if (cards[first] == cards[second]) {
        setMatchedItem([...matchedItems, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length == 2) {
      setTimeout(() => {
        checkedForMatch();
      }, 1000);
    }

  }, [cards, flipped, matchedItems]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const restart= ()=>{
    setCards(generateDeck())
    setFlipped([])
    setMatchedItem([])
  }

  const gameOver = matchedItems.length === cards.length;
 
  return (
    <div className="w-11/12  md:w-auto">
      <div className="flex items-center justify-center font-bold flex-col p-5">
        <h1 className="text-xl text-purple-900">Memory Game</h1>
        <p className="text-green-600 text-2xl">{gameOver && "You WON! Congrats!"}</p>
      </div>

      <div className=" grid grid-cols-4 gap-5 transition-transform">
        {cards.map((card, index) => (
          <button
            className={ ` w-20 h-20 rounded-md  md:w-28 md:h-28 transform bg-slate-200 flex items-center  font-bold text-4xl  ease-in-out text-black justify-center cursor-pointer transition-transform duration-300 ${
              flipped.includes(index) || matchedItems.includes(index)
                ? "rotate-180 "
                : ""
            }`}
            key={card + index}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || matchedItems.includes(index) ? (
              <Image
                width={100}
                src={`/memorycards/${card}`}
                height={100}
                alt="Memory Cards"
                className="rotate-180 rounded-md"
              />
            ) : (
              "?"
            )}
          </button>
        ))}
      </div>
    { gameOver &&   <ReactConfetti width={1500}/> }
      <button onClick={restart} className= "flex bg-gray-700 p-2  text-white mt-4  rounded-md" >restart</button>
    </div>
  );
}
