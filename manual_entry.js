import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

	const data = event.body;
	const tran = event.body.transaction;

	const params = {
		TableName: process.env.tableName,
		Item: {
			yearMonth: data.yearMonth,
			transactionId: uuid.v1(),
			bank: data.bank,
			userId: event.requestContext.identity.cognitoIdentityId,
			transaction: tran,
			attachments: [],
			createdAt: Date.now()
			}
		};

	try {
		await dynamoDbLib.call("put", params);
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