const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const REGION = "asia-southeast1";
const VIP_AMOUNT = 390;
const ADMIN_EMAILS = new Set(["givemeai.edit@gmail.com", "Givemeai.edit@gmail.com"]);

function assertSignedIn(request) {
  if (!request.auth?.uid) {
    throw new HttpsError("unauthenticated", "Please sign in with Gmail first.");
  }
  return request.auth;
}

function isAdmin(auth) {
  return ADMIN_EMAILS.has(auth.token.email || "");
}

exports.createVipOrder = onCall({ region: REGION }, async (request) => {
  const auth = assertSignedIn(request);
  const email = auth.token.email || "";
  const displayName = auth.token.name || "";
  const now = admin.firestore.FieldValue.serverTimestamp();

  const orderRef = db.collection("orders").doc();
  await orderRef.set({
    uid: auth.uid,
    email,
    displayName,
    amount: VIP_AMOUNT,
    currency: "THB",
    status: "pending",
    provider: "mock",
    createdAt: now,
    updatedAt: now,
  });

  return {
    orderId: orderRef.id,
    amount: VIP_AMOUNT,
    currency: "THB",
    status: "pending",
    provider: "mock",
  };
});

exports.mockConfirmPayment = onCall({ region: REGION }, async (request) => {
  const auth = assertSignedIn(request);
  const orderId = String(request.data?.orderId || "").trim();
  if (!orderId) {
    throw new HttpsError("invalid-argument", "Missing orderId.");
  }

  const orderRef = db.collection("orders").doc(orderId);
  const userRef = db.collection("users").doc(auth.uid);

  return db.runTransaction(async (transaction) => {
    const orderSnap = await transaction.get(orderRef);
    if (!orderSnap.exists) {
      throw new HttpsError("not-found", "Order not found.");
    }

    const order = orderSnap.data();
    if (order.uid !== auth.uid && !isAdmin(auth)) {
      throw new HttpsError("permission-denied", "This order belongs to another user.");
    }

    if (order.status === "paid") {
      return {
        orderId,
        status: "paid",
        approved: true,
      };
    }

    if (order.status !== "pending") {
      throw new HttpsError("failed-precondition", "This order cannot be paid.");
    }

    const now = admin.firestore.FieldValue.serverTimestamp();
    transaction.update(orderRef, {
      status: "paid",
      paidAt: now,
      updatedAt: now,
      paidBy: auth.token.email || auth.uid,
    });

    transaction.set(
      userRef,
      {
        uid: auth.uid,
        email: auth.token.email || "",
        displayName: auth.token.name || "",
        photoURL: auth.token.picture || "",
        status: "approved",
        approvedAt: now,
        approvedBy: "MOCK_PAYMENT",
        paidOrderId: orderId,
        lastLoginAt: now,
      },
      { merge: true },
    );

    return {
      orderId,
      status: "paid",
      approved: true,
    };
  });
});
