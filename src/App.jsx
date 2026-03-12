import ImagesFlow from "./Components/ImagesFlow";
import card1 from "./assets/1.jpeg";
import card2 from "./assets/2.jpeg";
import card3 from "./assets/3.jpeg";
import card4 from "./assets/4.jpeg";
import card5 from "./assets/5.jpeg";
import card6 from "./assets/6.jpeg";
import card7 from "./assets/7.jpeg";
import card8 from "./assets/8.jpeg";
import card9 from "./assets/9.jpeg";
import card10 from "./assets/10.jpeg";
import card11 from "./assets/11.jpeg";
import card12 from "./assets/12.jpeg";
import card13 from "./assets/13.jpeg";
import card14 from "./assets/14.jpeg";
import card15 from "./assets/15.jpeg";
import card16 from "./assets/16.jpeg";
import card17 from "./assets/17.jpeg";
import card18 from "./assets/18.jpeg";
import card19 from "./assets/19.jpeg";
import card20 from "./assets/20.jpeg";
import card21 from "./assets/21.jpeg";
import card22 from "./assets/22.jpeg";
import card23 from "./assets/23.jpeg";
import card24 from "./assets/24.jpeg";
import card25 from "./assets/25.jpeg";
import card26 from "./assets/26.jpeg";
import card27 from "./assets/27.jpeg";
import card28 from "./assets/28.jpeg";

function App() {
  const images = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
    card11,
    card12,
    card13,
    card14,
    card15,
    card16,
    card17,
    card18,
    card19,
    card20,
    card21,
    card22,
    card23,
    card24,
    card25,
    card26,
    card27,
    card28,

  ];

  return (
    <ImagesFlow
      introTitle="Happy Birthday Happy"
      introSubtitle=""
      // outroTitle="The End"
      images={images}
    />
  );
}

export default App;