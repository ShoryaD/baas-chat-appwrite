import { Client, Account, Databases } from 'appwrite';

export const APPWRITE_ENDPOINT_URL = 'https://cloud.appwrite.io/v1'
export const PROJECT_ID = '672cc4c40013f94b32f9'

export const DATABASE_ID = '672cc614000106286f4c'
export const COLLECTION_ID_MESSAGES = '672cc620001d0924eae6'

const client = new Client();

client
    .setEndpoint(APPWRITE_ENDPOINT_URL)
    .setProject(PROJECT_ID);

export const account = new Account(client)
export const databases = new Databases(client)

export default client