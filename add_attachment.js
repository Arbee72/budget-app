import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
	const data = event.body.attachments;
	const params = {
		TableName: process.env.tableName,
		Key: {
			transactionId: event.pathParameters.transactionId,
			yearMonth: event.pathParameters.yearMonth
						},
		UpdateExpression: "SET attachments = list_append(attachments, :attach), userId = :userId",
		ExpressionAttributeValues: {
			":attach": data || null,
			":userId": event.requestContext.identity.cognitoIdentityId || null
			},
		ReturnValues: "ALL_NEW"
		};

	try {
		await dynamoDbLib.call("update", params);
		return success({ status: true });
		}
	catch (e) {
		return failure({ status: e });
		}
	}