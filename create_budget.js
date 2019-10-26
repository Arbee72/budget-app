//import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

	const data = event.body;

	const params = {
		TableName: process.env.tableBudgetName,
		Item: {
			budgetId: data.budgetId,
			categoryId: data.categoryId,
			userId: event.requestContext.identity.cognitoIdentityId,
			budgetedAmount: data.budgetedAmount,
			leftoverLastMonth: data.leftoverLastMonth,
			currentBalance: data.currentBalance,
			budgetCategoryIcon: data.budgetCategoryIcon,
			budgetItemIcon: data.budgetItemIcon,
			createdAt: Date.now()
			}
		};

	try {
		await dynamoDbLib.call("put", params);
		//const util = require('util');
		//console.log(util.inspect(event.requestContext, {showHidden: true, depth: null}));
		return success(params.Item);
		}
	catch (e) {
		//console.log(e);
		return failure({ status: e });
		}

	/*dynamoDb.put(params, (error, data) => {
// Set response headers to enable CORS (Cross-Origin Resource Sharing)
		const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true
		};

	if (error) {
		const response = {
			statusCode: 500,
			headers: headers,
			body: JSON.stringify({ status: error })
			};
		callback(null, response);
		return;
		}

	const response = {
		statusCode: 200,
		headers: headers,
		body: JSON.stringify(params.Item)
		};
	callback(null, response);
	});*/


}