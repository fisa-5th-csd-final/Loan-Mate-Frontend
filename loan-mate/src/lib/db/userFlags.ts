import { openDB } from "idb";

const DB_NAME = "APP_SETTINGS";
const FLAGS_STORE = "flags";

async function getDB() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FLAGS_STORE)) {
        db.createObjectStore(FLAGS_STORE);
      }
    },
  });
}

export async function setFlag(key: string, value: boolean) {
  const db = await getDB();
  await db.put(FLAGS_STORE, value, key);
}

export async function getFlag(key: string): Promise<boolean> {
  const db = await getDB();
  const value = await db.get(FLAGS_STORE, key);
  return value === true;
}
