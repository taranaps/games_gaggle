const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [ 
  { minDegree: 0, maxDegree: 30, value: 'Memory Game' },
  { minDegree: 31, maxDegree: 90, value: 'Rock Paper Scissor' },
  { minDegree: 91, maxDegree: 150, value: 'Breakout' },
  { minDegree: 151, maxDegree: 210, value: 'Frogger' },
  { minDegree: 211, maxDegree: 270, value: 'Whac A Mole' },
  { minDegree: 271, maxDegree: 330, value: 'Connect Four' },
  { minDegree: 331, maxDegree: 360, value: 'Memory Game' },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#9be198",
  "#1c9518",
  "#9be198",
  "#1c9518",
  "#9be198",
  "#1c9518",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  //plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [1, 2, 3, 4, 5, 6],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      /*
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
      */
      //display images as labels inside pie chart
      labels: {
        render: 'image',
        images: [
          {
            src: 'https://img.icons8.com/?size=100&id=ZCMXN2dhBcvi&format=png&color=000000',
            width: 100,
            height: 100
          },
          {
            src: 'https://img.icons8.com/?size=100&id=9MHyhCngdVaI&format=png&color=000000',
            width: 100,
            height: 100
          },
          {
            src: 'https://img.icons8.com/?size=100&id=sO8340DJmnua&format=png&color=000000',
            width: 100,
            height: 100
          },
          {
            src: 'https://img.icons8.com/?size=100&id=AZMANusnpcG9&format=png&color=000000',
            width: 100,
            height: 100
          },
          {
            src: 'https://img.icons8.com/?size=100&id=LnSS3EpeKOG8&format=png&color=000000',
            width: 100,
            height: 100
          },
          {
            src: 'https://img.icons8.com/?size=100&id=itinYvTkMPan&format=png&color=000000',
            width: 100,
            height: 100
          }
        ]
      },
      
    },
  },
});

const modal = document.getElementById("popup-modal");
const modalMessage = document.getElementById("modal-message");
const playBtn = document.getElementById("play-btn");
const spinAgainBtn = document.getElementById("spin-again-btn");

// Map each value to its respective HTML page
const pageMap = {
  'Rock Paper Scissor': "rock-paper-scissor/index.html",
  'Memory Game': "memory-game/index.html",
  'Connect Four': "connect-four/index.html",
  'Whac A Mole': "whac-a-mole/index.html",
  'Frogger': "frogger/index.html",
  'Breakout': "breakout/index.html",
};

//display result based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      const pageUrl = pageMap[i.value];
      modalMessage.textContent = `You Got: ${i.value}!`;
      modal.style.display = "block";
      playBtn.onclick = () => {
        window.location.href = pageUrl;
      };
      spinBtn.disabled = false;
      break;
    }
  }
};

spinAgainBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});