const express = require("express");
const router = express.Router();

const validation = require("../../schemas/validation");
const {
  userValidationSchema,
  subscriptionUserValidationSchema,
  userEmailValidation,
} = require("../../schemas/validationSchema");
const auth = require("../../middleware/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
  updateAvatar,
  verifyEmail,
  resendingEmail,
} = require("../../controllers/users");
const validationEmail = require("../../schemas/validationEmail");
const upload = require("../../middleware/upload");

router.post("/register", validation(userValidationSchema), registerUser);
router.post("/login", validation(userValidationSchema), loginUser);
router.post("/logout", auth, logoutUser);
router.get("/current", auth, getCurrentUser);
router.patch(
  "/",
  auth,
  validation(subscriptionUserValidationSchema),
  updateUserSubscription
);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validationEmail(userEmailValidation), resendingEmail);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
