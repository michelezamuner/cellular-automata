const fs = require('fs');
try {
	fs.unlinkSync('cell.pbm');
} catch (e) {
}
const stream = fs.createWriteStream('cell.pbm', { flags: 'a'});
const rule = process.argv[2].split('').map(s => s|0);
const height = 500;
const width = 500;

let prev = {};
for (let i = 0; i < width; i++) {
	//const v = Math.random() > 0.5;
	const v = false;
	if (v) { prev[i] = v; }
}
prev[0] = 1;
stream.write("P1\n");
stream.write(`${width} ${height}\n`);
const firstLine = [];
for (let i = 0; i < width; i++) {
	firstLine[i] = prev[i]|0;
}
stream.write(firstLine.join(' ') + "\n");

for (let i = 1; i < height; i++) {
	const line = [];
	const nextPrev = {};
	for (let j = 0; j < width; j++) {
		const ruleIndex = getRuleIndex(prev[j - 1], prev[j], prev[j - 1]);
		line[j] = rule[ruleIndex];
		if (rule[ruleIndex]) { nextPrev[j] = true; }
	}
	prev = nextPrev;
	stream.write(line.join(' ') + "\n");
}

function getRuleIndex(first, middle, last) {
	first = first || 0;
	middle = middle || 0;
	last = last || 0;

	return last + (middle === 0 ? 0 : 2) + (first === 0 ? 0 : 4);
}
