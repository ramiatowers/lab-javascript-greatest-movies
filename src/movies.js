// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
    const directors = moviesArray.map(movie => movie.director);
    return directors;
};

getAllDirectors(movies);

function cleanDirectors (moviesArray) {
    const directors = getAllDirectors(moviesArray);
    let directorsUnique = new Set(directors);
    let directorsUniqueArray = new Array (directorsUnique);
    return directorsUniqueArray;
}

cleanDirectors(movies);

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const dramaSpielberg = moviesArray.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'));
    return dramaSpielberg.length;
}

howManyMovies(movies);

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
let guido = []

function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0
    }

    let scoreArray = moviesArray.map(movie => movie.score);
    console.log(scoreArray);

    scoreArray = scoreArray.filter(score => typeof score === 'number' && !isNaN(score));
    console.log(scoreArray);

    let scoreSum = scoreArray.reduce((accumScore, currentScore) => {
        return accumScore + currentScore;
    })
    let average = scoreSum / moviesArray.length;
    console.log(average);
    let decimal = Number(average.toFixed(2));
    console.log(decimal);
    return decimal;
};

scoresAverage(movies);

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    
    const dramaMovies = moviesArray.filter(movie => movie.genre.includes('Drama'));
    console.log(dramaMovies); //Quedan agrupadas las películas de drama en el array.
    
    if (dramaMovies.length === 0) {return 0;} //Si no hay películas de 'Drama' devuelve 0.
    
    let dramaScores = dramaMovies.filter(movie => typeof movie.score === 'number').map(movie => movie.score);
    console.log(dramaScores); //Quedan agrupados los scores de las películas de drama en el nuevo array, previa comprobación de que el score no esté vacío.
    
    let dramaSum = dramaScores.reduce((accum, current) => accum + current);
    console.log(dramaSum); //Queda un solo número con la suma de todos los scores de 'Drama'.
    
    let dramaAverage = dramaSum / dramaMovies.length;
    console.log(dramaAverage); //Queda el promedio del score de 'Drama' al dividirse por la cantidad de películas.
    
    let dramaDecimal = Number(dramaAverage.toFixed(2));
    console.log(dramaDecimal); //Queda el promedio transformado a número con 2 decimales.
    
    return dramaDecimal;

  }

dramaMoviesScore(movies)

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {

    let sortByYear = [...moviesArray].sort((a, b) => { //Aplico un .map para que se genere un nuevo array y luego aplico el sort enfocándome en año y luego nombre.
        if (a.year !== b.year) {
            return a.year - b.year; //Primero ordeno las películas de forma ascendente.
        } else {
            return a.title.localeCompare(b.title); //Segundo las ordeno según su nombre.
        }
    })

    console.log(sortByYear);
    return sortByYear;
}

orderByYear(movies)

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(moviesArray) {
    const moviesFirst20 = moviesArray.map(movie => movie.title).sort().slice(0, 20);
    console.log(moviesFirst20);
    return moviesFirst20;
}

orderAlphabetically(movies)

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(movie => {
        
        const newMovie = { ...movie }; //Creo una copia de los objetos porque el .map() crea un nuevo array pero trabaja con los elementos original. Entonces, al cambiar el valor del atributo Duration, sin la copia estaría modificando el valor del original.
        let totalMinutes = 0;
        const duration = newMovie.duration;
    
        if (duration.includes('h')) {
          const hours = parseInt(duration.split('h')[0]); //Creo una cariable que parte el dato de duración por la 'h' y se queda con la primera posición [0], es decir, el dato de la hora. Con parseInt transformo el string resultanto en número.
          totalMinutes += hours * 60; // Multiplico el valor de la hora por 60 para pasarla a minutos y la sumo a la variable totalMinutes.
        }
    
        if (duration.includes('min')) {
          const minutesStr = duration.includes('h') ? duration.split('h')[1] : duration; // Operador ternario con la condición de si incluye o no h el string, para dividirlo por la h y quedarse con la segunda parte [1]; o quedarse con todo el string en caso de que no haya h.
          const minutes = parseInt(minutesStr);
          totalMinutes += minutes;
        }
    
        newMovie.duration = totalMinutes;
        return newMovie;
      });   
}

turnHoursToMinutes(movies)

// BONUS - Iteration 8: Best yearly score average - Best yearly score average

function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null;
    if (moviesArray.length === 1) {
      return `The best year was ${moviesArray[0].year} with an average score of ${moviesArray[0].score}`;
    }
  
    // Objeto para almacenar años con sus puntajes totales y conteos
    const yearData = {};
  
    // Procesar todas las películas para acumular datos por año
    moviesArray.forEach(movie => {
      if (!yearData[movie.year]) {
        yearData[movie.year] = {
          totalScore: movie.score,
          count: 1
        };
      } else {
        yearData[movie.year].totalScore += movie.score;
        yearData[movie.year].count += 1;
      }
    });
  
    // Calcular promedios y encontrar el mejor año
    let bestYear = null;
    let bestAvg = -Infinity;
  
    for (const year in yearData) {
      const avg = yearData[year].totalScore / yearData[year].count;
      
      if (avg > bestAvg) {
        bestAvg = avg;
        bestYear = year;
      } else if (avg === bestAvg) {
        // En caso de empate, seleccionar el año más antiguo
        if (parseInt(year) < parseInt(bestYear)) {
          bestYear = year;
        }
      }
    }
  
    return `The best year was ${bestYear} with an average score of ${bestAvg}`;
  }