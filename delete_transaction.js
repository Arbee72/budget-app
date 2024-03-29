import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
	const params = {
	TableName: process.env.tableName,

	Key: {
		transactionId: event.pathParameters.transactionId,
		yearMonth: event.pathParameters.yearMonth
		}
};

try {
	await dynamoDbLib.call("delete", params);
	return success({ status: true });
	}
catch (e) {
	return failure({ status: e });
	}
}