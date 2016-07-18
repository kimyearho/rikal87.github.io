/**
 * 
 */
var data = [
	{
		"name":"김현수",
		"commited":false,
		"age":19,
		"address":
		[
		 {"value":"11111", "zipcode":"aaaaaa"},
		 {"value":"22222", "zipcode":"bbbbbb"},
		 {"value":"33333", "zipcode":"ccccc"},
		],
		"family":
		[
			{
				"name":"초코",
				"age":1,
				"like":
				[
				 {"subject":"gum", "weight":3.12, "gender": 1, "favourite1": true, "favourite2": false, "favourite3": false},
				 {"subject":"mil", "weight":3.12, "gender": 2},
				]
			},
			{
				"name":"김치",
				"age":2,
				"like":
				[
				 {"subject":"gum", "weight":3.12, "gender":2},
				 {"subject":"mil", "weight":3.12, "gender":1},
				]
			},
			{
				"name":"새식구",
				"age":3,
				"like":
				[
				 {"subject":"gum", "weight":3.14, "gender":2},
				 {"subject":"mil", "weight":3.14, "gender":1},
				]
			},
		]
	}
];
$(document).ready(function(){
	alert("바인딩 시작!");
	var selector = $("tr.depth1.template"); // 적용범위 지정
	var magnet = new DataMagnet(selector, false, false);
	magnet.bind(data, {
		"family":{
			"like":{
				"this":function(el, data, ref){
					$(el).mouseover(function(){
						$(this).css({"background-color":"red"});
					});
				},
				"gender":function(el, data, ref){
					console.log(data);
				}
			}
		}
	}); // 데이터 바인딩 시작
	magnet.bind(data, {
		"family":{
			"like":{
				"this":function(el, data, ref){
					$(el).mouseover(function(){
						$(this).css({"background-color":"red"});
					});
				},
				"gender":function(el, data, ref){
					console.log(data);
				}
			}
		}
	});
	$("button#btn-check").click(function(){
		console.log(data);
		alert(JSON.stringify(data));
	})
});