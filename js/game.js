const numDivs = 36;
const maxHits = 11;

let hits = 1;
let miss = 0;
let maxPoints = 10
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый DONE
  
  $('.game-field').removeClass("target")
  $('.game-field').text("")
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $('.target').text(hits)
  
  
  // TODO: помечать target текущим номером DONE
  

  // FIXME: тут надо определять при первом клике firstHitTime DONE

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала DONE
$('.game-field').css("display", "none")

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  console.log (totalPlayedMillis);
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  
  $("#total-time-played").text(totalPlayedSeconds);
  $("#points").text(maxPoints-miss);
  $("#win-message").removeClass("d-none");
  $('#button-start').hide();
  $("#button-reload").show();
  $("#button-reload").click(function() {
    location.reload();  
})
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? DONE
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
  // $(event.target).addClass(".miss") 
  $(event.target).css("background-color", "red");
  miss = miss + 1;
  console.log (miss);
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss Done?
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке DONE
  $("#button-reload").hide();
  $('#button-start').click (() => {
    firstHitTime=getTimestamp();
    $(".game-field").click(handleClick);
    round();
  });
  
  
}


$(document).ready(init);
