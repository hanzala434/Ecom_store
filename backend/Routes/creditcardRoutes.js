const express = require("express");
const { addCreditCard, fetchAllCreditCards, getSingleCreditCard, deleteCreditCard, editCreditCard } = 
require("../controllers/creditCardController");

const router = express.Router();

router.post("/add", addCreditCard);
router.get("/get/:userId", fetchAllCreditCards);
router.get("/:creditId", getSingleCreditCard);
router.delete("/delete/:userId/:creditId", deleteCreditCard);
router.put("/update/:userId/:creditId", editCreditCard);

module.exports = router;