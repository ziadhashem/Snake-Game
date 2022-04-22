
preload_time = 2000;
max_colums = 20;
max_rows = 20;
tr_height = 25;
td_width = 25;
play_area_container = 'play_area'; // id container
let last_render_time = Date.now();
const low_speed = 1000;
const normal_speed = 500;
const high_speed = 100;
speed = low_speed;
points = 0;
timer = 0;
audio_background = new Audio('audio/Summer-Tropical-House-HEAVEN.mp3');