export function calculateCost(storage) {
	const rate = storage <= 10 //if less than 10 notes stored
		? 4 // we charge them $4 per note
		: storage <= 100 //if 11 to 100 notes stored
		? 2 // we charge them $2 per note
		: 1; // more than 100 is $1 per note
	return rate * storage * 100; //result must be in pennies, thus *100
}