// first, need to set command to have the card go to chosen div
// onclick event with while statement
// can change "value" of enemie hp later.
// remember,there are change and remove class functions.

var characters = {
  ryu: {
    name: 'Ryu',
    hp: 170,
    attack: 10,
    increaseAttack: 5,
    counter: 5
  },
  chunLi: {
    name: 'Chun-Li',
    hp: 160,
    attack: 12,
    increaseAttack: 8,
    counter: 4
  },
  guile: {
    name: 'Guile',
    hp: 170,
    attack: 14,
    increaseAttack: 3,
    counter: 15
  },
  mbison: {
    name: 'M-Bison',
    hp: 185,
    attack: 12,
    increaseAttack: 2,
    counter: 25
  }
};



// setting some variables
// while true, choseyourfighter allows you to choose a character
// when true, a battle is about to beigin in the battle div.

// selectedCharacter and rivalCharacter are for getting stats.

var chooseyourfighter = true
var battle = false
var selectedCharacter = null;
var rivalCharacter = null;
var remainingRivals = null;
var firstattack = true
var gameover = false
// var remainingHP = null;
// var attack = null;

function resetall() {
  $(".playerHP").empty()
  $(".rivalHP").empty()
  $(".player").find("li").removeClass("playerHP")
  $(".opponent").find("li").removeClass("RivalHP")
  $(".player").removeClass("player").addClass("choose")
  $(".opponent").removeClass("opponent").addClass("choose")
  // manually putting back each fighter in order, since very possible can be put back in random order.
  $(".fighters").append($("#ryu"))
  $(".fighters").append($("#chunLi"))
  $(".fighters").append($("#guile"))
  $(".fighters").append($("#mbison"))
  $("#roster").show()
  $("#roster").append($(".fighters"))
  $("#CYF").show()
  $("#label1").hide()
  $("#label2").hide()
  $("#VS").hide()
  $("#fight").hide()
  $("#EtD").hide()
  $("#rivals").hide()
  firstattack = true
  battle = false
  chooseyourfighter = true 

  // I realized after looking at the fridge excercise again, 
  // I could have made each of those objects in a for loop and create my roster that way.
  // Might have made things easier.
  //  But I was already too far into this task and too close to the deadline.
  // For now, wasn't sure on how else to reset values except to manually do so.

  // reset ryu's values
  characters.ryu.hp = 170
  characters.ryu.attack = 10
  $("#ryuHP").text("170") // only way I could think of showing the correct hp for now. 

  characters.chunLi.hp = 160
  characters.chunLi.attack = 12
  $("#chunLiHP").text("160")

  characters.guile.hp = 170
  characters.guile.attack = 14
  $("#guileHP").text("170")

  characters.mbison.hp = 185
  characters.mbison.attack = 12
  $("#mbisonHP").text("185")

  // I had a bug earlier that characters would inherit attack stats they shouldn't have
  // when the game restart.
  // I think this fixed it, tested a few times, didn't notice issue.
  
  var selectedCharacter = null;
  var rivalCharacter = null;
  var remainingRivals = null;

  console.log(selectedCharacter)
  console.log(rivalCharacter)
}


$(document).ready(function () {

$("#rivals").hide()

  // choose a fighter and move it to chosen
$(".choose").on("click", function() {

    if(chooseyourfighter) {
      characterVal = $(this).attr('name');
      selectedCharacter = characters[characterVal];
      $("#chosen").append($(this));
      $("#CYF").hide()
      $("#roster").hide()

      // set parameters to make chosen player's character seperate from other characters.
      $(this).removeClass("choose").addClass("player");

      // set parameters to make player's HP seperate from other characters.
      $(this).find("li").addClass("playerHP")
      $(".playerHP").text(selectedCharacter.hp)

      // set parameters to make other characters in a different catagory an place them in rival pool.
      $("#rivals").show()
      $("#rivals").append($(".fighters"));
      $(".choose").removeClass("choose").addClass("rival"); // check on this for HP value
      remainingRivals = $(".rival").length

      $("#label1").show()
      $("#label2").show()
      $("#VS").show()
      $("#EtD").show()

      // choose your fighter is false, because player is no longer choosing fighter.
      chooseyourfighter = false;
    }
})
  

// select an enemy and move it to the #battle div
$(document).on("click", "div.rival", function() {
    if(!chooseyourfighter && !battle) {
     $("#fight").show()
    
     // find rival's "name" so it can be applied from the rival list.
     rivalVal = $(this).attr('name');
      
     // apply who the rival character is from the characters' object
     rivalCharacter = characters[rivalVal];
     
     // place the rival on the battle div, and added RivalHP to provide a way to show HP value on that Div.
     $("#battle").append($(this));
     $(this).removeClass("rival").addClass("opponent")
     $(this).find("li").addClass("RivalHP")

      
     $(".RivalHP").text(rivalCharacter.hp)
     battle = true;
    }
});

// make 'player' and 'opponent' battle when '#fight' is pressed
// 'player' character's attack will increase based on increaseAttack stat.

$("#fight").on("click", function() {
  if (battle && !chooseyourfighter) {
    
    // values for what happens when characters attack each other

    console.log(remainingRivals)

    if (firstattack) {
    selectedCharacter.hp -= rivalCharacter.counter
    rivalCharacter.hp -= selectedCharacter.attack
    firstattack = false
    }  

    else {
    selectedCharacter.hp -= rivalCharacter.counter
    rivalCharacter.hp -= selectedCharacter.attack
    selectedCharacter.attack += selectedCharacter.increaseAttack
    }

    
    $(".playerHP").text(selectedCharacter.hp)
    $(".RivalHP").text(rivalCharacter.hp)
    $("#charattack").text(selectedCharacter.name + " attacks for " + selectedCharacter.attack)
    $("#counterattack").text(rivalCharacter.name + " attacks for " + rivalCharacter.counter)

    if(selectedCharacter.hp <=0) {
      alert("You Lose. Game over!")
      $("#hidden").append($(".player"))
      $("#charattack").empty()
      $("#counterattack").empty()
      resetall()
    }

    else if(rivalCharacter.hp <= 0) {
      $("#hidden").append($(".opponent"));
      $("#charattack").empty()
      $("#counterattack").empty()
      remainingRivals--;
      battle = false;
      console.log(remainingRivals)
    }          

      if(remainingRivals === 0) {
        alert("Congratulation! You Win!")
        $("#hidden").append($(".opponent"));
        resetall()
      }
  }
})

});
