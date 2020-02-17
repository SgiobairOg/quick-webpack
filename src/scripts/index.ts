const wittyTagLineContainer = document.querySelector('.witty-bit');
const taglines = [
	'it thoroughly discourages whipping of the Llama.',
	'not owned or afilliated with Microsoft',
	'send me money, or don&apos;t',
	'i&apos;d rather be playing Arkanoid',
	'how did you end up finding me?'
];

function init() {
	const tagline: string = selectRandom(taglines);
	updateTagline(tagline);
}

function selectRandom( itemArray: string[] ): string {
	const randomIndex: number = Math.floor(Math.random() * itemArray.length)
	return itemArray[randomIndex];
}

function updateTagline( tagline: string ) {
	wittyTagLineContainer.innerHTML = `...${tagline}`;
}

init();