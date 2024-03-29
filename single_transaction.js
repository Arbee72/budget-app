import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

	const params = {
		TableName: process.env.tableName,
		Key: {
			yearMonth: event.pathParameters.yearMonth ,
			transactionId: event.pathParameters.transactionId
			}
		};

	try {
		const result = await dynamoDbLib.call("get",params);

		if (result.Item) {
			// Return the retrieved item
			return success(result.Item);
			}
		else {
			return failure({ status: false, error: "Item not found." });
			}
		}
	catch (e) {
		return failure({ status: {params, e} });
		}
	}

/*import { success, failure } from "./libs/response-lib";
var AWS = require('aws-sdk');


export async function main(event, context) {


}*/