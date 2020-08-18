
		var score; // momentalní score
        var duration = 10; // 10 sekund
        var startTime; // startovací čas
        var ended = true; // boolean konec hry 

        var timerTxt = document.getElementById("timer");
        var scoreTxt = document.getElementById("score");
        var clicksTxt = document.getElementById("clicks");
        var startBtn = document.getElementById("start");
        var clickArea = document.getElementById("clickarea");
        
        var change = document.getElementById('clickarea');
        var color = document.getElementById('color');
        var body = document.body;

        change.addEventListener('click', changeBG);

    function changeBG() {
	    var col1 = getRandomRGB();
	    var col2 = getRandomRGB();
	    var col3 = getRandomRGB();
	    var colorString = `rgb(${col1}, ${col2}, ${col3})`;
	    body.style.background = colorString;
    }   

    function getRandomRGB() {
	    return Math.floor(Math.random() * 256);
    }

    
		// definujeme dvě functions pro zobrazování a skrývání HTML elementů
        var show = function(elem) {
          elem.style.display = 'inline';
        };
    
        var hide = function(elem) {
          elem.style.display = 'none';
        };
    
        // metoda kdy hra začíná
        function startGame() {
          hide(startBtn);
          score = -1;
          ended = false;
          // startovní čas
          startTime = new Date().getTime();
    
          // časovač s setMetodou.
          var timerId = setInterval(function() {
            var total = (new Date().getTime() - startTime) / 1000;
    
            // když je total menší než čas, updateujeme čas a score za sekundu
            if (total < duration) {
              timerTxt.textContent = total.toFixed(3);
              clicksTxt.textContent = (score / total).toFixed(2);
            } else {
              // konec hry = vyresetování hodnot
              ended = true;
              clearInterval(timerId);
              // voláme konec hry
              endGame();
            }
          }, 1);
      }
    
      // metoda konec hry
      function endGame() {
        // výpis výsledku 
        var clicsBySeconds = (score / duration).toFixed(2);
        timerTxt.textContent = duration.toFixed(3);
        clicksTxt.textContent = clicsBySeconds;
        // zobrazení startovacího tlačítka
        show(startBtn);
  
        //alert s výsledkama 
        setTimeout(function() {
          alert('You made ' + score + ' clicks in ' + duration + 
          ' seconds. It is ' + clicsBySeconds + 
          ' clicks by seconds.');
        }, 10);
      }
    
      // nastavujeme speed clicker event na tlacitko "Start"
      startBtn.addEventListener("click", function(e) {
        startGame();
      });
    
      // přidávání čísla score když klikneme na klikací zonu
      clickArea.addEventListener("click", function(e) {
        if (!ended) {
          score++;
          scoreTxt.textContent = score;
        }
      });