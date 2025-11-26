import { openDB } from "idb";

const DB_NAME = "appSettings";
const STORE = "flags";

async function getDB() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    },
  });
}

export async function setFlag(key: string, value: boolean) {
  const db = await getDB();
  await db.put(STORE, value, key);
}

export async function getFlag(key: string): Promise<boolean> {
  const db = await getDB();
  const value = await db.get(STORE, key);
  return value === true;
}
