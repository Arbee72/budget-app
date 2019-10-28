import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

	const params = {
		TableName: process.env.tableName,
		KeyConditionExpression: "yearMonth = :yearMonth",
		ExpressionAttributeValues: {":yearMonth": event.pathParameters.yearMonth}
		};

	try {
		const result = await dynamoDbLib.call("query",params);
		return success(result.Items);
		}
	catch (e) {
		return failure({ status: {params, e} });
		}
	}
