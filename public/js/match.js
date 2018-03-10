var chart = {
	post: (candidate) => {
		var chart = new Chart(document.getElementById(`canvas-${candidate.profile.id}`), {
	    type: 'horizontalBar',
	    data: {
	      labels: Object.keys(candidate.skills),
	      datasets: [
	        {
	          label: "Coder Skillz",
	          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	          data: Object.values(candidate.skills)
	        }
	      ]
	    },
	    options: {
	      legend: { display: false },
	      title: {
	        display: false,
	        text: 'Predicted world population (millions) in 2050'
	      }
	    }
	});

	console.log(chart.data)
	}//post
}



var card = {
	create: (candidate) => {
		let card = $('<div>')
					.addClass('card')
					.attr('id',candidate.profile.id)
					.appendTo($('#match-results'));

		$('<div>').addClass('card-image waves-effect')
				  .addClass('waves-block waves-light')
				  .append($(`<img class="activator" src=${candidate.profile.image}>`))
				  .appendTo(card);

		$('<div>').addClass('card-content')
				  .append($(`<p>${candidate.profile.name}</p>`))
				  .append($(`<p><b>Score: ${candidate.score}</b></p>`))
				  .append($(`<p><a href="#">${candidate.profile.github}</a></p>`))
				  .appendTo(card);

		$('<div>').addClass('card-reveal')
				  .append($('<span class="card-title grey-text text-darken-4">Skills</span>'))
				  .append($(`<canvas width=180px height=350px id="canvas-${candidate.profile.id}">`))
				  .appendTo(card);
		chart.post(candidate)
	} //create: (profile) => {
} //var card = {


var data = {
	employer: '',
	candidates: new Array(0),
	post: () => {
		data.candidates.forEach(candidate => card.create(candidate));
	},

	calculateScore: () => {
		data.candidates.forEach(candidate => {
			var skillsDesired = Object.values(data.employer.skills);
			var skillsCandidate = Object.values(candidate.skills);

			var squareDiff = skillsCandidate.map((val,i) => {
				return Math.pow(val-skillsDesired[i],2);
			});

			var score = squareDiff.reduce((acc,val) => acc+val);
			candidate.score = score;
		});
	},

	initializeDummy: () => {
		var profile = new Profile(1,'Programmers Inc','We be like programmin!','programmersinc.com','619-553-l33t','./images/inc.jpg');
		var skills = data.getDummySkills();
		var employer = new Candidate(profile,skills);
		data.employer = employer;


		var profile = new Profile(1,'Steve Jobs','I like em apples.','github.com/apple','619-553-l33t','./images/jobs.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(2,'Bill Gates','I came, I saw, I conquered.','github.com/microsoft','619-553-l33t','./images/gates.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(3,'Margret Hamilton','I like rockets.','github.com/jpl','619-553-l33t','./images/hamilton.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(4,'John von Neumann','I AM THE MACHINE.','github.com/greatest','619-553-l33t','./images/neumann.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(5,'Ada Lovelace','I was first!','github.com/ada','619-553-l33t','./images/ada.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(6,'Steve Wozniak','I am da Woz.','github.com/apple2','619-553-l33t','./images/woz.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		data.calculateScore();
	},

	getDummySkills: () => {
		const html = Math.ceil(Math.random()*5);
		const css = Math.ceil(Math.random()*5);
		const javascript = Math.ceil(Math.random()*5);
		const nodejs = Math.ceil(Math.random()*5);
		const react = Math.ceil(Math.random()*5);

		const skills = new Skills(html,css,javascript,nodejs,react);
		return skills;
	},
} //var data

function Candidate(profile,skills) {
	this.score = '';
	this.profile = profile;
	this.skills = skills;
}

function Profile(id,name,summary,github,phone,image) {
	this.id = id;
	this.name = name;
	this.summary = summary;
	this.github = github;
	this.phone = phone;
	this.image = image;
}

function Skills(html,css,javascript,nodejs,react) {
	this.html = html;
	this.css = css;
	this.javascript = javascript;
	this.nodejs = nodejs;
	this.react = react;
}


/* ================================
	    DRAG AND DROP
================================*/


var drag = {
	drake: '',
	initialize: function() {
		let dragArray = [];
		dragArray.push(document.getElementById('match-results'));
		dragArray.push(document.getElementById('match-email'));
		dragArray.push(document.getElementById('match-hold'));
		dragArray.push(document.getElementById('match-trash'));

		this.drake = dragula(dragArray,{
			direction: 'vertical',
			accepts: function (el,target,source) {
				const isDroppable = drag.isDroppable(el,target,source);
				return isDroppable;
			}
		})
		.on("drop",function(el,target,source,sibling) {
			elementObj = el;
			drag.updateTasksAfterDrag(el.id,source.id,target.id);
		});
		this.drake.on("drag",function(el,target,source,sibling) {
			
		})
	}, //initialize

	update: function() {
		this.updateDragContainers();
	}, //update


	updateDragContainers: function() {
		l
	},

	updateTasksAfterDrag: function(taskHTMLid, sourceID, targetID) {
		
	},

	

	isDroppable: function(el,target,source) {
		let isDroppable = true;
		return isDroppable;
	},

	forceMove: function() {

	}
}

$(document).ready(() => {
	data.initializeDummy();
	data.post();
	drag.initialize();
})