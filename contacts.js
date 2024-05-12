import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

export async function addContact(name, email, phone) {
  let contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

export async function removeContact(contactId) {
  let contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const removed = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removed[0];
  }
  return null;
}
