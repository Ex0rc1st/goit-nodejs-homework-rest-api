const contactsOperation = require("../services/contactsServices");
const contactsSchema = require("../schemas/contacts");
const MyError = require("../utils/errors");

const { listContacts, getContById, removeContact, addContact, updateCont } =
  contactsOperation;

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContById(contactId);

    if (!contact) {
      return next(new MyError(`Contact with id: ${contactId} not found`, 404));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      return next(new MyError("missing required name field", 400));
    }

    const contact = await addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (!contact) {
      return next(new MyError("Not found", 404));
    }

    res.json({
      message: `contact deleted`,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const contact = await updateCont(contactId, req.body);

    if (!contact) {
      return next(new MyError("Not found", 404));
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
