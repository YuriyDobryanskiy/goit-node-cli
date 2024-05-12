import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts().then(console.log).catch(console.error);
      break;

    case "get":
      await getContactById(id).then(console.log).catch(console.error);
      break;

    case "add":
      await addContact(name, email, phone)
        .then(console.log)
        .catch(console.error);
      break;

    case "remove":
      await removeContact(id).then(console.log).catch(console.error);
      break;

    default:
      console.warn("Unknown action type!");
  }
}
invokeAction(program.opts());

// node index.js -a list
// node index.js -a get -i 05olLMgyVQdWRwgKfg5J6
// node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22
// node index.js -a remove -i 05olLMgyVQdWRwgKfg5J6
