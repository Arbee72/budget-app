import stripePackage from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

	/*The storage variable is the number of notes the user would like to store in his account. And source is the Stripe token for the card that we are going to charge.*/

	const { storage, source } = event.body;
	const amount = calculateCost(storage);
	const description = "Scratch charge";

	// Load our secret key from the environment variables
	const stripe = stripePackage(process.env.stripeSecretKey);

	try {
		await stripe.charges.create({
			source,
			amount,
			description,
			currency: "usd"
			});
		return success({ status: true });
		}
	catch (e) {
		return failure({ message: e.message });
		}
}