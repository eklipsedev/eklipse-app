const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const authenticateWithQuickbooks = require("./quickbooks");

const flamelink = require("flamelink");

const mailchimp = require("@mailchimp/mailchimp_marketing");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eklipse-development.firebaseio.com",
});

const app = flamelink({
  firebaseApp,
  dbType: "cf",
});

const db = firebaseApp.firestore();

/* class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "UnauthenticatedError";
  }
}

class NotAnAdminError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "NotAnAdminError";
  }
}

class InvalidRoleError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.type = "InvalidRoleError";
  }
}

function roleIsValid(userRole) {
  const validRoles = ["Super-Admin"];
  return validRoles.includes(userRole);
} */

exports.createUser = functions.https.onCall(async (data) => {
  try {
    //set createdDate timestamp
    const time = new Date().getTime();
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString();

    const newUser = {
      displayName: data.firstName + " " + data.lastName,
      email: data.email,
      emailVerified: false,
      phone: data.phone,
      password: "eklipse123!",
      disabled: data.enabled ? false : true, // reverse logic because flamelink is weird
      createdOn: formattedDate,
    };

    const userRecord = await admin.auth().createUser(newUser);

    const userId = userRecord.uid;

    // establish references to be made
    const userRef = db.doc(`/fl_users/${userId}`);
    const companyRef = db.doc(`/fl_content/${data.companyId}`);
    const permissionRef = db.doc(`/fl_permissions/${data.permissionId}`);

    await app.users.addToDB({
      uid: userId,
      data: {
        displayName: data.firstName + " " + data.lastName,
        email: data.email,
        enabled: data.enabled ? "Yes" : "No",
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        permissions: permissionRef,
      },
    });

    await app.content.add({
      schemaKey: "users",
      data: {
        user: userRef,
        phone: data.phone,
        company: companyRef,
      },
    });

    return { uid: userId };
  } catch (error) {
    if (error.type === "UnauthenticatedError") {
      throw new functions.https.HttpsError("unauthenticated", error.message);
    }
  }
});

exports.updateUser = functions.https.onCall(async (data) => {
  try {
    const userId = data.userId;
    const updatedUser = {
      displayName: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      disabled: data.enabled ? false : true,
    };

    await admin.auth().updateUser(userId, updatedUser);

    // establish references to be made
    const userRef = db.doc(`/fl_users/${userId}`);
    const companyRef = db.doc(`/fl_content/${data.companyId}`);
    const permissionRef = db.doc(`/fl_permissions/${data.permissionId}`);

    const updatedUserResult = await app.users.updateInDB({
      uid: userId,
      data: {
        displayName: data.firstName + " " + data.lastName,
        email: data.email,
        enabled: data.enabled ? "Yes" : "No",
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        permissions: permissionRef,
      },
    });

    await app.content.update({
      schemaKey: "users",
      entryId: userId,
      data: {
        user: userRef,
        phone: data.phone,
        company: companyRef,
      },
    });

    return { result: updatedUserResult };
  } catch (error) {
    if (error.type === "UnauthenticatedError") {
      throw new functions.https.HttpsError("unauthenticated", error.message);
    }
  }
});

exports.deleteUser = functions.https.onCall((data) => {
  const userId = data.userId;
  const docId = data.docId;

  admin
    .auth()
    .deleteUser(userId)
    .then(() => {
      console.log("user deleted from auth!");
      // get the user for the given user relational user
      app.content
        .remove({
          schemaKey: "users",
          entryId: docId,
        })
        .then(() => {
          app.users.removeFromDB({
            uid: userId,
          });
          console.log("Removing the entry succeeded");
        });
    });
});

const setMailchimpConfig = () => {
  mailchimp.setConfig({
    apiKey: "8d61a35489e8bdb1603280119c2d8576-us19",
    server: "us19",
  });
};

// send to "Newsletter" list in Mailchimp
exports.subscribeToNewsletter = functions.https.onCall((data) => {
  setMailchimpConfig();

  mailchimp.lists
    .addListMember("f1644a72f2", {
      email_address: data.email,
      status: "subscribed",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// send to "Contact Us" list in Mailchimp
exports.sendMessage = functions.https.onCall((data) => {
  setMailchimpConfig();

  mailchimp.lists
    .addListMember("b002377fab", {
      email_address: data.email,
      status: "transactional",
      merge_fields: {
        FIRSTNAME: data.firstName,
        LASTNAME: data.lastName,
        MESSAGE: data.message,
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

exports.authenticateWithQuickbooks =
  authenticateWithQuickbooks.authenticateWithQuickbooks;
