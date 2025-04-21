/** Ability set */
let setPower;
let setHeart;
let setSpeed;
let frindHeart;
let stageNum = 1;
const stage = document.querySelector(".stage");

document
  .querySelector(".abilitySet .check_btn")
  .addEventListener("click", () => {
    stage.textContent = "1단계";
    setPower = Number(document.querySelector("#setPower").value);
    setHeart = Number(document.querySelector("#setHeart").value);
    setSpeed = Number(document.querySelector("#setSpeed").value);

    if (setPower + setHeart + setSpeed === 10) {
      if (setHeart < 1) {
        alert("체력을 최소 1이상 설정해주세요");
        return;
      }
      if (setSpeed < 1) {
        alert("이동 속도를 최소 1이상 설정해주세요");
        return;
      }
      frindHeart = setHeart;

      document
        .querySelector(".abilitySet")
        .setAttribute(`style`, "opacity: 0;");
      setTimeout(() => {
        document
          .querySelector(".abilitySet")
          .setAttribute(`style`, "display: none;");
      }, 200);

      // console.log(setPower, setHeart, setSpeed);

      setTimeout(elMove, 1000);
    } else {
      alert("10스택만 온전히 사용해주세요");
    }
  });

const friend = document.querySelector(".frined");
const enemy = document.querySelector(".enemy");
const bodyWidth = document.querySelector("body").offsetWidth;

let userMoveX = 0;
let otherMoveX = 0;
// 14number friend heart
let enemyHeart = 10;
let enemyPower = 2;
// 적군: 공격력 2 / 체력 10 / 이동 속도 1 / 공격 속도 4초 /
// 아군 : 공격력 / 체력 / 이동 속도 / 공격 속도 3초 /

function elMove() {
  // console.log(enemy)
  enemy.classList.remove("none");
  friend.classList.remove("none");

  let otherDistance = enemy.getBoundingClientRect().left;
  let userDistance = friend.getBoundingClientRect().right;

  userMoveX += setSpeed;
  otherMoveX += 1;

  enemy.setAttribute(`style`, `left: ${otherMoveX}px`);
  friend.setAttribute(`style`, `right: ${userMoveX}px`);

  console.log(userDistance);

  let stopTime = setTimeout(elMove, 1);
  // console.log(otherDistance - userDisstance >= -100)

  if (otherDistance - userDistance >= -150) {
    clearTimeout(stopTime);
    setTimeout(friendOffensive, 300);
    setTimeout(enemyOffensive, 400);
  }
}

let eTime;
let fTime;

function friendOffensive() {
  if (enemyHeart <= 0) {
    console.log("아군 승리");
    console.log(enemyHeart, frindHeart);

    enemy.setAttribute("style", "display: none !important");

    clearTimeout(fTime);
    clearTimeout(eTime);
    friendMove2();
    return;
  }

  friend.classList.toggle("friend_motion");

  console.log(enemyHeart, frindHeart);
  console.log(friend.getBoundingClientRect().left);
  // console.log("power", setPower)

  enemyHeart -= setPower;
  eTime = setTimeout(friendOffensive, 300);
}
function enemyOffensive() {
  if (frindHeart <= 0) {
    console.log("적군 승리");
    console.log(enemyHeart, frindHeart);

    friend.setAttribute("style", "display: none !important");

    clearTimeout(eTime);
    clearTimeout(fTime);
    enemyMove2();
    return;
  }

  enemy.classList.toggle("enemy_motion");

  console.log(friend.getBoundingClientRect().left);
  console.log(enemyHeart, frindHeart);

  frindHeart -= enemyPower;
  fTime = setTimeout(enemyOffensive, 400);
}

let enemyTower = 20;
function enemyMove2() {
  enemy.classList.remove("enemy_motion");
  let moveEnemy = function () {
    otherMoveX += 1;
    enemy.setAttribute(`style`, `left: ${otherMoveX}px`);

    if (otherMoveX < bodyWidth - bodyWidth * 0.12) {
      setTimeout(moveEnemy, 1);
    } else {
      loseWindow();
    }
  };
  moveEnemy();
}

function friendMove2() {
  friend.classList.remove("friend_motion");
  let moveFriend = function () {
    userMoveX -= 1;
    friend.setAttribute(`style`, `left: ${userMoveX}px`);

    if (userMoveX > bodyWidth * 0.1) {
      setTimeout(moveFriend, 1);
    } else {
      nextStage();
    }
  };
  moveFriend();
}

const win = document.querySelector(".win_window");
function nextStage() {
  win.style.visibility = "visible";

  setTimeout(() => {
    window.location.href = "yeosu2.html";
  }, 2000);
}
function loseWindow() {
  document.querySelector(".lose_window").style.visibility = "visible";

  setTimeout(() => {
    window.location.href = "";
  }, 2000);
}
