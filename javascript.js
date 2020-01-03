var answer_code;
var answer_array = [];
var answer_repeat = true;
var answer_not_four = true;
var click_counter = 0;
var banned_array = [0,0,0,0,0,0,0,0,0,0];
var player_answer = [];
var player_tries = 0;

function gamestart(){
  $('.enter_area').attr('disabled',false);
  $('#submit_btn').attr('disabled',false);
  click_counter += 1;
  if(click_counter % 2 != 0)  {
    do{
      answer_code = Math.floor(Math.random()*10000);
      put_in_array();

      if(answer_code-1000 <= 0)
      {
        answer_not_four = true;
      }
      else {
        answer_not_four = false;
      }

      var index=1;
      outer:
      for(i=index;i<5;i++)
      {
        inter:
        for(j=i+1;j<5;j++)
        {
          if(answer_array[i] == answer_array[j])
          {
            answer_repeat = true;
            break outer;
          }
          else
          {
            answer_repeat = false;
          }
        }
      }

    }while(answer_repeat || answer_not_four)
    console.log(answer_code);
    document.getElementById("start_btn").style.backgroundColor="#DC143C";
    document.getElementById("start_btn").innerText="STOP";
  }
  else {
    game_stop();
  }

}

function put_in_array(){
  answer_array[1] = Math.floor(answer_code/1000);
  answer_array[2] = Math.floor((answer_code-(answer_array[1]*1000))/100);
  answer_array[3] = Math.floor((answer_code-(answer_array[1]*1000+answer_array[2]*100))/10);
  answer_array[4] = Math.floor(answer_code-(answer_array[1]*1000+answer_array[2]*100+answer_array[3]*10));
}

function game_stop(){
  var stop_or_con = confirm("Sure to give up ?");
  if(stop_or_con){
    document.getElementById("start_btn").style.backgroundColor="#007bff";
    document.getElementById("start_btn").innerText="Start!!";
    click_counter = 0;
    $('.enter_area').attr('disabled',true);
    $('#submit_btn').attr('disabled',true);
    $("#answer_table tbody").empty();
    $('.enter_area').val("");
  }
  else{
    click_counter = 1;
  }
}

function submit_ans(){
  var i = 1;
  var j = 1;
  var k = 1;
  var p;
  var a = 0;
  var b = 0;
  var user_answer = 0;
  player_tries += 1;
  for(i;i<5;i++){
    player_answer[i] = document.getElementById(i+"_ans").value;
    if(player_answer[i] == ""){
      alert("Please respond a 4 digit number~");
      player_tries -= 1;
      return;
    }
  }
  player_answer = player_answer.map(Number);
  user_answer = player_answer[1]*1000 + player_answer[2]*100+ player_answer[3]*10 + player_answer[4]*1;
  console.log(player_answer,answer_array);
  for(j;j<5;j++)
  {
    if(player_answer[j] == answer_array[j])
    {
      a++
    }
  }
  for(k;k<5;k++)
  {
    for(p=1;p<5;p++)
    {
      if(player_answer[k] == answer_array[p] && (k != p))
      {
        b++;
      }
    }
  }
  $("#answer_table tbody").append("<tr><th>" + player_tries + "</th><th>" + user_answer + "</th><th>" + a + "A" + b + "B</th></tr>");
}

function ban_number(num){
  if(banned_array[num] == 0){
    document.getElementById(num).style.backgroundColor="#D3D3D3";
    banned_array[num] += 1;
  }
  else{
    document.getElementById(num).style.backgroundColor="	#FFFFFF";
    banned_array[num] -= 1;
  }
}
