/*
  Fate una funzione per rispondere a ciiascuna domanda
    - fetchare della risorsa
    - manipolare il dato per arrivare alla risposta
    - inserire la risposta dentro al footer della carta
  
*/

window.addEventListener("DOMContentLoaded", () => {
  main();
});

async function main() {
  solveQuestion1();
  solveQuestion2();
  solveQuestion3();
  solveQuestion4();
  solveQuestion5();
  solveQuestion6();
}

async function solveQuestion1() {
  const starships = await fetchAll("starships");
  const speeds = starships
    .map(({ MGLT, name }) => ({ speed: parseInt(MGLT), name }))
    .filter((s) => !isNaN(s.speed))
    .sort((a, b) => b.speed - a.speed);
  // console.log({ speeds });

  injectAnswer(speeds[0], 1);
  console.log(speeds[0], 1);
}

// async function solveQuestion2() {
//   let starships = await fetchAll('starships');
//   starships = starships
//     .map(s => ({name: s.name, maxNumOnBoard: parseInt(s.passengers) + parseInt(s.crew)}))
//     .filter(s => !isNaN(s.maxNumOnBoard))
//
//   console.log({ starships });
//
//   const max = Math.max(...starships.map(s => s.maxNumOnBoard));
//   console.log({max})
//   const biggestShip = starships.find(s => s.maxNumOnBoard === max);
//   console.log({ biggestShip });
// }

async function solveQuestion2() {
  let starships = await fetchAll("starships");
  starships = starships.map((s) => ({
    name: s.name,
    totCapacity:
      parseInt(s.crew.replace(",", "")) +
      parseInt(s.passengers.replace(",", "")),
  }));
  starships = starships.filter((s) => !isNaN(s.totCapacity));
  // console.log({starships})

  let maxStarship = starships[0];
  for (const starship of starships) {
    if (starship.totCapacity > maxStarship.totCapacity) {
      maxStarship = starship;
    }
  }
  console.log({ maxStarship });

  injectAnswer(`${maxStarship.name}'s capacity: ${maxStarship.totCapacity}`, 2);
}

function solveQuestion3() {}
function solveQuestion4() {}
function solveQuestion5() {}
function solveQuestion6() {}
async function fetchAll(resource) {
  const res = await fetch(`https://swapi.dev/api/${resource}/`);
  const json = await res.json();
  const count = json.count;

  const promises = [];
  for (let i = 1; i <= count; i++) {
    promises.push(fetch(`https://swapi.dev/api/${resource}/${i}/`));
  }
  const response = (
    await Promise.all(promises.map((p) => p.then((r) => r.json())))
  ).filter((el) => el.name);

  return response;
}

function injectAnswer(answer, questionNumber) {}
