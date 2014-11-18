
var playground_t = {
	lat_lang : [ 51.508742, -0.120850 ],
	name : "Gopichand academy-Court C",
	landmark_description : "gopinchand academy of Badminton",
	game_formats : [],
	game_modes : [ MULTIPLAYER_CHOOSING ],
	images : [],
	description : "Amazing court in this domain",
	timings : [ [], [], [], [], [], [], [] ],
	per_unit_cost : {
		30 : 50,
		60 : 90
	}
}

var game_format_t = {
	game_format_id : "987654",
	name : "Volley Ball",
	user_id : "198765",
	icon:"./images/game_icons/volleyball.png",
	groups_user_count : {
		"RedTeam" : 6,
		"Team Blue" : 6
	},
	description: "Standard volley ball with 8 players",
	scoreboard_properties : [ "runs", "wickets", "overs", "etc" ],
	user_properties : [ "runs", "balls", "catch" ]
};

var users_t = [ {
	uid : 2,
	name : "abhinav"
}, {
	uid : 3,
	name : "saikiran"
}, {
	uid : 4,
	name : "gundu"
}, {
	uid : 5,
	name : "ram"
} ]

var game_t = {
	game_id : "123123",
	datetimes : [ 1424819369, 1424826569 ],
	playground : playground_t,
	description : "Winning teams get the coke treat from the losing team.",
	created_by_user : "198765",
	game_mode : MULTIPLAYER_CHOOSING,
	game_format : game_format_t,
	betting : -1,
	betting_description : "something",
	marker_icon:"./images/marker_icons/casual/volleyball.png",
	users : [],
	game_level: 5,
	groups : {
		"RedTeam" : [ {
			uid : 2,
			name : "abhinav"
		}, {
			uid : 3,
			name : "saikiran"
		} ],
		"Team Blue" : [ {
			uid : 4,
			name : "gundu"
		}, {
			uid : 5,
			name : "ram"
		} ]
	},
	game_scores : {},
	user_scores : {},
	pictures : [],
	videos : []
};
/* end test data */

/*
 * user functions
 */

