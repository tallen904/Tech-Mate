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




var data = {
	employer: '',
	candidates: new Array(0),

	

	getCandidateByID: (divID) => {
		const id = parseInt(divID);
		const candidate = data.candidates.filter((candidate) => {
			return candidate.profile.id === id;
		});
		return candidate[0];
	},

	postMatch: () => {
		data.candidates.forEach(candidate => candidate.updateAfterDrop('match-results'));
	},
	testSmall: () => {
		console.log('foobar')
		data.candidates.forEach(candidate => card.createSmall(candidate,'match-email'));
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
		var profile = new Profile(1,'Programmers Inc','We be like programmin!','programmersinc.com','619-553-l33t','sjobs@appgle.com','../assets/images/profile/inc.jpg');
		var skills = data.getDummySkills();
		var employer = new Candidate(profile,skills);
		data.employer = employer;


		var profile = new Profile(1,'Steve Jobs','I like em apples.','github.com/apple','619-553-l33t','jobs@apple.com','../assets/images/profile/jobs.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(2,'Bill Gates','I came, I saw, I conquered.','github.com/microsoft','619-553-l33t','william_gates@microsoft.com','../assets/images/profile/gates.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(3,'Margaret Hamilton','I like rockets.','github.com/jpl','619-553-l33t','hamiltonm@jpl.gov','../assets/images/profile/hamilton.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(4,'John von Neumann','I AM THE MACHINE.','github.com/greatest','619-553-l33t','neumann.john@pentagon.mil','../assets/images/profile/neumann.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(5,'Ada Lovelace','I was first!','github.com/ada','619-553-l33t','ada@ada.com','../assets/images/profile/ada.png');
		var skills = data.getDummySkills();
		var candidate = new Candidate(profile,skills);
		data.candidates.push(candidate);

		var profile = new Profile(6,'Steve Wozniak','I am da Woz.','github.com/apple2','619-553-l33t','woz@apple.com','../assets/images/profile/woz.png');
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
	this.divID = '';

	this.updateAfterDrop = (divID) => {
		if (divID === this.divID) return;


		if (this.divID !== '') this.removeCard();

		this.createCard(divID);
		this.divID = divID;
	}; //this.updateState = (divID) => {

	this.removeCard = () => {
		$(`#${this.profile.id}`).remove();
	}

	this.createCard = (divID) => {
		if (divID === 'match-results') {
			this.createLargeCard(divID);
		} else {
			this.createSmallCard(divID);
		}
	};

	this.createLargeCard = (divID) => {
		let card = $('<div>')
					.addClass('card')
					.attr('id',this.profile.id)
					.appendTo($(`#${divID}`));

		$('<div>').addClass('card-image waves-effect')
				  .addClass('waves-block waves-light')
				  .append($(`<img class="activator" src=${this.profile.image}>`))
				  .appendTo(card);

		$('<div>').addClass('card-content')
				  .append($(`<p "font-size: 15px;">${this.profile.name} - <b>match: ${this.score}</b></p>`))
				  .append($(`<p style="font-size: 13px;">${this.profile.phone}</p>`))
				  .append($(`<p style="font-size: 13px;">${this.profile.email}</p>`))
				  .append($(`<p><a href="#">${this.profile.github}</a></p>`))
				  .appendTo(card);

		$('<div>').addClass('card-reveal')
				  .append($('<span class="card-title grey-text text-darken-4">Skills</span>'))
				  .append($(`<canvas width=180px height=300px id="canvas-${this.profile.id}">`))
				  .appendTo(card);

		chart.post(this)
	};

	this.createSmallCard = (divID) => {
		let card = $('<div>')
					.addClass('card horizontal')
					.attr('id',this.profile.id)
					.appendTo($(`#${divID}`));

		$('<div>').addClass('card-image')
				  .append($(`<img class="activator" src=${this.profile.image}>`))
				  .appendTo(card);

		let cardContent = $('<div>')
					.addClass('card-stacked')
				  	.appendTo(card);

		

		$('<div>').addClass('card-content')
				  .append($(`<p>${this.profile.name}</p>`))
				  .append($(`<p style="font-size: 12px;"><b>Score: ${this.score}</b></p>`))
				  .appendTo(cardContent);
	};
}

function Profile(id,name,summary,github,phone,email,image) {
	this.id = id;
	this.name = name;
	this.summary = summary;
	this.github = github;
	this.phone = phone;
	this.email = email;
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
			drag.updateTasksAfterDrag(el.id,source.id,target.id);
		});

		this.drake.on("over",function(el,container,source) {
			const divID = container.id;
			display.effect.hover.on(divID);
		})

		this.drake.on("out",function(el,container,source) {
			const divID = container.id;
			display.effect.hover.off(divID);
		})
	}, //initialize

	update: function() {
		this.updateDragContainers();
	}, //update


	updateDragContainers: function() {
		
	},

	updateTasksAfterDrag: function(candidateHTMLid, sourceID, targetID) {
		const candidate = data.getCandidateByID(candidateHTMLid);
		candidate.updateAfterDrop(targetID);
	},

	

	isDroppable: function(el,target,source) {
		let isDroppable = true;
		return isDroppable;
	},

	forceMove: function() {

	}
}

var display = {


	removeCandidateCSSbyDiv: (divID,cssClass) => {
		const candidatesMatch = data.candidates.filter(candidate => {
			candidate.divID === divID;
		});

		candidatesMatch.forEach(candidate => {
			$(`#${candidate.profile.id}`).removeClass(cssClass);
			console.log(candidate.profile.id)
		});
	},

	effect: {
		hover: {
			on: (divID) => {
				let candidatesMatch = data.candidates.filter(candidate => {
					return candidate.divID === divID;
				});


				candidatesMatch.forEach(candidate => {
					$(`#${candidate.profile.id}`).addClass('card-hover');
				});


				$(`#${divID}`).addClass('match-container-hover');
				switch (divID) {
					case 'match-email':
						$(`#${divID}`).addClass('email-hover');
						break;
					case 'match-hold':
						$(`#${divID}`).addClass('save-hover');
						break;
					case 'match-trash':
						$(`#${divID}`).addClass('trash-hover');
						break;
					case 'match-results':
						$(`#${divID}`).addClass('match-hover');
						break;
				} //switch (divID) {

				
			},
			off: (divID) => {
				let candidatesMatch = data.candidates.filter(candidate => {
					return candidate.divID === divID;
				});


				candidatesMatch.forEach(candidate => {
					$(`#${candidate.profile.id}`).removeClass('card-hover');
				});

				switch (divID) {
					case 'match-email':
						$(`#${divID}`).removeClass('email-hover');
						break;
					case 'match-hold':
						$(`#${divID}`).removeClass('save-hover');
						break;
					case 'match-trash':
						$(`#${divID}`).removeClass('trash-hover');
						break;
					case 'match-results':
						$(`#${divID}`).removeClass('match-hover');
						break;
				} //switch (divID) {
				$(`#${divID}`).removeClass('match-container-hover');
			}
		}, //hover
	}, //effect
} //display

$(document).ready(() => {
	data.initializeDummy();
	data.postMatch();
	drag.initialize();
})