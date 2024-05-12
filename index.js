const { program } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts().then(console.log);
      break;

    case "get":
      await getContactById(id).then(console.log);
      break;

    case "add":
      await addContact(name, email, phone).then(console.log);
      break;

    case "remove":
      await removeContact(id).then(console.log);
      break;

    default:
      console.warn("Unknown action type!");
  }
}
invokeAction(options);
