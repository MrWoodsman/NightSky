function GetRandomInRange(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

class Star {
	constructor(size) {
		this.star = document.createElement('div');
		this.size = size;
		console.log(`Utworzono gwiazdę o wielkości ${this.size}!`);

		setTimeout(() => {
			this.spwanStar();
		}, GetRandomInRange(0, 4000));
	}

	setupPositionX() {
		let posX = Math.floor(Math.random() * window.innerWidth);
		posX = (posX / window.innerWidth) * 100;
		const posY = Math.floor(Math.random() * 100);
		this.star.style.left = `${posX}%`;
		this.star.style.top = `${posY}px`;
		this.star.style.setProperty('--move', `${GetRandomInRange(250, 500)}px`);
	}

	spwanStar() {
		this.setupPositionX();
		this.star.classList.add('star');
		this.star.style.animationDuration = '1s';

		this.star.innerHTML = `<div class="trail"></div>
            <div class="body"></div>`;

		document.querySelectorAll('.hero')[0].appendChild(this.star);

		this.star.addEventListener('animationiteration', () => {
			this.setupPositionX();
		});
	}
}

const stars = [];
for (let i = 0; i < 5; i++) {
	stars.push(new Star(5));
}

class ScrollAnimate {
	constructor(minScrol, maxScrol) {
		this.scrollAnimer = document.createElement('div');
		this.minScrol = minScrol;
		this.maxScrol = maxScrol;
		this.makeObject();
	}

	makeObject() {
		const self = this;

		this.scrollAnimer.classList.add('scroll_animation');
		this.scrollAnimer.innerHTML = `<div class="body"></div><div class="scroll"></div>`;
		document.body.appendChild(this.scrollAnimer);

		$(self.scrollAnimer).click(function () {
			$('html, body').animate(
				{
					scrollTop: $(window).height(),
				},
				800
			);
		});

		// Dodanie obsługi zdarzeń dotykowych
		$(window).on('scroll touchmove', function () {
			if ($(this).scrollTop() > self.maxScrol) {
				$(self.scrollAnimer).stop().animate({ opacity: 0 }, 200);
			} else {
				$(self.scrollAnimer).stop().animate({ opacity: 1 }, 200);
			}
		});

		// Dodanie wywołania funkcji dla stanu początkowego
		$(window).trigger('scroll');
	}
}

const scrollAnimation = new ScrollAnimate(0, 5);
