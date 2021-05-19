let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;
let start;

var word = window.prompt("Please insert your Phrase");
var poppmaxer = window.prompt("Please insert the population size you want");

function setup() {
  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");
  bestPhrase.position(50, 40);

  allPhrases = createP("All phrases:");
  allPhrases.position(50, 270);
  allPhrases.class("all");

  stats = createP("Stats");
  stats.class("stats");
  stats.position(1400, 62);

  title = createP("Genetic Algorithm Phrase Finder")
  title.class("title");

  target = word;
  popmax = poppmaxer;
  mutationRate = 0.01;

  population = new Population(target, mutationRate, popmax);
}

function draw() {

  population.naturalSelection();
  population.generate();
  population.calcFitness();

  population.evaluate();

  if (population.isFinished()) {
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext =
    "total generations:     " + population.getGenerations() + "<br>";
  statstext +=
    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases());
}