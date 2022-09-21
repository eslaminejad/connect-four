
scores = [0,0]
var board = new Array(5);
for (var i = 0; i < board.length; i++) {
  board[i] = [0,0,0,0,0,0,0];
}
turn = 1;
last = [4,4,4,4,4,4,4]

function win(winner){
  setTimeout(() => {
    if(winner == -1){
      scores[1] += 1;
      winner = 2
    }else {
      scores[0] += 1;
    }
    winner -= 1
    for (var i = 0; i < board.length; i++) {
      board[i] = [0,0,0,0,0,0,0];
    }
    turn = 1;
    last = [4,4,4,4,4,4,4]
    $('td').css('background','gray')
    $('h4').eq(winner).text(scores[winner]);

  },500);

}


$('td').click(function(){
  col = $(this).index();
  col_max = 7

  //check if column is full
  if(last[col] == -1){
    return
  }

  board[last[col]][col] = turn;
  num = last[col]*col_max + col;
  color = '#c91e32'
  if(turn == 1){
    color = '#397eed'
  }
  $('td').eq(num).css('background',color);


  //check winner for last round
  winner = 0
  //horizontal
  for (var i = 0; i < 4; i++) {
    sum = 0
      for (var j = 0; j < 4; j++) {
        sum += board[last[col]][col+i-j]
      if (sum == 4) {
        win(1)
        return
      }else if (sum == -4) {
        win(-1)
        return ;
      }
    }
  }
  //vertical
  sum = 0
  if(last[col] < 2){
    for (var i = 0; i < 4; i++) {
      sum += board[last[col]+i][col]
    }
  }
  if (sum == 4) {
    win(1)
    return ;
  }else if (sum == -4) {
    win(-1)
    return ;
  }
  //orib
  for (var k = -1; k < 2; k+=2) {
    console.log(k);
    sum = 0
    for (var i = 0; i < 4; i++) {
      sum = 0
        for (var j = 0; j < 4 &&(last[col]+i+(j*k) <5 && last[col]+i+(j*k) >= 0); j++) {
          console.log(last[col]+i+(j*k), col+i-j);
          sum += board[last[col]+i+(j*k)][col+i-j]
        if (sum == 4) {
          win(1)
          return
        }else if (sum == -4) {
          win(-1)
          return ;
        }
      }
    }
  }


  last[col] -=1;
  turn *= -1;
})


$('td').mouseover(function(){
  col = $(this).index();
  num = last[col]*7 + col;
  cell = $('td').eq(num);
  color1 = '#c91e32'
  color2 = '#397eed'
  console.log(cell.css('backgroundColor'));
  if(cell.css('backgroundColor') != 'rgb(57, 126, 237)' && cell.css('backgroundColor') != 'rgb(201, 30, 50)'){
    cell.css('backgroundColor','rgb(201, 201, 201)')
  }
})

$('td').mouseout(function(){
  col = $(this).index();
  num = last[col]*7 + col;
  cell = $('td').eq(num);
  console.log(cell.css('backgroundColor'));
  if(cell.css('backgroundColor') == 'rgb(201, 201, 201)'){
    cell.css('backgroundColor','gray')
  }
})
