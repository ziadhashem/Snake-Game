
const preload_time = 2000;
const max_colums = 20;
const max_rows = 20;
const tr_height = 25;
const td_width = 25;
const play_area_container = 'play_area'; // id container
const audio_background = new Audio('audio/Summer-Tropical-House-HEAVEN.mp3');
const low_speed = 1000;
const normal_speed = 500;
const high_speed = 100;
var speed = low_speed;
var points = 0;
var timer = 0;
var color_game_area = '#05660C';
var color_snake = '#000000';
var last_render_time = Date.now();

